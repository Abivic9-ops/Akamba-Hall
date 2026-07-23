'use client'

import { StaffWelcomeHeader } from './staff-welcome-header'
import { StaffOverviewCards } from './staff-overview-cards'
import { StaffHeroBanner } from './staff-hero-banner'
import { MyLoans } from '@/components/dashboard/my-loans'
import { StaffHoldReady } from './staff-hold-ready'
import { StaffDigitalCard } from './staff-digital-card'
import { Schedule } from '@/components/dashboard/schedule'
import { StaffQuickActions } from './staff-quick-actions'
import { StaffOverdueSummary } from './staff-overdue-summary'
import { StaffAnnouncements } from './staff-announcements'
import { StaffRecentActivity } from './staff-recent-activity'
import { StaffUpcomingEvents } from './staff-upcoming-events'
import { LibraryHours } from '@/components/dashboard/library-hours'

interface Props {
  profile: {
    fullName: string
    title: string
    studentId: string
    memberType: string
    membership: { tier: string; points: number; nextTier: string; nextTierPoints: number }
    qrCard: { label: string; memberId: string; status: 'Active' | 'Suspended'; qrCodeUrl?: string; cardRef?: string }
  }
  loans: { id: string; title: string; author: string; coverUrl: string; dueDate: string; renewable: boolean }[]
  holds: { id: string; title: string; author: string; coverUrl: string; status: 'ready' | 'pending'; queuePosition: number | null; pickupLocation: string | null; pickupDeadline: string | null }[]
  bookings: { id: string; type: 'Reading Seat' | 'AVR' | 'Boardroom'; title: string; location: string; startAt: string; endAt: string; status: 'Approved' | 'Pending' | 'Cancelled' | 'Confirmed' }[]
  announcements: { id: string; type: 'closure' | 'acquisition' | 'workshop' | 'ict' | 'policy'; title: string; subtitle: string; createdAt: string }[]
  libraryHours: { isOpen: boolean; closesAt: string; opensTomorrow: string; schedule: { day: string; hours: string; isToday: boolean }[] }
  recentActivity: { id: string; type: 'renewal' | 'seat_booking' | 'hold_pickup' | 'avr_booking' | 'book_suggestion' | 'return'; description: string; detail: string; timestamp: string }[]
  upcomingEvents: { id: string; title: string; date: string; time: string; venue: string }[]
  overdue: { overdueCount: number; dueThisWeek: number; totalActive: number }
  unreadAlerts: number
}

export function StaffDashboardClient({
  profile,
  loans,
  holds,
  bookings,
  announcements,
  libraryHours,
  recentActivity,
  upcomingEvents,
  overdue,
  unreadAlerts,
}: Props) {
  const nameParts = profile.fullName.split(' ')
  const surname = nameParts[nameParts.length - 1]

  const holdsReady = holds.filter((h) => h.status === 'ready').length

  const nextBooking = bookings[0]
  const nextBookingTime = nextBooking
    ? new Date(nextBooking.startAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    : ''

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">

        {/* ── Welcome Header ──────────────────────────── */}
        <StaffWelcomeHeader title={profile.title} surname={surname} />

        {/* ── Overview Cards (5-col) ──────────────────── */}
        <StaffOverviewCards
          activeLoans={loans.length}
          holdsReady={holdsReady}
          upcomingBookings={bookings.length}
          nextBookingTime={nextBookingTime}
          libraryPoints={profile.membership.points}
          membershipTier={profile.membership.tier}
          unreadAlerts={unreadAlerts}
        />

        {/* ── Hero Banner (Faculty Spotlight) ─────────── */}
        <StaffHeroBanner />

        {/* ── My Loans + Hold Ready + Digital Card ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <MyLoans loans={loans} />
          <StaffHoldReady holds={holds} />
          <StaffDigitalCard
            label={profile.qrCard.label}
            memberId={profile.qrCard.memberId}
            userName={profile.fullName}
            status={profile.qrCard.status}
            qrCodeUrl={profile.qrCard.qrCodeUrl}
            cardRef={profile.qrCard.cardRef}
          />
        </div>

        {/* ── Schedule + Quick Actions ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          <div className="lg:col-span-3">
            <Schedule bookings={bookings} />
          </div>
          <div className="lg:col-span-2">
            <StaffQuickActions />
          </div>
        </div>

        {/* ── Announcements + Recent Activity + Overdue Summary (3-col) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <StaffAnnouncements announcements={announcements} />
          <StaffRecentActivity activities={recentActivity} />
          <StaffOverdueSummary
            overdueCount={overdue.overdueCount}
            dueThisWeek={overdue.dueThisWeek}
            totalActive={overdue.totalActive}
          />
        </div>

        {/* ── Upcoming Events + Library Hours ──────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          <div className="lg:col-span-3">
            <StaffUpcomingEvents events={upcomingEvents} />
          </div>
          <div className="lg:col-span-2">
            <LibraryHours
              isOpen={libraryHours.isOpen}
              closesAt={libraryHours.closesAt}
              opensTomorrow={libraryHours.opensTomorrow}
              schedule={libraryHours.schedule}
            />
          </div>
        </div>

      </div>
    </div>
  )
}
