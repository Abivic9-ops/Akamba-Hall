'use server'

import prisma from '@/lib/db/prisma'
import { createClient } from '@/lib/supabase/server'
import { getAdminClient } from '@/lib/supabase/admin'

/* ─── Types ─────────────────────────────────────── */

export interface UserProfile {
  id: string
  email: string | null
  fullName: string | null
  avatarUrl: string | null
  role: string
  studentId: string | null
  memberType: string
  status: string
  createdAt: string
}

export interface auth_result {
  success: boolean
  error?: string
}

/* ─── Profile Queries ───────────────────────────── */

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        role: true,
        studentId: true,
        memberType: true,
        status: true,
        createdAt: true,
      },
    })
    if (!profile) return null
    return { ...profile, createdAt: profile.createdAt.toISOString() }
  } catch {
    return null
  }
}

export async function getUserRole(userId: string): Promise<string | null> {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    })
    return profile?.role ?? null
  } catch {
    return null
  }
}

/* ─── Sign Up ───────────────────────────────────── */

export async function sign_up_action(formData: {
  fullName: string
  email: string
  studentId: string
  password: string
}): Promise<auth_result> {
  const supabase = await createClient()
  if (!supabase) {
    return { success: false, error: 'Authentication service is not configured.' }
  }

  const { fullName, email, studentId, password } = formData

  // check if student ID already exists
  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email.toLowerCase() },
        { studentId: studentId || '__none__' },
      ],
    },
  })

  if (existing) {
    if (existing.email === email.toLowerCase()) {
      return { success: false, error: 'An account with this email already exists.' }
    }
    return { success: false, error: 'This Student/Staff ID is already registered.' }
  }

  // create supabase auth user
  const { data: auth_data, error: auth_error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password,
    options: {
      data: {
        full_name: fullName,
        student_id: studentId,
      },
    },
  })

  if (auth_error) {
    return { success: false, error: auth_error.message }
  }

  if (!auth_data.user) {
    return { success: false, error: 'Failed to create account. Please try again.' }
  }

  // create prisma user profile
  try {
    await prisma.user.create({
      data: {
        id: auth_data.user.id,
        email: email.toLowerCase(),
        fullName,
        studentId: studentId || null,
        role: 'STUDENT',
        memberType: 'STUDENT',
        status: 'ACTIVE',
      },
    })
  } catch {
    // prisma user may already exist from trigger, that's fine
  }

  // set role in app_metadata so middleware can read it from the JWT
  const admin = getAdminClient()
  if (admin) {
    await admin.auth.admin.updateUserById(auth_data.user.id, {
      app_metadata: { role: 'STUDENT' },
    }).catch(() => {})
  }

  return { success: true }
}

/* ─── Sign In ───────────────────────────────────── */

export async function sign_in_action(formData: {
  identifier: string
  password: string
  mode: 'email' | 'student'
}): Promise<auth_result> {
  const supabase = await createClient()
  if (!supabase) {
    return { success: false, error: 'Authentication service is not configured.' }
  }

  const { identifier, password, mode } = formData

  let email: string
  if (mode === 'email') {
    email = identifier
  } else {
    email = identifier.includes('@') ? identifier : `${identifier}@akambahall.local`
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  // update last active timestamp + sync role to app_metadata for middleware
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      // read role from database
      const profile = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      })

      // update last active
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() },
      }).catch(() => {})

      // sync role to Supabase app_metadata so middleware can read it from the JWT
      const dbRole = profile?.role ?? 'STUDENT'
      const jwtRole = user.app_metadata?.role
      if (jwtRole !== dbRole) {
        const admin = getAdminClient()
        if (admin) {
          await admin.auth.admin.updateUserById(user.id, {
            app_metadata: { role: dbRole },
          }).catch(() => {})
          // refresh the session so the new JWT carries the updated role
          await supabase.auth.refreshSession().catch(() => {})
        }
      }
    }
  } catch {}

  return { success: true }
}

/* ─── Sign Out ──────────────────────────────────── */

export async function sign_out_action(): Promise<auth_result> {
  const supabase = await createClient()
  if (!supabase) {
    return { success: true }
  }

  const { error } = await supabase.auth.signOut()
  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

/* ─── Forgot Password ───────────────────────────── */

export async function reset_password_action(email: string): Promise<auth_result> {
  const supabase = await createClient()
  if (!supabase) {
    return { success: false, error: 'Authentication service is not configured.' }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase(), {
    redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin : 'http://localhost:3000'}/reset-password`,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

/* ─── Update Password ───────────────────────────── */

export async function update_password_action(new_password: string): Promise<auth_result> {
  const supabase = await createClient()
  if (!supabase) {
    return { success: false, error: 'Authentication service is not configured.' }
  }

  const { error } = await supabase.auth.updateUser({
    password: new_password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

/* ─── Update Profile ────────────────────────────── */

export async function update_profile_action(userId: string, data: {
  fullName?: string
  studentId?: string
  avatarUrl?: string
}): Promise<auth_result> {
  try {
    // check student ID uniqueness if changing
    if (data.studentId) {
      const existing = await prisma.user.findFirst({
        where: {
          studentId: data.studentId,
          id: { not: userId },
        },
      })
      if (existing) {
        return { success: false, error: 'This Student/Staff ID is already in use.' }
      }
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.fullName !== undefined && { fullName: data.fullName }),
        ...(data.studentId !== undefined && { studentId: data.studentId || null }),
        ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
      },
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Failed to update profile.' }
  }
}

/* ─── Get Current User (server component helper) ── */

export async function get_current_user(): Promise<UserProfile | null> {
  const supabase = await createClient()
  if (!supabase) return null

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  return getUserProfile(user.id)
}
