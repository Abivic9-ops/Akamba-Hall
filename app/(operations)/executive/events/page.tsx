import { requireRole } from '@/lib/auth/roleGuard'
import { EventsClient } from '@/components/dashboard/executive/pages/events-client'
import { get_events } from '@/lib/actions/events'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  const events = await get_events()
  return <EventsClient events={events} />
}
