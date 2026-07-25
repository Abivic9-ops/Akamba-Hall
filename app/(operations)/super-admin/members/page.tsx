import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { MembersClient } from '@/components/super-admin/members-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminMembersPage() {
  await requireRole(['SUPER_ADMIN'])

  const members = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      studentId: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const serialized = members.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }))

  return <MembersClient members={serialized} />
}
