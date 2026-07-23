'use client'

import { useState } from 'react'
import { BarChart3, Calendar, TrendingUp, BookOpen, Users } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'

const summaryCards = [
  { label: 'Total Transactions', value: 47, color: 'bg-blue-50 text-[#2563EB]', icon: TrendingUp },
  { label: 'Issues', value: 28, color: 'bg-emerald-50 text-emerald-600', icon: BookOpen },
  { label: 'Returns', value: 15, color: 'bg-amber-50 text-amber-600', icon: Calendar },
  { label: 'New Members', value: 4, color: 'bg-[#5B9BD5]/10 text-[#5B9BD5]', icon: Users },
  { label: 'Overdue Items', value: 7, color: 'bg-red-50 text-red-600', icon: TrendingUp },
]

const hourlyData = [
  { hour: '8AM', issues: 3, returns: 1 },
  { hour: '9AM', issues: 5, returns: 2 },
  { hour: '10AM', issues: 7, returns: 3 },
  { hour: '11AM', issues: 4, returns: 4 },
  { hour: '12PM', issues: 2, returns: 2 },
  { hour: '1PM', issues: 3, returns: 1 },
  { hour: '2PM', issues: 2, returns: 1 },
  { hour: '3PM', issues: 1, returns: 1 },
]

const popularBooks = [
  { rank: 1, title: 'Introduction to Algorithms', author: 'Cormen et al.', issues: 8 },
  { rank: 2, title: 'Database System Concepts', author: 'Silberschatz', issues: 6 },
  { rank: 3, title: 'Engineering Mathematics', author: 'K.A. Stroud', issues: 5 },
  { rank: 4, title: 'Principles of Economics', author: 'N. Gregory Mankiw', issues: 4 },
  { rank: 5, title: 'Organic Chemistry', author: 'Clayden et al.', issues: 4 },
]

const activeMembers = [
  { rank: 1, name: 'Amina Hassan', borrowed: 5, returned: 2 },
  { rank: 2, name: 'Wanjiku Kamau', borrowed: 4, returned: 3 },
  { rank: 3, name: 'Nyerere Odhiambo', borrowed: 4, returned: 1 },
  { rank: 4, name: 'Faith Wambui', borrowed: 3, returned: 2 },
  { rank: 5, name: 'Otieno Ochieng', borrowed: 2, returned: 1 },
]

const maxBarValue = Math.max(...hourlyData.map(d => Math.max(d.issues, d.returns)))

export function ReportsPageClient() {
  const [selectedDate, setSelectedDate] = useState('2026-07-22')

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">

        <SectionCard title="Daily Reports" icon={BarChart3}>
          <div className="space-y-4">
            {/* Date Selector */}
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-medium text-slate-600">Report Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors"
              />
              <Badge variant="info">Today</Badge>
            </div>

            {/* Summary Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {summaryCards.map(sc => (
                <div key={sc.label} className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col items-center text-center">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center mb-2 ${sc.color}`}>
                    <sc.icon className="h-4 w-4" />
                  </div>
                  <p className="text-[20px] font-bold text-slate-900">{sc.value}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{sc.label}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Transaction Breakdown" icon={TrendingUp}>
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-[12px]">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#2563EB]" /> Issues</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-amber-400" /> Returns</span>
            </div>
            <div className="flex items-end gap-2 h-48">
              {hourlyData.map(d => (
                <div key={d.hour} className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: '160px' }}>
                    <div
                      className="w-3 bg-[#2563EB] rounded-t-sm transition-all duration-300"
                      style={{ height: `${(d.issues / 8) * 100}%`, minHeight: d.issues > 0 ? '4px' : '0' }}
                      title={`${d.issues} issues`}
                    />
                    <div
                      className="w-3 bg-amber-400 rounded-t-sm transition-all duration-300"
                      style={{ height: `${(d.returns / 8) * 100}%`, minHeight: d.returns > 0 ? '4px' : '0' }}
                      title={`${d.returns} returns`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{d.hour}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <SectionCard title="Popular Books Today" icon={BookOpen}>
            <div className="space-y-0">
              {popularBooks.map(book => (
                <div key={book.rank} className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
                  <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-slate-500">{book.rank}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-slate-800 truncate">{book.title}</p>
                    <p className="text-[11px] text-slate-400">{book.author}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[14px] font-bold text-slate-800">{book.issues}</p>
                    <p className="text-[10px] text-slate-400">issues</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Member Activity" icon={Users}>
            <div className="space-y-0">
              {activeMembers.map(member => (
                <div key={member.rank} className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
                  <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-slate-500">{member.rank}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-slate-800">{member.name}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="success">{member.borrowed}B</Badge>
                    <Badge variant="info">{member.returned}R</Badge>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

        </div>

      </div>
    </div>
  )
}
