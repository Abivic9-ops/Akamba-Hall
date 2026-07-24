import { requireRole } from '@/lib/auth/roleGuard'
import { RoleRequestClient } from '@/components/dashboard/role-request-client'

export const dynamic = 'force-dynamic'

export default async function student_requests_page() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  return <RoleRequestClient baseRole="STUDENT" />
}
