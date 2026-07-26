'use client'

import { BookOpen, ClipboardCheck, CalendarCheck, Clock, ArrowRight } from 'lucide-react'

interface Props {
  activeLoans: number
  activeLoansTrend: { direction: 'up' | 'down' | 'stable'; value: string }
  pendingApprovals: number
  upcomingBookings: number
  holdsAwaiting: number
}

export function ExecutiveOverviewCards({
  activeLoans, activeLoansTrend, pendingApprovals, upcomingBookings, holdsAwaiting,
}: Props) {
  const cards = [
    {
      icon: BookOpen,
      value: activeLoans.toLocaleString(),
      label: 'Active Loans',
      detail: `${activeLoansTrend.value} from last month`,
      iconBg: 'bg-[#2155F5]/10 dark:bg-[#2155F5]/20',
      iconColor: 'text-[#2155F5] dark:text-[#5B8DEF]',
      btnBg: 'bg-[#2155F5]',
    },
    {
      icon: ClipboardCheck,
      value: String(pendingApprovals),
      label: 'Pending Approvals',
      detail: 'Requires your action',
      iconBg: 'bg-[#F4A623]/10 dark:bg-[#F4A623]/20',
      iconColor: 'text-[#F4A623] dark:text-[#FBBF24]',
      btnBg: 'bg-[#F4A623]',
    },
    {
      icon: CalendarCheck,
      value: String(upcomingBookings),
      label: 'Upcoming Bookings',
      detail: 'Next 7 days',
      iconBg: 'bg-[#18A957]/10 dark:bg-[#18A957]/20',
      iconColor: 'text-[#18A957] dark:text-[#4ADE80]',
      btnBg: 'bg-[#18A957]',
    },
    {
      icon: Clock,
      value: String(holdsAwaiting),
      label: 'Holds Awaiting',
      detail: 'Pickups pending',
      iconBg: 'bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20',
      iconColor: 'text-[#8B5CF6] dark:text-[#A78BFA]',
      btnBg: 'bg-[#8B5CF6]',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="relative w-full rounded-2xl border border-[#EDF2F7] dark:border-white/[0.08] bg-white dark:bg-[#13285A] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-none p-3 md:p-4 flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]"
          >
            <div className={`h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl flex items-center justify-center ${card.iconBg}`}>
              <Icon className={`h-4 w-4 md:h-5 md:w-5 ${card.iconColor}`} />
            </div>

            <div>
              <p className="text-[20px] md:text-[28px] font-bold text-slate-900 dark:text-[#E2E8F0] leading-none tracking-tight">
                {card.value}
              </p>
              <p className="text-[11px] md:text-[13px] font-semibold text-[#1F2937] dark:text-[#E2E8F0] mt-1">
                {card.label}
              </p>
              <p className="text-[10px] md:text-[12px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
                {card.detail}
              </p>
            </div>

            <div className="flex justify-end">
              <div className={`h-[20px] w-[20px] md:h-[26px] md:w-[26px] rounded-full ${card.btnBg} flex items-center justify-center`}>
                <ArrowRight className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
