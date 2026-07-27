import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db/prisma'
import type { User } from '@prisma/client'

const roleRoutes: Record<string, string> = {
  STUDENT: '/student/dashboard',
  STAFF: '/staff/dashboard',
  EXECUTIVE: '/executive/dashboard',
  ASSISTANT: '/desk/dashboard',
  CAPTAIN: '/desk/dashboard',
  PREFECT: '/desk/dashboard',
  LIBRARY_HEAD: '/library-head/dashboard',
  SUPER_ADMIN: '/super-admin/dashboard',
}

export async function getAuthUser() {
  const supabase = await createClient()
  if (!supabase) return null

  // Use getSession() instead of getUser() to avoid hitting Supabase auth server
  // on every request (which causes 429 over_request_rate_limit errors).
  // getSession() reads the JWT from cookies and decodes it locally.
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session?.user ?? null
}

export async function getUserProfile() {
  const user = await getAuthUser()
  if (!user) return null

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    include: { qrCards: true },
  })

  return profile
}

export async function requireAuth() {
  const user = await getAuthUser()
  if (!user) redirect('/login')
  return user
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth()

  let profile: User | null = null
  try {
    profile = await prisma.user.findUnique({ where: { id: user.id } })
  } catch (error) {
    console.error('[requireRole] Database error fetching profile:', error)
    redirect('/login')
  }

  if (!profile || !allowedRoles.includes(profile.role)) {
    redirect('/unauthorized')
  }

  return profile
}

export function getRouteForRole(role: string): string {
  return roleRoutes[role] ?? '/student/dashboard'
}
