import { requireRole } from '@/lib/auth/roleGuard'
import { ReportsClient } from '@/components/dashboard/executive/pages/reports-client'
import prisma from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])

  const [totalLoans, activeLoans, overdueLoans, returnedLoans, totalUsers, activeUsers, totalBooks, availableCopies, loanedCopies] = await Promise.all([
    prisma.loan.count(),
    prisma.loan.count({ where: { status: 'ACTIVE' } }),
    prisma.loan.count({ where: { status: 'OVERDUE' } }),
    prisma.loan.count({ where: { status: 'RETURNED' } }),
    prisma.user.count(),
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.book.count(),
    prisma.copy.count({ where: { status: 'AVAILABLE' } }),
    prisma.copy.count({ where: { status: 'LOANED' } }),
  ])

  const stats = { totalLoans, activeLoans, overdueLoans, returnedLoans, totalUsers, activeUsers, totalBooks, availableCopies, loanedCopies }

  return <ReportsClient stats={stats} />
}
