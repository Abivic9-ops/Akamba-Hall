import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_bookmarks } from '@/lib/actions/bookmarks'
import { BookmarksList } from '@/components/shared/bookmarks-list'

export const dynamic = 'force-dynamic'

export default async function ExecutiveBookmarksPage() {
  const user = await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  const bookmarks = await get_user_bookmarks(user.id)

  return <BookmarksList bookmarks={bookmarks} />
}
