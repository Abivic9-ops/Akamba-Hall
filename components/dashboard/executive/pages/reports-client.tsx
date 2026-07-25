'use client'

import { BarChart2, ArrowRight } from 'lucide-react'
import { DonutChart } from '@/components/ui/donut-chart'

interface Metric {
  label: string
  value: number
  color: string
}

interface Report {
  title: string
  date: string
  status: string
}

interface LoanStats {
  totalLoans: number
  activeLoans: number
  overdueLoans: number
  returnedLoans: number
  totalUsers: number
  activeUsers: number
  totalBooks: number
  availableCopies: number
  loanedCopies: number
}

export function ReportsClient({ stats }: { stats: LoanStats }) {
  const metrics: Metric[] = [
    { label: 'Active Loans', value: stats.activeLoans, color: '#2563EB' },
    { label: 'Overdue Loans', value: stats.overdueLoans, color: '#EF4444' },
    { label: 'Library Members', value: stats.activeUsers, color: '#0D9488' },
    { label: 'Collection Usage', value: stats.totalBooks > 0 ? Math.round((stats.loanedCopies / stats.totalBooks) * 100) : 0, color: '#8B5CF6' },
  ]

  const reports: Report[] = [
    { title: 'Monthly Borrowing Report', date: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }), status: 'Ready' },
    { title: 'Active Loan Summary', date: `${stats.activeLoans} current loans`, status: 'Ready' },
    { title: 'Overdue Items Report', date: `${stats.overdueLoans} overdue`, status: stats.overdueLoans > 0 ? 'Processing' : 'Ready' },
    { title: 'Collection Availability', date: `${stats.availableCopies} of ${stats.totalBooks} books available`, status: 'Ready' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Reports & Analytics</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Institutional performance analytics and reports</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5 flex flex-col items-center">
            <DonutChart
              segments={[{ label: m.label, value: m.value, color: m.color }, { label: 'Remaining', value: Math.max(0, 100 - m.value), color: '#E2E8F0' }]}
              centerValue={m.value}
              centerLabel="%"
              size={80}
            />
            <p className="text-[13px] font-semibold text-slate-700 dark:text-[#E2E8F0] mt-3">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]">
          <h3 className="text-[15px] font-semibold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Available Reports</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <BarChart2 className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0]">{r.title}</p>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{r.date}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.status === 'Ready' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{r.status}</span>
              <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 inline-flex items-center gap-1.5 transition-all duration-200">
                Download <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
