'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, CheckCircle2, XCircle, MapPin, CalendarDays } from 'lucide-react'
import { approve_booking, reject_booking } from '@/lib/actions/library-head'

interface Booking {
  id: string
  userName?: string
  memberId?: string
  spaceName: string
  spaceType: string
  title?: string
  startAt: string
  endAt: string
  status: string
  createdAt: string
}

interface Props {
  bookings: Booking[]
}

const tabs = ['All', 'PENDING', 'APPROVED', 'Today'] as const

export function BookingsPageClient({ bookings }: Props) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('All')
  const [items, setItems] = useState(bookings)

  const today = new Date().toISOString().split('T')[0]

  const filtered = items.filter((b) => {
    switch (activeTab) {
      case 'PENDING': return b.status === 'PENDING'
      case 'APPROVED': return b.status === 'APPROVED'
      case 'Today': return b.startAt.startsWith(today)
      default: return true
    }
  })

  async function handleApprove(id: string) {
    await approve_booking(id)
    setItems((prev) => prev.map((b) => b.id === id ? { ...b, status: 'APPROVED' } : b))
  }

  async function handleReject(id: string) {
    await reject_booking(id)
    setItems((prev) => prev.map((b) => b.id === id ? { ...b, status: 'REJECTED' } : b))
  }

  const statusVariant = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'success' as const
      case 'PENDING': return 'warning' as const
      case 'REJECTED': case 'CANCELLED': return 'danger' as const
      default: return 'neutral' as const
    }
  }

  return (
    <div className="bg-[#F8F9FB] dark:bg-[#071224] min-h-screen">
      <div className="max-w-[1440px] mx-auto p-6 space-y-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Room Bookings</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{items.length} booking(s) total</p>
          </div>
        </div>

        <SectionCard title="Room Bookings" icon={Calendar}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => {
                const count = tab === 'All' ? items.length :
                  tab === 'Today' ? items.filter((b) => b.startAt.startsWith(today)).length :
                  items.filter((b) => b.status === tab).length
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`h-8 px-4 rounded-full text-[12px] font-bold transition flex items-center gap-1.5 ${
                      activeTab === tab
                        ? 'bg-[#0B1B3D] dark:bg-[#1747D6] text-white'
                        : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99] hover:bg-slate-200 dark:hover:bg-white/[0.1]'
                    }`}
                  >
                    {tab}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeTab === tab ? 'bg-white/20' : 'bg-slate-200 dark:bg-white/[0.08]'
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col gap-3">
              {filtered.map((booking) => (
                <div key={booking.id} className="border border-slate-100 dark:border-white/[0.06] rounded-xl p-4 hover:shadow-sm transition bg-white dark:bg-[#13285A]">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-[#0B1A3B] border border-slate-100 dark:border-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-slate-400 dark:text-[#6B7A99]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[14px] font-bold text-[#0B1B3D] dark:text-[#E2E8F0]">{booking.spaceName}</h3>
                        <span className="text-[10px] text-slate-400 dark:text-[#6B7A99]">({booking.spaceType})</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-[#6B7A99]">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(booking.startAt).toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-[#6B7A99]">
                          <Clock className="h-3 w-3" />
                          {new Date(booking.startAt).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })} – {new Date(booking.endAt).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {booking.userName && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-[#6B7A99]">
                            <User className="h-3 w-3" />
                            {booking.userName} {booking.memberId && <span className="font-mono text-[10px]">({booking.memberId})</span>}
                          </div>
                        )}
                      </div>
                      {booking.title && <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] mt-1 italic">{booking.title}</p>}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={statusVariant(booking.status)} dot>{booking.status}</Badge>
                      {booking.status === 'PENDING' && (
                        <div className="flex gap-1.5">
                          <button onClick={() => handleApprove(booking.id)} className="h-8 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition flex items-center gap-1 border border-emerald-100 dark:border-emerald-700/30">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                          </button>
                          <button onClick={() => handleReject(booking.id)} className="h-8 px-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[11px] font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition flex items-center gap-1 border border-red-100 dark:border-red-700/30">
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-12 text-center">
                  <Calendar className="h-10 w-10 text-slate-200 dark:text-white/10 mx-auto mb-2" />
                  <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] font-medium">No bookings match this filter</p>
                </div>
              )}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
