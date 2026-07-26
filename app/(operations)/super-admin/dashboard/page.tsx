import { requireRole } from '@/lib/auth/roleGuard'
import {
  get_super_admin_metrics,
  get_super_admin_activity,
  get_role_distribution,
  get_system_health,
} from '@/lib/actions/dashboard'
import {
  Users, BookOpen, CalendarCheck, Clock, AlertTriangle,
  TrendingUp, Activity, Shield, ArrowUpRight, ArrowDownRight,
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

const status_colors: Record<string, string> = {
  healthy: 'bg-emerald-100 text-emerald-700',
  active: 'bg-blue-100 text-blue-600',
  completed: 'bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8]',
  warning: 'bg-amber-100 text-amber-600',
  critical: 'bg-red-100 text-red-600',
}

const metric_icon_map = [Users, BookOpen, CalendarCheck, Clock] as const
const metric_color_map = ['bg-blue-50 text-blue-500', 'bg-emerald-50 text-emerald-500', 'bg-sky-50 text-sky-500', 'bg-amber-50 text-amber-500'] as const
const metric_keys = ['total_users', 'total_books', 'active_loans', 'pending_bookings'] as const
const metric_labels = ['Total Users', 'Total Books', 'Active Loans', 'Pending Bookings'] as const

export default async function super_admin_dashboard() {
  await requireRole(['SUPER_ADMIN'])

  const [metrics, activity, distribution, health] = await Promise.all([
    get_super_admin_metrics(),
    get_super_admin_activity(),
    get_role_distribution(),
    get_system_health(),
  ])

  const metric_values = [metrics.total_users, metrics.total_books, metrics.active_loans, metrics.pending_bookings]
  const metric_subtexts = [
    `${metrics.active_users_today} active today`,
    'In collection',
    `${metrics.overdue_loans} overdue`,
    'Awaiting approval',
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      {/* conditional alert banner */}
      {metrics.overdue_loans > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span className="text-[14px] font-normal">
            {metrics.overdue_loans} overdue loan{metrics.overdue_loans !== 1 ? 's' : ''} require{metrics.overdue_loans === 1 ? 's' : ''} attention
          </span>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        {/* greeting */}
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0] font-[var(--font-poppins)]">
            {greeting()}, Administrator
          </h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">
            Here is an overview of the library system
          </p>
        </div>

        {/* row 1 — primary metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metric_keys.map((key, i) => {
            const Icon = metric_icon_map[i]
            return (
              <div key={key} className="bg-white dark:bg-[#0E1F3F] rounded-2xl p-3 sm:p-4 border border-slate-100 dark:border-white/[0.08] shadow-sm dark:shadow-none hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-[11px] sm:text-[13px] font-normal text-slate-500 dark:text-[#6B7A99] truncate">{metric_labels[i]}</span>
                  <div className={`h-7 w-7 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center shrink-0 ${metric_color_map[i]}`}>
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                </div>
                <div className="text-[20px] sm:text-[24px] font-medium text-slate-900 dark:text-[#E2E8F0] font-[var(--font-poppins)] leading-tight">
                  {metric_values[i]}
                </div>
                <p className="text-[11px] sm:text-[12px] text-slate-400 dark:text-[#6B7A99] mt-0.5 truncate">{metric_subtexts[i]}</p>
              </div>
            )
          })}
        </div>

        {/* row 2 — secondary metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Active Users Today', value: metrics.active_users_today, icon: TrendingUp, color: 'text-emerald-500', trend: 'up' },
            { label: 'Total Staff', value: metrics.total_staff, icon: Shield, color: 'text-[#5B9BD5]', trend: 'up' },
            { label: 'Total Students', value: metrics.total_students, icon: Users, color: 'text-blue-500', trend: 'up' },
            { label: 'Overdue Loans', value: metrics.overdue_loans, icon: AlertTriangle, color: metrics.overdue_loans > 0 ? 'text-red-500' : 'text-slate-400 dark:text-[#6B7A99]', trend: 'down' },
          ].map((item) => (
            <div key={item.label} className="bg-white dark:bg-[#0E1F3F] rounded-2xl p-3 sm:p-4 border border-slate-100 dark:border-white/[0.08] shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-slate-50 dark:bg-white/[0.04] flex items-center justify-center shrink-0">
                    <item.icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${item.color}`} />
                  </div>
                  <span className="text-[11px] sm:text-[13px] font-normal text-slate-500 dark:text-[#6B7A99] truncate">{item.label}</span>
                </div>
                {item.trend === 'up' ? (
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500 shrink-0" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400 shrink-0" />
                )}
              </div>
              <div className="text-[18px] sm:text-[22px] font-medium text-slate-900 dark:text-[#E2E8F0] mt-1 sm:mt-1.5 font-[var(--font-poppins)]">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* row 3 — activity feed + system status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* activity feed */}
          <div className="lg:col-span-2 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none">
            <div className="px-6 py-5 border-b border-slate-50">
              <h2 className="text-[17px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0] font-[var(--font-poppins)] flex items-center gap-2">
                <Activity className="h-5 w-5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                Recent Activity
              </h2>
            </div>
            <div className="p-4 space-y-1">
              {activity.length === 0 ? (
                <p className="text-[15px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] text-center py-8">No recent activity</p>
              ) : (
                activity.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] dark:bg-white/[0.04] dark:hover:bg-white dark:bg-[#0E1F3F]/[0.04] dark:bg-white/[0.04] rounded-xl transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                      <BookOpen className="h-4 w-4 text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-normal text-slate-800 dark:text-[#E2E8F0] dark:text-[#E2E8F0] truncate">{item.description}</p>
                      <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{item.user_name} · {time_ago(item.created_at)}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-normal ${status_colors[item.status] ?? status_colors.completed}`}>
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* system status */}
          <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none">
            <div className="px-6 py-5 border-b border-slate-50">
              <h2 className="text-[17px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0] font-[var(--font-poppins)] flex items-center gap-2">
                <Shield className="h-5 w-5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                System Status
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {health.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] rounded-xl">
                  <div>
                    <p className="text-[14px] font-normal text-slate-800 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">{item.label}</p>
                    <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{item.detail}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[12px] font-normal ${status_colors[item.status]}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* row 4 — role distribution + quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* role distribution */}
          <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none">
            <div className="px-6 py-5 border-b border-slate-50">
              <h2 className="text-[17px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0] font-[var(--font-poppins)]">Role Distribution</h2>
            </div>
            <div className="p-4 space-y-3">
              {distribution.length === 0 ? (
                <p className="text-[15px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] text-center py-4">No users yet</p>
              ) : (
                distribution.map((item) => (
                  <div key={item.role}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[14px] font-normal text-slate-700 dark:text-[#E2E8F0]">{item.role.replace('_', ' ')}</span>
                      <span className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{item.count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E8A63C] rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* quick actions */}
          <div className="lg:col-span-2 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none">
            <div className="px-6 py-5 border-b border-slate-50">
              <h2 className="text-[17px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0] font-[var(--font-poppins)]">Quick Actions</h2>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Manage Users', href: '/super-admin/users', color: 'bg-blue-50 text-blue-600' },
                { label: 'Manage Books', href: '/catalogue', color: 'bg-emerald-50 text-emerald-600' },
                { label: 'View Loans', href: '/reservations', color: 'bg-amber-50 text-amber-600' },
                { label: 'Members', href: '/members', color: 'bg-sky-50 text-sky-600' },
                { label: 'Reservations', href: '/reservations', color: 'bg-[#5B9BD5]/10 text-[#5B9BD5]' },
                { label: 'System Settings', href: '/super-admin/settings', color: 'bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8]' },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={`flex items-center gap-2 p-3.5 rounded-xl ${action.color} font-normal text-[14px] hover:opacity-80 transition-opacity`}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
