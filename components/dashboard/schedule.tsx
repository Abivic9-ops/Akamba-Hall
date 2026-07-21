'use client'

import { CalendarCheck, BookOpen, Video, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'

interface Booking {
  id: string
  type: 'Reading Seat' | 'AVR' | 'Boardroom'
  title: string
  location: string
  startAt: string
  endAt: string
  status: 'Approved' | 'Pending' | 'Cancelled'
}

interface ScheduleProps {
  bookings: Booking[]
}

const type_icons: Record<string, typeof BookOpen> = {
  'Reading Seat': BookOpen,
  AVR: Video,
  Boardroom: Users,
}

const type_colors: Record<string, string> = {
  'Reading Seat': 'text-[#2563EB]',
  AVR: 'text-amber-500',
  Boardroom: 'text-purple-500',
}

const status_map: Record<string, { variant: 'success' | 'warning' | 'info' | 'neutral' }> = {
  Approved: { variant: 'success' },
  Confirmed: { variant: 'success' },
  Pending: { variant: 'warning' },
  Cancelled: { variant: 'neutral' },
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function formatDayHeader(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

export function Schedule({ bookings }: ScheduleProps) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <SectionCard
      title="Schedule & Bookings"
      icon={CalendarCheck}
      cta={{ label: 'View Calendar', href: '#' }}
    >
      {/* date navigator */}
      <div className="flex items-center justify-center gap-4 mb-3">
        <button className="p-1 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Previous day">
          <ChevronLeft className="h-3.5 w-3.5 text-slate-400" />
        </button>
        <span className="text-[14px] font-medium text-slate-700">Today</span>
        <button className="p-1 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Next day">
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>

      {bookings.length === 0 ? (
        <p className="text-[14px] text-slate-400 text-center py-6">No bookings scheduled</p>
      ) : (
        <div className="space-y-0">
          {/* day divider */}
          <div className="flex items-center gap-3 py-2">
            <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
              ── {formatDayHeader(today)} ──
            </span>
          </div>

          {bookings.map((bk) => {
            const Icon = type_icons[bk.type] ?? BookOpen
            const iconColor = type_colors[bk.type] ?? 'text-slate-500'
            const badge = status_map[bk.status] ?? { variant: 'neutral' as const }

            return (
              <div
                key={bk.id}
                className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-lg px-2 transition-colors cursor-pointer"
              >
                {/* time block */}
                <div className="min-w-[60px] shrink-0">
                  <p className="text-[13px] font-medium text-slate-700">{formatTime(bk.startAt)}</p>
                  <p className="text-[11px] text-slate-400">– {formatTime(bk.endAt)}</p>
                </div>

                {/* icon */}
                <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
                </div>

                {/* details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-slate-800 truncate">{bk.title}</p>
                  <p className="text-[12px] text-slate-400">{bk.location}</p>
                </div>

                {/* status + arrow */}
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={badge.variant}>{bk.status}</Badge>
                  <span className="text-slate-300 text-lg">›</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </SectionCard>
  )
}
