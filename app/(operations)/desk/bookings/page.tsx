import { requireRole } from '@/lib/auth/roleGuard'
import { BookingsPageClient } from '@/components/desk/bookings-page-client'

export const dynamic = 'force-dynamic'

export default async function BookingsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <BookingsPageClient />
}
