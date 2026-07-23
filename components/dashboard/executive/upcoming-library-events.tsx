'use client'

import { CalendarDays, MapPin, Clock, ArrowRight } from 'lucide-react'

interface Event {
  id: string
  day: number
  month: string
  title: string
  time: string
  venue: string
}

export function UpcomingLibraryEvents({ events }: { events: Event[] }) {
  return (
    <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Upcoming Library Events</h3>
          <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">Scheduled activities</p>
        </div>
        <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 hover:text-blue-700 inline-flex items-center gap-1.5 transition-all duration-200">
          View calendar <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] dark:bg-white/[0.04] dark:hover:bg-white dark:bg-[#0E1F3F]/[0.04] dark:bg-white/[0.04] transition-colors">
            <div className="h-12 w-12 rounded-lg bg-[#1A2D5A] flex flex-col items-center justify-center shrink-0">
              <span className="text-[16px] font-bold text-white leading-none">{event.day}</span>
              <span className="text-[9px] font-semibold text-white/70 uppercase tracking-wider">{event.month}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-700 dark:text-[#E2E8F0]">{event.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">
                  <Clock className="h-3 w-3" /> {event.time}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">
                  <MapPin className="h-3 w-3" /> {event.venue}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
