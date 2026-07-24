import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import prisma from '@/lib/db/prisma'

const role_route_map: Record<string, string> = {
  STUDENT: '/student/dashboard',
  STAFF: '/staff/dashboard',
  ASSISTANT: '/desk/dashboard',
  CAPTAIN: '/desk/dashboard',
  PREFECT: '/desk/dashboard',
  EXECUTIVE: '/executive/dashboard',
  LIBRARY_HEAD: '/library-head/dashboard',
  SUPER_ADMIN: '/super-admin/dashboard',
}

const protected_route_prefixes = [
  '/super-admin',
  '/library-head',
  '/student',
  '/staff',
  '/desk',
  '/executive',
  '/catalogue',
  '/members',
  '/reservations',
  '/account',
]

/**
 * Reads the user's role from app_metadata in the JWT.
 * Falls back to Prisma DB lookup if JWT role is missing.
 */
async function getRoleFromUser(user: { id: string; app_metadata?: Record<string, unknown> } | null): Promise<string> {
  if (!user) return 'STUDENT'

  const jwtRole = user.app_metadata?.role
  if (typeof jwtRole === 'string' && jwtRole in role_route_map) return jwtRole

  // JWT role missing — fall back to DB
  try {
    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    })
    return (profile?.role as string) ?? 'STUDENT'
  } catch {
    return 'STUDENT'
  }
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabase_url || !supabase_key || supabase_url === 'your-project-url-here') {
    console.warn('[middleware] Supabase env vars missing — skipping auth. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env')
    return response
  }

  const supabase = createServerClient(supabase_url, supabase_key,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const role = await getRoleFromUser(user)

  // redirect logged-in users away from login
  if (user && pathname.startsWith('/login')) {
    const home = role_route_map[role] ?? '/student/dashboard'
    return NextResponse.redirect(new URL(home, request.url))
  }

  // redirect authenticated users from root to their dashboard
  if (user && pathname === '/') {
    const home = role_route_map[role] ?? '/student/dashboard'
    return NextResponse.redirect(new URL(home, request.url))
  }

  // redirect unauthenticated users to login
  if (!user && pathname !== '/' && !pathname.startsWith('/login')) {
    const is_public = !protected_route_prefixes.some(p => pathname.startsWith(p))
    if (!is_public) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // role-based route protection for authenticated users
  if (user) {
    const allowed_prefixes = get_allowed_prefixes(role)
    const is_allowed = allowed_prefixes.some(p => pathname.startsWith(p))

    if (!is_allowed && protected_route_prefixes.some(p => pathname.startsWith(p))) {
      const home = role_route_map[role] ?? '/student/dashboard'
      return NextResponse.redirect(new URL(home, request.url))
    }
  }

  return response
}

function get_allowed_prefixes(role: string): string[] {
  switch (role) {
    case 'SUPER_ADMIN':
      return ['/super-admin', '/library-head', '/student', '/staff', '/desk', '/executive', '/catalogue', '/members', '/reservations']
    case 'LIBRARY_HEAD':
      return ['/library-head', '/catalogue', '/members', '/reservations', '/desk']
    case 'STUDENT':
      return ['/student', '/catalogue', '/members', '/reservations']
    case 'STAFF':
      return ['/staff', '/catalogue', '/members', '/reservations']
    case 'ASSISTANT':
    case 'CAPTAIN':
    case 'PREFECT':
      return ['/desk', '/catalogue', '/members', '/reservations']
    case 'EXECUTIVE':
      return ['/executive', '/catalogue', '/members', '/reservations']
    default:
      return ['/student']
  }
}
