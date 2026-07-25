import { requireRole } from '@/lib/auth/roleGuard'
import { get_executive_dashboard_data } from '@/lib/actions/dashboard'
import { ExecutiveDashboardClient } from '@/components/dashboard/executive/executive-dashboard-client'

export const dynamic = 'force-dynamic'

export default async function ExecutiveDashboardPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])

  let data = {
    overview: { activeLoans: 0, pendingApprovals: 0, upcomingBookings: 0, holdsAwaiting: 0 },
    summary: { totalMembers: 0, activeStaff: 0, systemUptime: '99.9%' },
    approvalQueue: [] as { id: string; type: string; request: string; requestor: string; context: string; date: string; priority: string }[],
    userRoles: [] as { role: string; count: number; status: string }[],
    announcements: [] as { id: string; title: string; detail: string; status: string }[],
    events: [] as { id: string; day: number; month: string; title: string; time: string; venue: string }[],
    resources: [] as { id: string; type: string; title: string; subtitle: string; detail: string }[],
    performance: { collectionsUsage: 0, overdueRate: 0 },
    policies: [] as { id: string; title: string; description: string; category: string }[],
    criticalAlerts: 0,
  }

  try {
    data = await get_executive_dashboard_data()
  } catch (e) {
    console.error('[Executive Dashboard] Data fetch error:', e)
  }

  const profile = { fullName: 'Library Director' }
  try {
    const user = await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
    if (user?.fullName) profile.fullName = user.fullName
  } catch {}

  return (
    <ExecutiveDashboardClient
      profile={profile}
      overview={data.overview}
      summary={data.summary}
      approvalQueue={data.approvalQueue.map((a) => ({ ...a, type: a.type as 'room_booking' | 'special_access' | 'policy_exception' | 'incident' | 'general', priority: a.priority as 'normal' | 'high' }))}
      userRoles={data.userRoles.map((r) => ({ ...r, status: r.status as 'Active' | 'Suspended' }))}
      announcements={data.announcements.map((a) => ({ ...a, status: a.status as 'New' | 'Notice' | 'Update' }))}
      events={data.events}
      resources={data.resources.map((r) => ({ ...r, type: r.type as 'book' | 'database' | 'journal' | 'ebook' }))}
      performance={data.performance}
      policies={data.policies}
      criticalAlerts={data.criticalAlerts}
    />
  )
}
