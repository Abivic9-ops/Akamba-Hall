import { requireRole } from '@/lib/auth/roleGuard'
import { EquipmentClient } from '@/components/dashboard/executive/pages/equipment-client'
import { get_equipment } from '@/lib/actions/resources'

export const dynamic = 'force-dynamic'

export default async function EquipmentPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  const equipment = await get_equipment()
  return <EquipmentClient equipment={equipment} />
}
