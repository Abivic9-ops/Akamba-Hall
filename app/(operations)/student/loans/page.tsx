import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_loans } from '@/lib/actions/loans'
import { LoansPageClient } from '@/components/dashboard/loans-page-client'

export const dynamic = 'force-dynamic'

export default async function student_loans_page() {
  const profile = await requireRole(['STUDENT', 'SUPER_ADMIN'])
  const loans = await get_user_loans(profile.id)
  return <LoansPageClient loans={loans} />
}
