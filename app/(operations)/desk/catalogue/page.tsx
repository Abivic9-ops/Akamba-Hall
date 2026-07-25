import { requireRole } from '@/lib/auth/roleGuard'
import { get_books } from '@/lib/actions/books'
import { CataloguePageClient } from '@/components/desk/catalogue-page-client'

export const dynamic = 'force-dynamic'

export default async function CataloguePage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const books = await get_books()

  const catalogueBooks = books.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    category: b.category ?? 'General',
    available: b.status === 'available',
    copies: b.availableCopies,
    totalCopies: b.totalCopies,
    shelfLocation: '',
    isbn: b.isbn ?? '',
  }))

  return <CataloguePageClient books={catalogueBooks} />
}
