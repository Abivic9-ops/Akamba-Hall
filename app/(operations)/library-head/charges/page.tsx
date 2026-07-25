import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { ChargesClient } from '@/components/dashboard/library-head/charges-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadChargesPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const loans = await prisma.loan.findMany({
    where: { returnedAt: null },
    include: {
      user: { select: { fullName: true, studentId: true } },
      copy: { include: { book: { select: { title: true, author: true } } } },
    },
    orderBy: { dueAt: 'asc' },
  })

  const serialized = loans.map((loan) => {
    const isOverdue = loan.dueAt < new Date()
    const daysOverdue = isOverdue ? Math.floor((Date.now() - loan.dueAt.getTime()) / 86400000) : 0
    return {
      id: loan.id,
      memberName: loan.user.fullName ?? 'Unknown',
      memberId: loan.user.studentId ?? 'N/A',
      bookTitle: loan.copy.book.title,
      author: loan.copy.book.author,
      dueAt: loan.dueAt.toISOString(),
      returnedAt: loan.returnedAt?.toISOString() ?? null,
      status: isOverdue ? 'overdue' : 'active',
      daysOverdue,
    }
  })

  return <ChargesClient loans={serialized} />
}
