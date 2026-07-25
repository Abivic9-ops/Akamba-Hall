import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_loans } from '@/lib/actions/loans'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { ScrollText, CheckCircle2, AlertTriangle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StaffHistoryPage() {
  const profile = await requireRole(['STAFF', 'SUPER_ADMIN'])

  const loans = await get_user_loans(profile.id)

  const totalFines = loans.reduce((sum, item) => {
    if (item.status === 'overdue' && !item.returnedAt) {
      const daysOverdue = Math.floor((Date.now() - new Date(item.dueDate).getTime()) / 86400000)
      return sum + daysOverdue * 50
    }
    return sum
  }, 0)

  const overdueItems = loans.filter((h) => h.status === 'overdue').length

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0]">History & Fines</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">View your borrowing history and outstanding fines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Total Borrowed">
            <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0]">{loans.length}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Books borrowed this term</p>
          </SectionCard>
          <SectionCard title="Outstanding Fines">
            <p className={`text-[32px] font-bold ${totalFines > 0 ? 'text-[#DC2626]' : 'text-[#18A957]'}`}>
              KES {totalFines.toLocaleString()}
            </p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">{overdueItems} overdue return{overdueItems !== 1 ? 's' : ''}</p>
          </SectionCard>
          <SectionCard title="On-Time Returns">
            <p className="text-[32px] font-bold text-[#18A957]">
              {loans.filter((h) => h.status === 'returned').length}
            </p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">No fines incurred</p>
          </SectionCard>
        </div>

        <SectionCard title="Borrowing History" icon={ScrollText}>
          <div className="space-y-0">
            {loans.length === 0 ? (
              <p className="text-[13px] text-slate-400 text-center py-8">No borrowing history yet.</p>
            ) : (
              loans.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-lg px-2 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-slate-50 dark:bg-white/[0.04] flex items-center justify-center shrink-0">
                    {item.status === 'overdue' ? (
                      <AlertTriangle className="h-4 w-4 text-[#DC2626]" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-[#18A957]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{item.title}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-0.5">
                      {new Date(item.checkoutAt).toLocaleDateString()} — {item.returnedAt ? new Date(item.returnedAt).toLocaleDateString() : 'Not returned'}
                    </p>
                  </div>
                  <Badge variant={item.status === 'returned' ? 'success' : item.status === 'overdue' ? 'danger' : 'info'} className="text-[10px]">
                    {item.status === 'returned' ? 'Returned' : item.status === 'overdue' ? 'Overdue' : 'Active'}
                  </Badge>
                  {item.status === 'overdue' && !item.returnedAt && (
                    <span className="text-[12px] font-medium text-[#DC2626] shrink-0">
                      KES {Math.floor((Date.now() - new Date(item.dueDate).getTime()) / 86400000) * 50}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
