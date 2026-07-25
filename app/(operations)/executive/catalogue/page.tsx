import { requireRole } from '@/lib/auth/roleGuard'
import { CatalogueSearchClient } from '@/components/dashboard/executive/pages/catalogue-search-client'
import { get_books } from '@/lib/actions/books'

export const dynamic = 'force-dynamic'

export default async function CatalogueSearchPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  const books = await get_books()
  return <CatalogueSearchClient books={books} />
}
