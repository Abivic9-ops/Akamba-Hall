import { requireRole } from '@/lib/auth/roleGuard'
import { AccountsClient } from '@/components/dashboard/executive/pages/accounts-client'
import prisma from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export default async function AccountsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])

  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      status: true,
      studentId: true,
      lastActiveAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const serialized = users.map((u) => ({
    ...u,
    lastActiveAt: u.lastActiveAt?.toISOString() ?? null,
  }))

  return <AccountsClient users={serialized} />
}
