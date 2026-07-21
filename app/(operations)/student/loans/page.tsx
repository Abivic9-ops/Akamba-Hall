import { requireRole } from '@/lib/auth/roleGuard'
import { LoansPageClient } from '@/components/dashboard/loans-page-client'

export const dynamic = 'force-dynamic'

export default async function student_loans_page() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  return <LoansPageClient />
}
