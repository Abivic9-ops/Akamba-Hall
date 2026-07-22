import { requireRole } from '@/lib/auth/roleGuard'
import { EquipmentClient } from '@/components/dashboard/executive/pages/equipment-client'

export const dynamic = 'force-dynamic'

export default async function EquipmentPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <EquipmentClient />
}
