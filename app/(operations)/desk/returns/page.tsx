import { requireRole } from '@/lib/auth/roleGuard'
import { get_all_loans } from '@/lib/actions/loans'
import { ReturnsPageClient } from '@/components/desk/returns-page-client'

export const dynamic = 'force-dynamic'

export default async function ReturnsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const allLoans = await get_all_loans({ limit: 50 })
  const todayStr = new Date().toISOString().split('T')[0]

  const todayReturns = allLoans
    .filter((l) => l.returnedAt && l.returnedAt.startsWith(todayStr))
    .map((l) => ({
      id: l.id,
      title: l.bookTitle,
      author: l.author,
      dueDate: l.dueAt,
      returnedAt: l.returnedAt!,
    }))

  return <ReturnsPageClient todayReturns={todayReturns} />
}
