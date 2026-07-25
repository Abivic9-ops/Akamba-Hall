import { requireRole } from '@/lib/auth/roleGuard'
import { get_eresources } from '@/lib/actions/resources'
import { EResourcesList } from '@/components/shared/eresources-list'

export const dynamic = 'force-dynamic'

export default async function DeskEresourcesPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const eresources = await get_eresources()

  return <EResourcesList resources={eresources} />
}
