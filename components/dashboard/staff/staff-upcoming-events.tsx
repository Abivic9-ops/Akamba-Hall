'use client'

import { CalendarDays } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface Event {
  id: string
  title: string
  date: string
  time: string
  venue: string
}

interface StaffUpcomingEventsProps {
  events: Event[]
}

function formatDay(iso: string): string {
  return new Date(iso).getDate().toString()
}

function formatMonth(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()
}

export function StaffUpcomingEvents({ events }: StaffUpcomingEventsProps) {
  return (
    <SectionCard
      title="Upcoming Events"
      icon={CalendarDays}
      cta={{ label: 'See all', href: '#' }}
    >
      {events.length === 0 ? (
        <p className="text-[14px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] text-center py-6">No upcoming events</p>
      ) : (
        <div className="space-y-0">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0"
            >
              <div className="w-[44px] h-[48px] rounded-lg bg-[#2563EB]/10 flex flex-col items-center justify-center shrink-0">
                <span className="text-[14px] font-bold text-[#2563EB] leading-none">{formatDay(event.date)}</span>
                <span className="text-[9px] font-semibold text-[#2563EB]/70 leading-none mt-0.5">{formatMonth(event.date)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{event.title}</p>
                <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{event.time} · {event.venue}</p>
              </div>
              <button className="h-7 px-3 rounded-full border border-[#2563EB]/20 text-[12px] font-medium text-[#2563EB] bg-[#2563EB]/5 hover:bg-[#2563EB]/10 transition-colors shrink-0">
                Join
              </button>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}
