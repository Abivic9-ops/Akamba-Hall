'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Bookmark, User, CalendarDays, Hash, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react'
import { mark_hold_ready, fulfill_hold, cancel_hold } from '@/lib/actions/holds'

interface Hold {
  id: string
  title: string
  author: string
  requestedBy?: string
  memberId?: string
  queuePosition: number
  status: string
  requestedAt: string
}

interface Props {
  holds: Hold[]
}

const tabs = ['All', 'PENDING', 'READY', 'FULFILLED', 'CANCELLED'] as const

export function ReservationsPageClient({ holds }: Props) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('All')
  const [items, setItems] = useState(holds)

  const filtered = items.filter((h) => {
    if (activeTab === 'All') return true
    return h.status === activeTab
  })

  async function handleMarkReady(id: string) {
    await mark_hold_ready(id)
    setItems((prev) => prev.map((h) => h.id === id ? { ...h, status: 'READY' } : h))
  }

  async function handleFulfill(id: string) {
    await fulfill_hold(id)
    setItems((prev) => prev.map((h) => h.id === id ? { ...h, status: 'FULFILLED' } : h))
  }

  async function handleCancel(id: string) {
    await cancel_hold(id)
    setItems((prev) => prev.map((h) => h.id === id ? { ...h, status: 'CANCELLED' } : h))
  }

  const statusVariant = (status: string) => {
    switch (status) {
      case 'READY': return 'success' as const
      case 'PENDING': return 'warning' as const
      case 'FULFILLED': return 'info' as const
      case 'CANCELLED': case 'EXPIRED': return 'danger' as const
      default: return 'neutral' as const
    }
  }

  return (
    <div className="bg-[#F8F9FB] dark:bg-[#071224] min-h-screen">
      <div className="max-w-[1440px] mx-auto p-6 space-y-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Bookmark className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Book Reservations</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{items.length} reservation(s) total</p>
          </div>
        </div>

        <SectionCard title="Reservations Queue" icon={Bookmark}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => {
                const count = tab === 'All' ? items.length : items.filter((h) => h.status === tab).length
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
                    {tab.replace('_', ' ')}
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
              {filtered.map((hold) => (
                <div key={hold.id} className="border border-slate-100 dark:border-white/[0.06] rounded-xl p-4 hover:shadow-sm transition bg-white dark:bg-[#13285A]">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="h-14 w-10 bg-slate-900 dark:bg-[#0B1A3B] rounded shadow-sm flex-shrink-0 flex items-center justify-center border border-slate-200 dark:border-white/10 relative overflow-hidden">
                      <div className="text-[4px] text-white/50 px-1 text-center font-serif leading-tight">
                        {hold.title.split(' ').slice(0, 2).join(' ').toUpperCase()}
                      </div>
                      <div className={`absolute inset-0 ${
                        hold.status === 'READY' ? 'bg-emerald-600/20' :
                        hold.status === 'PENDING' ? 'bg-amber-600/20' :
                        hold.status === 'FULFILLED' ? 'bg-blue-600/20' :
                        'bg-red-600/20'
                      }`}></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-bold text-[#0B1B3D] dark:text-[#E2E8F0] truncate">{hold.title}</h3>
                      <p className="text-[11px] text-slate-500 dark:text-[#6B7A99]">{hold.author}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                        {hold.memberId && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-[#6B7A99]">
                            <User className="h-3 w-3" />
                            {hold.requestedBy || 'Unknown'} <span className="font-mono text-[10px]">({hold.memberId})</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-[#6B7A99]">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(hold.requestedAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-[#6B7A99]">
                          <Hash className="h-3 w-3" />
                          Queue: {hold.queuePosition}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Badge variant={statusVariant(hold.status)} dot>{hold.status}</Badge>
                      <div className="flex gap-1.5">
                        {hold.status === 'PENDING' && hold.queuePosition === 1 && (
                          <>
                            <button onClick={() => handleMarkReady(hold.id)} className="h-7 px-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition flex items-center gap-1 border border-emerald-100 dark:border-emerald-700/30">
                              <CheckCircle2 className="h-3 w-3" /> Mark Ready
                            </button>
                            <button onClick={() => handleCancel(hold.id)} className="h-7 px-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition flex items-center gap-1 border border-red-100 dark:border-red-700/30">
                              <XCircle className="h-3 w-3" /> Cancel
                            </button>
                          </>
                        )}
                        {hold.status === 'READY' && (
                          <button onClick={() => handleFulfill(hold.id)} className="h-7 px-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition flex items-center gap-1 border border-blue-100 dark:border-blue-700/30">
                            <CheckCircle2 className="h-3 w-3" /> Fulfilled
                          </button>
                        )}
                        {hold.status === 'PENDING' && hold.queuePosition > 1 && (
                          <span className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-[#6B7A99]">
                            <Clock className="h-3 w-3" /> Waiting
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-12 text-center">
                  <Bookmark className="h-10 w-10 text-slate-200 dark:text-white/10 mx-auto mb-2" />
                  <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] font-medium">No reservations match this filter</p>
                </div>
              )}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
