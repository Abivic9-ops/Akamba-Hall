import { requireRole } from '@/lib/auth/roleGuard'
import { get_events } from '@/lib/actions/events'
import { EventsList } from '@/components/shared/events-list'

export const dynamic = 'force-dynamic'

export default async function DeskEventsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const events = await get_events()

  return <EventsList events={events} />
}
