'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, CheckCircle2, XCircle, MapPin, CalendarDays } from 'lucide-react'

interface Booking {
  id: string
  roomName: string
  roomType: string
  date: string
  timeSlot: string
  memberName: string
  memberId: string
  purpose: string
  status: 'Approved' | 'Pending' | 'Rejected'
  capacity: number
}

const mock_bookings: Booking[] = [
  { id: 'bk1', roomName: 'AVR', roomType: 'Audio Visual Room', date: new Date().toISOString().split('T')[0], timeSlot: '09:00 AM – 11:00 AM', memberName: 'James Ochieng', memberId: 'STU-24011076', purpose: 'STEM Workshop Presentation', status: 'Approved', capacity: 40 },
  { id: 'bk2', roomName: 'Boardroom A', roomType: 'Meeting Room', date: new Date().toISOString().split('T')[0], timeSlot: '02:00 PM – 04:00 PM', memberName: 'Sarah Njeri', memberId: 'STF-047', purpose: 'Library Committee Meeting', status: 'Approved', capacity: 12 },
  { id: 'bk3', roomName: 'Study Room 1', roomType: 'Study Room', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], timeSlot: '10:00 AM – 12:00 PM', memberName: 'David Mutua', memberId: 'STU-24011102', purpose: 'Group Study Session', status: 'Pending', capacity: 6 },
  { id: 'bk4', roomName: 'Reading Hall', roomType: 'Hall', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], timeSlot: '03:00 PM – 05:00 PM', memberName: 'Grace Wambui', memberId: 'STU-24011115', purpose: 'Book Club Meeting', status: 'Pending', capacity: 30 },
  { id: 'bk5', roomName: 'Study Room 2', roomType: 'Study Room', date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], timeSlot: '09:00 AM – 11:00 AM', memberName: 'Brian Kipchoge', memberId: 'STU-24011128', purpose: 'Research Discussion', status: 'Pending', capacity: 6 },
  { id: 'bk6', roomName: 'AVR', roomType: 'Audio Visual Room', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], timeSlot: '01:00 PM – 03:00 PM', memberName: 'Alice Akinyi', memberId: 'STU-24011134', purpose: 'Film Screening', status: 'Rejected', capacity: 40 },
]

const tabs = ['All', 'Pending', 'Approved', 'Today'] as const

export function BookingsPageClient() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('All')
  const [bookings, setBookings] = useState(mock_bookings)

  const today = new Date().toISOString().split('T')[0]

  const filtered = bookings.filter((b) => {
    switch (activeTab) {
      case 'Pending': return b.status === 'Pending'
      case 'Approved': return b.status === 'Approved'
      case 'Today': return b.date === today
      default: return true
    }
  })

  function handleApprove(id: string) {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'Approved' as const } : b))
  }

  function handleReject(id: string) {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'Rejected' as const } : b))
  }

  const statusVariant = (status: Booking['status']) => {
    switch (status) {
      case 'Approved': return 'success' as const
      case 'Pending': return 'warning' as const
      case 'Rejected': return 'danger' as const
    }
  }

  return (
    <div className="bg-[#F8F9FB] min-h-screen">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] tracking-tight">Room Bookings</h1>
            <p className="text-[12px] text-slate-500">Manage room and space reservations</p>
          </div>
        </div>

        <SectionCard title="Room Bookings" icon={Calendar}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const count = tab === 'All' ? bookings.length :
                  tab === 'Today' ? bookings.filter((b) => b.date === today).length :
                  bookings.filter((b) => b.status === tab).length
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`h-8 px-4 rounded-full text-[12px] font-bold transition flex items-center gap-1.5 ${
                      activeTab === tab
                        ? 'bg-[#0B1B3D] text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeTab === tab ? 'bg-white/20' : 'bg-slate-200'
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col gap-3">
              {filtered.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-slate-100 rounded-xl p-4 hover:shadow-sm transition bg-white"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-slate-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[14px] font-bold text-[#0B1B3D]">{booking.roomName}</h3>
                        <span className="text-[10px] text-slate-400">({booking.roomType})</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(booking.date).toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Clock className="h-3 w-3" />
                          {booking.timeSlot}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <User className="h-3 w-3" />
                          {booking.memberName} <span className="font-mono text-[10px]">({booking.memberId})</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 italic">{booking.purpose}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={statusVariant(booking.status)} dot>{booking.status}</Badge>
                      {booking.status === 'Pending' && (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleApprove(booking.id)}
                            className="h-8 px-3 rounded-lg bg-emerald-50 text-emerald-600 text-[11px] font-bold hover:bg-emerald-100 transition flex items-center gap-1 border border-emerald-100"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(booking.id)}
                            className="h-8 px-3 rounded-lg bg-red-50 text-red-600 text-[11px] font-bold hover:bg-red-100 transition flex items-center gap-1 border border-red-100"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-12 text-center">
                  <Calendar className="h-10 w-10 text-slate-200 mx-auto mb-2" />
                  <p className="text-[13px] text-slate-400 font-medium">No bookings match this filter</p>
                </div>
              )}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
