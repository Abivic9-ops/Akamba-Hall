import { requireRole } from '@/lib/auth/roleGuard'
import { ReservationsPageClient } from '@/components/desk/reservations-page-client'

export const dynamic = 'force-dynamic'

export default async function ReservationsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <ReservationsPageClient />
}
