import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_bookmarks } from '@/lib/actions/bookmarks'
import { BookmarksList } from '@/components/shared/bookmarks-list'

export const dynamic = 'force-dynamic'

export default async function StudentBookmarksPage() {
  const profile = await requireRole(['STUDENT', 'SUPER_ADMIN'])
  const bookmarks = await get_user_bookmarks(profile.id)
  return <BookmarksList bookmarks={bookmarks} />
}
