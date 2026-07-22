'use client'

import { BarChart2, ArrowRight } from 'lucide-react'
import { DonutChart } from '@/components/ui/donut-chart'

const metrics = [
  { label: 'Borrowing Trends', value: 82, color: '#2563EB' },
  { label: 'Space Utilization', value: 76, color: '#0D9488' },
  { label: 'E-Resource Usage', value: 64, color: '#8B5CF6' },
  { label: 'Member Satisfaction', value: 91, color: '#D97706' },
]

const reports = [
  { title: 'Monthly Borrowing Report', date: 'Jun 2026', status: 'Ready' },
  { title: 'Space Utilization Analysis', date: 'Jun 2026', status: 'Ready' },
  { title: 'E-Resource Usage Summary', date: 'Jun 2026', status: 'Processing' },
  { title: 'Incident Report — Q2', date: 'Apr–Jun 2026', status: 'Ready' },
]

export function ReportsClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900">Reports & Analytics</h1>
        <p className="text-[15px] text-slate-500 mt-1">Institutional performance analytics and reports</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col items-center">
            <DonutChart
              segments={[{ label: m.label, value: m.value, color: m.color }, { label: 'Remaining', value: 100 - m.value, color: '#E2E8F0' }]}
              centerValue={m.value}
              centerLabel="%"
              size={80}
            />
            <p className="text-[13px] font-semibold text-slate-700 mt-3">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-[15px] font-semibold text-slate-900">Available Reports</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <BarChart2 className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-800">{r.title}</p>
                <p className="text-[11px] text-slate-400">{r.date}</p>
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
