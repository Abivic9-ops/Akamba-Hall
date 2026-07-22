import { requireRole } from '@/lib/auth/roleGuard'
import { MemberLookupPageClient } from '@/components/desk/member-lookup-page-client'

export const dynamic = 'force-dynamic'

export default async function MemberLookupPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <MemberLookupPageClient />
}
