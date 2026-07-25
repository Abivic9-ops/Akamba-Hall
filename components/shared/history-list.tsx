'use client'

import { History, BookOpen } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface LoanHistoryItem {
  id: string
  title: string
  author: string
  coverUrl: string | null
  dueDate: string
  checkoutAt: string
  returnedAt: string | null
  renewable: boolean
  status: string
}

const status_config: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-blue-100 text-blue-600' },
  overdue: { label: 'Overdue', color: 'bg-red-100 text-red-500' },
  returned: { label: 'Returned', color: 'bg-emerald-100 text-emerald-600' },
}

function format_date(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function HistoryList({ loans }: { loans: LoanHistoryItem[] }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Loan History</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Your borrowing history</p>
          </div>
        </div>

        <SectionCard title="My Loans" icon={History}>
          <div className="space-y-2">
            {loans.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No loan history</p>
            ) : (
              loans.map((l) => (
                <div key={l.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{l.title}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">
                      {l.author} · Checkout {format_date(l.checkoutAt)}
                      {l.returnedAt && ` · Returned ${format_date(l.returnedAt)}`}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status_config[l.status]?.color ?? ''}`}>
                    {status_config[l.status]?.label ?? l.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
