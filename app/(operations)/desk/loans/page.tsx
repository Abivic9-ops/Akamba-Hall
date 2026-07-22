import { requireRole } from '@/lib/auth/roleGuard'
import { LoansPageClient } from '@/components/desk/loans-page-client'

export const dynamic = 'force-dynamic'

export default async function LoansPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <LoansPageClient />
}
