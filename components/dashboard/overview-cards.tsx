'use client'

import { BookOpen, Bookmark, CalendarCheck, Clock, AlertCircle } from 'lucide-react'

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
      accent: 'bg-[#2563EB]',
      iconColor: 'text-[#2563EB]',
      bgTint: 'bg-blue-50',
    },
    {
      icon: Bookmark,
      value: holdsReady,
      label: 'Holds Ready',
      detail: holdsReady > 0 ? 'Pickup before deadline' : 'No holds ready',
      accent: 'bg-[#0D9488]',
      iconColor: 'text-[#0D9488]',
      bgTint: 'bg-teal-50',
    },
    {
      icon: CalendarCheck,
      value: upcomingBookings,
      label: 'Upcoming Bookings',
      detail: nextBookingTime ? `Next: ${nextBookingTime}` : 'No bookings',
      accent: 'bg-amber-500',
      iconColor: 'text-amber-500',
      bgTint: 'bg-amber-50',
    },
    overdueCount > 0
      ? {
          icon: AlertCircle,
          value: overdueCount,
          label: 'Late Items',
          detail: 'Overdue — return now',
          accent: 'bg-red-600',
          iconColor: 'text-red-600',
          bgTint: 'bg-red-50',
        }
      : {
          icon: Clock,
          value: libraryIsOpen ? 'Open' : 'Closed',
          label: 'Library Hours',
          detail: libraryIsOpen ? `Closes ${libraryHours}` : 'Opens tomorrow 7:30 AM',
          accent: 'bg-emerald-600',
          iconColor: 'text-emerald-600',
          bgTint: 'bg-emerald-50',
        },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="relative bg-white rounded-xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all group overflow-hidden"
          >
            {/* left accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl ${card.accent}`} />

            <div className="flex items-start justify-between mb-4 pl-2">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${card.bgTint}`}>
                <Icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
              <span className="text-[13px] text-slate-400 font-normal group-hover:text-slate-600 transition-colors">→</span>
            </div>

            <div className="pl-2">
              <p className="text-[32px] font-medium text-slate-900 leading-tight">
                {card.value}
              </p>
              <p className="text-[15px] font-normal text-slate-600 mt-1">
                {card.label}
              </p>
              <p className="text-[13px] text-slate-400 mt-1">
                {card.detail}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
