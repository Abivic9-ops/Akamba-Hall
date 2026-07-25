import { requireRole } from '@/lib/auth/roleGuard'
import { get_books, get_book_stats } from '@/lib/actions/books'
import { InventoryClient } from '@/components/super-admin/inventory-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminInventoryPage() {
  await requireRole(['SUPER_ADMIN'])

  const [books, stats] = await Promise.all([get_books(), get_book_stats()])

  return <InventoryClient books={books} stats={stats} />
}
