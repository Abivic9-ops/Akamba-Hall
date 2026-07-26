import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { BackupsClient } from '@/components/super-admin/backups-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminBackupsPage() {
  await requireRole(['SUPER_ADMIN'])

  const [userCount, bookCount, copyCount, loanCount, announcementCount, eventCount, holdCount, bookingCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.book.count(),
      prisma.copy.count(),
      prisma.loan.count(),
      prisma.announcement.count(),
      prisma.event.count(),
      prisma.hold.count(),
      prisma.booking.count(),
    ])

  return (
    <BackupsClient
      dbStats={{
        users: userCount,
        books: bookCount,
        copies: copyCount,
        loans: loanCount,
        announcements: announcementCount,
        events: eventCount,
        holds: holdCount,
        bookings: bookingCount,
      }}
    />
  )
}
