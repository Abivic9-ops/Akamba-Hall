import { requireRole } from '@/lib/auth/roleGuard'
import { PermissionsClient } from '@/components/super-admin/permissions-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminPermissionsPage() {
  await requireRole(['SUPER_ADMIN'])

  return <PermissionsClient />
}
