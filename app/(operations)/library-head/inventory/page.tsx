import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { InventoryClient } from '@/components/dashboard/library-head/inventory-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadInventoryPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const books = await prisma.book.findMany({
    take: 100,
    orderBy: { createdAt: 'desc' },
    include: {
      copies: {
        select: { id: true, barcode: true, shelfLocation: true, status: true },
      },
    },
  })

  const totalCopies = books.reduce((sum, b) => sum + b.copies.length, 0)
  const availableCopies = books.reduce((sum, b) => sum + b.copies.filter(c => c.status === 'AVAILABLE').length, 0)
  const loanedCopies = books.reduce((sum, b) => sum + b.copies.filter(c => c.status === 'LOANED').length, 0)
  const lostCopies = books.reduce((sum, b) => sum + b.copies.filter(c => c.status === 'LOST').length, 0)
  const damagedCopies = books.reduce((sum, b) => sum + b.copies.filter(c => c.status === 'DAMAGED').length, 0)

  return (
    <InventoryClient
      books={books}
      stats={{ totalTitles: books.length, totalCopies, availableCopies, loanedCopies, lostCopies, damagedCopies }}
    />
  )
}
