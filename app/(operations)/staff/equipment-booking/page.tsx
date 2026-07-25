import { requireRole } from '@/lib/auth/roleGuard'
import { get_equipment } from '@/lib/actions/resources'
import { EquipmentList } from '@/components/shared/equipment-list'

export const dynamic = 'force-dynamic'

export default async function StaffEquipmentBookingPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const equipment = await get_equipment()

  return <EquipmentList equipment={equipment} />
}
