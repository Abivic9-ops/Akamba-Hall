'use client'

import { DollarSign, Search } from 'lucide-react'
import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'

interface LoanWithFine {
  id: string
  memberName: string
  memberId: string
  bookTitle: string
  author: string
  dueAt: string
  returnedAt: string | null
  status: string
  daysOverdue: number
}

function format_date(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

const status_config: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-blue-100 text-blue-600' },
  overdue: { label: 'Overdue', color: 'bg-red-100 text-red-500' },
  returned: { label: 'Returned', color: 'bg-emerald-100 text-emerald-600' },
}

export function ChargesClient({ loans }: { loans: LoanWithFine[] }) {
  const [search, set_search] = useState('')

  const filtered = loans.filter((l) => {
    if (!search) return true
    const q = search.toLowerCase()
    return l.memberName.toLowerCase().includes(q) || l.bookTitle.toLowerCase().includes(q)
  })

  const totalOverdue = loans.filter((l) => l.status === 'overdue').length

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Charges & Fines</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">View overdue loans and pending charges</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl p-5 border border-slate-100 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99]">Overdue Loans</p>
              <p className="text-[28px] font-bold text-slate-900 dark:text-[#E2E8F0]">{totalOverdue}</p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
        </div>

        <SectionCard title="Loan Charges" icon={DollarSign}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by member or book..."
              value={search}
              onChange={(e) => set_search(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
            />
          </div>

          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No loans found</p>
            ) : (
              filtered.map((loan) => (
                <div key={loan.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{loan.bookTitle}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">
                      {loan.memberName} · Due {format_date(loan.dueAt)}
                    </p>
                  </div>
                  {loan.status === 'overdue' && (
                    <span className="text-[12px] font-medium text-red-500">{loan.daysOverdue}d overdue</span>
                  )}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status_config[loan.status]?.color ?? ''}`}>
                    {status_config[loan.status]?.label ?? loan.status}
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
