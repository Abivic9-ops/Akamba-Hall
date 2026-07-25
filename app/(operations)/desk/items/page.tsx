import { requireRole } from '@/lib/auth/roleGuard'
import { get_books } from '@/lib/actions/books'
import { BookManagementPageClient } from '@/components/desk/book-management-page-client'

export const dynamic = 'force-dynamic'

export default async function ItemsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const books = await get_books()

  const bookData = books.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    isbn: b.isbn ?? '',
    category: b.category ?? 'General',
    copies: b.totalCopies,
    available: b.availableCopies,
    shelfLocation: '',
  }))

  return <BookManagementPageClient books={bookData} />
}
