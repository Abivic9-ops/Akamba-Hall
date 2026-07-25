import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_loans } from '@/lib/actions/loans'
import { FinesList } from '@/components/shared/fines-list'

export const dynamic = 'force-dynamic'

export default async function ExecutiveFinesPage() {
  const user = await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  const loans = await get_user_loans(user.id)

  return <FinesList loans={loans} />
}
