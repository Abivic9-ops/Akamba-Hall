import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { AccessCardsClient } from '@/components/dashboard/library-head/access-cards-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadAccessCardsPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      studentId: true,
      role: true,
      qrCards: { select: { id: true, cardRef: true, status: true } },
    },
    orderBy: { fullName: 'asc' },
  })

  return <AccessCardsClient users={users} />
}
