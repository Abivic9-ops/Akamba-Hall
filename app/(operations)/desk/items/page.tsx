import { requireRole } from '@/lib/auth/roleGuard'
import { BookManagementPageClient } from '@/components/desk/book-management-page-client'

export const dynamic = 'force-dynamic'

export default async function ItemsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <BookManagementPageClient />
}
