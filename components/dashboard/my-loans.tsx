'use client'

import { BookOpen, RefreshCw } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'

interface Loan {
  id: string
  title: string
  author: string
  coverUrl: string
  dueDate: string
  renewable: boolean
}

interface MyLoansProps {
  loans: Loan[]
}

function daysLeft(dueDate: string): number {
  const diff = new Date(dueDate).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function dueBadge(dueDate: string) {
  const days = daysLeft(dueDate)
  if (days < 0) return <Badge variant="danger" inverted>Overdue</Badge>
  if (days <= 3) return <Badge variant="danger">{days} days left</Badge>
  if (days <= 7) return <Badge variant="warning">{days} days left</Badge>
  return <Badge variant="success">{days} days left</Badge>
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function MyLoans({ loans }: MyLoansProps) {
  return (
    <SectionCard
      title="My Loans"
      icon={BookOpen}
      cta={{ label: 'View all', href: '#' }}
    >
      {loans.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          message="No active loans"
          action={
            <a href="#" className="text-[13px] font-medium text-[#2563EB] hover:underline">
              Search Catalogue
            </a>
          }
        />
      ) : (
        <div className="space-y-0">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0 group"
            >
              {/* cover placeholder */}
              <div className="w-[36px] h-[50px] rounded-lg bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                <BookOpen className="h-4 w-4 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{loan.title}</p>
                <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{loan.author}</p>
                <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">
                  Due: {formatDate(loan.dueDate)}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {dueBadge(loan.dueDate)}
                {loan.renewable && (
                  <button className="text-[12px] font-medium text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                    Renew
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {loans.length > 0 && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
          <button className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] hover:text-slate-800 dark:text-[#E2E8F0] transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
            Renew All Eligible
          </button>
          <a href="#" className="inline-flex items-center h-7 px-3.5 rounded-full border border-[#2563EB]/20 text-[12px] font-medium text-[#2563EB] bg-[#2563EB]/5 hover:bg-[#2563EB]/10 transition-colors">
            Manage Loans
          </a>
        </div>
      )}
    </SectionCard>
  )
}
