import { requireRole } from '@/lib/auth/roleGuard'
import { get_all_loans } from '@/lib/actions/loans'
import { LoansClient } from '@/components/super-admin/loans-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminLoansPage() {
  await requireRole(['SUPER_ADMIN'])

  const loans = await get_all_loans()

  return <LoansClient loans={loans} />
}
