import { requireRole } from '@/lib/auth/roleGuard'
import { ReportsPageClient } from '@/components/desk/reports-page-client'

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <ReportsPageClient />
}
