'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Bookmark, User, CalendarDays, Hash, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react'

interface Reservation {
  id: string
  bookTitle: string
  bookAuthor: string
  requesterName: string
  memberId: string
  requestDate: string
  status: 'Pending' | 'Ready' | 'Fulfilled' | 'Expired'
  queuePosition: number
  totalInQueue: number
  notifyDate: string | null
}

const mock_reservations: Reservation[] = [
  { id: 'rv1', bookTitle: 'Curriculum Design for Secondary Science', bookAuthor: 'Njeru & Kibua', requesterName: 'James Ochieng', memberId: 'STU-24011076', requestDate: new Date(Date.now() - 5 * 86400000).toISOString(), status: 'Ready', queuePosition: 1, totalInQueue: 3, notifyDate: new Date().toISOString() },
  { id: 'rv2', bookTitle: 'Data Structures and Algorithms', bookAuthor: 'Thomas Cormen', requesterName: 'Peter Kamau', memberId: 'STU-24011089', requestDate: new Date(Date.now() - 3 * 86400000).toISOString(), status: 'Pending', queuePosition: 1, totalInQueue: 2, notifyDate: null },
  { id: 'rv3', bookTitle: 'Physics Laboratory Manual', bookAuthor: 'Kenya Institute', requesterName: 'David Mutua', memberId: 'STU-24011102', requestDate: new Date(Date.now() - 7 * 86400000).toISOString(), status: 'Pending', queuePosition: 2, totalInQueue: 4, notifyDate: null },
  { id: 'rv4', bookTitle: 'Business Studies Form 4', bookAuthor: 'KLB', requesterName: 'Grace Wambui', memberId: 'STU-24011115', requestDate: new Date(Date.now() - 10 * 86400000).toISOString(), status: 'Expired', queuePosition: 1, totalInQueue: 1, notifyDate: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: 'rv5', bookTitle: 'English Grammar and Composition', bookAuthor: 'Longhorn', requesterName: 'Brian Kipchoge', memberId: 'STU-24011128', requestDate: new Date(Date.now() - 1 * 86400000).toISOString(), status: 'Pending', queuePosition: 3, totalInQueue: 5, notifyDate: null },
  { id: 'rv6', bookTitle: 'Advanced Physics: Principles and Applications', bookAuthor: 'Ababu J. Zeleke', requesterName: 'Alice Akinyi', memberId: 'STU-24011134', requestDate: new Date(Date.now() - 14 * 86400000).toISOString(), status: 'Fulfilled', queuePosition: 1, totalInQueue: 1, notifyDate: null },
]

const tabs = ['All', 'Pending', 'Ready', 'Fulfilled', 'Expired'] as const

export function ReservationsPageClient() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('All')
  const [reservations, setReservations] = useState(mock_reservations)

  const filtered = reservations.filter((r) => {
    if (activeTab === 'All') return true
    return r.status === activeTab
  })

  function handleMarkReady(id: string) {
    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: 'Ready' as const, notifyDate: new Date().toISOString() } : r))
  }

  function handleFulfill(id: string) {
    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: 'Fulfilled' as const } : r))
  }

  function handleCancel(id: string) {
    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: 'Expired' as const } : r))
  }

  const statusVariant = (status: Reservation['status']) => {
    switch (status) {
      case 'Ready': return 'success' as const
      case 'Pending': return 'warning' as const
      case 'Fulfilled': return 'info' as const
      case 'Expired': return 'danger' as const
    }
  }

  return (
    <div className="bg-[#F8F9FB] min-h-screen">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <Bookmark className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] tracking-tight">Book Reservations</h1>
            <p className="text-[12px] text-slate-500">Manage member book holds and reservations</p>
          </div>
        </div>

        <SectionCard title="Reservations Queue" icon={Bookmark}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => {
                const count = tab === 'All' ? reservations.length : reservations.filter((r) => r.status === tab).length
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
              {filtered.map((reservation) => (
                <div
                  key={reservation.id}
                  className="border border-slate-100 rounded-xl p-4 hover:shadow-sm transition bg-white"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="h-14 w-10 bg-slate-900 rounded shadow-sm flex-shrink-0 flex items-center justify-center border border-slate-200 relative overflow-hidden">
                      <div className="text-[4px] text-white/50 px-1 text-center font-serif leading-tight">
                        {reservation.bookTitle.split(' ').slice(0, 2).join(' ').toUpperCase()}
                      </div>
                      <div className={`absolute inset-0 ${
                        reservation.status === 'Ready' ? 'bg-emerald-600/20' :
                        reservation.status === 'Pending' ? 'bg-amber-600/20' :
                        reservation.status === 'Fulfilled' ? 'bg-blue-600/20' :
                        'bg-red-600/20'
                      }`}></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[14px] font-bold text-[#0B1B3D] truncate">{reservation.bookTitle}</h3>
                      </div>
                      <p className="text-[11px] text-slate-500">{reservation.bookAuthor}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <User className="h-3 w-3" />
                          {reservation.requesterName} <span className="font-mono text-[10px]">({reservation.memberId})</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <CalendarDays className="h-3 w-3" />
                          Requested {new Date(reservation.requestDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Hash className="h-3 w-3" />
                          Queue: {reservation.queuePosition} of {reservation.totalInQueue}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Badge variant={statusVariant(reservation.status)} dot>{reservation.status}</Badge>
                      <div className="flex gap-1.5">
                        {reservation.status === 'Pending' && reservation.queuePosition === 1 && (
                          <>
                            <button
                              onClick={() => handleMarkReady(reservation.id)}
                              className="h-7 px-2.5 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold hover:bg-emerald-100 transition flex items-center gap-1 border border-emerald-100"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              Mark Ready
                            </button>
                            <button
                              onClick={() => handleCancel(reservation.id)}
                              className="h-7 px-2.5 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold hover:bg-red-100 transition flex items-center gap-1 border border-red-100"
                            >
                              <XCircle className="h-3 w-3" />
                              Cancel
                            </button>
                          </>
                        )}
                        {reservation.status === 'Ready' && (
                          <button
                            onClick={() => handleFulfill(reservation.id)}
                            className="h-7 px-2.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold hover:bg-blue-100 transition flex items-center gap-1 border border-blue-100"
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            Fulfilled
                          </button>
                        )}
                        {reservation.status === 'Expired' && (
                          <span className="flex items-center gap-1 text-[10px] text-red-400">
                            <AlertTriangle className="h-3 w-3" />
                            Expired
                          </span>
                        )}
                        {reservation.status === 'Fulfilled' && (
                          <span className="flex items-center gap-1 text-[10px] text-blue-400">
                            <CheckCircle2 className="h-3 w-3" />
                            Completed
                          </span>
                        )}
                        {reservation.status === 'Pending' && reservation.queuePosition > 1 && (
                          <span className="flex items-center gap-1 text-[10px] text-slate-400">
                            <Clock className="h-3 w-3" />
                            Waiting in queue
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-12 text-center">
                  <Bookmark className="h-10 w-10 text-slate-200 mx-auto mb-2" />
                  <p className="text-[13px] text-slate-400 font-medium">No reservations match this filter</p>
                </div>
              )}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
