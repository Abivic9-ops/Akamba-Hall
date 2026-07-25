import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_bookmarks } from '@/lib/actions/bookmarks'
import { ReservationsPageClient } from '@/components/dashboard/reservations-page-client'

export const dynamic = 'force-dynamic'

export default async function student_reservations_page() {
  const profile = await requireRole(['STUDENT', 'SUPER_ADMIN'])
  const bookmarks = await get_user_bookmarks(profile.id)
  return <ReservationsPageClient bookmarks={bookmarks} />
}
