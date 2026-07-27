'use client'

import { useState, useEffect } from 'react'
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
  const [shell_ready, set_shell_ready] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => set_shell_ready(true), 100)
    return () => clearTimeout(t)
  }, [])

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

        <AiChatWidget />
        <PortalAiToolbar />
      </div>

      {/* AI chat — only mounts after shell finishes loading */}
      {shell_ready && <AiChatWidget />}
    </AuthProvider>
  )
}
