import { requireRole } from '@/lib/auth/roleGuard'
import { StudentDashboardClient } from '@/components/dashboard/student-dashboard-client'
import {
  student_profile,
  active_loans,
  holds,
  bookings,
  announcements,
  library_hours,
  overdue_count,
} from '@/lib/mock/student-data'

export const dynamic = 'force-dynamic'

export default async function student_dashboard_page() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])

  const now = Date.now()
  const due_soon_count = active_loans.filter((l) => {
    const days = Math.ceil((new Date(l.dueDate).getTime() - now) / (1000 * 60 * 60 * 24))
    return days >= 0 && days <= 7
  }).length

  return (
    <StudentDashboardClient
      profile={student_profile}
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
