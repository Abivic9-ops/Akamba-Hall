'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, BookOpen, Users, Calendar } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'

interface SummaryCard {
  label: string
  value: number
  color: string
  icon: string
}

interface PopularBook {
  rank: number
  title: string
  author: string
  issues: number
}

interface ActiveMember {
  rank: number
  name: string
  borrowed: number
  returned: number
}

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  BookOpen,
  Calendar,
  Users,
}

export function ReportsPageClient({ summaryCards, popularBooks, activeMembers }: {
  summaryCards: SummaryCard[]
  popularBooks: PopularBook[]
  activeMembers: ActiveMember[]
}) {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0])

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
              {summaryCards.map(sc => {
                const Icon = iconMap[sc.icon] || TrendingUp
                return (
                  <div key={sc.label} className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col items-center text-center">
                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center mb-2 ${sc.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[20px] font-bold text-slate-900">{sc.value}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{sc.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <SectionCard title="Popular Books Today" icon={BookOpen}>
            <div className="space-y-0">
              {popularBooks.length === 0 ? (
                <div className="text-center py-8 text-sm text-slate-400">No loan data available yet.</div>
              ) : popularBooks.map(book => (
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
              {activeMembers.length === 0 ? (
                <div className="text-center py-8 text-sm text-slate-400">No member activity data available yet.</div>
              ) : activeMembers.map(member => (
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
