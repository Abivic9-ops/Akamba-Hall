import { requireRole } from '@/lib/auth/roleGuard'
import { HelpPageClient } from '@/components/dashboard/help-page-client'

export const dynamic = 'force-dynamic'

export default async function student_help_page() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  return <HelpPageClient />
}
