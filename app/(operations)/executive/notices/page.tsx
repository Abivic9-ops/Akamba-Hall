import { requireRole } from '@/lib/auth/roleGuard'
import { NoticesClient } from '@/components/dashboard/executive/pages/notices-client'

export const dynamic = 'force-dynamic'

export default async function NoticesPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <NoticesClient />
}
