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

interface HoldsProps {
  holds: Hold[]
}

function formatDeadline(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function Holds({ holds }: HoldsProps) {
  return (
    <SectionCard
      title="Holds & Reservations"
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
        <div className="space-y-0">
          {holds.map((hold) => (
            <div
              key={hold.id}
              className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0"
            >
              {/* cover placeholder */}
              <div className="w-[36px] h-[50px] rounded-lg bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                <Bookmark className="h-4 w-4 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{hold.title}</p>
                <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{hold.author}</p>

                {hold.status === 'ready' ? (
                  <div className="mt-1.5 space-y-1">
                    <Badge variant="success" dot>Ready for Pickup</Badge>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <MapPin className="h-3 w-3 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                      <span className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{hold.pickupLocation}</span>
                    </div>
                    {hold.pickupDeadline && (
                      <p className="text-[12px] font-medium text-red-600">
                        Pickup by {formatDeadline(hold.pickupDeadline)}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-1.5">
                    <Badge variant="info" dot>#{hold.queuePosition} in queue</Badge>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                {hold.status === 'ready' && (
                  <button className="h-7 px-3 rounded-lg bg-[#2563EB] text-white text-[12px] font-medium hover:bg-[#1D4ED8] transition-colors">
                    Pick Up
                  </button>
                )}
                <button className="text-[12px] font-medium text-red-500 hover:text-red-700 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}
