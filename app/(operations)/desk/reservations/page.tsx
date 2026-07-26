import { requireRole } from '@/lib/auth/roleGuard'
import { get_all_holds } from '@/lib/actions/holds'
import { ReservationsPageClient } from '@/components/desk/reservations-page-client'

export const dynamic = 'force-dynamic'

export default async function ReservationsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  const holds = await get_all_holds()
  return <ReservationsPageClient holds={holds} />
}
