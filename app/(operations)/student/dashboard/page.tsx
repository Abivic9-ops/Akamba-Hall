import { requireRole } from '@/lib/auth/roleGuard'
import { get_or_create_qr_card } from '@/lib/actions/qr-cards'
import { StudentDashboardClient } from '@/components/dashboard/student-dashboard-client'
import {
  active_loans,
  holds,
  bookings,
  announcements,
  library_hours,
  overdue_count,
} from '@/lib/mock/student-data'

export const dynamic = 'force-dynamic'

export default async function student_dashboard_page() {
  const profile = await requireRole(['STUDENT', 'SUPER_ADMIN'])

  const firstName = (profile?.fullName ?? 'Student').split(' ')[0]
  const studentId = profile?.studentId ?? 'N/A'

  // Fetch or create QR card from database — wrapped in try/catch so a QR
  // failure never prevents the dashboard from loading.
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

  const now = Date.now()
  const due_soon_count = active_loans.filter((l) => {
    const days = Math.ceil((new Date(l.dueDate).getTime() - now) / (1000 * 60 * 60 * 24))
    return days >= 0 && days <= 7
  }).length

  return (
    <StudentDashboardClient
      profile={{
        fullName: profile?.fullName ?? firstName,
        membership: { tier: 'Gold Reader', points: 1240, nextTier: 'Platinum Scholar', nextTierPoints: 2000 },
        qrCard,
      }}
      loans={active_loans}
      holds={holds}
      bookings={bookings}
      announcements={announcements}
      libraryHours={library_hours}
      overdueCount={overdue_count}
      dueSoonCount={due_soon_count}
    />
  )
}
