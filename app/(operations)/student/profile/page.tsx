import { requireRole } from '@/lib/auth/roleGuard'
import { ProfilePageClient } from '@/components/dashboard/profile-page-client'

export const dynamic = 'force-dynamic'

export default async function student_profile_page() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  return <ProfilePageClient />
}
