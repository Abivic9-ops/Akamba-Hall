import { requireRole } from '@/lib/auth/roleGuard'
import { CataloguePageClient } from '@/components/desk/catalogue-page-client'

export const dynamic = 'force-dynamic'

export default async function CataloguePage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <CataloguePageClient />
}
