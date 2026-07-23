import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { ScrollText, RotateCcw, CheckCircle2, AlertTriangle } from 'lucide-react'

const history = [
  { id: 'h1', title: 'Advanced Physics: Principles and Applications', author: 'Serway & Jewett', borrowedDate: '1 Jul 2026', returnedDate: '15 Jul 2026', status: 'returned' as const, fine: 0 },
  { id: 'h2', title: 'Teaching Mathematics in East Africa', author: 'Omenko & Gathemo', borrowedDate: '10 Jun 2026', returnedDate: '28 Jun 2026', status: 'returned' as const, fine: 0 },
  { id: 'h3', title: 'Laboratory Safety Manual', author: 'KIE', borrowedDate: '20 May 2026', returnedDate: '10 Jun 2026', status: 'returned' as const, fine: 50 },
  { id: 'h4', title: 'The Kenya Environment: A Reference Guide', author: 'Ochieng & Ngesa', borrowedDate: '15 Apr 2026', returnedDate: '30 Apr 2026', status: 'returned' as const, fine: 0 },
  { id: 'h5', title: 'Curriculum Design for Secondary Science', author: 'Njeru & Kibua', borrowedDate: '1 Jun 2026', returnedDate: null, status: 'overdue' as const, fine: 150 },
]

const status_config = {
  returned: { label: 'Returned', variant: 'success' as const, icon: CheckCircle2 },
  overdue: { label: 'Overdue Return', variant: 'danger' as const, icon: AlertTriangle },
}

export default async function StaffHistoryPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const totalFines = history.reduce((sum, item) => sum + item.fine, 0)
  const overdueItems = history.filter((h) => h.status === 'overdue').length

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">History & Fines</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">View your borrowing history and outstanding fines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Total Borrowed">
            <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">{history.length}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Books borrowed this term</p>
          </SectionCard>
          <SectionCard title="Outstanding Fines">
            <p className={`text-[32px] font-bold ${totalFines > 0 ? 'text-[#DC2626]' : 'text-[#18A957]'}`}>
              KES {totalFines.toLocaleString()}
            </p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">{overdueItems} overdue return{overdueItems !== 1 ? 's' : ''}</p>
          </SectionCard>
          <SectionCard title="On-Time Returns">
            <p className="text-[32px] font-bold text-[#18A957]">
              {history.filter((h) => h.fine === 0).length}
            </p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">No fines incurred</p>
          </SectionCard>
        </div>

        <SectionCard title="Borrowing History" icon={ScrollText}>
          <div className="space-y-0">
            {history.map((item) => {
              const cfg = status_config[item.status]
              const StatusIcon = cfg.icon
              return (
                <div key={item.id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] dark:bg-white/[0.04] dark:hover:bg-white dark:bg-[#0E1F3F]/[0.04] dark:bg-white/[0.04] rounded-lg px-2 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] flex items-center justify-center shrink-0">
                    <StatusIcon className={`h-4 w-4 ${item.status === 'overdue' ? 'text-[#DC2626]' : 'text-[#18A957]'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] dark:text-[#E2E8F0] truncate">{item.title}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">
                      {item.borrowedDate} — {item.returnedDate ?? 'Not returned'}
                    </p>
                  </div>
                  <Badge variant={cfg.variant} className="text-[10px]">{cfg.label}</Badge>
                  {item.fine > 0 && (
                    <span className="text-[12px] font-medium text-[#DC2626] shrink-0">KES {item.fine}</span>
                  )}
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
