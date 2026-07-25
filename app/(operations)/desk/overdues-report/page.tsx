import { requireRole } from '@/lib/auth/roleGuard'
import { get_overdue_loans } from '@/lib/actions/loans'
import { OverduesReportPageClient } from '@/components/desk/overdues-report-page-client'

export const dynamic = 'force-dynamic'

export default async function OverduesReportPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const overdueLoans = await get_overdue_loans()

  const overdueItems = overdueLoans.map((l) => ({
    id: l.id,
    bookTitle: l.bookTitle,
    member: l.memberName,
    studentId: l.memberId,
    dueDate: new Date(l.dueAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }),
    daysOverdue: l.daysOverdue,
    fine: l.daysOverdue * 50,
    status: l.daysOverdue >= 7 ? 'Severe' : l.daysOverdue >= 4 ? 'Critical' : 'Warning',
  }))

  return <OverduesReportPageClient overdueItems={overdueItems} />
}
