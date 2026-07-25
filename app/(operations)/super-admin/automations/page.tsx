import { requireRole } from '@/lib/auth/roleGuard'
import { AutomationsClient } from '@/components/super-admin/automations-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminAutomationsPage() {
  await requireRole(['SUPER_ADMIN'])

  return <AutomationsClient />
}
