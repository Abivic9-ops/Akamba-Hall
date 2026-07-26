'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookOpen, Search, RotateCw, Eye } from 'lucide-react'

interface Loan {
  id: string
  memberName: string
  memberId: string
  bookTitle: string
  author: string
  checkoutAt: string
  dueAt: string
  returnedAt: string | null
  status: string
  renewCount: number
}

interface Props {
  loans: Loan[]
}

function statusBadge(status: string) {
  switch (status) {
    case 'ACTIVE':
      return <Badge variant="success" dot>Active</Badge>
    case 'OVERDUE':
      return <Badge variant="danger" dot>Overdue</Badge>
    case 'RETURNED':
      return <Badge variant="info" dot>Returned</Badge>
    case 'LOST':
      return <Badge variant="danger" dot>Lost</Badge>
    default:
      return <Badge variant="neutral">{status}</Badge>
  }
}

export function LoansPageClient({ loans }: Props) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  const filtered = loans.filter((loan) => {
    const matchesSearch = loan.memberName.toLowerCase().includes(search.toLowerCase()) ||
      loan.bookTitle.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || loan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeCount = loans.filter((l) => l.status === 'ACTIVE').length
  const overdueCount = loans.filter((l) => l.status === 'OVERDUE').length
  const returnedCount = loans.filter((l) => l.status === 'RETURNED').length

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Active Loans</h1>
          <p className="text-sm text-slate-500 dark:text-[#6B7A99] mt-1">Manage and track all currently issued loans</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-4">
            <p className="text-[32px] font-bold text-[#2563EB]">{activeCount}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99]">Active Loans</p>
          </div>
          <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-4">
            <p className="text-[32px] font-bold text-[#DC2626]">{overdueCount}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99]">Overdue</p>
          </div>
          <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-4">
            <p className="text-[32px] font-bold text-[#18A957]">{returnedCount}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99]">Returned</p>
          </div>
        </div>

        <SectionCard title="All Loans" icon={BookOpen}>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by member or book..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex gap-1.5">
              {['ALL', 'ACTIVE', 'OVERDUE', 'RETURNED'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`h-7 px-3 rounded-full text-[11px] font-bold transition ${
                    statusFilter === s
                      ? 'bg-[#0B1B3D] dark:bg-[#1747D6] text-white'
                      : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99] hover:bg-slate-200 dark:hover:bg-white/[0.1]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-500 dark:text-[#6B7A99] font-medium">{filtered.length} loan(s)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider">Member</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider">Book</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider">Checkout</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider">Due</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider">Status</th>
                  <th className="text-right py-2.5 px-3 text-[11px] font-bold text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((loan) => (
                  <tr key={loan.id} className="border-b border-slate-50 dark:border-white/[0.04] hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-medium text-[13px] text-slate-800 dark:text-[#E2E8F0]">{loan.memberName}</p>
                        <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] font-mono">{loan.memberId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-[13px] text-slate-800 dark:text-[#E2E8F0] max-w-[200px] truncate">{loan.bookTitle}</p>
                      <p className="text-[11px] text-slate-400 dark:text-[#6B7A99]">{loan.author}</p>
                    </td>
                    <td className="py-3 px-3 text-[12px] text-slate-600 dark:text-[#B9C2D8]">
                      {new Date(loan.checkoutAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-3 text-[12px] text-slate-600 dark:text-[#B9C2D8]">
                      {new Date(loan.dueAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-3">{statusBadge(loan.status)}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-end gap-2">
                        {loan.status === 'ACTIVE' && (
                          <Button variant="ghost" size="xs" className="gap-1 text-[11px]">
                            <RotateCw className="h-3 w-3" /> Renew
                          </Button>
                        )}
                        <Button variant="ghost" size="xs" className="gap-1 text-[11px]">
                          <Eye className="h-3 w-3" /> Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-8 text-sm text-slate-400 dark:text-[#6B7A99]">No loans found</div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
