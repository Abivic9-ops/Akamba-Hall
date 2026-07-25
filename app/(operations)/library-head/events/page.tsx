import { requireRole } from '@/lib/auth/roleGuard'
import { get_events } from '@/lib/actions/events'
import { LibraryHeadEventsClient } from '@/components/admin/events-admin'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadEventsPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const events = await get_events()
  return <LibraryHeadEventsClient events={events} />
}
