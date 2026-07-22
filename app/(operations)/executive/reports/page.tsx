import { requireRole } from '@/lib/auth/roleGuard'
import { ReportsClient } from '@/components/dashboard/executive/pages/reports-client'

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <ReportsClient />
}
