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
    <div className="bg-gradient-to-br from-white via-white to-slate-50/50 rounded-2xl border border-slate-100 shadow-sm p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
            <BarChart2 className="h-5 w-5 text-[#2563EB]" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-slate-900">Library Performance Snapshot</h3>
            <p className="text-[13px] text-slate-400 mt-0.5">Monthly overview</p>
          </div>
        </div>
        <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 hover:text-blue-700 inline-flex items-center gap-1.5 transition-all duration-200">
          Analytics <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {chart_configs.map((config, i) => (
          <div key={config.label} className="flex flex-col items-center bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
            <DonutChart
              segments={[
                { label: config.label, value: values[i], color: config.color },
                { label: 'Remaining', value: 100 - values[i], color: '#E2E8F0' },
              ]}
              centerValue={values[i]}
              centerLabel="%"
              size={90}
            />
            <p className="text-[13px] font-semibold text-slate-700 mt-3 text-center">{config.label}</p>
            <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${values[i]}%`, backgroundColor: config.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
