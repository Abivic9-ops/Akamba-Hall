import { requireRole } from '@/lib/auth/roleGuard'
import { IssueLogPageClient } from '@/components/desk/issue-log-page-client'

export const dynamic = 'force-dynamic'

export default async function IssueLogPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <IssueLogPageClient />
}
