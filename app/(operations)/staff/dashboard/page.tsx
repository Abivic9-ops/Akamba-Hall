import { requireRole } from '@/lib/auth/roleGuard'
import { StaffDashboardClient } from '@/components/dashboard/staff/staff-dashboard-client'
import {
  staff_profile,
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
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  return (
    <StaffDashboardClient
      profile={staff_profile}
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
