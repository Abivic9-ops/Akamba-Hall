'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Search, Filter, ArrowDownRight, ArrowUpRight, Clock, AlertTriangle } from 'lucide-react'

interface LoanItem {
  id: string
  userName: string
  bookTitle: string
  bookAuthor: string
  checkoutAt: string
  dueAt: string
  returnedAt: string | null
  status: string
  renewCount: number
}

interface StaffLoansClientProps {
  loans: LoanItem[]
  todayCheckouts: number
  todayReturns: number
  overdueCount: number
}

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' }> = {
  ACTIVE: { label: 'Active', variant: 'info' },
  OVERDUE: { label: 'Overdue', variant: 'danger' },
  RETURNED: { label: 'Returned', variant: 'success' },
  LOST: { label: 'Lost', variant: 'warning' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function StaffLoansClient({ loans, todayCheckouts, todayReturns, overdueCount }: StaffLoansClientProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = loans.filter((loan) => {
    const matchSearch =
      loan.userName.toLowerCase().includes(search.toLowerCase()) ||
      loan.bookTitle.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'ALL' || loan.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionCard title="Today's Check-outs">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-[#2563EB]" />
            </div>
            <div>
              <p className="text-[32px] font-bold text-[#2563EB] leading-none">{todayCheckouts}</p>
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Books issued today</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Today's Returns">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#18A957]/10 dark:bg-[#18A957]/20 flex items-center justify-center">
              <ArrowDownRight className="h-5 w-5 text-[#18A957]" />
            </div>
            <div>
              <p className="text-[32px] font-bold text-[#18A957] leading-none">{todayReturns}</p>
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Books returned today</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Overdue Items">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#DC2626]/10 dark:bg-[#DC2626]/20 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-[#DC2626]" />
            </div>
            <div>
              <p className="text-[32px] font-bold text-[#DC2626] leading-none">{overdueCount}</p>
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Requires follow-up</p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Active Loans" icon={BookOpen}>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-[#6B7A99]" />
            <input
              type="text"
              placeholder="Search by member or book title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[14px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99]" />
            <div className="flex gap-1.5">
              {['ALL', 'ACTIVE', 'OVERDUE'].map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all ${
                    statusFilter === f
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#F8F9FB] dark:bg-[#071224] text-slate-600 dark:text-[#94A3B8] border border-slate-200 dark:border-white/10 hover:bg-slate-100'
                  }`}
                >
                  {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                <th className="pb-3 text-[12px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider">Member</th>
                <th className="pb-3 text-[12px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider">Book</th>
                <th className="pb-3 text-[12px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider hidden md:table-cell">Checked Out</th>
                <th className="pb-3 text-[12px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider hidden md:table-cell">Due Date</th>
                <th className="pb-3 text-[12px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-[13px] text-slate-400 dark:text-[#6B7A99]">
                    No loans found.
                  </td>
                </tr>
              ) : (
                filtered.map((loan) => {
                  const cfg = statusConfig[loan.status] ?? statusConfig.ACTIVE
                  const days = daysUntil(loan.dueAt)
                  return (
                    <tr key={loan.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors">
                      <td className="py-3 pr-4">
                        <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{loan.userName}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="text-[14px] text-slate-700 dark:text-[#E2E8F0]">{loan.bookTitle}</p>
                        <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{loan.bookAuthor}</p>
                      </td>
                      <td className="py-3 pr-4 hidden md:table-cell">
                        <span className="text-[13px] text-slate-500 dark:text-[#6B7A99]">{formatDate(loan.checkoutAt)}</span>
                      </td>
                      <td className="py-3 pr-4 hidden md:table-cell">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-slate-400 dark:text-[#6B7A99]" />
                          <span className={`text-[13px] ${loan.status === 'OVERDUE' ? 'text-[#DC2626] font-medium' : 'text-slate-500 dark:text-[#6B7A99]'}`}>
                            {formatDate(loan.dueAt)}
                            {loan.status === 'OVERDUE' && (
                              <span className="ml-1.5 text-[11px]">({Math.abs(days)}d overdue)</span>
                            )}
                            {loan.status === 'ACTIVE' && days >= 0 && days <= 3 && (
                              <span className="ml-1.5 text-[11px] text-amber-500">({days}d left)</span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge variant={cfg.variant} dot className="text-[10px]">
                          {cfg.label}
                        </Badge>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-3 text-right">
            Showing {filtered.length} of {loans.length} loans
          </p>
        )}
      </SectionCard>
    </>
  )
}
