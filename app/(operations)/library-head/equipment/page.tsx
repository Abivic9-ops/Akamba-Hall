import { requireRole } from '@/lib/auth/roleGuard'
import { get_equipment } from '@/lib/actions/resources'
import { EquipmentList } from '@/components/dashboard/library-head/equipment-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadEquipmentPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const equipment = await get_equipment()

  return <EquipmentList equipment={equipment} />
}
