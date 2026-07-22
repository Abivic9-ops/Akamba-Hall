'use client'

import { useState } from 'react'
import { AlertTriangle, Clock, Mail, Calendar, XCircle } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'

const summaryStats = [
  { label: 'Total Overdue', value: 6, color: 'bg-red-50 text-red-600', icon: AlertTriangle },
  { label: '1–3 Days', value: 2, color: 'bg-amber-50 text-amber-600', icon: Clock },
  { label: '4–7 Days', value: 2, color: 'bg-orange-50 text-orange-600', icon: Clock },
  { label: '7+ Days', value: 2, color: 'bg-red-100 text-red-700', icon: AlertTriangle },
]

const overdueItems = [
  { id: 1, bookTitle: 'Introduction to Algorithms', member: 'Kipchoge Korir', studentId: 'AKM-2025-0314', dueDate: '10 Jul 2026', daysOverdue: 12, fine: 600, status: 'Severe' },
  { id: 2, bookTitle: 'Database System Concepts', member: 'Jabali Mwangi', studentId: 'AKM-2025-0078', dueDate: '15 Jul 2026', daysOverdue: 7, fine: 350, status: 'Critical' },
  { id: 3, bookTitle: 'Engineering Mathematics', member: 'Wanjiku Kamau', studentId: 'AKM-2026-0042', dueDate: '18 Jul 2026', daysOverdue: 4, fine: 200, status: 'Critical' },
  { id: 4, bookTitle: 'Principles of Economics', member: 'Otieno Ochieng', studentId: 'AKM-2026-0117', dueDate: '20 Jul 2026', daysOverdue: 2, fine: 100, status: 'Warning' },
  { id: 5, bookTitle: 'Organic Chemistry', member: 'Amina Hassan', studentId: 'AKM-2026-0089', dueDate: '19 Jul 2026', daysOverdue: 3, fine: 150, status: 'Warning' },
  { id: 6, bookTitle: 'Data Structures & Algorithms in Java', member: 'Nyerere Odhiambo', studentId: 'AKM-2026-0156', dueDate: '12 Jul 2026', daysOverdue: 10, fine: 500, status: 'Severe' },
]

const statusBadge = (status: string) => {
  if (status === 'Severe') return <Badge variant="danger" dot>{status}</Badge>
  if (status === 'Critical') return <Badge variant="warning" dot>{status}</Badge>
  return <Badge variant="info" dot>{status}</Badge>
}

const trendSummary = [
  { period: 'This Week', total: 6, avgDays: 6.3, avgFine: 317 },
  { period: 'Last Week', total: 9, avgDays: 5.1, avgFine: 255 },
  { period: '2 Weeks Ago', total: 4, avgDays: 3.8, avgFine: 190 },
]

export function OverduesReportPageClient() {
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  const handleAction = (action: string, memberName: string) => {
    setActionMessage(`${action} sent to ${memberName}`)
    setTimeout(() => setActionMessage(null), 3000)
  }

  const totalFines = overdueItems.reduce((sum, item) => sum + item.fine, 0)

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">

        {actionMessage && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 text-[13px] text-emerald-700 font-medium">
            {actionMessage}
          </div>
        )}

        <SectionCard title="Overdues Report" icon={AlertTriangle}>
          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {summaryStats.map(sc => (
                <div key={sc.label} className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col items-center text-center">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center mb-2 ${sc.color}`}>
                    <sc.icon className="h-4 w-4" />
                  </div>
                  <p className="text-[20px] font-bold text-slate-900">{sc.value}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{sc.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 text-[12px] text-amber-700">
              Total outstanding fines: <strong>KES {totalFines.toLocaleString()}</strong> (KES 50/day per overdue item)
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Book Title</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Member</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Student ID</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Due Date</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Days Overdue</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Fine (KES)</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Status</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {overdueItems.map(item => (
                    <tr key={item.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 pr-4">
                        <p className="text-[13px] font-medium text-slate-800">{item.bookTitle}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="text-[13px] text-slate-700">{item.member}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-[12px] font-mono text-slate-500">{item.studentId}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-[12px] text-slate-500">{item.dueDate}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-[13px] font-bold ${
                          item.daysOverdue >= 7 ? 'text-red-600' : item.daysOverdue >= 4 ? 'text-orange-600' : 'text-amber-600'
                        }`}>
                          {item.daysOverdue} days
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-[13px] font-bold text-slate-800">KES {item.fine}</span>
                      </td>
                      <td className="py-3 pr-4">{statusBadge(item.status)}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          <button
                            title="Send Reminder"
                            onClick={() => handleAction('Reminder', item.member)}
                            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Mail className="h-3.5 w-3.5" />
                          </button>
                          <button
                            title="Extend Deadline"
                            onClick={() => handleAction('Deadline extension', item.member)}
                            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          >
                            <Calendar className="h-3.5 w-3.5" />
                          </button>
                          <button
                            title="Mark Lost"
                            onClick={() => handleAction('Lost book report', item.member)}
                            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Overdue Trends" icon={Clock}>
          <div className="space-y-0">
            {trendSummary.map(t => (
              <div key={t.period} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-[13px] font-medium text-slate-800">{t.period}</p>
                  <p className="text-[11px] text-slate-400">Average {t.avgDays} days overdue</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[14px] font-bold text-slate-800">{t.total}</p>
                    <p className="text-[10px] text-slate-400">overdue items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-bold text-amber-600">KES {t.avgFine}</p>
                    <p className="text-[10px] text-slate-400">avg fine</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

      </div>
    </div>
  )
}
