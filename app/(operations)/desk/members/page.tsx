import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { MemberManagementPageClient } from '@/components/desk/member-management-page-client'

export const dynamic = 'force-dynamic'

export default async function MembersPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      fullName: true,
      studentId: true,
      email: true,
      role: true,
      status: true,
      lastActiveAt: true,
      _count: { select: { loans: { where: { returnedAt: null } } } },
    },
  })

  const members = users.map((u) => ({
    id: u.id,
    name: u.fullName ?? 'Unknown',
    studentId: u.studentId ?? 'N/A',
    email: u.email ?? '',
    role: u.role,
    status: u.status,
    loans: u._count.loans,
    lastActive: u.lastActiveAt?.toISOString() ?? null,
  }))

  return <MemberManagementPageClient members={members} />
}
