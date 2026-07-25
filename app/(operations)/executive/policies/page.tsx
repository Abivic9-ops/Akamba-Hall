import { requireRole } from '@/lib/auth/roleGuard'
import { PoliciesClient } from '@/components/dashboard/executive/pages/policies-client'
import { get_policies } from '@/lib/actions/policies'

export const dynamic = 'force-dynamic'

export default async function PoliciesPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  const policies = await get_policies()
  return <PoliciesClient policies={policies} />
}
