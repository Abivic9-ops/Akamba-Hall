import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { StaffLoansClient } from '@/components/staff/staff-loans-client'

export const dynamic = 'force-dynamic'

export default async function StaffLoansPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

  const [activeLoans, overdueCount, todayCheckouts, todayReturns] = await Promise.all([
    prisma.loan.findMany({
      where: { status: { in: ['ACTIVE', 'OVERDUE'] } },
      include: {
        user: { select: { fullName: true } },
        copy: { include: { book: { select: { title: true, author: true } } } },
      },
      orderBy: { checkoutAt: 'desc' },
    }),
    prisma.loan.count({ where: { status: 'OVERDUE' } }),
    prisma.loan.count({
      where: {
        checkoutAt: { gte: startOfDay, lt: endOfDay },
      },
    }),
    prisma.loan.count({
      where: {
        returnedAt: { gte: startOfDay, lt: endOfDay },
      },
    }),
  ])

  const loans = activeLoans.map((loan) => ({
    id: loan.id,
    userName: loan.user.fullName ?? 'Unknown',
    bookTitle: loan.copy.book.title,
    bookAuthor: loan.copy.book.author,
    checkoutAt: loan.checkoutAt.toISOString(),
    dueAt: loan.dueAt.toISOString(),
    returnedAt: loan.returnedAt?.toISOString() ?? null,
    status: loan.status,
    renewCount: loan.renewCount,
  }))

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0]">Loan Management</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">Process check-ins, check-outs, and manage member loans.</p>
        </div>

        <StaffLoansClient
          loans={loans}
          todayCheckouts={todayCheckouts}
          todayReturns={todayReturns}
          overdueCount={overdueCount}
        />
      </div>
    </div>
  )
}
