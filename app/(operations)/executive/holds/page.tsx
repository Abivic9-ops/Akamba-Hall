import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_holds } from '@/lib/actions/holds'
import { get_user_loans } from '@/lib/actions/loans'
import { HoldsList } from '@/components/shared/holds-list'

export const dynamic = 'force-dynamic'

export default async function ExecutiveHoldsPage() {
  const user = await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  const holds = await get_user_holds(user.id)

  return <HoldsList holds={holds} />
}
