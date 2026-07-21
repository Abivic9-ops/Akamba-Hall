'use client'

import { Clock } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface LibraryHoursProps {
  isOpen: boolean
  closesAt: string
  opensTomorrow: string
  schedule: { day: string; hours: string; isToday: boolean }[]
}

export function LibraryHours({ isOpen, closesAt, opensTomorrow, schedule }: LibraryHoursProps) {
  return (
    <SectionCard
      title="Library Hours"
      icon={Clock}
      cta={{ label: 'View full schedule', href: '#' }}
    >
      {/* live status pill */}
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 ${
          isOpen ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <span className="text-[13px] font-normal">
          {isOpen ? `Open Now · Closes ${closesAt}` : `Closed · Opens tomorrow ${opensTomorrow}`}
        </span>
      </div>

      {/* hours table */}
      <div className="space-y-1">
        {schedule.map((row) => (
          <div
            key={row.day}
            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg ${
              row.isToday ? 'bg-[#2563EB]/5 font-medium' : ''
            } ${row.hours === 'Closed' ? 'opacity-50 italic' : ''}`}
          >
            <span className={`text-[13px] ${row.isToday ? 'text-slate-900' : 'text-slate-600'}`}>
              {row.day}
            </span>
            <span className={`text-[13px] ${row.isToday ? 'text-slate-900' : 'text-slate-500'}`}>
              {row.hours}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
