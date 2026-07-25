import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_loans } from '@/lib/actions/loans'
import { HistoryList } from '@/components/shared/history-list'

export const dynamic = 'force-dynamic'

export default async function StudentHistoryPage() {
  const profile = await requireRole(['STUDENT', 'SUPER_ADMIN'])
  const loans = await get_user_loans(profile.id)
  return <HistoryList loans={loans} />
}
