import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_holds } from '@/lib/actions/holds'
import { HoldsList } from '@/components/shared/holds-list'

export const dynamic = 'force-dynamic'

export default async function StudentHoldsPage() {
  const profile = await requireRole(['STUDENT', 'SUPER_ADMIN'])
  const holds = await get_user_holds(profile.id)
  return <HoldsList holds={holds} />
}
