import { requireRole } from '@/lib/auth/roleGuard'
import { AuditTrailsClient } from '@/components/super-admin/audit-trails-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminAuditTrailsPage() {
  await requireRole(['SUPER_ADMIN'])

  return <AuditTrailsClient />
}
