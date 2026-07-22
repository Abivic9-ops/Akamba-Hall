import { requireRole } from '@/lib/auth/roleGuard'
import { CatalogueSearchClient } from '@/components/dashboard/executive/pages/catalogue-search-client'

export const dynamic = 'force-dynamic'

export default async function CatalogueSearchPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <CatalogueSearchClient />
}
