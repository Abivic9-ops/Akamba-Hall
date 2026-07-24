'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AuthProvider, useAuth } from '@/lib/contexts/auth-context'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { DashboardHeader } from '@/components/layout/dashboard-header'
import { MobileNav } from '@/components/layout/mobile-nav'
import { DashboardLoading } from '@/components/layout/dashboard-loading'
import { DashboardError } from '@/components/layout/dashboard-error'
import type { Role } from '@/lib/types/role'

const portal_prefixes: Record<string, string[]> = {
  '/student': ['STUDENT', 'SUPER_ADMIN'],
  '/staff': ['STAFF', 'SUPER_ADMIN'],
  '/desk': ['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'],
  '/executive': ['EXECUTIVE', 'SUPER_ADMIN'],
  '/library-head': ['LIBRARY_HEAD', 'SUPER_ADMIN'],
  '/super-admin': ['SUPER_ADMIN'],
}

const home_routes: Record<string, string> = {
  STUDENT: '/student/dashboard',
  STAFF: '/staff/dashboard',
  ASSISTANT: '/desk/dashboard',
  CAPTAIN: '/desk/dashboard',
  PREFECT: '/desk/dashboard',
  EXECUTIVE: '/executive/dashboard',
  LIBRARY_HEAD: '/library-head/dashboard',
  SUPER_ADMIN: '/super-admin/dashboard',
}

function Shell({ children }: { children: React.ReactNode }) {
  const { user, role, loading, error } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [mobile_open, set_mobile_open] = useState(false)
  const [authorized, set_authorized] = useState<boolean | null>(null)

  useEffect(() => {
    if (loading || !role) return

    for (const [prefix, allowedRoles] of Object.entries(portal_prefixes)) {
      if (pathname.startsWith(prefix)) {
        if (!allowedRoles.includes(role)) {
          set_authorized(false)
          router.push(home_routes[role] ?? '/login')
          return
        }
        set_authorized(true)
        return
      }
    }
    set_authorized(true)
  }, [role, pathname, loading, router])

  if (loading || authorized === null) return <DashboardLoading />
  if (error) return <DashboardError error={error} />
  if (!authorized) return <DashboardLoading />

  return (
    <div className="flex h-screen bg-[#F8F9FB] dark:bg-[#071224] transition-colors duration-300">
      {/* desktop sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* mobile nav */}
      <MobileNav open={mobile_open} on_close={() => set_mobile_open(false)} />

      {/* main content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <DashboardHeader on_menu_toggle={() => set_mobile_open(!mobile_open)} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function operations_layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Shell>{children}</Shell>
    </AuthProvider>
  )
}
