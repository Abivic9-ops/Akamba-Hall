import { requireRole } from '@/lib/auth/roleGuard'
import { get_books } from '@/lib/actions/books'
import { CataloguePageClient } from '@/components/dashboard/catalogue-page-client'

export const dynamic = 'force-dynamic'

export default async function student_catalogue_page() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  const books = await get_books()
  return <CataloguePageClient books={books} />
}
