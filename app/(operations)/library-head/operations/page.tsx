import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { OperationsClient } from '@/components/dashboard/library-head/operations-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadOperationsPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const today_start = new Date()
  today_start.setHours(0, 0, 0, 0)

  const [todayLoans, todayBookings, activeDeskUsers] = await Promise.all([
    prisma.loan.count({ where: { checkoutAt: { gte: today_start } } }),
    prisma.booking.count({ where: { createdAt: { gte: today_start } } }),
    prisma.user.count({ where: { role: { in: ['STAFF', 'ASSISTANT', 'CAPTAIN', 'PREFECT'] } } }),
  ])

  return <OperationsClient todayLoans={todayLoans} todayBookings={todayBookings} activeDeskUsers={activeDeskUsers} />
}
