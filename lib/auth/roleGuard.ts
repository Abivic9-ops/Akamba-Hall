import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db/prisma'

// Maps DB roles to their respective portal routes
const ROLE_ROUTES: Record<string, string> = {
  STUDENT:      '/dashboard',
  STAFF:        '/staff-dashboard',
  EXECUTIVE:    '/dashboard',
  ASSISTANT:    '/staff-dashboard',
  CAPTAIN:      '/staff-dashboard',
  PREFECT:      '/staff-dashboard',
  LIBRARY_HEAD: '/staff-dashboard',
  SUPER_ADMIN:  '/staff-dashboard',
}

export async function getAuthUser() {
  const supabase = await createClient()
  // If Supabase is not configured (UI preview mode), treat as unauthenticated
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
  return ROLE_ROUTES[role] ?? '/dashboard'
}
