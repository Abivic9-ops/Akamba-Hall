import { requireRole } from '@/lib/auth/roleGuard'
import { get_or_create_staff_card } from '@/lib/actions/qr-cards'
import { StaffDashboardClient } from '@/components/dashboard/staff/staff-dashboard-client'
import {
  staff_loans,
  staff_holds,
  staff_bookings,
  staff_announcements,
  staff_library_hours,
  staff_recent_activity,
  staff_upcoming_events,
  staff_overdue,
} from '@/lib/mock/staff-data'

export default async function StaffDashboardPage() {
  const profile = await requireRole(['STAFF', 'SUPER_ADMIN'])

  // Fetch or create staff QR card from database — wrapped so a QR failure
  // never prevents the dashboard from loading.
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

  return (
    <StaffDashboardClient
      profile={{
        fullName: profile?.fullName ?? 'Staff Member',
        title: 'Mr.',
        studentId: profile?.studentId ?? 'N/A',
        memberType: profile?.memberType ?? 'STAFF',
        membership: { tier: 'Silver Scholar', points: 2340, nextTier: 'Gold Scholar', nextTierPoints: 3000 },
        qrCard,
      }}
      loans={staff_loans}
      holds={staff_holds}
      bookings={staff_bookings}
      announcements={staff_announcements}
      libraryHours={staff_library_hours}
      recentActivity={staff_recent_activity}
      upcomingEvents={staff_upcoming_events}
      overdue={staff_overdue}
      unreadAlerts={2}
    />
  )
}
