'use client'

import { Wrench, MapPin } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'

interface Equipment {
  id: string
  name: string
  description: string | null
  category: string | null
  status: string
  location: string | null
}

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' }> = {
  available: { label: 'Available', variant: 'success' },
  in_use: { label: 'In Use', variant: 'warning' },
  maintenance: { label: 'Maintenance', variant: 'danger' },
  reserved: { label: 'Reserved', variant: 'info' },
  unavailable: { label: 'Unavailable', variant: 'neutral' },
}

export function EquipmentList({ equipment }: { equipment: Equipment[] }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-[28px] font-medium text-[#0B1B3D] dark:text-[#E2E8F0]">Equipment Booking</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">
            Browse and book available library equipment.
          </p>
        </div>

        <SectionCard title="Available Equipment" icon={Wrench}>
          {equipment.length === 0 ? (
            <EmptyState icon={Wrench} message="No equipment available yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {equipment.map((item) => {
                const cfg = statusConfig[item.status] ?? { label: item.status, variant: 'neutral' as const }
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-100 dark:border-white/[0.08] p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-[15px] font-medium text-[#0B1B3D] dark:text-[#E2E8F0]">{item.name}</h3>
                      <Badge variant={cfg.variant} className="text-[10px] shrink-0">{cfg.label}</Badge>
                    </div>
                    <p className="text-[14px] text-slate-600 dark:text-[#94A3B8] line-clamp-2 mb-3">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-[12px] text-slate-500 dark:text-[#6B7A99]">
                      <Badge variant="neutral" className="text-[10px]">{item.category}</Badge>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}
