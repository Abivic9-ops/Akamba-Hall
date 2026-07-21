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
            <a href="#" className="text-[14px] font-medium text-[#2563EB] hover:underline">
              Search Catalogue
            </a>
          }
        />
      ) : (
        <div className="space-y-0">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0 group"
            >
              {/* cover placeholder */}
              <div className="w-[44px] h-[60px] rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5 text-slate-400" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-slate-800 truncate">{loan.title}</p>
                <p className="text-[13px] text-slate-400">{loan.author}</p>
                <p className="text-[13px] text-slate-400 mt-0.5">
                  Due: {formatDate(loan.dueDate)}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {dueBadge(loan.dueDate)}
                {loan.renewable && (
                  <button className="text-[13px] font-medium text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                    Renew
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {loans.length > 0 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
          <button className="inline-flex items-center gap-1.5 text-[14px] font-medium text-slate-600 hover:text-slate-800 transition-colors">
            <RefreshCw className="h-4 w-4" />
            Renew All Eligible
          </button>
          <a href="#" className="text-[14px] font-medium text-[#2563EB] hover:underline">
            Manage Loans →
          </a>
        </div>
      )}
    </SectionCard>
  )
}
