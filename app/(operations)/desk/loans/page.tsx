import { requireRole } from '@/lib/auth/roleGuard'
import { get_all_loans } from '@/lib/actions/loans'
import { LoansPageClient } from '@/components/desk/loans-page-client'

export const dynamic = 'force-dynamic'

export default async function LoansPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  const loans = await get_all_loans()
  return <LoansPageClient loans={loans} />
}
