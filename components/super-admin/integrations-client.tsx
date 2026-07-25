'use client'

import { Plug } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

export function IntegrationsClient() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Plug className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Integrations</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">External service connections</p>
          </div>
        </div>

        <SectionCard title="Connected Services" icon={Plug}>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center mb-4">
              <Plug className="h-7 w-7 text-slate-300 dark:text-[#6B7A99]" />
            </div>
            <h3 className="text-[15px] font-medium text-slate-700 dark:text-[#E2E8F0] mb-1">Integrations</h3>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] max-w-xs">
              Manage connections to external services like email, SMS, and payment providers.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
