import { requireRole } from '@/lib/auth/roleGuard'
import { get_books } from '@/lib/actions/books'
import { BooksBrowseClient } from '@/components/dashboard/executive/pages/books-browse-client'

export const dynamic = 'force-dynamic'

export default async function ExecutiveBooksPage() {
  await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  const books = await get_books()

  return <BooksBrowseClient books={books} />
}
