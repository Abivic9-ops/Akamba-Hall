import { requireRole } from '@/lib/auth/roleGuard'
import { get_issue_logs } from '@/lib/actions/issue-log'
import { FeedbackInboxClient } from '@/components/dashboard/library-head/feedback-inbox-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadFeedbackPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const issues = await get_issue_logs()

  return <FeedbackInboxClient issues={issues} />
}
