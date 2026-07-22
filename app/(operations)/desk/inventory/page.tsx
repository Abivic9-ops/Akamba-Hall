import { requireRole } from '@/lib/auth/roleGuard'
import { InventoryPageClient } from '@/components/desk/inventory-page-client'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <InventoryPageClient />
}
