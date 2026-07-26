import { requireRole } from '@/lib/auth/roleGuard'
import { get_digital_resources } from '@/lib/actions/resources'
import { getAuthUser } from '@/lib/auth/roleGuard'
import { AdminDigitalResourcesClient } from '@/components/super-admin/admin-digital-resources-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminDigitalResourcesPage() {
  const user = await requireRole(['SUPER_ADMIN'])
  const resources = await get_digital_resources()

  return (
    <AdminDigitalResourcesClient
      resources={resources}
      userId={user.id}
    />
  )
}
