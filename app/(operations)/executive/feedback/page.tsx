import { requireRole } from '@/lib/auth/roleGuard'
import { FeedbackForm } from '@/components/shared/feedback-form'

export const dynamic = 'force-dynamic'

export default async function ExecutiveFeedbackPage() {
  await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  return <FeedbackForm portal="executive" />
}
