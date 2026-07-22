import { requireRole } from '@/lib/auth/roleGuard'
import { ReadingResourcesClient } from '@/components/dashboard/executive/pages/reading-resources-client'

export const dynamic = 'force-dynamic'

export default async function ReadingResourcesPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <ReadingResourcesClient />
}
