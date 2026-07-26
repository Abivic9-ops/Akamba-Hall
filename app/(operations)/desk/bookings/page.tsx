import { requireRole } from '@/lib/auth/roleGuard'
import { get_all_bookings } from '@/lib/actions/bookings'
import { BookingsPageClient } from '@/components/desk/bookings-page-client'

export const dynamic = 'force-dynamic'

export default async function BookingsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  const bookings = await get_all_bookings()
  return <BookingsPageClient bookings={bookings} />
}
