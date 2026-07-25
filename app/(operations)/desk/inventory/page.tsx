import { requireRole } from '@/lib/auth/roleGuard'
import { get_books, get_book_stats } from '@/lib/actions/books'
import { InventoryPageClient } from '@/components/desk/inventory-page-client'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const [books, stats] = await Promise.all([get_books(), get_book_stats()])

  const inventorySnapshot = {
    totalItems: stats.totalCopies,
    available: stats.availableCopies,
    onLoan: stats.loanedCopies,
    damaged: stats.damagedCopies,
    lost: stats.lostCopies,
    percentAvailable: stats.totalCopies > 0 ? Math.round((stats.availableCopies / stats.totalCopies) * 100) : 0,
  }

  const stocktakeItems = books.slice(0, 20).map((b) => ({
    barcode: b.id.slice(0, 16),
    title: b.title,
    category: b.category ?? 'General',
    expectedLocation: '',
    countedStatus: 'Match' as const,
  }))

  return <InventoryPageClient stats={inventorySnapshot} stocktakeItems={stocktakeItems} />
}
