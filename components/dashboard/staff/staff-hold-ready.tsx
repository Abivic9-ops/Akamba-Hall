'use client'

import { Bookmark, MapPin } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'

interface Hold {
  id: string
  title: string
  author: string
  coverUrl: string
  status: 'ready' | 'pending'
  queuePosition: number | null
  pickupLocation: string | null
  pickupDeadline: string | null
}

interface StaffHoldReadyProps {
  holds: Hold[]
}

function formatDeadline(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function StaffHoldReady({ holds }: StaffHoldReadyProps) {
  const readyHold = holds.find((h) => h.status === 'ready')
  const pendingHolds = holds.filter((h) => h.status === 'pending')

  return (
    <SectionCard
      title="Hold Ready for Pickup"
      icon={Bookmark}
      cta={{ label: 'View all', href: '#' }}
    >
      {holds.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          message="No holds or reservations"
          action={
            <a href="#" className="text-[13px] font-medium text-[#2563EB] hover:underline">
              Search Catalogue
            </a>
          }
        />
      ) : (
        <div className="space-y-3">
          {readyHold && (
            <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div className="w-[50px] h-[70px] rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <Bookmark className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-slate-800 truncate">{readyHold.title}</p>
                <p className="text-[13px] text-slate-500">{readyHold.author}</p>
                <div className="mt-2 space-y-1">
                  <Badge variant="success" dot>Ready for Pickup</Badge>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-[13px] text-slate-500">{readyHold.pickupLocation}</span>
                  </div>
                  {readyHold.pickupDeadline && (
                    <p className="text-[13px] font-medium text-red-600">
                      Pickup by {formatDeadline(readyHold.pickupDeadline)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {readyHold && (
            <div className="flex gap-2">
              <button className="flex-1 h-9 rounded-lg bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors">
                Pick Up Now
              </button>
              <button className="h-9 px-4 rounded-lg border border-slate-200 text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors">
                Cancel
              </button>
            </div>
          )}

          {pendingHolds.map((hold) => (
            <div
              key={hold.id}
              className="flex items-center gap-3 py-2.5 border-t border-slate-100"
            >
              <div className="w-[36px] h-[50px] rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <Bookmark className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-slate-800 truncate">{hold.title}</p>
                <p className="text-[12px] text-slate-400">{hold.author}</p>
              </div>
              <Badge variant="info" dot>#{hold.queuePosition} in queue</Badge>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}
