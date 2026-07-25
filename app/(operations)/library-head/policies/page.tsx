import { requireRole } from '@/lib/auth/roleGuard'
import { get_policies } from '@/lib/actions/policies'
import { LibraryHeadPoliciesClient } from '@/components/admin/policies-admin'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadPoliciesPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const policies = await get_policies()
  return <LibraryHeadPoliciesClient policies={policies} />
}
