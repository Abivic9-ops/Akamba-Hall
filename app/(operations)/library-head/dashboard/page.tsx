import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import {
  Users, BookOpen, CalendarCheck, Clock, AlertTriangle,
  TrendingUp, Activity, BarChart3, CheckCircle2,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

function time_ago(date_str: string): string {
  const diff = Date.now() - new Date(date_str).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function format_time(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}

const status_colors: Record<string, string> = {
  APPROVED: 'bg-blue-100 text-blue-600',
  PENDING: 'bg-amber-100 text-amber-600',
  CANCELLED: 'bg-red-100 text-red-600',
  REJECTED: 'bg-red-100 text-red-600',
  NO_SHOW: 'bg-slate-100 text-slate-600',
  active: 'bg-blue-100 text-blue-600',
  overdue: 'bg-red-100 text-red-600',
  returned: 'bg-emerald-100 text-emerald-600',
}

export default async function library_head_dashboard() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const today_start = new Date()
  today_start.setHours(0, 0, 0, 0)

  const [
    total_books,
    active_loans,
    today_bookings,
    overdue_loans,
    total_members,
    recent_bookings,
    recent_loans,
    books_on_loan,
    books_available,
    staff_on_duty,
  ] = await Promise.all([
    prisma.book.count(),
    prisma.loan.count({ where: { returnedAt: null } }),
    prisma.booking.count({ where: { createdAt: { gte: today_start } } }),
    prisma.loan.count({ where: { returnedAt: null, dueAt: { lt: new Date() } } }),
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.booking.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { fullName: true } }, space: { select: { name: true } } },
    }),
    prisma.loan.findMany({
      take: 6,
      orderBy: { checkoutAt: 'desc' },
      include: { user: { select: { fullName: true } }, copy: { include: { book: { select: { title: true } } } } },
    }),
    prisma.copy.count({ where: { status: 'LOANED' } }),
    prisma.copy.count({ where: { status: 'AVAILABLE' } }),
    prisma.user.count({ where: { role: { in: ['STAFF', 'ASSISTANT', 'CAPTAIN', 'PREFECT'] } } }),
  ])

  const today = new Date()
  const day_name = today.toLocaleDateString('en-US', { weekday: 'long' })
  const date_str = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* conditional alert banner */}
      {overdue_loans > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span className="text-[13px] font-medium">
            {overdue_loans} overdue loan{overdue_loans !== 1 ? 's' : ''} require{overdue_loans === 1 ? 's' : ''} follow-up
          </span>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        {/* greeting */}
        <div>
          <h1 className="text-[28px] font-medium text-slate-900">
            {greeting()}, Library Head
          </h1>
          <p className="text-[15px] text-slate-500 mt-1">
            {day_name}, {date_str}
          </p>
        </div>

        {/* row 1 — today's snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Loans', value: active_loans, icon: BookOpen, color: 'bg-blue-50 text-blue-500' },
            { label: "Today's Bookings", value: today_bookings, icon: CalendarCheck, color: 'bg-emerald-50 text-emerald-500' },
            { label: 'Overdue Loans', value: overdue_loans, icon: Clock, color: overdue_loans > 0 ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400' },
            { label: 'Members', value: total_members, icon: Users, color: 'bg-sky-50 text-sky-500' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] text-slate-400">{item.label}</span>
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-[28px] font-bold text-slate-900 leading-tight">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* row 2 — alert panels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`rounded-2xl p-5 border ${overdue_loans > 0 ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
            <div className="flex items-center gap-3 mb-2">
              {overdue_loans > 0 ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              )}
              <span className={`text-[15px] font-medium ${overdue_loans > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                {overdue_loans > 0 ? 'Action Needed' : 'All Clear'}
              </span>
            </div>
            <p className={`text-[13px] ${overdue_loans > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
              {overdue_loans > 0
                ? `${overdue_loans} loan${overdue_loans !== 1 ? 's' : ''} past due`
                : 'No overdue loans'
              }
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-amber-500" />
              <span className="text-[15px] font-medium text-amber-700">Staff Status</span>
            </div>
            <p className="text-[13px] text-amber-600">
              {staff_on_duty} staff member{staff_on_duty !== 1 ? 's' : ''} on duty
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-sky-500" />
              <span className="text-[15px] font-medium text-sky-700">Collection</span>
            </div>
            <p className="text-[13px] text-sky-600">
              {books_on_loan} on loan &middot; {books_available} available
            </p>
          </div>
        </div>

        {/* row 3 — bookings timeline + member activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* bookings */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-50">
              <h2 className="text-[15px] font-medium text-slate-900 flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-slate-400" />
                Recent Bookings
              </h2>
            </div>
            <div className="p-4 space-y-1">
              {recent_bookings.length === 0 ? (
                <p className="text-[13px] text-slate-400 text-center py-8">No bookings today</p>
              ) : (
                recent_bookings.map((b) => (
                  <div key={b.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                      <CalendarCheck className="h-4 w-4 text-sky-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-slate-800 truncate">
                        {b.space?.name ?? 'Unknown Space'}
                      </p>
                      <p className="text-[12px] text-slate-400">
                        {b.user.fullName ?? 'Unknown'} &middot; {time_ago(b.createdAt.toISOString())}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status_colors[b.status] ?? ''}`}>
                      {b.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* member activity / recent loans */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-50">
              <h2 className="text-[15px] font-medium text-slate-900 flex items-center gap-2">
                <Activity className="h-4 w-4 text-slate-400" />
                Recent Loans
              </h2>
            </div>
            <div className="p-4 space-y-1">
              {recent_loans.length === 0 ? (
                <p className="text-[13px] text-slate-400 text-center py-8">No recent loans</p>
              ) : (
                recent_loans.map((loan) => {
                  const is_overdue = !loan.returnedAt && loan.dueAt < new Date()
                  const loan_status = loan.returnedAt ? 'returned' : is_overdue ? 'overdue' : 'active'
                  return (
                    <div key={loan.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                      <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-slate-800 truncate">
                          {loan.copy?.book?.title ?? 'Unknown Book'}
                        </p>
                        <p className="text-[12px] text-slate-400">
                          {loan.user.fullName ?? 'Unknown'} &middot; Due {format_time(loan.dueAt)}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status_colors[loan_status]}`}>
                        {loan_status}
                      </span>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* row 4 — inventory + staff overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* inventory summary */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-50">
              <h2 className="text-[15px] font-medium text-slate-900">Inventory Summary</h2>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Total Titles', value: total_books },
                { label: 'Available Copies', value: books_available },
                { label: 'On Loan', value: books_on_loan },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-400">{item.label}</span>
                  <span className="text-[18px] font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
              {total_books > 0 && (
                <div className="pt-2">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#E8A63C] rounded-full"
                      style={{ width: `${Math.round((books_available / Math.max(total_books, 1)) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {Math.round((books_available / Math.max(total_books, 1)) * 100)}% availability
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* staff overview */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-50">
              <h2 className="text-[15px] font-medium text-slate-900">Staff Overview</h2>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Total Staff', value: staff_on_duty },
                { label: 'Active Loans', value: active_loans },
                { label: "Today's Bookings", value: today_bookings },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-400">{item.label}</span>
                  <span className="text-[18px] font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* row 5 — quick actions */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-50">
            <h2 className="text-[15px] font-medium text-slate-900">Quick Actions</h2>
          </div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Manage Books', href: '/catalogue', color: 'bg-blue-50 text-blue-600' },
              { label: 'View Members', href: '/members', color: 'bg-emerald-50 text-emerald-600' },
              { label: 'Reservations', href: '/reservations', color: 'bg-amber-50 text-amber-600' },
              { label: 'Desk Operations', href: '/desk', color: 'bg-sky-50 text-sky-600' },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl ${action.color} font-medium text-[12px] hover:opacity-80 transition-opacity`}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
