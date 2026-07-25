'use client'

import { CalendarCheck, Search } from 'lucide-react'
import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'

interface BookingItem {
  id: string
  userName: string
  spaceName: string
  startAt: string
  endAt: string
  status: string
  createdAt: string
}

const status_config: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pending', color: 'bg-amber-100 text-amber-600' },
  APPROVED: { label: 'Approved', color: 'bg-emerald-100 text-emerald-600' },
  REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-500' },
  CANCELLED: { label: 'Cancelled', color: 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99]' },
  NO_SHOW: { label: 'No Show', color: 'bg-orange-100 text-orange-500' },
}

function format_date(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

function format_time(d: string) {
  return new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}

export function BookingsClient({ bookings }: { bookings: BookingItem[] }) {
  const [search, set_search] = useState('')
  const [filter, set_filter] = useState('ALL')

  const filtered = bookings.filter((b) => {
    if (filter !== 'ALL' && b.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return b.userName.toLowerCase().includes(q) || b.spaceName.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <CalendarCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">All Bookings</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Manage all space bookings</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'].map((s) => (
            <button
              key={s}
              onClick={() => set_filter(s)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                filter === s
                  ? 'bg-[#5B9BD5] text-white'
                  : 'bg-white dark:bg-[#0E1F3F] text-slate-600 dark:text-[#6B7A99] border border-slate-200 dark:border-white/[0.08]'
              }`}
            >
              {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <SectionCard title="Bookings" icon={CalendarCheck}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by user or space..."
              value={search}
              onChange={(e) => set_search(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
            />
          </div>

          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No bookings found</p>
            ) : (
              filtered.map((b) => (
                <div key={b.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{b.spaceName}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">
                      {b.userName} · {format_date(b.startAt)} {format_time(b.startAt)} - {format_time(b.endAt)}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status_config[b.status]?.color ?? ''}`}>
                    {status_config[b.status]?.label ?? b.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
