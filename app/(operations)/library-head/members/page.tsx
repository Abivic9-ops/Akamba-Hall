import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { MembersClient } from '@/components/dashboard/library-head/members-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadMembersPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const members = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      fullName: true,
      email: true,
      studentId: true,
      role: true,
      memberType: true,
      status: true,
      createdAt: true,
      lastActiveAt: true,
      _count: { select: { loans: true, bookings: true } },
    },
  })

  const totalStudents = members.length
  const activeStudents = members.filter(m => m.status === 'ACTIVE').length
  const suspendedStudents = members.filter(m => m.status === 'SUSPENDED').length

  return (
    <MembersClient
      members={members}
      stats={{ totalStudents, activeStudents, suspendedStudents }}
    />
  )
}
