'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { auth_provider as AuthProvider, useAuth } from '@/lib/contexts/auth-context'
import { dashboard_sidebar as DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { dashboard_header as DashboardHeader } from '@/components/layout/dashboard-header'
import { mobile_nav as MobileNav } from '@/components/layout/mobile-nav'
import { dashboard_loading as DashboardLoading } from '@/components/layout/dashboard-loading'
import { dashboard_error as DashboardError } from '@/components/layout/dashboard-error'

function Shell({ children }: { children: React.ReactNode }) {
  const { loading, error } = useAuth()
  const pathname = usePathname()
  const [mobile_open, set_mobile_open] = useState(false)

  useEffect(() => {
    set_mobile_open(false)
  }, [pathname])

  if (loading) return <DashboardLoading />
  if (error) return <DashboardError error={error} />

  return (
    <div className="flex h-screen bg-[#F8F9FB]">
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
