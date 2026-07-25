import { requireRole } from '@/lib/auth/roleGuard'
import { get_books, get_book_stats } from '@/lib/actions/books'
import { LibraryHeadCatalogueClient } from '@/components/admin/catalogue-admin'

export const dynamic = 'force-dynamic'

export default async function SuperAdminCataloguePage() {
  await requireRole(['SUPER_ADMIN'])
  const [books, stats] = await Promise.all([get_books(), get_book_stats()])
  return <LibraryHeadCatalogueClient books={books} stats={stats} />
}
