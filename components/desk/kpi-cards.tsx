'use client'

import { BookOpen, RotateCcw, RefreshCw, UserPlus, AlertCircle, ArrowRight } from 'lucide-react'

interface KpiCardsProps {
  loansIssued: number
  returnsProcessed: number
  renewals: number
  newMembers: number
  overdueItems: number
}

const cards = [
  {
    key: 'loansIssued',
    label: 'Loans Issued',
    detail: 'Today',
    icon: BookOpen,
    iconBg: 'bg-[#2155F5]/10 dark:bg-[#2155F5]/20',
    iconColor: 'text-[#2155F5] dark:text-[#5B8DEF]',
    btnBg: 'bg-[#2155F5]',
  },
  {
    key: 'returnsProcessed',
    label: 'Returns Processed',
    detail: 'Today',
    icon: RotateCcw,
    iconBg: 'bg-[#18A957]/10 dark:bg-[#18A957]/20',
    iconColor: 'text-[#18A957] dark:text-[#4ADE80]',
    btnBg: 'bg-[#18A957]',
  },
  {
    key: 'renewals',
    label: 'Renewals',
    detail: 'Today',
    icon: RefreshCw,
    iconBg: 'bg-[#F4A623]/10 dark:bg-[#F4A623]/20',
    iconColor: 'text-[#F4A623] dark:text-[#FBBF24]',
    btnBg: 'bg-[#F4A623]',
  },
  {
    key: 'newMembers',
    label: 'New Members',
    detail: 'Today',
    icon: UserPlus,
    iconBg: 'bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20',
    iconColor: 'text-[#8B5CF6] dark:text-[#A78BFA]',
    btnBg: 'bg-[#8B5CF6]',
  },
  {
    key: 'overdueItems',
    label: 'Overdue Items',
    detail: 'Action needed',
    icon: AlertCircle,
    iconBg: 'bg-[#E53E3E]/10 dark:bg-[#E53E3E]/20',
    iconColor: 'text-[#E53E3E] dark:text-[#F87171]',
    btnBg: 'bg-[#E53E3E]',
  },
] as const

export function KpiCards({ loansIssued, returnsProcessed, renewals, newMembers, overdueItems }: KpiCardsProps) {
  const values: Record<string, number> = {
    loansIssued,
    returnsProcessed,
    renewals,
    newMembers,
    overdueItems,
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {cards.map((card) => {
        const Icon = card.icon
        const value = values[card.key]

        return (
          <div
            key={card.key}
            className="relative w-full rounded-2xl border border-[#EDF2F7] dark:border-white/[0.08] bg-white dark:bg-[#13285A] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-none p-3 md:p-4 flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]"
          >
            <div className={`h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl flex items-center justify-center ${card.iconBg}`}>
              <Icon className={`h-4 w-4 md:h-5 md:w-5 ${card.iconColor}`} />
            </div>

            <div>
              <p className="text-[20px] md:text-[28px] font-bold text-slate-900 dark:text-[#E2E8F0] leading-none tracking-tight">
                {value}
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
