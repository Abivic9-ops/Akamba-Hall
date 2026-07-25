import { requireRole } from '@/lib/auth/roleGuard'
import { FeedbackForm } from '@/components/shared/feedback-form'

export const dynamic = 'force-dynamic'

export default async function DeskFeedbackPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  return <FeedbackForm portal="desk" />
}
