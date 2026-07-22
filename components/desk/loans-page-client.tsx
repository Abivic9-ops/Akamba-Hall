'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookOpen, Search, RotateCw, Eye, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'

interface Loan {
  id: string
  memberName: string
  memberId: string
  bookTitle: string
  issueDate: string
  dueDate: string
  status: 'Active' | 'Due Soon' | 'Overdue'
  daysLeft: number
}

const mockLoans: Loan[] = [
  { id: 'LN-001', memberName: 'James Ochieng', memberId: 'STU-24011076', bookTitle: 'Advanced Physics: Principles and Applications', issueDate: '2026-06-20', dueDate: '2026-07-04', status: 'Active', daysLeft: 12 },
  { id: 'LN-002', memberName: 'Peter Kamau', memberId: 'STU-24011089', bookTitle: 'Chemistry: The Central Science', issueDate: '2026-06-18', dueDate: '2026-07-02', status: 'Active', daysLeft: 10 },
  { id: 'LN-003', memberName: 'Grace Wambui', memberId: 'STU-24011115', bookTitle: 'Biology: Concepts and Applications', issueDate: '2026-06-15', dueDate: '2026-06-29', status: 'Due Soon', daysLeft: 7 },
  { id: 'LN-004', memberName: 'David Mutua', memberId: 'STU-24011102', bookTitle: 'Introduction to Computer Science', issueDate: '2026-06-10', dueDate: '2026-06-24', status: 'Overdue', daysLeft: -2 },
  { id: 'LN-005', memberName: 'Brian Kipchoge', memberId: 'STU-24011128', bookTitle: 'Kenya History and Geography', issueDate: '2026-06-21', dueDate: '2026-07-05', status: 'Active', daysLeft: 13 },
  { id: 'LN-006', memberName: 'Alice Akinyi', memberId: 'STU-24011134', bookTitle: 'Economics: A Modern Introduction', issueDate: '2026-06-19', dueDate: '2026-07-03', status: 'Active', daysLeft: 11 },
  { id: 'LN-007', memberName: 'Michael Wairimu', memberId: 'STU-24011141', bookTitle: 'Literature in English Anthology', issueDate: '2026-06-14', dueDate: '2026-06-28', status: 'Due Soon', daysLeft: 6 },
  { id: 'LN-008', memberName: 'Sarah Njeri', memberId: 'STF-047', bookTitle: 'Teaching Mathematics in East Africa', issueDate: '2026-06-08', dueDate: '2026-06-22', status: 'Overdue', daysLeft: 0 },
]

function statusBadge(status: Loan['status']) {
  switch (status) {
    case 'Active':
      return <Badge variant="success" dot>Active</Badge>
    case 'Due Soon':
      return <Badge variant="warning" dot>Due Soon</Badge>
    case 'Overdue':
      return <Badge variant="danger" dot>Overdue</Badge>
  }
}

export function LoansPageClient() {
  const [search, setSearch] = useState('')

  const filtered = mockLoans.filter(
    (loan) =>
      loan.memberName.toLowerCase().includes(search.toLowerCase()) ||
      loan.bookTitle.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1B3D] tracking-tight">Active Loans</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track all currently issued loans.</p>
        </div>

        <SectionCard title="Active Loans" icon={BookOpen}>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by member name or book title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <span className="text-xs text-slate-500 font-medium">{filtered.length} loan(s)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Member</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Book</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Issue Date</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Days Left</th>
                  <th className="text-right py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((loan) => (
                  <tr key={loan.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-medium text-[13px] text-slate-800">{loan.memberName}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{loan.memberId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-[13px] text-slate-800 max-w-[200px] truncate">{loan.bookTitle}</p>
                    </td>
                    <td className="py-3 px-3 text-[12px] text-slate-600">
                      {new Date(loan.issueDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-3 text-[12px] text-slate-600">
                      {new Date(loan.dueDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-3">{statusBadge(loan.status)}</td>
                    <td className="py-3 px-3">
                      {loan.status === 'Overdue' ? (
                        <span className="text-[12px] font-bold text-red-600">{Math.abs(loan.daysLeft)}d overdue</span>
                      ) : (
                        <span className="text-[12px] font-medium text-slate-700">{loan.daysLeft}d</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="xs" className="gap-1 text-[11px]">
                          <RotateCw className="h-3 w-3" /> Renew
                        </Button>
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
              <div className="text-center py-8 text-sm text-slate-400">No loans match your search.</div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
