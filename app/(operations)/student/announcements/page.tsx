import { requireRole } from '@/lib/auth/roleGuard'
import { get_announcements } from '@/lib/actions/announcements'
import { AnnouncementsList } from '@/components/shared/announcements-list'

export const dynamic = 'force-dynamic'

export default async function StudentAnnouncementsPage() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  const announcements = await get_announcements()
  return <AnnouncementsList announcements={announcements} />
}
