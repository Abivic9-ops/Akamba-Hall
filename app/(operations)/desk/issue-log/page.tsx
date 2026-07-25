import { requireRole } from '@/lib/auth/roleGuard'
import { get_all_loans } from '@/lib/actions/loans'
import { IssueLogPageClient } from '@/components/desk/issue-log-page-client'

export const dynamic = 'force-dynamic'

export default async function IssueLogPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const loans = await get_all_loans({ limit: 100 })

  const transactions = loans.map((l) => ({
    id: l.id,
    type: l.returnedAt ? 'return' as const : 'issue' as const,
    itemTitle: l.bookTitle,
    memberName: l.memberName,
    memberId: l.memberId,
    category: 'Book',
    timestamp: l.returnedAt ?? l.checkoutAt,
    status: l.returnedAt ? 'Returned' as const : l.status === 'overdue' ? 'Overdue' as const : 'Issued' as const,
  }))

  return <IssueLogPageClient transactions={transactions} />
}
