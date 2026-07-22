'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search, Package, MapPin, User, Calendar, CheckCircle2, AlertTriangle, Eye,
} from 'lucide-react'

interface LostFoundItem {
  id: string
  type: 'Lost' | 'Found'
  description: string
  reportedBy: string
  memberId: string
  date: string
  location: string
  status: 'Lost' | 'Found' | 'Claimed'
}

const mockItems: LostFoundItem[] = [
  { id: 'LF-001', type: 'Lost', description: 'Black leather backpack with university logo, contains Calculus textbook', reportedBy: 'James Ochieng', memberId: 'STU-24011076', date: '2026-06-20', location: 'Main Reading Hall', status: 'Lost' },
  { id: 'LF-002', type: 'Found', description: 'Casio fx-991EX scientific calculator', reportedBy: 'Mary Wanjiku', memberId: 'STF-047', date: '2026-06-21', location: 'AVR Room 3', status: 'Found' },
  { id: 'LF-003', type: 'Lost', description: 'Blue USB flash drive 64GB with thesis documents', reportedBy: 'Grace Wambui', memberId: 'STU-24011115', date: '2026-06-18', location: 'Computer Lab B', status: 'Lost' },
  { id: 'LF-004', type: 'Found', description: 'Set of keys with silver keychain and student ID tag', reportedBy: 'Peter Kamau', memberId: 'STU-24011089', date: '2026-06-19', location: 'Circulation Desk', status: 'Claimed' },
  { id: 'LF-005', type: 'Lost', description: 'Brown library book: "Economics: A Modern Introduction" by Mankiw', reportedBy: 'David Mutua', memberId: 'STU-24011102', date: '2026-06-22', location: 'Shelf D1', status: 'Lost' },
  { id: 'LF-006', type: 'Found', description: 'Wireless earbuds in white charging case, Samsung brand', reportedBy: 'Brian Kipchoge', memberId: 'STU-24011128', date: '2026-06-20', location: 'Study Room 7', status: 'Found' },
]

const filterTabs = ['All', 'Lost', 'Found', 'Claimed'] as const

function statusBadge(status: LostFoundItem['status']) {
  switch (status) {
    case 'Lost':
      return <Badge variant="danger" dot>Lost</Badge>
    case 'Found':
      return <Badge variant="success" dot>Found</Badge>
    case 'Claimed':
      return <Badge variant="info" dot>Claimed</Badge>
  }
}

export function LostFoundPageClient() {
  const [activeFilter, setActiveFilter] = useState<typeof filterTabs[number]>('All')
  const [reportType, setReportType] = useState<'Lost' | 'Found'>('Lost')
  const [reportDesc, setReportDesc] = useState('')
  const [reportMemberId, setReportMemberId] = useState('')
  const [reportLocation, setReportLocation] = useState('')

  const filteredItems = mockItems.filter(
    (item) => activeFilter === 'All' || item.status === activeFilter
  )

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1B3D] tracking-tight">Lost & Found Items</h1>
          <p className="text-sm text-slate-500 mt-1">Track and manage lost and reported items.</p>
        </div>

        <SectionCard title="Lost & Found Items" icon={Package}>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
                  activeFilter === tab
                    ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {tab}
                <span className="ml-1.5 text-[10px] opacity-70">
                  {tab === 'All' ? mockItems.length : mockItems.filter((i) => i.status === tab).length}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                  item.type === 'Lost' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {item.type === 'Lost' ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[13px] font-medium text-slate-800">{item.description}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-[11px] text-slate-500">
                          <User className="h-3 w-3" /> {item.reportedBy}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Calendar className="h-3 w-3" /> {new Date(item.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-500">
                          <MapPin className="h-3 w-3" /> {item.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {statusBadge(item.status)}
                      <Button variant="ghost" size="xs" className="gap-1 text-[11px]">
                        <Eye className="h-3 w-3" /> View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-sm text-slate-400">No items in this category.</div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Report Item" icon={Search}>
          <div className="max-w-lg space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setReportType('Lost')}
                className={`flex-1 py-2 rounded-lg text-[12px] font-bold border transition-colors ${
                  reportType === 'Lost'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                Lost Item
              </button>
              <button
                onClick={() => setReportType('Found')}
                className={`flex-1 py-2 rounded-lg text-[12px] font-bold border transition-colors ${
                  reportType === 'Found'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                Found Item
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500">Description</label>
              <textarea
                placeholder="Describe the item in detail..."
                value={reportDesc}
                onChange={(e) => setReportDesc(e.target.value)}
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm min-h-[80px] resize-none outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-500">Member ID</label>
                <Input placeholder="e.g. STU-24011076" value={reportMemberId} onChange={(e) => setReportMemberId(e.target.value)} className="h-9" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-500">Location Found</label>
                <Input placeholder="e.g. Main Reading Hall" value={reportLocation} onChange={(e) => setReportLocation(e.target.value)} className="h-9" />
              </div>
            </div>
            <Button size="sm" className="gap-1.5">
              <Package className="h-3.5 w-3.5" /> Submit Report
            </Button>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
