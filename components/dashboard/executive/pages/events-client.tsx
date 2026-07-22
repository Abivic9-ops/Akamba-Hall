'use client'

import { CalendarCheck, MapPin, Clock, ArrowRight } from 'lucide-react'

const events = [
  { title: 'Debate Club: Library Edition', date: '23 Jun 2026', time: '4:00 PM', venue: 'Reading Hall', category: 'Club', status: 'Upcoming' },
  { title: 'Author Meet & Greet', date: '25 Jun 2026', time: '3:30 PM', venue: 'AV Room', category: 'Event', status: 'Upcoming' },
  { title: 'Research Skills Workshop', date: '27 Jun 2026', time: '2:00 PM', venue: 'Computer Lab', category: 'Workshop', status: 'Upcoming' },
  { title: 'Book Fair Opening', date: '30 Jun 2026', time: '10:00 AM', venue: 'Library Foyer', category: 'Event', status: 'Upcoming' },
  { title: 'AI Literacy Week', date: '1–5 Jul 2026', time: 'All Day', venue: 'Computer Lab', category: 'Workshop', status: 'Upcoming' },
  { title: 'End of Term Library Clearance', date: '10 Jul 2026', time: '8:00 AM', venue: 'Main Hall', category: 'Notice', status: 'Upcoming' },
]

const category_colors: Record<string, string> = {
  Club: 'bg-blue-50 text-blue-600',
  Event: 'bg-emerald-50 text-emerald-600',
  Workshop: 'bg-purple-50 text-purple-600',
  Notice: 'bg-amber-50 text-amber-600',
}

export function EventsClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900">Events</h1>
        <p className="text-[15px] text-slate-500 mt-1">Upcoming library events and activities</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((e, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[14px] font-semibold text-slate-800">{e.title}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${category_colors[e.category]}`}>{e.category}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <CalendarCheck className="h-3.5 w-3.5" /> {e.date}
              </div>
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <Clock className="h-3.5 w-3.5" /> {e.time}
              </div>
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <MapPin className="h-3.5 w-3.5" /> {e.venue}
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
