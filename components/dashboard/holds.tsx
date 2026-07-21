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
            <a href="#" className="text-[14px] font-medium text-[#2563EB] hover:underline">
              Search Catalogue
            </a>
          }
        />
      ) : (
        <div className="space-y-0">
          {holds.map((hold) => (
            <div
              key={hold.id}
              className="flex items-start gap-4 py-4 border-b border-slate-50 last:border-0"
            >
              {/* cover placeholder */}
              <div className="w-[44px] h-[60px] rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <Bookmark className="h-5 w-5 text-slate-400" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-slate-800 truncate">{hold.title}</p>
                <p className="text-[13px] text-slate-400">{hold.author}</p>

                {hold.status === 'ready' ? (
                  <div className="mt-2 space-y-1.5">
                    <Badge variant="success" dot>Ready for Pickup</Badge>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-[13px] text-slate-500">{hold.pickupLocation}</span>
                    </div>
                    {hold.pickupDeadline && (
                      <p className="text-[13px] font-medium text-red-600">
                        Pickup by {formatDeadline(hold.pickupDeadline)}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    <Badge variant="info" dot>#{hold.queuePosition} in queue</Badge>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                {hold.status === 'ready' && (
                  <button className="h-8 px-4 rounded-lg bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors">
                    Pick Up Now
                  </button>
                )}
                <button className="text-[13px] font-medium text-red-500 hover:text-red-700 transition-colors">
                  Cancel Hold
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}
