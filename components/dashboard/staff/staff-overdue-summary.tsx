'use client'

import { SectionCard } from '@/components/ui/section-card'
import { DonutChart } from '@/components/ui/donut-chart'

interface StaffOverdueSummaryProps {
  overdueCount: number
  dueThisWeek: number
  totalActive: number
}

export function StaffOverdueSummary({ overdueCount, dueThisWeek, totalActive }: StaffOverdueSummaryProps) {
  const remaining = totalActive - overdueCount - dueThisWeek

  const segments = [
    { label: 'Overdue', value: overdueCount, color: '#DC2626' },
    { label: 'Due This Week', value: dueThisWeek, color: '#EAB308' },
    { label: 'On Track', value: remaining > 0 ? remaining : 0, color: '#E2E8F0' },
  ]

  return (
    <SectionCard title="Overdue Summary">
      <div className="flex flex-col items-center gap-4">
        <DonutChart
          segments={segments}
          centerValue={totalActive}
          centerLabel="Items"
          size={100}
        />
        <div className="w-full">
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
              <span className="text-[12px] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8]">Overdue</span>
              <span className="text-[12px] font-medium text-slate-800 dark:text-[#E2E8F0] ml-auto">{overdueCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#EAB308]" />
              <span className="text-[12px] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8]">Due This Week</span>
              <span className="text-[12px] font-medium text-slate-800 dark:text-[#E2E8F0] ml-auto">{dueThisWeek}</span>
            </div>
          </div>
          <a href="#" className="inline-flex items-center h-7 px-3.5 rounded-full border border-[#2563EB]/20 text-[12px] font-medium text-[#2563EB] bg-[#2563EB]/5 hover:bg-[#2563EB]/10 transition-colors">
            View All Loans
          </a>
        </div>
      </div>
    </SectionCard>
  )
}
