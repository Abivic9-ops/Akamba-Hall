import { requireRole } from '@/lib/auth/roleGuard'
import { get_loan_stats, get_all_loans } from '@/lib/actions/loans'
import { ReportsPageClient } from '@/components/desk/reports-page-client'

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const [loanStats, allLoans] = await Promise.all([
    get_loan_stats(),
    get_all_loans({ limit: 200 }),
  ])

  const summaryCards = [
    { label: 'Total Transactions', value: loanStats.totalActive + loanStats.totalReturned, color: 'bg-blue-50 text-[#2563EB]', icon: 'TrendingUp' },
    { label: 'Issues', value: loanStats.todayCheckouts, color: 'bg-emerald-50 text-emerald-600', icon: 'BookOpen' },
    { label: 'Returns', value: loanStats.todayReturns, color: 'bg-amber-50 text-amber-600', icon: 'Calendar' },
    { label: 'Active Loans', value: loanStats.totalActive, color: 'bg-[#5B9BD5]/10 text-[#5B9BD5]', icon: 'Users' },
    { label: 'Overdue Items', value: loanStats.totalOverdue, color: 'bg-red-50 text-red-600', icon: 'TrendingUp' },
  ]

  const bookCounts: Record<string, { title: string; author: string; count: number }> = {}
  for (const loan of allLoans) {
    const key = loan.bookTitle
    if (!bookCounts[key]) bookCounts[key] = { title: loan.bookTitle, author: loan.author, count: 0 }
    bookCounts[key].count++
  }
  const popularBooks = Object.values(bookCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((b, i) => ({ rank: i + 1, title: b.title, author: b.author, issues: b.count }))

  const memberCounts: Record<string, { borrowed: number; returned: number }> = {}
  for (const loan of allLoans) {
    const key = loan.memberName
    if (!memberCounts[key]) memberCounts[key] = { borrowed: 0, returned: 0 }
    if (loan.returnedAt) memberCounts[key].returned++
    else memberCounts[key].borrowed++
  }
  const activeMembers = Object.entries(memberCounts)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.borrowed - a.borrowed)
    .slice(0, 5)
    .map((m, i) => ({ rank: i + 1, name: m.name, borrowed: m.borrowed, returned: m.returned }))

  return (
    <ReportsPageClient
      summaryCards={summaryCards}
      popularBooks={popularBooks}
      activeMembers={activeMembers}
    />
  )
}
