import { requireRole } from '@/lib/auth/roleGuard'
import { get_announcements } from '@/lib/actions/announcements'
import { SystemAnnouncementsClient } from '@/components/super-admin/system-announcements-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminSystemAnnouncementsPage() {
  await requireRole(['SUPER_ADMIN'])

  const announcements = await get_announcements()

  return <SystemAnnouncementsClient announcements={announcements} />
}
