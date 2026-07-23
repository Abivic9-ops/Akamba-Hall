'use client'

import { useState } from 'react'
import {
  CalendarCheck, BookOpen, Video, Users, Plus,
  ChevronRight, Clock, MapPin,
} from 'lucide-react'
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

const mockBookings: Booking[] = [
  {
    id: 'bk-1',
    type: 'Reading Seat',
    title: 'Morning Study Session',
    location: 'Reading Hall — Seat 14',
    startAt: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    endAt: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
    status: 'Approved',
  },
  {
    id: 'bk-2',
    type: 'AVR',
    title: 'AVR Session — Research Presentation',
    location: 'Audio Visual Room',
    startAt: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    endAt: new Date(new Date().setHours(15, 30, 0, 0)).toISOString(),
    status: 'Pending',
  },
  {
    id: 'bk-3',
    type: 'Boardroom',
    title: 'Study Group — Physics Review',
    location: 'Boardroom B',
    startAt: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(),
    endAt: new Date(new Date().setHours(17, 0, 0, 0)).toISOString(),
    status: 'Approved',
  },
]

const type_config = {
  'Reading Seat': { icon: BookOpen, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  AVR: { icon: Video, color: 'text-amber-500', bg: 'bg-amber-50' },
  Boardroom: { icon: Users, color: 'text-[#5B9BD5]', bg: 'bg-[#5B9BD5]/10' },
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
}

export function BookingsPageClient() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  const upcomingBookings = mockBookings.filter((b) => new Date(b.startAt) >= new Date())
  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : mockBookings

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">

        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-medium text-slate-900">Bookings</h1>
            <p className="text-[15px] text-slate-500 mt-1">
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
            const count = mockBookings.filter((b) => b.type === type).length
            return (
              <button
                key={type}
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all text-left group"
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                  <Icon className={`h-6 w-6 ${cfg.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium text-slate-800">{type}</p>
                  <p className="text-[13px] text-slate-400 mt-0.5">
                    {count === 0 ? 'No bookings' : `${count} upcoming`}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </button>
            )
          })}
        </div>

        {/* tabs */}
        <div className="flex gap-4 border-b border-slate-100">
          {(['upcoming', 'past'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[14px] font-normal capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-[#2563EB] text-[#2563EB] font-medium'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* bookings list */}
        <div className="space-y-3">
          {displayBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl border border-slate-100">
              <CalendarCheck className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-[16px] text-slate-500">No {activeTab} bookings</p>
              <p className="text-[14px] text-slate-400 mt-1">Create a new booking to get started</p>
            </div>
          ) : (
            displayBookings.map((bk) => {
              const cfg = type_config[bk.type]
              const Icon = cfg.icon
              return (
                <div
                  key={bk.id}
                  className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                      <Icon className={`h-6 w-6 ${cfg.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[16px] font-medium text-slate-800">{bk.title}</p>
                        <Badge
                          variant={bk.status === 'Approved' ? 'success' : bk.status === 'Pending' ? 'warning' : 'neutral'}
                        >
                          {bk.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-[14px] text-slate-500">
                            {formatTime(bk.startAt)} – {formatTime(bk.endAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-[14px] text-slate-500">{bk.location}</span>
                        </div>
                      </div>

                      <p className="text-[13px] text-slate-400 mt-1.5">
                        {formatDay(bk.startAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button className="h-8 px-4 rounded-lg border border-slate-200 text-[13px] text-slate-600 hover:bg-slate-100 transition-colors">
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
