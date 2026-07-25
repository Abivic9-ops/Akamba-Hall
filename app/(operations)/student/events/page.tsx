import { requireRole } from '@/lib/auth/roleGuard'
import { get_events } from '@/lib/actions/events'
import { EventsPageClient } from '@/components/dashboard/events-page-client'

export const dynamic = 'force-dynamic'

export default async function student_events_page() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  const events = await get_events()
  return <EventsPageClient events={events} />
}
