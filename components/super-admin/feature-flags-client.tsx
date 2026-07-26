'use client'

import { ToggleLeft, CreditCard, BookOpen, Bookmark, Wrench, Moon, Smartphone } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface FeatureFlagsClientProps {
  flags: {
    qrCardSystem: boolean
    eResources: boolean
    bookReservations: boolean
    equipmentLending: boolean
    darkMode: boolean
    pwaSupport: boolean
  }
  counts: {
    qrCards: number
    eResources: number
    holds: number
    equipment: number
  }
}

const featureList = [
  {
    key: 'qrCardSystem' as const,
    name: 'QR Card System',
    description: 'Generate and manage QR access cards for library entry',
    icon: CreditCard,
    countKey: 'qrCards' as const,
  },
  {
    key: 'eResources' as const,
    name: 'E-Resources',
    description: 'Digital resources and online learning materials',
    icon: BookOpen,
    countKey: 'eResources' as const,
  },
  {
    key: 'bookReservations' as const,
    name: 'Book Reservations',
    description: 'Allow users to hold and reserve books in advance',
    icon: Bookmark,
    countKey: 'holds' as const,
  },
  {
    key: 'equipmentLending' as const,
    name: 'Equipment Lending',
    description: 'Lend projectors, calculators, and other equipment',
    icon: Wrench,
    countKey: 'equipment' as const,
  },
  {
    key: 'darkMode' as const,
    name: 'Dark Mode',
    description: 'System-wide dark theme toggle for the interface',
    icon: Moon,
    countKey: null,
  },
  {
    key: 'pwaSupport' as const,
    name: 'PWA Support',
    description: 'Progressive Web App for offline access and installability',
    icon: Smartphone,
    countKey: null,
  },
]

export function FeatureFlagsClient({ flags, counts }: FeatureFlagsClientProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <ToggleLeft className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Feature Flags</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Toggle system features on and off</p>
          </div>
        </div>

        <SectionCard title="Feature Toggles" icon={ToggleLeft}>
          <div className="space-y-3">
            {featureList.map((feature) => {
              const Icon = feature.icon
              const enabled = flags[feature.key]
              const count = feature.countKey ? counts[feature.countKey] : null
              return (
                <div key={feature.key} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06]">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${enabled ? 'bg-[#5B9BD5]/10' : 'bg-slate-100 dark:bg-white/[0.06]'}`}>
                    <Icon className={`h-5 w-5 ${enabled ? 'text-[#5B9BD5]' : 'text-slate-300 dark:text-[#6B7A99]'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{feature.name}</h3>
                    <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{feature.description}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {count !== null && (
                      <span className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{count} record{count !== 1 ? 's' : ''}</span>
                    )}
                    <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${enabled ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/[0.1]'}`}>
                      <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-[18px]' : 'translate-x-[3px]'}`} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
