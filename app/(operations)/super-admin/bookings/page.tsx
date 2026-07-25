import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { BookingsClient } from '@/components/super-admin/bookings-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminBookingsPage() {
  await requireRole(['SUPER_ADMIN'])

  const bookings = await prisma.booking.findMany({
    include: {
      user: { select: { fullName: true } },
      space: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const serialized = bookings.map((b) => ({
    id: b.id,
    userName: b.user?.fullName ?? 'Unknown',
    spaceName: b.space?.name ?? 'Unknown Space',
    startAt: b.startAt.toISOString(),
    endAt: b.endAt.toISOString(),
    status: b.status,
    createdAt: b.createdAt.toISOString(),
  }))

  return <BookingsClient bookings={serialized} />
}
