'use client'

import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

interface Props {
  borrowingTrend: { direction: 'up' | 'down'; value: string }
  overdueTrend: { direction: 'up' | 'down'; value: string }
  bookingUtilization: number
  equipmentUsage: number
  spaceUtilization: number
  sparklineData: number[]
}

function SparkLine({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const height = 32
  const width = 80
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BarIndicator({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[11px] font-semibold text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] w-8 text-right">{value}%</span>
    </div>
  )
}

export function OversightReports({
  borrowingTrend, overdueTrend, bookingUtilization,
  equipmentUsage, spaceUtilization, sparklineData,
}: Props) {
  return (
    <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Oversight Reports</h3>
          <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">Institutional metrics</p>
        </div>
          <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 hover:text-blue-700 inline-flex items-center gap-1.5 transition-all duration-200">
            Full report <ArrowRight className="h-3 w-3" />
          </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">Borrowing Trend</p>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" /> {borrowingTrend.value}
            </span>
          </div>
          <SparkLine data={sparklineData} color="#2563EB" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">Overdue Rate</p>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-emerald-600">
              <TrendingDown className="h-3.5 w-3.5" /> {overdueTrend.value}
            </span>
          </div>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]">
          <div>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mb-1">Booking Utilization</p>
            <BarIndicator value={bookingUtilization} color="bg-[#0D9488]" />
          </div>
          <div>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mb-1">Equipment Usage</p>
            <BarIndicator value={equipmentUsage} color="bg-[#8B5CF6]" />
          </div>
          <div>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mb-1">Space Utilization</p>
            <BarIndicator value={spaceUtilization} color="bg-[#D97706]" />
          </div>
        </div>
      </div>
    </div>
  )
}
