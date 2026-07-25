import { requireRole } from '@/lib/auth/roleGuard'
import { get_policies } from '@/lib/actions/policies'
import { PoliciesList } from '@/components/shared/policies-list'

export const dynamic = 'force-dynamic'

export default async function ExecutivePoliciesListPage() {
  await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  const policies = await get_policies()

  return <PoliciesList policies={policies} />
}
