import { requireRole } from '@/lib/auth/roleGuard'
import { get_lost_found_items } from '@/lib/actions/lost-found'
import { LostFoundPageClient } from '@/components/desk/lost-found-page-client'

export const dynamic = 'force-dynamic'

export default async function LostFoundPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const items = await get_lost_found_items()

  const lfItems = items.map((i) => ({
    id: i.id,
    type: (i.status === 'lost' ? 'Lost' : 'Found') as 'Lost' | 'Found',
    description: i.title + (i.description ? ` - ${i.description}` : ''),
    reportedBy: '',
    memberId: '',
    date: i.reportedAt,
    location: '',
    status: i.status === 'lost' ? 'Lost' as const : i.status === 'claimed' ? 'Claimed' as const : 'Found' as const,
  }))

  return <LostFoundPageClient items={lfItems} />
}
