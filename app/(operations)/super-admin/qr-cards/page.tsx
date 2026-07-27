import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { QrCardsClient } from '@/components/super-admin/qr-cards-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminQrCardsPage() {
  await requireRole(['SUPER_ADMIN'])

  const batch1 = await Promise.all([
    prisma.qRCard.findMany({
      include: { user: true },
      orderBy: { issuedAt: 'desc' },
    }),
    prisma.qRCard.count(),
    prisma.qRCard.count({ where: { status: 'ACTIVE' } }),
  ])
  const [cards, total, active] = batch1

  const batch2 = await Promise.all([
    prisma.qRCard.count({ where: { status: 'SUSPENDED' } }),
    prisma.qRCard.count({ where: { status: 'REVOKED' } }),
    prisma.user.findMany({
      where: {
        qrCards: { none: { status: 'ACTIVE' } },
        status: 'ACTIVE',
      },
      select: { id: true, fullName: true, email: true, studentId: true, role: true },
      orderBy: { fullName: 'asc' },
    }),
  ])
  const [suspended, revoked, usersWithoutCards] = batch2

  return (
    <QrCardsClient
      cards={cards.map((c) => ({
        id: c.id,
        cardRef: c.cardRef,
        status: c.status,
        issuedAt: c.issuedAt.toISOString(),
        suspendedAt: c.suspendedAt?.toISOString() ?? null,
        revokedAt: c.revokedAt?.toISOString() ?? null,
        user: { fullName: c.user.fullName, email: c.user.email, studentId: c.user.studentId },
      }))}
      usersWithoutCards={usersWithoutCards.map((u) => ({
        id: u.id,
        fullName: u.fullName,
        email: u.email,
        studentId: u.studentId,
        role: u.role,
      }))}
      stats={{ total, active, suspended, revoked }}
    />
  )
}
