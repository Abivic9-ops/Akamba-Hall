'use client'

import { useState } from 'react'
import {
  Megaphone, CalendarDays, Globe, Bell, BookHeart,
  Clock, MapPin, Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface EventItem {
  id: string
  title: string
  description: string | null
  venue: string | null
  startTime: string
  endTime: string
  category: string
  maxAttendees: number | null
}

const type_config: Record<string, { icon: typeof Globe; color: string; bg: string; label: string }> = {
  workshop: { icon: Globe, color: 'text-[#2563EB]', bg: 'bg-blue-50', label: 'Workshop' },
  deadline: { icon: Bell, color: 'text-red-500', bg: 'bg-red-50', label: 'Deadline' },
  campaign: { icon: BookHeart, color: 'text-[#5B9BD5]', bg: 'bg-[#5B9BD5]/10', label: 'Campaign' },
  announcement: { icon: Megaphone, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Announcement' },
  event: { icon: CalendarDays, color: 'text-[#0D9488]', bg: 'bg-teal-50', label: 'Event' },
  general: { icon: CalendarDays, color: 'text-slate-500', bg: 'bg-slate-50', label: 'General' },
  fair: { icon: Globe, color: 'text-[#5B9BD5]', bg: 'bg-blue-50', label: 'Fair' },
  meeting: { icon: Users, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Meeting' },
  club: { icon: BookHeart, color: 'text-[#0D9488]', bg: 'bg-teal-50', label: 'Club' },
  training: { icon: Globe, color: 'text-[#2563EB]', bg: 'bg-blue-50', label: 'Training' },
}

function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

function formatTimeRange(start: string, end: string): string {
  const s = new Date(start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  const e = new Date(end).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  return `${s} – ${e}`
}

export function EventsPageClient({ events }: { events: EventItem[] }) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')

  const filtered = events.filter((e) => {
    const isUpcoming = new Date(e.startTime) >= new Date()
    if (filter === 'upcoming') return isUpcoming
    if (filter === 'past') return !isUpcoming
    return true
  })

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">

        {/* header */}
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Events & Announcements</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">
            Stay updated with library events, workshops, deadlines, and community campaigns.
          </p>
        </div>

        {/* filter tabs */}
        <div className="flex gap-4 border-b border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]">
          {(['all', 'upcoming', 'past'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`pb-3 text-[14px] font-normal capitalize transition-all border-b-2 ${
                filter === tab
                  ? 'border-[#2563EB] text-[#2563EB] font-medium'
                  : 'border-transparent text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] hover:text-slate-600 dark:hover:text-slate-300 dark:text-[#94A3B8] dark:hover:text-slate-300 dark:text-[#94A3B8]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* events list */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08]">
              <CalendarDays className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-[16px] text-slate-500 dark:text-[#6B7A99]">No {filter === 'all' ? '' : filter} events</p>
            </div>
          )}
          {filtered.map((evt) => {
            const cfg = type_config[evt.category] ?? type_config.general
            const Icon = cfg.icon
            const isUpcoming = new Date(evt.startTime) >= new Date()
            return (
              <div
                key={evt.id}
                className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] p-5 hover:shadow-sm dark:shadow-none dark:shadow-none transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                    <Icon className={`h-6 w-6 ${cfg.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[16px] font-medium text-slate-800 dark:text-[#E2E8F0]">{evt.title}</p>
                      <Badge variant={isUpcoming ? 'info' : 'neutral'}>
                        {cfg.label}
                      </Badge>
                      {!isUpcoming && <Badge variant="neutral">Past</Badge>}
                    </div>

                    {evt.description && (
                      <p className="text-[14px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1.5 leading-relaxed">
                        {evt.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                        <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{formatDay(evt.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                        <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{formatTimeRange(evt.startTime, evt.endTime)}</span>
                      </div>
                      {evt.venue && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                          <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{evt.venue}</span>
                        </div>
                      )}
                      {evt.maxAttendees !== null && (
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                          <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{evt.maxAttendees} max</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {isUpcoming && (
                    <button className="h-9 px-5 rounded-lg bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors shrink-0">
                      Register
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
