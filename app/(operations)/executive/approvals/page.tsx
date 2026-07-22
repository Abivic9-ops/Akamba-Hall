import { requireRole } from '@/lib/auth/roleGuard'
import { ApprovalsClient } from '@/components/dashboard/executive/pages/approvals-client'

export const dynamic = 'force-dynamic'

export default async function ApprovalsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <ApprovalsClient />
}
