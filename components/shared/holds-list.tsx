'use client'

import { Clock, BookOpen } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface HoldItem {
  id: string
  title: string
  author: string
  coverUrl: string | null
  status: string
  queuePosition: number | null
  pickupLocation: string | null
  pickupDeadline: string | null
  requestedAt: string
}

const status_config: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-600' },
  ready: { label: 'Ready', color: 'bg-emerald-100 text-emerald-600' },
  expired: { label: 'Expired', color: 'bg-red-100 text-red-500' },
  fulfilled: { label: 'Fulfilled', color: 'bg-blue-100 text-blue-600' },
  cancelled: { label: 'Cancelled', color: 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99]' },
}

function format_date(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function HoldsList({ holds }: { holds: HoldItem[] }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Holds</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Your book hold requests</p>
          </div>
        </div>

        <SectionCard title="My Holds" icon={Clock}>
          <div className="space-y-2">
            {holds.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No holds placed</p>
            ) : (
              holds.map((h) => (
                <div key={h.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{h.title}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">
                      {h.author} · Requested {format_date(h.requestedAt)}
                      {h.queuePosition != null && ` · Queue #${h.queuePosition}`}
                    </p>
                    {h.pickupLocation && (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Pickup: {h.pickupLocation}</p>
                    )}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status_config[h.status]?.color ?? ''}`}>
                    {status_config[h.status]?.label ?? h.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
