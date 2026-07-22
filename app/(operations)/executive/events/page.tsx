import { requireRole } from '@/lib/auth/roleGuard'
import { EventsClient } from '@/components/dashboard/executive/pages/events-client'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <EventsClient />
}
