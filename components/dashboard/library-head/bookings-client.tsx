'use client'

import { useState, useTransition } from 'react'
import { CalendarCheck, CheckCircle2, XCircle, Clock, Ban, AlertTriangle, Search, Filter } from 'lucide-react'
import { approve_booking, reject_booking, cancel_booking } from '@/lib/actions/library-head'

interface BookingWithUser {
  id: string
  userId: string
  spaceId: string
  startAt: Date
  endAt: Date
  status: string
  createdAt: Date
  user: { id: string; fullName: string | null; studentId: string | null; role: string } | null
  space: { id: string; name: string; capacity: number } | null
}

const status_config: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  PENDING: { label: 'Pending', color: 'bg-amber-50 text-amber-600', icon: Clock },
  APPROVED: { label: 'Approved', color: 'bg-emerald-50 text-emerald-600', icon: CheckCircle2 },
  REJECTED: { label: 'Rejected', color: 'bg-red-50 text-red-500', icon: XCircle },
  CANCELLED: { label: 'Cancelled', color: 'bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]', icon: Ban },
  NO_SHOW: { label: 'No Show', color: 'bg-orange-50 text-orange-500', icon: AlertTriangle },
}

function format_date(d: Date | string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

function format_time(d: Date | string) {
  return new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}

export function BookingsClient({ bookings }: { bookings: BookingWithUser[] }) {
  const [filter, set_filter] = useState<string>('ALL')
  const [search, set_search] = useState('')
  const [isPending, startTransition] = useTransition()
  const [optimistic, set_optimistic] = useState<Record<string, string>>({})

  const filtered = bookings.filter(b => {
    const status = optimistic[b.id] ?? b.status
    if (filter !== 'ALL' && status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      const name = b.user?.fullName?.toLowerCase() ?? ''
      const space = b.space?.name?.toLowerCase() ?? ''
      if (!name.includes(q) && !space.includes(q)) return false
    }
    return true
  })

  const counts = {
    ALL: bookings.length,
    PENDING: bookings.filter(b => (optimistic[b.id] ?? b.status) === 'PENDING').length,
    APPROVED: bookings.filter(b => (optimistic[b.id] ?? b.status) === 'APPROVED').length,
    REJECTED: bookings.filter(b => (optimistic[b.id] ?? b.status) === 'REJECTED').length,
    CANCELLED: bookings.filter(b => (optimistic[b.id] ?? b.status) === 'CANCELLED').length,
  }

  function handle_action(action: typeof approve_booking, bookingId: string, newStatus: string) {
    set_optimistic(prev => ({ ...prev, [bookingId]: newStatus }))
    startTransition(async () => {
      const result = await action(bookingId)
      if (!result.success) {
        set_optimistic(prev => {
          const next = { ...prev }
          delete next[bookingId]
          return next
        })
        alert(result.error)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Bookings</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Manage space bookings across the library</p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'] as const).map(s => {
          const cfg = status_config[s]
          const Icon = cfg?.icon ?? CalendarCheck
          const isActive = filter === s
          return (
            <button
              key={s}
              onClick={() => set_filter(s)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'border-[#0B1A3B] bg-[#0B1A3B]/5 shadow-sm dark:shadow-none dark:shadow-none'
                  : 'border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] hover:border-slate-200 dark:border-white/10 dark:border-white/10'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-[#0B1A3B] dark:text-white' : 'text-slate-400 dark:text-[#6B7A99]'}`} />
              <div className="text-left">
                <p className="text-[18px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">{counts[s]}</p>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{s === 'ALL' ? 'Total' : cfg?.label}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by member or space..."
          value={search}
          onChange={e => set_search(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-white/10 dark:border-white/10 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] text-[13px] text-slate-700 dark:text-[#E2E8F0] placeholder:text-slate-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]/20 outline-none transition-colors"
        />
      </div>

      {/* table */}
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]">
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Member</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Space</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Date & Time</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">No bookings found</td>
                </tr>
              ) : (
                filtered.map(b => {
                  const currentStatus = optimistic[b.id] ?? b.status
                  const cfg = status_config[currentStatus] ?? status_config.PENDING
                  const Icon = cfg.icon
                  const isPendingBooking = currentStatus === 'PENDING'

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0]">{b.user?.fullName ?? 'Unknown'}</p>
                        <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{b.user?.studentId ?? '—'}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-[13px] text-slate-700 dark:text-[#E2E8F0]">{b.space?.name ?? 'Unknown'}</p>
                        <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">Cap: {b.space?.capacity ?? '—'}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-[13px] text-slate-700 dark:text-[#E2E8F0]">{format_date(b.startAt)}</p>
                        <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{format_time(b.startAt)} – {format_time(b.endAt)}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.color}`}>
                          <Icon className="h-3 w-3" />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {isPendingBooking && (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handle_action(approve_booking, b.id, 'APPROVED')}
                              disabled={isPending}
                              className="h-7 px-3 rounded-lg bg-emerald-500 text-white text-[11px] font-semibold hover:bg-emerald-600 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handle_action(reject_booking, b.id, 'REJECTED')}
                              disabled={isPending}
                              className="h-7 px-3 rounded-lg border border-slate-200 dark:border-white/10 dark:border-white/10 text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] text-[11px] font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {currentStatus === 'APPROVED' && (
                          <button
                            onClick={() => handle_action(cancel_booking, b.id, 'CANCELLED')}
                            disabled={isPending}
                            className="h-7 px-3 rounded-lg border border-slate-200 dark:border-white/10 dark:border-white/10 text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] text-[11px] font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
