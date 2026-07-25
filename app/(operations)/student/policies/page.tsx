import { requireRole } from '@/lib/auth/roleGuard'
import { get_policies } from '@/lib/actions/policies'
import { PoliciesList } from '@/components/shared/policies-list'

export const dynamic = 'force-dynamic'

export default async function StudentPoliciesPage() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  const policies = await get_policies()
  return <PoliciesList policies={policies} />
}
