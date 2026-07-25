import { requireRole } from '@/lib/auth/roleGuard'
import { FeedbackForm } from '@/components/shared/feedback-form'

export const dynamic = 'force-dynamic'

export default async function StudentFeedbackPage() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  return <FeedbackForm portal="student" />
}
