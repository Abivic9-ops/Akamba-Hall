'use client'

import { useState } from 'react'
import {
  CalendarCheck, BookOpen, Video, Users, Plus,
  ChevronRight, Clock, MapPin,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Booking {
  id: string
  type: string
  title: string
  location: string
  startAt: string
  endAt: string
  status: string
}

const type_config: Record<string, { icon: typeof BookOpen; color: string; bg: string }> = {
  READING_HALL: { icon: BookOpen, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  AVR: { icon: Video, color: 'text-amber-500', bg: 'bg-amber-50' },
  BOARDROOM: { icon: Users, color: 'text-[#5B9BD5]', bg: 'bg-[#5B9BD5]/10' },
  STUDY_ROOM: { icon: BookOpen, color: 'text-[#0D9488]', bg: 'bg-teal-50' },
  COMPUTER_LAB: { icon: Video, color: 'text-[#8B5CF6]', bg: 'bg-purple-50' },
  INNOVATION_CORNER: { icon: Users, color: 'text-[#F97316]', bg: 'bg-orange-50' },
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
}

export function BookingsPageClient({ bookings }: { bookings: Booking[] }) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  const upcomingBookings = bookings.filter((b) => new Date(b.startAt) >= new Date())
  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : bookings

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">

        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Bookings</h1>
            <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">
              Reserve reading seats, the Audio Visual Room, or the boardroom for study sessions.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors shrink-0">
            <Plus className="h-4 w-4" />
            New Booking
          </button>
        </div>

        {/* quick book cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(type_config).map(([type, cfg]) => {
            const Icon = cfg.icon
            const count = bookings.filter((b) => b.type === type).length
            return (
              <button
                key={type}
                className="flex items-center gap-4 p-5 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] hover:shadow-md transition-all text-left group"
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                  <Icon className={`h-6 w-6 ${cfg.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium text-slate-800 dark:text-[#E2E8F0]">{type.replace(/_/g, ' ')}</p>
                  <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">
                    {count === 0 ? 'No bookings' : `${count} upcoming`}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] transition-colors" />
              </button>
            )
          })}
        </div>

        {/* tabs */}
        <div className="flex gap-4 border-b border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]">
          {(['upcoming', 'past'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[14px] font-normal capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-[#2563EB] text-[#2563EB] font-medium'
                  : 'border-transparent text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] hover:text-slate-600 dark:hover:text-slate-300 dark:text-[#94A3B8] dark:hover:text-slate-300 dark:text-[#94A3B8]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* bookings list */}
        <div className="space-y-3">
          {displayBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]">
              <CalendarCheck className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-[16px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">No {activeTab} bookings</p>
              <p className="text-[14px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Create a new booking to get started</p>
            </div>
          ) : (
            displayBookings.map((bk) => {
              const cfg = type_config[bk.type] ?? type_config.READING_HALL
              const Icon = cfg.icon
              return (
                <div
                  key={bk.id}
                  className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] p-5 hover:shadow-sm dark:shadow-none dark:shadow-none transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                      <Icon className={`h-6 w-6 ${cfg.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[16px] font-medium text-slate-800 dark:text-[#E2E8F0]">{bk.title}</p>
                        <Badge
                          variant={bk.status === 'APPROVED' ? 'success' : bk.status === 'PENDING' ? 'warning' : 'neutral'}
                        >
                          {bk.status.charAt(0) + bk.status.slice(1).toLowerCase()}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                          <span className="text-[14px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">
                            {formatTime(bk.startAt)} – {formatTime(bk.endAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                          <span className="text-[14px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{bk.location}</span>
                        </div>
                      </div>

                      <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1.5">
                        {formatDay(bk.startAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button className="h-8 px-4 rounded-lg border border-slate-200 dark:border-white/10 dark:border-white/10 text-[13px] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] hover:bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] dark:bg-white/[0.06] transition-colors">
                        Edit
                      </button>
                      <button className="h-8 px-4 rounded-lg text-[13px] text-red-500 hover:bg-red-50 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}
