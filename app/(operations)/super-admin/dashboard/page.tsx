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
  completed: 'bg-slate-100 text-slate-600',
  warning: 'bg-amber-100 text-amber-600',
  critical: 'bg-red-100 text-red-600',
}

const metric_icon_map = [Users, BookOpen, CalendarCheck, Clock] as const
const metric_color_map = ['bg-blue-50 text-blue-500', 'bg-emerald-50 text-emerald-500', 'bg-sky-50 text-sky-500', 'bg-amber-50 text-amber-500'] as const
const metric_keys = ['total_users', 'total_books', 'active_loans', 'pending_bookings'] as const
const metric_labels = ['Total Users', 'Total Books', 'Active Loans', 'Pending Bookings'] as const

export default async function super_admin_dashboard() {
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
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* conditional alert banner */}
      {metrics.overdue_loans > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span className="text-[13px] font-semibold">
            {metrics.overdue_loans} overdue loan{metrics.overdue_loans !== 1 ? 's' : ''} require{metrics.overdue_loans === 1 ? 's' : ''} attention
          </span>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        {/* greeting */}
        <div>
          <h1 className="text-[22px] font-extrabold text-slate-900 font-[var(--font-poppins)]">
            {greeting()}, Administrator
          </h1>
          <p className="text-[13px] text-slate-500 mt-1">
            Here is an overview of the library system
          </p>
        </div>

        {/* row 1 — primary metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metric_keys.map((key, i) => {
            const Icon = metric_icon_map[i]
            return (
              <div key={key} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-semibold text-slate-500">{metric_labels[i]}</span>
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${metric_color_map[i]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-[28px] font-extrabold text-slate-900 font-[var(--font-poppins)] leading-tight">
                  {metric_values[i]}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{metric_subtexts[i]}</p>
              </div>
            )
          })}
        </div>

        {/* row 2 — secondary metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Users Today', value: metrics.active_users_today, icon: TrendingUp, color: 'text-emerald-500', trend: 'up' },
            { label: 'Total Staff', value: metrics.total_staff, icon: Shield, color: 'text-purple-500', trend: 'up' },
            { label: 'Total Students', value: metrics.total_students, icon: Users, color: 'text-blue-500', trend: 'up' },
            { label: 'Overdue Loans', value: metrics.overdue_loans, icon: AlertTriangle, color: metrics.overdue_loans > 0 ? 'text-red-500' : 'text-slate-400', trend: 'down' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center">
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <span className="text-[12px] font-semibold text-slate-500">{item.label}</span>
                </div>
                {item.trend === 'up' ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-red-400" />
                )}
              </div>
              <div className="text-[22px] font-extrabold text-slate-900 mt-2 font-[var(--font-poppins)]">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* row 3 — activity feed + system status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* activity feed */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-50">
              <h2 className="text-[15px] font-bold text-slate-900 font-[var(--font-poppins)] flex items-center gap-2">
                <Activity className="h-4 w-4 text-slate-400" />
                Recent Activity
              </h2>
            </div>
            <div className="p-4 space-y-1">
              {activity.length === 0 ? (
                <p className="text-[13px] text-slate-400 text-center py-8">No recent activity</p>
              ) : (
                activity.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <BookOpen className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-slate-800 truncate">{item.description}</p>
                      <p className="text-[11px] text-slate-400">{item.user_name} &middot; {time_ago(item.created_at)}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${status_colors[item.status] ?? status_colors.completed}`}>
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* system status */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-50">
              <h2 className="text-[15px] font-bold text-slate-900 font-[var(--font-poppins)] flex items-center gap-2">
                <Shield className="h-4 w-4 text-slate-400" />
                System Status
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {health.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">{item.label}</p>
                    <p className="text-[11px] text-slate-400">{item.detail}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${status_colors[item.status]}`}>
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
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-50">
              <h2 className="text-[15px] font-bold text-slate-900 font-[var(--font-poppins)]">Role Distribution</h2>
            </div>
            <div className="p-4 space-y-3">
              {distribution.length === 0 ? (
                <p className="text-[13px] text-slate-400 text-center py-4">No users yet</p>
              ) : (
                distribution.map((item) => (
                  <div key={item.role}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-semibold text-slate-700">{item.role.replace('_', ' ')}</span>
                      <span className="text-[11px] text-slate-400">{item.count}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
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
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-50">
              <h2 className="text-[15px] font-bold text-slate-900 font-[var(--font-poppins)]">Quick Actions</h2>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Manage Users', href: '/super-admin/users', color: 'bg-blue-50 text-blue-600' },
                { label: 'Manage Books', href: '/catalogue', color: 'bg-emerald-50 text-emerald-600' },
                { label: 'View Loans', href: '/reservations', color: 'bg-amber-50 text-amber-600' },
                { label: 'Members', href: '/members', color: 'bg-sky-50 text-sky-600' },
                { label: 'Reservations', href: '/reservations', color: 'bg-purple-50 text-purple-600' },
                { label: 'System Settings', href: '/super-admin/settings', color: 'bg-slate-100 text-slate-600' },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={`flex items-center gap-2 p-3 rounded-xl ${action.color} font-semibold text-[12px] hover:opacity-80 transition-opacity`}
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
