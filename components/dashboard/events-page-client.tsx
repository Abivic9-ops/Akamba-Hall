'use client'

import { useState } from 'react'
import {
  Megaphone, CalendarDays, Globe, Bell, BookHeart,
  Clock, MapPin, Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Event {
  id: string
  type: 'workshop' | 'deadline' | 'campaign' | 'announcement' | 'event'
  title: string
  description: string
  date: string
  time: string
  venue: string
  attendees: number | null
  isUpcoming: boolean
}

const mockEvents: Event[] = [
  {
    id: 'evt-1',
    type: 'workshop',
    title: 'AI Literacy Workshop',
    description: 'Learn how to use AI tools for academic research, essay writing, and data analysis. Hands-on session with practical exercises.',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    time: '2:00 PM – 4:00 PM',
    venue: 'Audio Visual Room',
    attendees: 24,
    isUpcoming: true,
  },
  {
    id: 'evt-2',
    type: 'event',
    title: 'Book Club: African Literature',
    description: 'Monthly book club meeting discussing contemporary African fiction. This month\'s pick: "A Grain of Wheat" by Ngũgĩ wa Thiong\'o.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    time: '3:30 PM – 5:00 PM',
    venue: 'Reading Hall',
    attendees: 12,
    isUpcoming: true,
  },
  {
    id: 'evt-3',
    type: 'campaign',
    title: 'Read 10 Challenge',
    description: 'Complete 10 books this term and earn the Gold Reader badge. Track your progress and compete with classmates.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    time: 'All Term',
    venue: 'Online',
    attendees: 89,
    isUpcoming: true,
  },
  {
    id: 'evt-4',
    type: 'deadline',
    title: 'End-of-Term Book Returns',
    description: 'All borrowed books must be returned by 28 June 2026. Late returns will incur a KES 50/day fine.',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    time: 'Before 6:00 PM',
    venue: 'Main Desk',
    attendees: null,
    isUpcoming: true,
  },
  {
    id: 'evt-5',
    type: 'announcement',
    title: 'JSTOR Access Now Available',
    description: 'Full access to JSTOR academic journals is now available for all registered students. Use your school email to log in.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    time: 'N/A',
    venue: 'Online',
    attendees: null,
    isUpcoming: false,
  },
]

const type_config = {
  workshop: { icon: Globe, color: 'text-[#2563EB]', bg: 'bg-blue-50', label: 'Workshop' },
  deadline: { icon: Bell, color: 'text-red-500', bg: 'bg-red-50', label: 'Deadline' },
  campaign: { icon: BookHeart, color: 'text-[#5B9BD5]', bg: 'bg-[#5B9BD5]/10', label: 'Campaign' },
  announcement: { icon: Megaphone, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Announcement' },
  event: { icon: CalendarDays, color: 'text-[#0D9488]', bg: 'bg-teal-50', label: 'Event' },
}

function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

export function EventsPageClient() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')

  const filtered = mockEvents.filter((e) => {
    if (filter === 'upcoming') return e.isUpcoming
    if (filter === 'past') return !e.isUpcoming
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
          {filtered.map((evt) => {
            const cfg = type_config[evt.type]
            const Icon = cfg.icon
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
                      <Badge variant={evt.isUpcoming ? 'info' : 'neutral'}>
                        {cfg.label}
                      </Badge>
                      {!evt.isUpcoming && <Badge variant="neutral">Past</Badge>}
                    </div>

                    <p className="text-[14px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1.5 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                        <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{formatDay(evt.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                        <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                        <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{evt.venue}</span>
                      </div>
                      {evt.attendees !== null && (
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                          <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{evt.attendees} attending</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {evt.isUpcoming && (
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
