import { requireRole } from '@/lib/auth/roleGuard'
import { get_eresources } from '@/lib/actions/resources'
import { LibraryHeadEResourcesClient } from '@/components/admin/eresources-admin'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadEResourcesPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const eresources = await get_eresources()
  return <LibraryHeadEResourcesClient eresources={eresources} />
}
