import { requireRole } from '@/lib/auth/roleGuard'
import { AnnouncementsClient } from '@/components/dashboard/executive/pages/announcements-client'
import { get_announcements } from '@/lib/actions/announcements'

export const dynamic = 'force-dynamic'

export default async function AnnouncementsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  const announcements = await get_announcements()
  return <AnnouncementsClient announcements={announcements} />
}
