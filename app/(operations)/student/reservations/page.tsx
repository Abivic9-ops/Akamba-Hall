import { requireRole } from '@/lib/auth/roleGuard'
import { ReservationsPageClient } from '@/components/dashboard/reservations-page-client'

export const dynamic = 'force-dynamic'

export default async function student_reservations_page() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  return <ReservationsPageClient />
}
