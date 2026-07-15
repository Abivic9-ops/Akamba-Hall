import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db/prisma'

// Maps DB roles to their respective portal routes
const ROLE_ROUTES: Record<string, string> = {
  STUDENT:      '/member/dashboard',
  STAFF:        '/member/dashboard',
  EXECUTIVE:    '/member/dashboard',
  ASSISTANT:    '/operations/dashboard',
  CAPTAIN:      '/operations/dashboard',
  PREFECT:      '/operations/dashboard',
  LIBRARY_HEAD: '/governance/dashboard',
  SUPER_ADMIN:  '/governance/dashboard',
}

export async function getAuthUser() {
  const supabase = await createClient()
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
  return ROLE_ROUTES[role] ?? '/member/dashboard'
}
