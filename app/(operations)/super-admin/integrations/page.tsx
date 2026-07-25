import { requireRole } from '@/lib/auth/roleGuard'
import { IntegrationsClient } from '@/components/super-admin/integrations-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminIntegrationsPage() {
  await requireRole(['SUPER_ADMIN'])

  return <IntegrationsClient />
}
