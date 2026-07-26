import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { StaffMembersClient } from '@/components/staff/staff-members-client'

export const dynamic = 'force-dynamic'

export default async function StaffMembersPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const [members, roleCountsRaw, totalCount] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        studentId: true,
        role: true,
        status: true,
        memberType: true,
        createdAt: true,
      },
    }),
    prisma.user.groupBy({ by: ['role'], _count: true }),
    prisma.user.count(),
  ])

  const roleCounts = roleCountsRaw.map((r) => ({
    role: r.role,
    count: r._count,
  }))

  const memberData = members.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }))

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0]">Member Management</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">View and manage library member accounts and memberships.</p>
        </div>

        <StaffMembersClient
          members={memberData}
          totalCount={totalCount}
          roleCounts={roleCounts}
        />
      </div>
    </div>
  )
}
