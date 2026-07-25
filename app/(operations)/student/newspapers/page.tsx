import { requireRole } from '@/lib/auth/roleGuard'
import { NewspapersList } from '@/components/shared/newspapers-list'

export const dynamic = 'force-dynamic'

export default async function StudentNewspapersPage() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  return <NewspapersList />
}
