import { requireRole } from '@/lib/auth/roleGuard'
import { getAuthUser } from '@/lib/auth/roleGuard'
import { get_digital_resources } from '@/lib/actions/resources'
import { AdminDigitalResourcesClient } from '@/components/super-admin/admin-digital-resources-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadDigitalResourcesPage() {
  const user = await requireRole(['LIBRARY_HEAD'])
  const resources = await get_digital_resources()

  return (
    <AdminDigitalResourcesClient
      resources={resources}
      userId={user.id}
    />
  )
}
