import { requireRole } from '@/lib/auth/roleGuard'
import { get_eresources } from '@/lib/actions/resources'
import { EResourcesList } from '@/components/shared/eresources-list'

export const dynamic = 'force-dynamic'

export default async function ExecutiveEResourcesPage() {
  await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  const resources = await get_eresources()

  return <EResourcesList resources={resources} />
}
