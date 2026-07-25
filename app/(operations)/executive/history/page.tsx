import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_loans } from '@/lib/actions/loans'
import { HistoryList } from '@/components/shared/history-list'

export const dynamic = 'force-dynamic'

export default async function ExecutiveHistoryPage() {
  const user = await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  const loans = await get_user_loans(user.id)

  return <HistoryList loans={loans} />
}
