import { requireRole } from '@/lib/auth/roleGuard'
import { NewspapersList } from '@/components/shared/newspapers-list'

export const dynamic = 'force-dynamic'

export default async function ExecutiveNewspapersPage() {
  await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  return <NewspapersList />
}
