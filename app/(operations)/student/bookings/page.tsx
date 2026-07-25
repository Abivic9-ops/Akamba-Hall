import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { BookingsPageClient } from '@/components/dashboard/bookings-page-client'

export const dynamic = 'force-dynamic'

export default async function student_bookings_page() {
  const profile = await requireRole(['STUDENT', 'SUPER_ADMIN'])

  const bookings = await prisma.booking.findMany({
    where: { userId: profile.id },
    include: { space: true },
    orderBy: { startAt: 'desc' },
  })

  const mapped = bookings.map((bk) => ({
    id: bk.id,
    type: bk.space.type,
    title: bk.title ?? bk.space.name,
    location: bk.space.name,
    startAt: bk.startAt.toISOString(),
    endAt: bk.endAt.toISOString(),
    status: bk.status,
  }))

  return <BookingsPageClient bookings={mapped} />
}
