'use client'

import { CalendarCheck, MapPin, Clock, ArrowRight } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string | null
  venue: string | null
  startTime: string
  endTime: string
  category: string
}

const category_colors: Record<string, string> = {
  club: 'bg-blue-50 text-blue-600',
  event: 'bg-emerald-50 text-emerald-600',
  workshop: 'bg-[#5B9BD5]/10 text-[#5B9BD5]',
  notice: 'bg-amber-50 text-amber-600',
  general: 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#94A3B8]',
  fair: 'bg-emerald-50 text-emerald-600',
  meeting: 'bg-blue-50 text-blue-600',
  training: 'bg-[#5B9BD5]/10 text-[#5B9BD5]',
}

export function EventsClient({ events }: { events: Event[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Events</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Upcoming library events and activities</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((e) => (
          <div key={e.id} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[14px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{e.title}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${category_colors[e.category] ?? 'bg-slate-100 text-slate-600'}`}>{e.category.charAt(0).toUpperCase() + e.category.slice(1)}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">
                <CalendarCheck className="h-3.5 w-3.5" /> {new Date(e.startTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2 text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">
                <Clock className="h-3.5 w-3.5" /> {new Date(e.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="flex items-center gap-2 text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">
                <MapPin className="h-3.5 w-3.5" /> {e.venue ?? 'TBA'}
              </div>
            </div>
            <button className="mt-3 h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 inline-flex items-center gap-1.5 transition-all duration-200">
              Details <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
