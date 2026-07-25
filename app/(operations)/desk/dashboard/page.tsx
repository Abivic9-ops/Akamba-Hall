import { requireRole } from '@/lib/auth/roleGuard'
import { get_desk_dashboard_data } from '@/lib/actions/dashboard'
import { DeskDashboardClient } from '@/components/desk/desk-dashboard-client'

export const dynamic = 'force-dynamic'

export default async function DeskDashboardPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  let data = {
    kpi: { loansIssued: 0, returnsProcessed: 0, renewals: 0, newMembers: 0, overdueItems: 0 },
    recentTransactions: [] as { id: string; type: 'issue' | 'return' | 'renewal'; itemTitle: string; memberName: string; memberId: string; timestamp: string; status: 'Issued' | 'Returned' | 'Renewed' }[],
    holdsQueue: [] as { id: string; title: string; author: string; requestedBy: string; memberId: string; queuePosition: number; totalInQueue: number; status: 'Ready' | 'Waiting' | 'Overdue for pickup' }[],
    todayReturns: [] as { id: string; title: string; author: string; dueDate: string; returnedAt: string }[],
    overdueAlerts: [] as { id: string; title: string; author: string; dueDate: string; daysOverdue: number; memberId: string }[],
    inventory: { totalItems: 0, available: 0, onLoan: 0, percentAvailable: 0 },
    notices: [] as { id: string; title: string; body: string; category: string; timeAgo: string }[],
    events: [] as { id: string; title: string; month: string; day: string; time: string; venue: string }[],
  }

  try {
    data = await get_desk_dashboard_data()
  } catch (e) {
    console.error('[Desk Dashboard] Data fetch error:', e)
  }

  return (
    <DeskDashboardClient
      kpi={data.kpi}
      recentTransactions={data.recentTransactions}
      holdsQueue={data.holdsQueue}
      todayReturns={data.todayReturns}
      overdueAlerts={data.overdueAlerts}
      inventory={data.inventory}
      notices={data.notices}
      events={data.events}
    />
  )
}
