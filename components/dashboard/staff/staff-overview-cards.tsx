'use client'

import { BookOpen, Bookmark, CalendarCheck, Star, Bell, ArrowRight } from 'lucide-react'

interface StaffOverviewCardsProps {
  activeLoans: number
  holdsReady: number
  upcomingBookings: number
  nextBookingTime: string
  libraryPoints: number
  membershipTier: string
  unreadAlerts: number
}

export function StaffOverviewCards({
  activeLoans,
  holdsReady,
  upcomingBookings,
  nextBookingTime,
  libraryPoints,
  membershipTier,
  unreadAlerts,
}: StaffOverviewCardsProps) {
  const cards = [
    {
      icon: BookOpen,
      value: activeLoans,
      label: 'Active Loans',
      detail: 'Due this week',
      gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F4F8FF 50%, #E8F1FF 100%)',
      iconBg: 'bg-[#2155F5]/10',
      iconColor: 'text-[#2155F5]',
      btnBg: 'bg-[#2155F5]',
    },
    {
      icon: Bookmark,
      value: holdsReady,
      label: 'Hold Ready',
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
    {
      icon: Star,
      value: libraryPoints.toLocaleString(),
      label: 'Library Points',
      detail: membershipTier,
      gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FBF7FF 50%, #F3E9FF 100%)',
      iconBg: 'bg-[#8B5CF6]/10',
      iconColor: 'text-[#8B5CF6]',
      btnBg: 'bg-[#8B5CF6]',
    },
    {
      icon: Bell,
      value: unreadAlerts,
      label: 'Unread Alerts',
      detail: unreadAlerts === 0 ? 'All caught up' : 'Notifications',
      gradient: unreadAlerts === 0
        ? 'linear-gradient(135deg, #FFFFFF 0%, #F4FFF9 50%, #E7FAEF 100%)'
        : 'linear-gradient(135deg, #FFFFFF 0%, #FFFDF6 50%, #FFF5D8 100%)',
      iconBg: unreadAlerts === 0 ? 'bg-[#18A957]/10' : 'bg-[#F4A623]/10',
      iconColor: unreadAlerts === 0 ? 'text-[#18A957]' : 'text-[#F4A623]',
      btnBg: unreadAlerts === 0 ? 'bg-[#18A957]' : 'bg-[#F4A623]',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="relative w-full rounded-[30px] border border-[#EDF2F7] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-5 flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]"
            style={{ background: card.gradient }}
          >
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
              <Icon className={`h-5 w-5 ${card.iconColor}`} />
            </div>

            <div>
              <p className="text-[40px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0] leading-none tracking-tight">
                {card.value}
              </p>
              <p className="text-[15px] font-semibold text-[#1F2937] dark:text-[#E2E8F0] dark:text-[#E2E8F0] mt-1">
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
