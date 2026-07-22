import { requireRole } from '@/lib/auth/roleGuard'
import { ReturnsPageClient } from '@/components/desk/returns-page-client'

export const dynamic = 'force-dynamic'

export default async function ReturnsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <ReturnsPageClient />
}
