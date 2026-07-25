import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_holds, get_hold_stats } from '@/lib/actions/holds'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Bookmark, PackageCheck, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StaffHoldsPage() {
  const profile = await requireRole(['STAFF', 'SUPER_ADMIN'])

  const [holds, stats] = await Promise.all([
    get_user_holds(profile.id),
    get_hold_stats(),
  ])

  const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'danger' | 'neutral' }> = {
    ready: { label: 'Ready', variant: 'success' },
    pending: { label: 'Pending', variant: 'warning' },
    fulfilled: { label: 'Fulfilled', variant: 'info' },
    expired: { label: 'Expired', variant: 'danger' },
    cancelled: { label: 'Cancelled', variant: 'neutral' },
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0]">Holds & Reservations</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">Manage book holds, pickups, and reservation queues.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Ready for Pickup">
            <p className="text-[32px] font-bold text-[#18A957]">{stats.ready}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Awaiting collection at the desk</p>
          </SectionCard>
          <SectionCard title="In Queue">
            <p className="text-[32px] font-bold text-[#F97316]">{stats.pending}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Members waiting for availability</p>
          </SectionCard>
          <SectionCard title="Total Holds">
            <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0]">{stats.total}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Active holds across all members</p>
          </SectionCard>
        </div>

        <SectionCard title="Active Holds" icon={Bookmark} cta={{ label: 'Process Pickup', href: '#' }}>
          <div className="space-y-0">
            {holds.length === 0 ? (
              <p className="text-[13px] text-slate-400 text-center py-8">No holds yet.</p>
            ) : (
              holds.map((hold) => {
                const cfg = statusConfig[hold.status] ?? { label: hold.status, variant: 'default' }
                return (
                  <div key={hold.id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-lg px-2 transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-slate-50 dark:bg-white/[0.04] flex items-center justify-center shrink-0">
                      {hold.status === 'ready' ? (
                        <PackageCheck className="h-4 w-4 text-[#18A957]" />
                      ) : (
                        <Clock className="h-4 w-4 text-[#F97316]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{hold.title}</p>
                      <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-0.5">{hold.author}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <Badge variant={cfg.variant} className="text-[10px]">{cfg.label}</Badge>
                      {hold.status === 'ready' && hold.pickupDeadline && (
                        <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] mt-1">Pick up by {new Date(hold.pickupDeadline).toLocaleDateString()}</p>
                      )}
                      {hold.status === 'pending' && hold.queuePosition !== null && (
                        <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] mt-1">Queue #{hold.queuePosition}</p>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
