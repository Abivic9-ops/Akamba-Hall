import { requireRole } from '@/lib/auth/roleGuard'
import { get_announcements } from '@/lib/actions/announcements'
import { AnnouncementsList } from '@/components/shared/announcements-list'

export const dynamic = 'force-dynamic'

export default async function DeskAnnouncementsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const announcements = await get_announcements()

  return <AnnouncementsList announcements={announcements} />
}
