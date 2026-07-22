import { requireRole } from '@/lib/auth/roleGuard'
import { ExecutiveDashboardClient } from '@/components/dashboard/executive/executive-dashboard-client'

export const dynamic = 'force-dynamic'

export default async function ExecutiveDashboardPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <ExecutiveDashboardClient />
}
