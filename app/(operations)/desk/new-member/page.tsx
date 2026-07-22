import { requireRole } from '@/lib/auth/roleGuard'
import { NewMemberPageClient } from '@/components/desk/new-member-page-client'

export const dynamic = 'force-dynamic'

export default async function NewMemberPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <NewMemberPageClient />
}
