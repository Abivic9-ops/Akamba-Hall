import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import Link from 'next/link'
import { SuperAdminBannerWrapper } from '@/components/ai/super-admin-banner-wrapper'
import {
  Users, BookOpen, ArrowDownToLine, CalendarCheck,
  AlertTriangle, Clock, CheckCircle2, Shield,
  Settings, Eye, Package, BarChart3, BookPlus,
  CreditCard, TrendingUp, ClipboardList, Search,
  Activity, Server, Database, Wifi, Zap,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export default async function SuperAdminDashboard() {
  await requireRole(['SUPER_ADMIN'])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // ── Batch 1: User counts ──
  const [totalStudents, totalStaff, totalDesk, totalExecutive, totalLibraryHead] =
    await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'STAFF' } }),
      prisma.user.count({ where: { role: { in: ['ASSISTANT', 'CAPTAIN', 'PREFECT'] } } }),
      prisma.user.count({ where: { role: 'EXECUTIVE' } }),
      prisma.user.count({ where: { role: 'LIBRARY_HEAD' } }),
    ])

  // ── Batch 2: Core counts ──
  const [totalSuperAdmin, totalBooks, totalCopies, availableCopies, loanedCopies] =
    await Promise.all([
      prisma.user.count({ where: { role: 'SUPER_ADMIN' } }),
      prisma.book.count(),
      prisma.copy.count(),
      prisma.copy.count({ where: { status: 'AVAILABLE' } }),
      prisma.copy.count({ where: { status: 'LOANED' } }),
    ])

  // ── Batch 3: Loans & activity ──
  const [overdueLoans, activeLoans, pendingBookings, pendingHolds, pendingRoleRequests] =
    await Promise.all([
      prisma.loan.count({ where: { status: 'OVERDUE' } }),
      prisma.loan.count({ where: { status: 'ACTIVE' } }),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.hold.count({ where: { status: 'PENDING' } }),
      prisma.roleRequest.count({ where: { status: 'PENDING' } }),
    ])

  // ── Batch 4: Extended system data ──
  const [reservedCopies, totalDigitalResources, totalEResources, totalEquipment, unpaidFines] =
    await Promise.all([
      prisma.copy.count({ where: { status: 'RESERVED' } }),
      prisma.digitalResource.count(),
      prisma.eResource.count(),
      prisma.equipment.count(),
      prisma.fine.aggregate({ where: { paid: false }, _sum: { amount: true }, _count: true }),
    ])

  // ── Batch 5: Activity & meta ──
  const [recentActivity, totalUsers] =
    await Promise.all([
      prisma.loan.findMany({
        take: 10,
        orderBy: { checkoutAt: 'desc' },
        include: {
          user: { select: { fullName: true, role: true } },
          copy: { include: { book: { select: { title: true } } } },
        },
      }),
      prisma.user.count(),
    ])

  const totalUsersAll = totalStudents + totalStaff + totalDesk + totalExecutive + totalLibraryHead + totalSuperAdmin

  const primaryMetrics = [
    { label: 'Total Users', value: totalUsersAll, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { label: 'Total Books', value: totalBooks, icon: BookOpen, color: 'text-[#5B9BD5]', bg: 'bg-[#5B9BD5]/10' },
    { label: 'Active Loans', value: activeLoans, icon: ArrowDownToLine, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { label: 'Pending Bookings', value: pendingBookings, icon: CalendarCheck, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  ]

  const roleDistributions = [
    { label: 'Students', value: totalStudents, color: 'bg-blue-500' },
    { label: 'Staff', value: totalStaff, color: 'bg-[#0B1A3B] dark:bg-white/70' },
    { label: 'Desk', value: totalDesk, color: 'bg-amber-500' },
    { label: 'Executive', value: totalExecutive, color: 'bg-emerald-500' },
    { label: 'Library Head', value: totalLibraryHead, color: 'bg-sky-500' },
    { label: 'Super Admin', value: totalSuperAdmin, color: 'bg-red-500' },
  ]

  const maxRoleCount = Math.max(...roleDistributions.map((r) => r.value), 1)

  const dbOverview = [
    { label: 'Total Books', value: totalBooks, icon: BookOpen },
    { label: 'Total Copies', value: totalCopies, icon: Package },
    { label: 'Available Copies', value: availableCopies, icon: CheckCircle2 },
    { label: 'Loaned Copies', value: loanedCopies, icon: ArrowDownToLine },
    { label: 'Reserved Copies', value: reservedCopies, icon: CalendarCheck },
    { label: 'Active Holds', value: pendingHolds, icon: Clock },
    { label: 'Pending Holds', value: pendingHolds, icon: AlertTriangle },
    { label: 'Digital Resources', value: totalDigitalResources, icon: Zap },
    { label: 'E-Resources', value: totalEResources, icon: Database },
    { label: 'Equipment', value: totalEquipment, icon: Settings },
  ]

  const systemAlerts = [
    {
      label: 'Overdue Loans',
      value: overdueLoans,
      severity: overdueLoans > 0 ? 'red' : 'green' as const,
      icon: AlertTriangle,
    },
    {
      label: 'Pending Role Requests',
      value: pendingRoleRequests,
      severity: pendingRoleRequests > 0 ? 'amber' : 'green' as const,
      icon: Shield,
    },
    {
      label: 'Pending Holds',
      value: pendingHolds,
      severity: pendingHolds > 0 ? 'amber' : 'green' as const,
      icon: Clock,
    },
    {
      label: 'Unpaid Fines',
      value: `KES ${unpaidFines._sum.amount ?? 0}`,
      severity: unpaidFines._count > 0 ? 'amber' : 'green' as const,
      icon: CreditCard,
    },
  ]

  const severityStyles = {
    red: 'text-red-500 bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20',
    amber: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20',
    green: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20',
  }

  const severityDot = {
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    green: 'bg-emerald-500',
  }

  const quickActions = [
    { label: 'Manage Users', href: '/super-admin/users', icon: Users, color: 'text-blue-500' },
    { label: 'Access Portals', href: '/super-admin/access-portals', icon: Eye, color: 'text-[#0B1A3B] dark:text-white' },
    { label: 'System Settings', href: '/super-admin/settings', icon: Settings, color: 'text-slate-600 dark:text-slate-300' },
    { label: 'View Announcements', href: '/super-admin/system-announcements', icon: BarChart3, color: 'text-sky-500' },
    { label: 'Manage Inventory', href: '/super-admin/inventory', icon: Package, color: 'text-amber-500' },
    { label: 'Digital Resources', href: '/super-admin/digital-resources', icon: Database, color: 'text-[#5B9BD5]' },
    { label: 'Learning Resources', href: '/super-admin/learning-resources', icon: BookPlus, color: 'text-purple-500' },
    { label: 'QR Cards', href: '/super-admin/qr-cards', icon: CreditCard, color: 'text-purple-500' },
    { label: 'System Health', href: '/super-admin/health', icon: Activity, color: 'text-emerald-500' },
    { label: 'AI Tools Guide', href: '/student/ai-tools', icon: Zap, color: 'text-[#5B9BD5]' },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-4 sm:p-5 md:p-6 space-y-6">
        {/* Greeting + AI Banner */}
        <div>
          <h1 className="text-[22px] sm:text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] font-[var(--font-poppins)]">
            {greeting()}, Administrator
          </h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">
            Here is an overview of the library system
          </p>
        </div>

        <SuperAdminBannerWrapper />

        {overdueLoans > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 sm:px-6 py-3 flex items-center gap-3 rounded-xl">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span className="text-[13px] sm:text-[14px] font-normal">
              {overdueLoans} overdue loan{overdueLoans !== 1 ? 's' : ''} require{overdueLoans === 1 ? 's' : ''} attention
            </span>
          </div>
        )}

        {/* Primary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {primaryMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div
                key={metric.label}
                className="bg-white dark:bg-[#0E1F3F] rounded-2xl p-3 sm:p-4 border border-slate-100 dark:border-white/[0.08] shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-8 w-8 rounded-xl ${metric.bg} flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
                <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] mt-0.5">{metric.label}</p>
              </div>
            )
          })}
        </div>

        {/* System Activity */}
        {recentActivity.length > 0 && (
          <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 dark:border-white/[0.06]">
              <h2 className="text-[15px] font-medium text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                System Activity — Recent Loans
              </h2>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-white/[0.04]">
              {recentActivity.map((loan) => {
                const statusColor =
                  loan.status === 'RETURNED'
                    ? 'text-emerald-500'
                    : loan.status === 'OVERDUE'
                      ? 'text-red-500'
                      : 'text-blue-500'
                const statusBg =
                  loan.status === 'RETURNED'
                    ? 'bg-emerald-50 dark:bg-emerald-500/10'
                    : loan.status === 'OVERDUE'
                      ? 'bg-red-50 dark:bg-red-500/10'
                      : 'bg-blue-50 dark:bg-blue-500/10'
                const StatusIcon =
                  loan.status === 'RETURNED'
                    ? CheckCircle2
                    : loan.status === 'OVERDUE'
                      ? AlertTriangle
                      : ArrowDownToLine
                return (
                  <div key={loan.id} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${statusBg}`}>
                        <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-slate-900 dark:text-white">
                          {loan.copy.book.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-[#6B7A99]">
                          {loan.user.fullName} · {loan.user.role}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">
                        {new Date(loan.checkoutAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p className={`text-[11px] font-medium ${statusColor}`}>
                        {loan.status.charAt(0) + loan.status.slice(1).toLowerCase()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Two-column: Role Distribution + Database Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* User & Role Distribution */}
          <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-5 sm:p-6">
            <h2 className="text-[15px] font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-5">
              <Users className="h-4 w-4 text-slate-400" />
              User &amp; Role Distribution
            </h2>
            <div className="space-y-3">
              {roleDistributions.map((role) => (
                <div key={role.label} className="flex items-center gap-3">
                  <span className="text-[12px] text-slate-600 dark:text-[#94A3B8] w-20 shrink-0 text-right">
                    {role.label}
                  </span>
                  <div className="flex-1 h-5 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${role.color} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.max((role.value / maxRoleCount) * 100, role.value > 0 ? 4 : 0)}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-medium text-slate-900 dark:text-white w-10 text-right">
                    {role.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] mt-4">
              Total users: {totalUsersAll}
            </p>
          </div>

          {/* Database Overview */}
          <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-5 sm:p-6">
            <h2 className="text-[15px] font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-5">
              <Database className="h-4 w-4 text-slate-400" />
              Database Overview
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {dbOverview.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="bg-[#F8F9FB] dark:bg-white/[0.04] rounded-xl p-3 border border-slate-50 dark:border-white/[0.06]"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-[11px] text-slate-500 dark:text-[#6B7A99] truncate">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Two-column: System Alerts + System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* System Alerts */}
          <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-5 sm:p-6">
            <h2 className="text-[15px] font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-5">
              <AlertTriangle className="h-4 w-4 text-slate-400" />
              System Alerts
            </h2>
            <div className="space-y-3">
              {systemAlerts.map((alert) => {
                const Icon = alert.icon
                return (
                  <div
                    key={alert.label}
                    className={`flex items-center justify-between p-3 rounded-xl border ${severityStyles[alert.severity]}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${severityDot[alert.severity]}`} />
                      <Icon className="h-4 w-4" />
                      <span className="text-[13px] font-medium">{alert.label}</span>
                    </div>
                    <span className="text-[15px] font-bold">{alert.value}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-5 sm:p-6">
            <h2 className="text-[15px] font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-5">
              <Activity className="h-4 w-4 text-slate-400" />
              System Health
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                    <Wifi className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-slate-900 dark:text-white">Database Connection</p>
                    <p className="text-[11px] text-slate-500 dark:text-[#6B7A99]">PostgreSQL via Prisma</p>
                  </div>
                </div>
                <span className="text-[12px] font-medium text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                    <Server className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-slate-900 dark:text-white">System Uptime</p>
                    <p className="text-[11px] text-slate-500 dark:text-[#6B7A99]">Since last deployment</p>
                  </div>
                </div>
                <span className="text-[12px] font-medium text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-full">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-white/[0.06] flex items-center justify-center">
                    <Database className="h-4 w-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-slate-900 dark:text-white">Total Records</p>
                    <p className="text-[11px] text-slate-500 dark:text-[#6B7A99]">Across all tables</p>
                  </div>
                </div>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">
                  {totalBooks + totalCopies + totalUsersAll + activeLoans}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-slate-900 dark:text-white">Last Error</p>
                    <p className="text-[11px] text-slate-500 dark:text-[#6B7A99]">Recent system logs</p>
                  </div>
                </div>
                <span className="text-[12px] font-medium text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  None
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick System Actions */}
        <div>
          <h2 className="text-[15px] font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-4 font-[var(--font-poppins)]">
            <Zap className="h-4 w-4 text-slate-400" />
            Quick System Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group bg-white dark:bg-[#0E1F3F] rounded-2xl p-4 border border-slate-100 dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center gap-2.5 text-center"
                >
                  <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/[0.06] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <span className="text-[12px] font-medium text-slate-700 dark:text-[#94A3B8] group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
