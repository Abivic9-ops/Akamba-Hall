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
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F4F8FF 50%, #E8F1FF 100%)',
    iconBg: 'bg-[#2155F5]/10',
    iconColor: 'text-[#2155F5]',
    btnBg: 'bg-[#2155F5]',
  },
  {
    key: 'returnsProcessed',
    label: 'Returns Processed',
    detail: 'Today',
    icon: RotateCcw,
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F4FFF9 50%, #E7FAEF 100%)',
    iconBg: 'bg-[#18A957]/10',
    iconColor: 'text-[#18A957]',
    btnBg: 'bg-[#18A957]',
  },
  {
    key: 'renewals',
    label: 'Renewals',
    detail: 'Today',
    icon: RefreshCw,
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FFFDF6 50%, #FFF5D8 100%)',
    iconBg: 'bg-[#F4A623]/10',
    iconColor: 'text-[#F4A623]',
    btnBg: 'bg-[#F4A623]',
  },
  {
    key: 'newMembers',
    label: 'New Members',
    detail: 'Today',
    icon: UserPlus,
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FBF7FF 50%, #F3E9FF 100%)',
    iconBg: 'bg-[#8B5CF6]/10',
    iconColor: 'text-[#8B5CF6]',
    btnBg: 'bg-[#8B5CF6]',
  },
  {
    key: 'overdueItems',
    label: 'Overdue Items',
    detail: 'Action needed',
    icon: AlertCircle,
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 50%, #FFE8E8 100%)',
    iconBg: 'bg-[#E53E3E]/10',
    iconColor: 'text-[#E53E3E]',
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
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        const value = values[card.key]

        return (
          <div
            key={card.key}
            className="relative w-full rounded-[30px] border border-[#EDF2F7] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-5 flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]"
            style={{ background: card.gradient }}
          >
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
              <Icon className={`h-5 w-5 ${card.iconColor}`} />
            </div>

            <div>
              <p className="text-[40px] font-bold text-slate-900 leading-none tracking-tight">
                {value}
              </p>
              <p className="text-[15px] font-semibold text-[#1F2937] mt-1">
                {card.label}
              </p>
              <p className="text-[13px] text-[#6B7280] mt-0.5">
                {card.detail}
              </p>
            </div>

            <div className="flex justify-end">
              <div className={`h-[26px] w-[26px] rounded-full ${card.btnBg} flex items-center justify-center`}>
                <ArrowRight className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
