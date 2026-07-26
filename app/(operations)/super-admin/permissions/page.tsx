import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { PermissionsClient } from '@/components/super-admin/permissions-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminPermissionsPage() {
  await requireRole(['SUPER_ADMIN'])

  const roleCounts = await prisma.user.groupBy({
    by: ['role'],
    _count: true,
  })

  const countMap: Record<string, number> = {}
  for (const r of roleCounts) {
    countMap[r.role] = r._count
  }

  return <PermissionsClient roleCounts={countMap} />
}
