import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { BookingsClient } from '@/components/dashboard/library-head/bookings-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadBookingsPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const bookings = await prisma.booking.findMany({
    take: 100,
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, fullName: true, studentId: true, role: true } },
      space: { select: { id: true, name: true, capacity: true } },
    },
  })

  return <BookingsClient bookings={bookings} />
}
