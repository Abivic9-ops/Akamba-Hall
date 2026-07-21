'use client'

import { useState } from 'react'
import {
  Bookmark, MapPin, Clock, AlertCircle,
  Package, Users as UsersIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Reservation {
  id: string
  title: string
  author: string
  status: 'ready' | 'pending' | 'transit'
  queuePosition: number | null
  pickupLocation: string | null
  pickupDeadline: string | null
  reservedAt: string
  category: string
}

const mockReservations: Reservation[] = [
  {
    id: 'res-1',
    title: 'Chemistry Practical Guide',
    author: 'P.O. Owuor',
    status: 'ready',
    queuePosition: null,
    pickupLocation: 'Main Desk — Akamba Hall',
    pickupDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    reservedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Science',
  },
  {
    id: 'res-2',
    title: 'Kenyan History: Pre-Colonial to Modern',
    author: 'M.W. Odhiambo',
    status: 'pending',
    queuePosition: 3,
    pickupLocation: null,
    pickupDeadline: null,
    reservedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'History',
  },
  {
    id: 'res-3',
    title: 'Advanced English Grammar',
    author: 'Wanjiku Kamau',
    status: 'pending',
    queuePosition: 7,
    pickupLocation: null,
    pickupDeadline: null,
    reservedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Language',
  },
  {
    id: 'res-4',
    title: 'Computer Studies for Secondary Schools',
    author: 'James Mwangi',
    status: 'transit',
    queuePosition: null,
    pickupLocation: 'Main Desk — Akamba Hall',
    pickupDeadline: null,
    reservedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Technology',
  },
]

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function ReservationsPageClient() {
  const [activeTab, setActiveTab] = useState<'all' | 'ready' | 'pending' | 'transit'>('all')

  const filtered = mockReservations.filter((r) => {
    if (activeTab === 'all') return true
    return r.status === activeTab
  })

  const readyCount = mockReservations.filter((r) => r.status === 'ready').length
  const pendingCount = mockReservations.filter((r) => r.status === 'pending').length
  const transitCount = mockReservations.filter((r) => r.status === 'transit').length

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">

        {/* header */}
        <div>
          <h1 className="text-[28px] font-medium text-slate-900">Reservations</h1>
          <p className="text-[15px] text-slate-500 mt-1">
            Track your book holds, queue positions, and pickup status.
          </p>
        </div>

        {/* status cards */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setActiveTab('ready')}
            className={`p-4 rounded-xl border transition-all text-left ${
              activeTab === 'ready'
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-white border-slate-100 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-emerald-600" />
              <span className="text-[13px] text-slate-500">Ready for Pickup</span>
            </div>
            <p className="text-[24px] font-medium text-slate-900">{readyCount}</p>
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`p-4 rounded-xl border transition-all text-left ${
              activeTab === 'pending'
                ? 'bg-blue-50 border-blue-200'
                : 'bg-white border-slate-100 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <UsersIcon className="h-4 w-4 text-[#2563EB]" />
              <span className="text-[13px] text-slate-500">In Queue</span>
            </div>
            <p className="text-[24px] font-medium text-slate-900">{pendingCount}</p>
          </button>
          <button
            onClick={() => setActiveTab('transit')}
            className={`p-4 rounded-xl border transition-all text-left ${
              activeTab === 'transit'
                ? 'bg-amber-50 border-amber-200'
                : 'bg-white border-slate-100 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-amber-600" />
              <span className="text-[13px] text-slate-500">In Transit</span>
            </div>
            <p className="text-[24px] font-medium text-slate-900">{transitCount}</p>
          </button>
        </div>

        {/* reservations list */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bookmark className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-[16px] text-slate-500">No reservations in this category</p>
            </div>
          ) : (
            filtered.map((res) => (
              <div
                key={res.id}
                className="flex items-start gap-4 p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
              >
                <div className="w-[48px] h-[64px] rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Bookmark className="h-5 w-5 text-slate-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[16px] font-medium text-slate-800 truncate">{res.title}</p>
                    {res.status === 'ready' && <Badge variant="success" dot>Ready</Badge>}
                    {res.status === 'pending' && <Badge variant="info" dot>In Queue</Badge>}
                    {res.status === 'transit' && <Badge variant="warning" dot>In Transit</Badge>}
                  </div>
                  <p className="text-[14px] text-slate-500 mt-0.5">{res.author}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[13px] text-slate-400">Reserved: {formatDate(res.reservedAt)}</span>
                    <span className="text-[13px] text-slate-400">Category: {res.category}</span>
                  </div>

                  {res.status === 'ready' && res.pickupLocation && (
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-[13px] text-slate-500">{res.pickupLocation}</span>
                      </div>
                      {res.pickupDeadline && (
                        <span className="text-[13px] text-red-600 font-medium">
                          Pick up by {formatDate(res.pickupDeadline)}
                        </span>
                      )}
                    </div>
                  )}

                  {res.status === 'pending' && res.queuePosition && (
                    <div className="mt-2">
                      <span className="text-[13px] text-[#2563EB]">
                        Position #{res.queuePosition} in queue — you will be notified when available
                      </span>
                    </div>
                  )}

                  {res.status === 'transit' && (
                    <div className="mt-2">
                      <span className="text-[13px] text-amber-600">
                        Book is being transferred from another branch — estimated arrival in 2–3 days
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {res.status === 'ready' && (
                    <button className="h-9 px-5 rounded-lg bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors">
                      Confirm Pickup
                    </button>
                  )}
                  <button className="h-9 px-4 rounded-lg border border-slate-200 text-[13px] text-slate-600 hover:bg-slate-100 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* policy note */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] font-medium text-slate-700">Reservation Policy</p>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Ready items must be collected within 3 business days. Unclaimed reservations will be released to the next
              person in queue. You can hold a maximum of 5 active reservations at any time.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
