import { requireRole } from '@/lib/auth/roleGuard'
import { RoleRequestClient } from '@/components/dashboard/role-request-client'

export const dynamic = 'force-dynamic'

export default async function staff_requests_page() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])
  return <RoleRequestClient baseRole="STAFF" />
}
