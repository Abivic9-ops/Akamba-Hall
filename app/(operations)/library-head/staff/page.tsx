import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { StaffClient } from '@/components/dashboard/library-head/staff-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadStaffPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const staff = await prisma.user.findMany({
    where: { role: { in: ['STAFF', 'ASSISTANT', 'CAPTAIN', 'PREFECT'] } },
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

  const totalStaff = staff.length
  const activeStaff = staff.filter(s => s.status === 'ACTIVE').length
  const suspendedStaff = staff.filter(s => s.status === 'SUSPENDED').length

  return (
    <StaffClient
      staff={staff}
      stats={{ totalStaff, activeStaff, suspendedStaff }}
    />
  )
}
