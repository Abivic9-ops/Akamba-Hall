import { requireRole } from '@/lib/auth/roleGuard'
import { AccountsClient } from '@/components/dashboard/executive/pages/accounts-client'

export const dynamic = 'force-dynamic'

export default async function AccountsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <AccountsClient />
}
