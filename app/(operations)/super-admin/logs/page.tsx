import { requireRole } from '@/lib/auth/roleGuard'
import { LogsClient } from '@/components/super-admin/logs-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminLogsPage() {
  await requireRole(['SUPER_ADMIN'])

  return <LogsClient />
}
