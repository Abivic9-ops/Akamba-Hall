import { requireRole } from '@/lib/auth/roleGuard'
import { BookingsPageClient } from '@/components/dashboard/bookings-page-client'

export const dynamic = 'force-dynamic'

export default async function student_bookings_page() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  return <BookingsPageClient />
}
