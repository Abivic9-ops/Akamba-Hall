'use client'

import { CalendarDays, MapPin, Users } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'

interface Event {
  id: string
  title: string
  description?: string | null
  venue?: string | null
  startTime: string
  endTime: string
  category: string
  maxAttendees?: number | null
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

const categoryColors: Record<string, 'success' | 'warning' | 'info' | 'danger' | 'neutral'> = {
  workshop: 'info',
  seminar: 'success',
  exhibition: 'warning',
  social: 'neutral',
  academic: 'info',
  other: 'neutral',
}

export function EventsList({ events }: { events: Event[] }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-[28px] font-medium text-[#0B1B3D] dark:text-[#E2E8F0]">Events</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">
            Upcoming library events, workshops, and activities.
          </p>
        </div>

        <SectionCard title="All Events" icon={CalendarDays}>
          {events.length === 0 ? (
            <EmptyState icon={CalendarDays} message="No events scheduled yet. Check back later!" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => {
                const variant = categoryColors[event.category] ?? 'neutral'
                return (
                  <div
                    key={event.id}
                    className="rounded-xl border border-slate-100 dark:border-white/[0.08] p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-[15px] font-medium text-[#0B1B3D] dark:text-[#E2E8F0]">{event.title}</h3>
                      <Badge variant={variant} className="text-[10px] shrink-0">{event.category}</Badge>
                    </div>
                    {event.description && (
                      <p className="text-[14px] text-slate-600 dark:text-[#94A3B8] line-clamp-2 mb-3">{event.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 text-[12px] text-slate-500 dark:text-[#6B7A99]">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(event.startTime)} — {formatDate(event.endTime)}
                      </span>
                      {event.venue && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {event.venue}
                        </span>
                      )}
                      {event.maxAttendees && (
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          Max {event.maxAttendees}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-[12px] text-slate-400 dark:text-[#6B7A99]">
                      {formatTime(event.startTime)} — {formatTime(event.endTime)}
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
