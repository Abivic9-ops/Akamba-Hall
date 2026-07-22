import { requireRole } from '@/lib/auth/roleGuard'
import { MemberManagementPageClient } from '@/components/desk/member-management-page-client'

export const dynamic = 'force-dynamic'

export default async function MembersPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <MemberManagementPageClient />
}
