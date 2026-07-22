import { requireRole } from '@/lib/auth/roleGuard'
import { CardManagementPageClient } from '@/components/desk/card-management-page-client'

export const dynamic = 'force-dynamic'

export default async function CardsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <CardManagementPageClient />
}
