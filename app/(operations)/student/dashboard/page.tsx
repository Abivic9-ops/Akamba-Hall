import { requireRole } from '@/lib/auth/roleGuard'
import { get_or_create_qr_card } from '@/lib/actions/qr-cards'
import { get_student_dashboard_data } from '@/lib/actions/dashboard'
import { get_announcements } from '@/lib/actions/announcements'
import { get_events } from '@/lib/actions/events'
import { StudentDashboardClient } from '@/components/dashboard/student-dashboard-client'

export const dynamic = 'force-dynamic'

function get_library_hours() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()
  const minute = now.getMinutes()

  const isWeekday = day >= 1 && day <= 5
  const isSaturday = day === 6

  const weekdayCloses = 18
  const saturdayCloses = 13

  let isOpen = false
  let closesAt = ''

  if (isWeekday && hour >= 7 && (hour < weekdayCloses || (hour === 7 && minute >= 30))) {
    isOpen = true
    closesAt = '6:00 PM'
  } else if (isSaturday && hour >= 8 && hour < saturdayCloses) {
    isOpen = true
    closesAt = '1:00 PM'
  }

  const schedule = [
    { day: 'Mon – Fri', hours: '7:30 AM – 6:00 PM', isToday: isWeekday },
    { day: 'Saturday', hours: '8:00 AM – 1:00 PM', isToday: isSaturday },
    { day: 'Sunday', hours: 'Closed', isToday: day === 0 },
  ]

  return {
    isOpen,
    closesAt,
    opensTomorrow: isSaturday ? 'Monday 7:30 AM' : day === 0 ? 'Tomorrow 7:30 AM' : 'Tomorrow 7:30 AM',
    schedule,
  }
}

export default async function StudentDashboardPage() {
  const profile = await requireRole(['STUDENT', 'SUPER_ADMIN'])

  const firstName = (profile?.fullName ?? 'Student').split(' ')[0]
  const studentId = profile?.studentId ?? 'N/A'

  let qrCard = {
    label: 'My QR Access Card',
    memberId: studentId,
    status: 'Active' as 'Active' | 'Suspended',
    qrCodeUrl: undefined as string | undefined,
    cardRef: undefined as string | undefined,
  }

  try {
    const qrResult = await get_or_create_qr_card()
    if (qrResult.success && qrResult.data) {
      qrCard = {
        ...qrCard,
        status: qrResult.data.status === 'SUSPENDED' ? 'Suspended' : 'Active',
        qrCodeUrl: qrResult.data.qrCodeUrl,
        cardRef: qrResult.data.cardRef,
      }
    }
  } catch (e) {
    console.error('[Student Dashboard] QR card error:', e)
  }

  let dashboardData: { loans: { id: string; title: string; author: string; coverUrl: string | null; dueDate: string; renewable: boolean }[]; holds: { id: string; title: string; author: string; coverUrl: string | null; status: 'pending' | 'ready'; queuePosition: number | null; pickupLocation: string | null; pickupDeadline: string | null }[]; bookings: { id: string; type: string; title: string; location: string; startAt: string; endAt: string; status: string }[]; overdueCount: number; dueSoonCount: number } = { loans: [], holds: [], bookings: [], overdueCount: 0, dueSoonCount: 0 }

  try {
    dashboardData = await get_student_dashboard_data(profile.id)
  } catch (e) {
    console.error('[Student Dashboard] Data fetch error:', e)
  }

  let announcements: { id: string; type: string; title: string; subtitle: string; createdAt: string }[] = []
  let upcomingEvents: { id: string; title: string; date: string; time: string; venue: string }[] = []

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
    console.error('[Student Dashboard] Announcements/events error:', e)
  }

  return (
    <StudentDashboardClient
      profile={{
        fullName: profile?.fullName ?? firstName,
        membership: { tier: 'Reader', points: 0, nextTier: 'Gold Reader', nextTierPoints: 1000 },
        qrCard,
      }}
      loans={dashboardData.loans}
      holds={dashboardData.holds}
      bookings={dashboardData.bookings}
      announcements={announcements.map((a) => ({ ...a, type: a.type as 'closure' | 'event' | 'eresource' | 'reminder' | 'policy' | 'campaign' }))}
      libraryHours={get_library_hours()}
      overdueCount={dashboardData.overdueCount}
      dueSoonCount={dashboardData.dueSoonCount}
    />
  )
}
