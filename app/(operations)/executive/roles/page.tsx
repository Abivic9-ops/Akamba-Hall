import { requireRole } from '@/lib/auth/roleGuard'
import { RolesClient } from '@/components/dashboard/executive/pages/roles-client'

export const dynamic = 'force-dynamic'

export default async function RolesPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <RolesClient />
}
