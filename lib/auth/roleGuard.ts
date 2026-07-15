import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db/prisma'

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

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
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
  const profile = await prisma.user.findUnique({ where: { id: user.id } })

  if (!profile || !allowedRoles.includes(profile.role)) {
    redirect('/unauthorized')
  }

  return profile
}

export function getRouteForRole(role: string): string {
  return roleRoutes[role] ?? '/student/dashboard'
}
