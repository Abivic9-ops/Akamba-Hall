import { requireRole } from '@/lib/auth/roleGuard'
import { LostFoundPageClient } from '@/components/desk/lost-found-page-client'

export const dynamic = 'force-dynamic'

export default async function LostFoundPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <LostFoundPageClient />
}
