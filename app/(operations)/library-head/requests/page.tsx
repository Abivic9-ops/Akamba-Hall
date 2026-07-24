import { requireRole } from '@/lib/auth/roleGuard'
import { ApprovalQueueClient } from '@/components/dashboard/library-head/approval-queue-client'

export const dynamic = 'force-dynamic'

export default async function library_head_requests_page() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  return <ApprovalQueueClient />
}
