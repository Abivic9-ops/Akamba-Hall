import { requireRole } from '@/lib/auth/roleGuard'
import { BackupsClient } from '@/components/super-admin/backups-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminBackupsPage() {
  await requireRole(['SUPER_ADMIN'])

  return <BackupsClient />
}
