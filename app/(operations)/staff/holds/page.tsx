import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Bookmark, PackageCheck, Clock, ArrowUpRight } from 'lucide-react'

const holds = [
  { id: 'h1', title: 'Curriculum Design for Secondary Science', author: 'Njeru & Kibua', status: 'ready' as const, pickupLocation: 'Main Desk — Level 2', pickupDeadline: '24 Jul 2026' },
  { id: 'h2', title: 'Educational Psychology: A Modern Approach', author: 'Schunk', status: 'pending' as const, queuePosition: 3, pickupLocation: null, pickupDeadline: null },
  { id: 'h3', title: 'Laboratory Safety Manual', author: 'KIE', status: 'ready' as const, pickupLocation: 'Main Desk — Level 2', pickupDeadline: '25 Jul 2026' },
]

const status_config = {
  ready: { label: 'Ready', variant: 'success' as const },
  pending: { label: 'Pending', variant: 'warning' as const },
}

export default async function StaffHoldsPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const readyCount = holds.filter((h) => h.status === 'ready').length
  const pendingCount = holds.filter((h) => h.status === 'pending').length

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Holds & Reservations</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Manage book holds, pickups, and reservation queues.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Ready for Pickup">
            <p className="text-[32px] font-bold text-[#18A957]">{readyCount}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Awaiting collection at the desk</p>
          </SectionCard>
          <SectionCard title="In Queue">
            <p className="text-[32px] font-bold text-[#F97316]">{pendingCount}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Members waiting for availability</p>
          </SectionCard>
          <SectionCard title="Total Holds">
            <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">{holds.length}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Active holds across all members</p>
          </SectionCard>
        </div>

        <SectionCard title="Active Holds" icon={Bookmark} cta={{ label: 'Process Pickup', href: '#' }}>
          <div className="space-y-0">
            {holds.map((hold) => {
              const cfg = status_config[hold.status]
              return (
                <div key={hold.id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] dark:bg-white/[0.04] dark:hover:bg-white dark:bg-[#0E1F3F]/[0.04] dark:bg-white/[0.04] rounded-lg px-2 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] flex items-center justify-center shrink-0">
                    {hold.status === 'ready' ? (
                      <PackageCheck className="h-4 w-4 text-[#18A957]" />
                    ) : (
                      <Clock className="h-4 w-4 text-[#F97316]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] dark:text-[#E2E8F0] truncate">{hold.title}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{hold.author}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge variant={cfg.variant} className="text-[10px]">{cfg.label}</Badge>
                    {hold.status === 'ready' && hold.pickupDeadline && (
                      <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Pick up by {hold.pickupDeadline}</p>
                    )}
                    {hold.status === 'pending' && hold.queuePosition !== null && (
                      <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Queue #{hold.queuePosition}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
