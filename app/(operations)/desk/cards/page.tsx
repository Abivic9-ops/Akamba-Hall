import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { CardManagementPageClient } from '@/components/desk/card-management-page-client'

export const dynamic = 'force-dynamic'

export default async function CardsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const cards = await prisma.qRCard.findMany({
    orderBy: { issuedAt: 'desc' },
    include: { user: { select: { fullName: true, studentId: true } } },
  })

  const cardData = cards.map((c) => ({
    id: c.id,
    cardRef: c.cardRef,
    memberName: c.user.fullName ?? 'Unknown',
    studentId: c.user.studentId ?? 'N/A',
    status: c.status,
    issuedDate: c.issuedAt.toISOString(),
    cardType: 'Standard',
  }))

  return <CardManagementPageClient cards={cardData} />
}
