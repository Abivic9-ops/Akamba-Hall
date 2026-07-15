import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  // Gracefully bypass if Supabase env vars are missing (UI preview / local dev)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // ── Route categories ──────────────────────────────────────────────
  const isAuthRoute =
    pathname.startsWith('/login') || pathname.startsWith('/qr-login')

  const isPublicRoute =
    pathname === '/' ||
    pathname === '/unauthorized' ||
    pathname.startsWith('/search') ||
    pathname.startsWith('/item') ||
    pathname.startsWith('/hours') ||
    pathname.startsWith('/announcements') ||
    pathname.startsWith('/help')

  const isApiRoute = pathname.startsWith('/api')

  // ── Unauthenticated user on a protected route → /login ────────────
  if (!user && !isAuthRoute && !isPublicRoute && !isApiRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // ── Unauthenticated user hitting a protected API → 401 ────────────
  if (!user && isApiRoute) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // ── Authenticated user on auth pages → student dashboard (default) ─
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/student/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
