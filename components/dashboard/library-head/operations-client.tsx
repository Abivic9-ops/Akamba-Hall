'use client'

import { Activity, BookOpen, CalendarCheck, Monitor } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface Props {
  todayLoans: number
  todayBookings: number
  activeDeskUsers: number
}

export function OperationsClient({ todayLoans, todayBookings, activeDeskUsers }: Props) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Operations Overview</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Today&apos;s library activity at a glance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Today's Loans", value: todayLoans, icon: BookOpen, color: 'bg-blue-50 text-blue-500' },
            { label: "Today's Bookings", value: todayBookings, icon: CalendarCheck, color: 'bg-emerald-50 text-emerald-500' },
            { label: 'Active Desk Users', value: activeDeskUsers, icon: Monitor, color: 'bg-sky-50 text-sky-500' },
          ].map((item) => (
            <div key={item.label} className="bg-white dark:bg-[#0E1F3F] rounded-2xl p-5 border border-slate-100 dark:border-white/[0.08] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] text-slate-400 dark:text-[#6B7A99]">{item.label}</span>
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-[28px] font-bold text-slate-900 dark:text-[#E2E8F0] leading-tight">{item.value}</div>
            </div>
          ))}
        </div>

        <SectionCard title="Activity Summary" icon={Activity}>
          <div className="text-[13px] text-slate-500 dark:text-[#6B7A99] py-4 text-center">
            Real-time operations data will appear here.
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
