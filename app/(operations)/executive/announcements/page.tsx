import { requireRole } from '@/lib/auth/roleGuard'
import { AnnouncementsClient } from '@/components/dashboard/executive/pages/announcements-client'

export const dynamic = 'force-dynamic'

export default async function AnnouncementsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <AnnouncementsClient />
}
