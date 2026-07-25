import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_loans } from '@/lib/actions/loans'
import { FinesList } from '@/components/shared/fines-list'

export const dynamic = 'force-dynamic'

export default async function StudentFinesPage() {
  const profile = await requireRole(['STUDENT', 'SUPER_ADMIN'])
  const loans = await get_user_loans(profile.id)
  return <FinesList loans={loans} />
}
