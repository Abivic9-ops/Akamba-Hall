import { requireRole } from '@/lib/auth/roleGuard'
import { get_all_newspapers } from '@/lib/actions/newspapers'
import { AdminNewspapersClient } from '@/components/super-admin/admin-newspapers-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminNewspapersPage() {
  await requireRole(['SUPER_ADMIN'])
  const newspapers = await get_all_newspapers()

  return <AdminNewspapersClient newspapers={newspapers} />
}
