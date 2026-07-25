import { requireRole } from '@/lib/auth/roleGuard'
import { NoticesClient } from '@/components/dashboard/executive/pages/notices-client'
import { get_announcements } from '@/lib/actions/announcements'
import { get_events } from '@/lib/actions/events'

export const dynamic = 'force-dynamic'

export default async function NoticesPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])

  const [announcements, events] = await Promise.all([
    get_announcements(),
    get_events(),
  ])

  const notices = [
    ...announcements.map((a) => ({
      id: a.id,
      title: a.title,
      detail: a.body,
      date: a.publishedAt,
      category: a.category,
    })),
    ...events.map((e) => ({
      id: e.id,
      title: e.title,
      detail: e.description ?? e.venue ?? 'Upcoming event',
      date: e.startTime,
      category: e.category,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return <NoticesClient notices={notices} />
}
