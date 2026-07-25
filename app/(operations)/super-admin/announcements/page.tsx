import { requireRole } from '@/lib/auth/roleGuard'
import { get_announcements } from '@/lib/actions/announcements'
import { LibraryHeadAnnouncementsClient } from '@/components/admin/announcements-admin'

export const dynamic = 'force-dynamic'

export default async function SuperAdminAnnouncementsPage() {
  await requireRole(['SUPER_ADMIN'])
  const announcements = await get_announcements()
  return <LibraryHeadAnnouncementsClient announcements={announcements} />
}
