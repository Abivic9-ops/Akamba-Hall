import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { LogsClient } from '@/components/super-admin/logs-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminLogsPage() {
  await requireRole(['SUPER_ADMIN'])

  const [issueLogs, activeLoans, overdueLoans, recentBookings] = await Promise.all([
    prisma.issueLog.findMany({
      include: { reportedBy: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.loan.findMany({
      include: { user: true, copy: { include: { book: true } } },
      orderBy: { checkoutAt: 'desc' },
      take: 10,
    }),
    prisma.loan.count({ where: { status: 'OVERDUE' } }),
    prisma.booking.findMany({
      include: { user: true, space: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])

  type LogEntry = {
    id: string
    level: string
    source: string
    message: string
    detail: string
    timestamp: string
  }

  const logs: LogEntry[] = [
    ...issueLogs.map((i) => ({
      id: i.id,
      level: i.severity === 'HIGH' ? 'ERROR' : i.severity === 'MEDIUM' ? 'WARN' : 'INFO',
      source: `IssueLog/${i.category.toLowerCase()}`,
      message: i.title,
      detail: i.description,
      timestamp: i.createdAt.toISOString(),
    })),
    ...activeLoans.slice(0, 5).map((l) => ({
      id: `loan-${l.id}`,
      level: 'INFO',
      source: 'LoanService',
      message: `Book checked out: ${l.copy.book.title}`,
      detail: `By ${l.user.fullName ?? 'Unknown'} — due ${l.dueAt.toLocaleDateString()}`,
      timestamp: l.checkoutAt.toISOString(),
    })),
    ...recentBookings.slice(0, 5).map((b) => ({
      id: `booking-${b.id}`,
      level: 'INFO',
      source: 'BookingService',
      message: `Space booked: ${b.space.name}`,
      detail: `By ${b.user.fullName ?? 'Unknown'} — ${b.status}`,
      timestamp: b.createdAt.toISOString(),
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return (
    <LogsClient
      logs={logs.slice(0, 30)}
      overdueCount={overdueLoans}
    />
  )
}
