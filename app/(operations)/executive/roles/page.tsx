import { requireRole } from '@/lib/auth/roleGuard'
import { RolesClient } from '@/components/dashboard/executive/pages/roles-client'
import prisma from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export default async function RolesPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])

  const users = await prisma.user.findMany({
    select: { role: true, status: true },
  })

  const roleMap = new Map<string, { count: number; active: number; suspended: number }>()

  for (const u of users) {
    const existing = roleMap.get(u.role) ?? { count: 0, active: 0, suspended: 0 }
    existing.count++
    if (u.status === 'ACTIVE') existing.active++
    if (u.status === 'SUSPENDED') existing.suspended++
    roleMap.set(u.role, existing)
  }

  const roles = Array.from(roleMap.entries())
    .map(([role, data]) => ({ role, ...data }))
    .sort((a, b) => b.count - a.count)

  return <RolesClient roles={roles} />
}
