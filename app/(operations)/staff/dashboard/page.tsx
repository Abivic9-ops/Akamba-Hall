import { requireRole } from '@/lib/auth/roleGuard'
import { get_or_create_staff_card } from '@/lib/actions/qr-cards'
import { get_staff_dashboard_data } from '@/lib/actions/dashboard'
import { get_announcements } from '@/lib/actions/announcements'
import { get_events } from '@/lib/actions/events'
import { StaffDashboardClient } from '@/components/dashboard/staff/staff-dashboard-client'

export const dynamic = 'force-dynamic'

const staff_library_hours = {
  isOpen: true,
  closesAt: '6:00 PM',
  opensTomorrow: '7:30 AM',
  schedule: [
    { day: 'Monday', hours: '7:30 AM – 6:00 PM', isToday: new Date().getDay() === 1 },
    { day: 'Tuesday', hours: '7:30 AM – 6:00 PM', isToday: new Date().getDay() === 2 },
    { day: 'Wednesday', hours: '7:30 AM – 6:00 PM', isToday: new Date().getDay() === 3 },
    { day: 'Thursday', hours: '7:30 AM – 6:00 PM', isToday: new Date().getDay() === 4 },
    { day: 'Friday', hours: '7:30 AM – 5:00 PM', isToday: new Date().getDay() === 5 },
    { day: 'Saturday', hours: '8:00 AM – 1:00 PM', isToday: new Date().getDay() === 6 },
    { day: 'Sunday', hours: 'Closed', isToday: new Date().getDay() === 0 },
  ],
}

export default async function StaffDashboardPage() {
  const profile = await requireRole(['STAFF', 'SUPER_ADMIN'])

  let qrCard = {
    label: 'My Digital Access Card',
    memberId: profile?.studentId ?? 'N/A',
    status: 'Active' as 'Active' | 'Suspended',
    qrCodeUrl: undefined as string | undefined,
    cardRef: undefined as string | undefined,
  }

  try {
    const qrResult = await get_or_create_staff_card()
    if (qrResult.success && qrResult.data) {
      qrCard = {
        ...qrCard,
        status: qrResult.data.status === 'SUSPENDED' ? 'Suspended' : 'Active',
        qrCodeUrl: qrResult.data.qrCodeUrl,
        cardRef: qrResult.data.cardRef,
      }
    }
  } catch (e) {
    console.error('[Staff Dashboard] QR card error:', e)
  }

  let dashboardData = {
    loans: [] as { id: string; title: string; author: string; coverUrl: string | null; dueDate: string; renewable: boolean }[],
    holds: [] as { id: string; title: string; author: string; coverUrl: string | null; status: 'pending' | 'ready'; queuePosition: number | null; pickupLocation: string | null; pickupDeadline: string | null }[],
    bookings: [] as { id: string; type: string; title: string; location: string; startAt: string; endAt: string; status: string }[],
    overdue: { overdueCount: 0, dueThisWeek: 0, totalActive: 0 },
  }

  let announcements: { id: string; type: string; title: string; subtitle: string; createdAt: string }[] = []
  let upcomingEvents: { id: string; title: string; date: string; time: string; venue: string }[] = []

  try {
    dashboardData = await get_staff_dashboard_data(profile.id)
  } catch (e) {
    console.error('[Staff Dashboard] Data fetch error:', e)
  }

  try {
    const [announcementsData, eventsData] = await Promise.all([
      get_announcements({ limit: 5 }),
      get_events({ upcoming: true, limit: 5 }),
    ])
    announcements = announcementsData.map((a) => ({
      id: a.id,
      type: a.category,
      title: a.title,
      subtitle: a.body,
      createdAt: a.publishedAt,
    }))
    upcomingEvents = eventsData.map((e) => ({
      id: e.id,
      title: e.title,
      date: e.startTime,
      time: `${new Date(e.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} – ${new Date(e.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`,
      venue: e.venue ?? 'TBA',
    }))
  } catch (e) {
    console.error('[Staff Dashboard] Announcements/events error:', e)
  }

  return (
    <StaffDashboardClient
      profile={{
        fullName: profile?.fullName ?? 'Staff Member',
        title: 'Mr.',
        studentId: profile?.studentId ?? 'N/A',
        memberType: profile?.memberType ?? 'STAFF',
        membership: { tier: 'Staff', points: 0, nextTier: '', nextTierPoints: 0 },
        qrCard,
      }}
      loans={dashboardData.loans.map((l) => ({ ...l, coverUrl: l.coverUrl ?? '' }))}
      holds={dashboardData.holds.map((h) => ({ ...h, coverUrl: h.coverUrl ?? '' }))}
      bookings={dashboardData.bookings.map((b) => ({ ...b, type: b.type as 'Reading Seat' | 'AVR' | 'Boardroom', status: b.status as 'Approved' | 'Pending' | 'Cancelled' | 'Confirmed' }))}
      announcements={announcements.map((a) => ({ ...a, type: a.type as 'closure' | 'acquisition' | 'workshop' | 'ict' | 'policy' }))}
      libraryHours={staff_library_hours}
      recentActivity={[]}
      upcomingEvents={upcomingEvents}
      overdue={dashboardData.overdue}
      unreadAlerts={dashboardData.overdue.overdueCount}
    />
  )
}
