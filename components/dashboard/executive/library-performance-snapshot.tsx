'use client'

import { ArrowRight, BarChart2 } from 'lucide-react'
import { DonutChart } from '@/components/ui/donut-chart'

interface Props {
  collectionsUsage: number
  spaceUtilization: number
  equipmentUsage: number
  userSatisfaction: number
}

const chart_configs = [
  { label: 'Collections Usage', value: 76, color: '#2563EB' },
  { label: 'Space Utilization', value: 82, color: '#0D9488' },
  { label: 'Equipment Usage', value: 64, color: '#8B5CF6' },
  { label: 'User Satisfaction', value: 92, color: '#D97706' },
]

export function LibraryPerformanceSnapshot({
  collectionsUsage, spaceUtilization, equipmentUsage, userSatisfaction,
}: Props) {
  const values = [collectionsUsage, spaceUtilization, equipmentUsage, userSatisfaction]

  return (
    <div className="bg-gradient-to-br from-white via-white to-slate-50/50 rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm dark:shadow-none p-4 sm:p-5 md:p-6 h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center shrink-0">
            <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#2563EB]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[14px] sm:text-[16px] font-semibold text-slate-900 dark:text-[#E2E8F0] truncate">Library Performance Snapshot</h3>
            <p className="text-[11px] sm:text-[13px] text-slate-400 dark:text-[#6B7A99] mt-0.5">Monthly overview</p>
          </div>
        </div>
        <button className="h-8 px-3 sm:px-4 rounded-full bg-blue-50 text-[11px] sm:text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 hover:text-blue-700 inline-flex items-center gap-1.5 transition-all duration-200 shrink-0">
          Analytics <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 overflow-hidden">
        {chart_configs.map((config, i) => (
          <div key={config.label} className="flex flex-col items-center bg-white dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] p-3 sm:p-4 shadow-sm dark:shadow-none overflow-hidden">
            <DonutChart
              segments={[
                { label: config.label, value: values[i], color: config.color },
                { label: 'Remaining', value: 100 - values[i], color: '#E2E8F0' },
              ]}
              centerValue={values[i]}
              centerLabel="%"
              size={90}
            />
            <p className="text-[11px] sm:text-[13px] font-semibold text-slate-700 dark:text-[#E2E8F0] mt-2 sm:mt-3 text-center truncate w-full">{config.label}</p>
            <div className="mt-1.5 sm:mt-2 h-1.5 w-full bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${values[i]}%`, backgroundColor: config.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
