import { requireRole } from '@/lib/auth/roleGuard'
import { CataloguePageClient } from '@/components/dashboard/catalogue-page-client'

export const dynamic = 'force-dynamic'

export default async function student_catalogue_page() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  return <CataloguePageClient />
}
