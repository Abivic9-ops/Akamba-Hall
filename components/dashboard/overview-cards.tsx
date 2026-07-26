'use client'

import Link from 'next/link'
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
      href: '/reservations',
      iconBg: 'bg-[#2155F5]/10 dark:bg-[#2155F5]/20',
      iconColor: 'text-[#2155F5] dark:text-[#5B8DEF]',
      btnBg: 'bg-[#2155F5]',
    },
    {
      icon: Bookmark,
      value: holdsReady,
      label: 'Holds Ready',
      detail: holdsReady > 0 ? 'Pickup before deadline' : 'No holds ready',
      href: '/reservations',
      iconBg: 'bg-[#F4A623]/10 dark:bg-[#F4A623]/20',
      iconColor: 'text-[#F4A623] dark:text-[#FBBF24]',
      btnBg: 'bg-[#F4A623]',
    },
    {
      icon: CalendarCheck,
      value: upcomingBookings,
      label: 'Upcoming Bookings',
      detail: nextBookingTime ? `Next: ${nextBookingTime}` : 'No bookings',
      href: '/reservations',
      iconBg: 'bg-[#18A957]/10 dark:bg-[#18A957]/20',
      iconColor: 'text-[#18A957] dark:text-[#4ADE80]',
      btnBg: 'bg-[#18A957]',
    },
    overdueCount > 0
      ? {
          icon: AlertCircle,
          value: overdueCount,
          label: 'Late Items',
          detail: 'Overdue — return now',
          href: '/reservations',
          iconBg: 'bg-[#E53E3E]/10 dark:bg-[#E53E3E]/20',
          iconColor: 'text-[#E53E3E] dark:text-[#F87171]',
          btnBg: 'bg-[#E53E3E]',
        }
      : {
          icon: Clock,
          value: libraryIsOpen ? 'Open' : 'Closed',
          label: 'Library Hours',
          detail: libraryIsOpen ? `Closes ${libraryHours}` : 'Opens tomorrow 7:30 AM',
          href: '/services',
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
          <Link
            key={card.label}
            href={card.href}
            className="relative w-full rounded-2xl border border-[#EDF2F7] dark:border-white/[0.08] bg-white dark:bg-[#13285A] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-none p-3 md:p-4 flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)] dark:hover:bg-[#1A3368] group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                <Icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
              <div className={`h-[20px] w-[20px] rounded-full ${card.btnBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <ArrowRight className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <p className="text-[20px] md:text-[26px] font-bold text-slate-900 dark:text-[#E2E8F0] leading-none tracking-tight">
                {card.value}
              </p>
              <p className="text-[11px] md:text-[12px] font-semibold text-[#1F2937] dark:text-[#E2E8F0] mt-0.5">
                {card.label}
              </p>
              <p className="text-[10px] md:text-[11px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
                {card.detail}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
