'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/lib/contexts/auth-context'
import { DashboardSidebar } from './dashboard-sidebar'
import { DashboardHeader } from './dashboard-header'
import { MobileNav } from './mobile-nav'
import { AiChatWidget } from '@/components/ai/ai-chat-widget'
import { PortalAiToolbar } from '@/components/ai/portal-ai-toolbar'
import type { UserProfile } from '@/lib/actions/auth'

interface OperationsShellProps {
  profile: UserProfile | null
  children: React.ReactNode
}

export function OperationsShell({ profile, children }: OperationsShellProps) {
  const [mobile_open, set_mobile_open] = useState(false)
  const [widget_ready, set_widget_ready] = useState(false)
  const pathname = usePathname()

  // Hide the widget during navigation, re-show after the page content loads
  useEffect(() => {
    set_widget_ready(false)
    const t = setTimeout(() => set_widget_ready(true), 500)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <AuthProvider initialProfile={profile ?? undefined}>
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
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
              {children}
            </div>
          </main>
        </div>

        {/* Only show widget after page content has loaded */}
        {widget_ready && <AiChatWidget />}
        <PortalAiToolbar />
      </div>
    </AuthProvider>
  )
}
