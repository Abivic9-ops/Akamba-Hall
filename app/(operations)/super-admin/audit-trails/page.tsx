import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { AuditTrailsClient } from '@/components/super-admin/audit-trails-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminAuditTrailsPage() {
  await requireRole(['SUPER_ADMIN'])

  const [recentLoans, recentBookings, recentRoleRequests] = await Promise.all([
    prisma.loan.findMany({
      include: { user: true, copy: { include: { book: true } } },
      orderBy: { checkoutAt: 'desc' },
      take: 20,
    }),
    prisma.booking.findMany({
      include: { user: true, space: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    prisma.roleRequest.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])

  type ActivityItem = {
    id: string
    type: 'LOAN' | 'BOOKING' | 'ROLE_REQUEST'
    action: string
    detail: string
    userName: string
    timestamp: string
  }

  const activities: ActivityItem[] = [
    ...recentLoans.map((l) => ({
      id: l.id,
      type: 'LOAN' as const,
      action: l.status === 'RETURNED' ? 'Returned Book' : l.status === 'OVERDUE' ? 'Loan Overdue' : 'Checked Out Book',
      detail: `${l.copy.book.title} by ${l.copy.book.author}`,
      userName: l.user.fullName ?? 'Unknown',
      timestamp: l.checkoutAt.toISOString(),
    })),
    ...recentBookings.map((b) => ({
      id: b.id,
      type: 'BOOKING' as const,
      action: `Booking ${b.status.toLowerCase()}`,
      detail: `${b.space.name}${b.title ? ` — ${b.title}` : ''}`,
      userName: b.user.fullName ?? 'Unknown',
      timestamp: b.createdAt.toISOString(),
    })),
    ...recentRoleRequests.map((r) => ({
      id: r.id,
      type: 'ROLE_REQUEST' as const,
      action: r.status === 'PENDING' ? 'Requested Role Change' : r.status === 'APPROVED' ? 'Role Approved' : 'Role Rejected',
      detail: r.requestedRole.replace('_', ' '),
      userName: r.user.fullName ?? 'Unknown',
      timestamp: r.createdAt.toISOString(),
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return (
    <AuditTrailsClient
      activities={activities.slice(0, 40).map((a) => ({
        ...a,
        id: a.id,
        type: a.type,
        action: a.action,
        detail: a.detail,
        userName: a.userName,
        timestamp: a.timestamp,
      }))}
    />
  )
}
