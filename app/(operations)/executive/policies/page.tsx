import { requireRole } from '@/lib/auth/roleGuard'
import { PoliciesClient } from '@/components/dashboard/executive/pages/policies-client'

export const dynamic = 'force-dynamic'

export default async function PoliciesPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <PoliciesClient />
}
