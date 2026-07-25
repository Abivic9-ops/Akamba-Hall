import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { MemberLookupPageClient } from '@/components/desk/member-lookup-page-client'

export const dynamic = 'force-dynamic'

export default async function MemberLookupPage() {
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
      createdAt: true,
      _count: { select: { loans: true } },
    },
  })

  const members = users.map((u) => ({
    id: u.id,
    name: u.fullName ?? 'Unknown',
    studentId: u.studentId ?? 'N/A',
    role: u.role === 'STAFF' ? 'Staff' as const : 'Student' as const,
    status: u.status === 'ACTIVE' ? 'Active' as const : u.status === 'SUSPENDED' ? 'Suspended' as const : 'Alumni' as const,
    loansCount: u._count.loans,
    lastVisit: u.lastActiveAt?.toISOString() ?? u.createdAt.toISOString(),
    email: u.email ?? '',
    phone: '',
    joinDate: u.createdAt.toISOString(),
    outstandingFines: 0,
  }))

  return <MemberLookupPageClient members={members} />
}
