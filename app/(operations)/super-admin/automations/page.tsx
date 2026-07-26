import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { AutomationsClient } from '@/components/super-admin/automations-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminAutomationsPage() {
  await requireRole(['SUPER_ADMIN'])

  const [overdueLoans, expiringHolds, pendingBookings, activeAnnouncements] = await Promise.all([
    prisma.loan.count({ where: { status: 'OVERDUE' } }),
    prisma.hold.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.announcement.count({ where: { expiresAt: null } }),
  ])

  return (
    <AutomationsClient
      rules={{
        overdueLoans,
        expiringHolds,
        pendingBookings,
        activeAnnouncements,
      }}
    />
  )
}
