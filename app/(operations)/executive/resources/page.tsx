import { requireRole } from '@/lib/auth/roleGuard'
import { ReadingResourcesClient } from '@/components/dashboard/executive/pages/reading-resources-client'
import { get_books } from '@/lib/actions/books'

export const dynamic = 'force-dynamic'

export default async function ReadingResourcesPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  const books = await get_books()
  return <ReadingResourcesClient books={books} />
}
