'use client'

import { BookOpen, Bookmark, CalendarCheck, Clock, AlertCircle, ArrowRight } from 'lucide-react'

interface OverviewCardsProps {
  activeLoans: number
  dueSoonCount: number
  holdsReady: number
  upcomingBookings: number
  nextBookingTime: string
  overdueCount: number
  libraryIsOpen: boolean
  libraryHours: string
}

export function OverviewCards({
  activeLoans,
  dueSoonCount,
  holdsReady,
  upcomingBookings,
  nextBookingTime,
  overdueCount,
  libraryIsOpen,
  libraryHours,
}: OverviewCardsProps) {
  const cards = [
    {
      icon: BookOpen,
      value: activeLoans,
      label: 'Active Loans',
      detail: dueSoonCount > 0 ? `${dueSoonCount} due soon` : 'All on track',
      gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F4F8FF 50%, #E8F1FF 100%)',
      iconBg: 'bg-[#2155F5]/10',
      iconColor: 'text-[#2155F5]',
      btnBg: 'bg-[#2155F5]',
    },
    {
      icon: Bookmark,
      value: holdsReady,
      label: 'Holds Ready',
      detail: holdsReady > 0 ? 'Pickup before deadline' : 'No holds ready',
      gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FFFDF6 50%, #FFF5D8 100%)',
      iconBg: 'bg-[#F4A623]/10',
      iconColor: 'text-[#F4A623]',
      btnBg: 'bg-[#F4A623]',
    },
    {
      icon: CalendarCheck,
      value: upcomingBookings,
      label: 'Upcoming Bookings',
      detail: nextBookingTime ? `Next: ${nextBookingTime}` : 'No bookings',
      gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F4FFF9 50%, #E7FAEF 100%)',
      iconBg: 'bg-[#18A957]/10',
      iconColor: 'text-[#18A957]',
      btnBg: 'bg-[#18A957]',
    },
    overdueCount > 0
      ? {
          icon: AlertCircle,
          value: overdueCount,
          label: 'Late Items',
          detail: 'Overdue — return now',
          gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 50%, #FFE8E8 100%)',
          iconBg: 'bg-[#E53E3E]/10',
          iconColor: 'text-[#E53E3E]',
          btnBg: 'bg-[#E53E3E]',
        }
      : {
          icon: Clock,
          value: libraryIsOpen ? 'Open' : 'Closed',
          label: 'Library Hours',
          detail: libraryIsOpen ? `Closes ${libraryHours}` : 'Opens tomorrow 7:30 AM',
          gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FBF7FF 50%, #F3E9FF 100%)',
          iconBg: 'bg-[#8B5CF6]/10',
          iconColor: 'text-[#8B5CF6]',
          btnBg: 'bg-[#8B5CF6]',
        },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="relative w-full rounded-2xl border border-[#EDF2F7] dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-3.5 flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-none"
            style={{ background: card.gradient }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                <Icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
              <div className={`h-[20px] w-[20px] rounded-full ${card.btnBg} flex items-center justify-center`}>
                <ArrowRight className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <p className="text-[22px] sm:text-[26px] font-bold text-slate-900 dark:text-[#E2E8F0] leading-none tracking-tight">
                {card.value}
              </p>
              <p className="text-[11px] sm:text-[12px] font-semibold text-[#1F2937] dark:text-[#E2E8F0] mt-0.5">
                {card.label}
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
                {card.detail}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
