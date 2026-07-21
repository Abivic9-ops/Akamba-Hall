'use client'

import { WelcomeHeader } from './welcome-header'
import { HeroBanner } from './hero-banner'
import { OverviewCards } from './overview-cards'
import { MyLoans } from './my-loans'
import { Holds } from './holds'
import { QRCard } from './qr-card'
import { Schedule } from './schedule'
import { QuickActions } from './quick-actions'
import { Announcements } from './announcements'
import { LibraryHours } from './library-hours'
import { CatalogueSearch } from './catalogue-search'
import { Support } from './support'

interface Props {
  profile: {
    fullName: string
    membership: { tier: string; points: number; nextTier: string; nextTierPoints: number }
    qrCard: { label: string; memberId: string; status: 'Active' | 'Suspended' }
  }
  loans: { id: string; title: string; author: string; coverUrl: string; dueDate: string; renewable: boolean }[]
  holds: { id: string; title: string; author: string; coverUrl: string; status: 'ready' | 'pending'; queuePosition: number | null; pickupLocation: string | null; pickupDeadline: string | null }[]
  bookings: { id: string; type: 'Reading Seat' | 'AVR' | 'Boardroom'; title: string; location: string; startAt: string; endAt: string; status: 'Approved' | 'Pending' | 'Cancelled' }[]
  announcements: { id: string; type: 'closure' | 'event' | 'eresource' | 'reminder' | 'policy' | 'campaign'; title: string; subtitle: string; createdAt: string }[]
  libraryHours: { isOpen: boolean; closesAt: string; opensTomorrow: string; schedule: { day: string; hours: string; isToday: boolean }[] }
  overdueCount: number
  dueSoonCount: number
}

export function StudentDashboardClient({
  profile,
  loans,
  holds,
  bookings,
  announcements,
  libraryHours,
  overdueCount,
  dueSoonCount,
}: Props) {
  const firstName = profile.fullName.split(' ')[0]

  const holdsReady = holds.filter((h) => h.status === 'ready').length

  const nextBooking = bookings[0]
  const nextBookingTime = nextBooking
    ? new Date(nextBooking.startAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    : ''

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">

        {/* ── Welcome Header ──────────────────────────── */}
        <WelcomeHeader firstName={firstName} />

        {/* ── Overview Cards ──────────────────────────── */}
        <OverviewCards
          activeLoans={loans.length}
          dueSoonCount={dueSoonCount}
          holdsReady={holdsReady}
          upcomingBookings={bookings.length}
          nextBookingTime={nextBookingTime}
          overdueCount={overdueCount}
          libraryIsOpen={libraryHours.isOpen}
          libraryHours={libraryHours.closesAt}
        />

        {/* ── Hero Banner ─────────────────────────────── */}
        <HeroBanner />

        {/* ── My Loans + Holds + QR Card (3-col) ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <MyLoans loans={loans} />
          <Holds holds={holds} />
          <div className="lg:row-span-1">
            <QRCard
              label={profile.qrCard.label}
              memberId={profile.qrCard.memberId}
              userName={profile.fullName}
              status={profile.qrCard.status}
            />
          </div>
        </div>

        {/* ── Schedule + Quick Actions ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          <div className="lg:col-span-3">
            <Schedule bookings={bookings} />
          </div>
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
        </div>

        {/* ── Catalogue | Announcements + Hours + Support ─ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          <div className="lg:col-span-2">
            <CatalogueSearch />
          </div>
          <div className="lg:col-span-3 space-y-4">
            <Announcements announcements={announcements} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <LibraryHours
                isOpen={libraryHours.isOpen}
                closesAt={libraryHours.closesAt}
                opensTomorrow={libraryHours.opensTomorrow}
                schedule={libraryHours.schedule}
              />
              <Support />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
