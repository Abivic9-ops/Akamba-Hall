import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import type { Role } from '@/lib/types/role'
import Link from 'next/link'
import { SuperAdminBannerWrapper } from '@/components/ai/super-admin-banner-wrapper'
import {
  GraduationCap, Briefcase, Monitor, Zap, BookMarked,
  Shield, ArrowRight, Users, BarChart3, BookOpen,
  CalendarCheck, ClipboardList, Settings, Eye, AlertTriangle,
  TrendingUp, Clock, CheckCircle2, ArrowDownToLine,
  Package, CreditCard, Search, BookPlus, Database,
  Activity, Cpu, Wifi, ShieldCheck, Plug,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

const deskRoles: Role[] = ['ASSISTANT', 'CAPTAIN', 'PREFECT']

function DonutChart({
  segments,
  size = 120,
  strokeWidth = 18,
}: {
  segments: { value: number; color: string; label: string }[]
  size?: number
  strokeWidth?: number
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0)
  if (total === 0) {
    return (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-white/5"
          />
          <text
            x={size / 2}
            y={size / 2}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-slate-400 dark:fill-white/30"
            fontSize={size * 0.18}
            fontWeight="600"
          >
            0
          </text>
        </svg>
      </div>
    )
  }

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  let cumulative = 0

  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => {
          const pct = seg.value / total
          const dashLength = circumference * pct
          const dashOffset = circumference * (1 - cumulative / total) + circumference * 0.25
          cumulative += seg.value
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.6s ease' }}
            />
          )
        })}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-slate-900 dark:fill-white"
          fontSize={size * 0.2}
          fontWeight="700"
        >
          {total}
        </text>
        <text
          x={size / 2}
          y={size / 2 + size * 0.12}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-slate-400 dark:fill-white/40"
          fontSize={size * 0.09}
        >
          Total
        </text>
      </svg>
    </div>
  )
}

function BarChart({
  data,
  maxValue,
}: {
  data: { label: string; loans: number; returns: number }[]
  maxValue: number
}) {
  const max = Math.max(maxValue, 1)
  return (
    <div className="flex items-end gap-2 h-[140px]">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
          <div className="flex gap-0.5 items-end w-full justify-center" style={{ height: '120px' }}>
            <div
              className="w-[14px] rounded-t-sm bg-[#5B9BD5] dark:bg-[#7BB8F0] transition-all"
              style={{ height: `${(d.loans / max) * 100}%`, minHeight: d.loans > 0 ? 4 : 0 }}
              title={`Loans: ${d.loans}`}
            />
            <div
              className="w-[14px] rounded-t-sm bg-emerald-400 dark:bg-emerald-500 transition-all"
              style={{ height: `${(d.returns / max) * 100}%`, minHeight: d.returns > 0 ? 4 : 0 }}
              title={`Returns: ${d.returns}`}
            />
          </div>
          <span className="text-[10px] text-slate-400 dark:text-white/40">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

export default async function AccessPortalsPage() {
  await requireRole(['SUPER_ADMIN'])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - 6)
  weekStart.setHours(0, 0, 0, 0)

  const batch1 = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.book.count(),
    prisma.copy.count(),
    prisma.copy.count({ where: { status: 'AVAILABLE' } }),
  ])
  const [totalUsers, activeMembers, totalBooks, totalCopies, availableCopies] = batch1

  const batch2 = await Promise.all([
    prisma.copy.count({ where: { status: 'LOANED' } }),
    prisma.copy.count({ where: { status: 'RESERVED' } }),
    prisma.loan.count({ where: { returnedAt: null, dueAt: { lt: new Date() } } }),
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.user.count({ where: { role: 'STAFF' } }),
  ])
  const [loanedCopies, reservedCopies, overdueLoans, totalStudents, totalStaff] = batch2

  const batch3 = await Promise.all([
    prisma.user.count({ where: { role: { in: deskRoles } } }),
    prisma.user.count({ where: { role: 'EXECUTIVE' } }),
    prisma.user.count({ where: { role: 'LIBRARY_HEAD' } }),
    prisma.user.count({ where: { role: 'SUPER_ADMIN' } }),
    prisma.hold.count({ where: { status: 'PENDING' } }),
  ])
  const [totalDesk, totalExecutive, totalLibraryHead, totalSuperAdmin, pendingHolds] = batch3

  const batch4 = await Promise.all([
    prisma.loan.count({ where: { checkoutAt: { gte: today } } }),
    prisma.loan.count({ where: { returnedAt: { gte: today } } }),
    prisma.booking.count({ where: { createdAt: { gte: today } } }),
    prisma.fine.aggregate({ where: { paid: false }, _sum: { amount: true } }),
    prisma.user.count({ where: { role: 'STUDENT', status: 'ACTIVE' } }),
  ])
  const [todayLoans, todayReturns, todayBookings, totalFinesOwed, activeStudents] = batch4

  const batch5 = await Promise.all([
    prisma.user.count({ where: { role: 'STAFF', status: 'ACTIVE' } }),
    prisma.user.count({ where: { role: { in: deskRoles }, status: 'ACTIVE' } }),
    prisma.user.count({ where: { role: 'EXECUTIVE', status: 'ACTIVE' } }),
    prisma.user.count({ where: { role: 'LIBRARY_HEAD', status: 'ACTIVE' } }),
    prisma.user.count({ where: { role: 'SUPER_ADMIN', status: 'ACTIVE' } }),
  ])
  const [activeStaff, activeDesk, activeExec, activeLibHead, activeSuperAdmin] = batch5

  const loanDays: { label: string; loans: number; returns: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    d.setHours(0, 0, 0, 0)
    const next = new Date(d)
    next.setDate(next.getDate() + 1)
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' })
    const [loans, returns] = await Promise.all([
      prisma.loan.count({ where: { checkoutAt: { gte: d, lt: next } } }),
      prisma.loan.count({ where: { returnedAt: { gte: d, lt: next } } }),
    ])
    loanDays.push({ label: dayLabel, loans, returns })
  }
  const maxLoanDayValue = Math.max(...loanDays.map((d) => Math.max(d.loans, d.returns)), 1)

  const recentActivity = await prisma.loan.findMany({
    take: 10,
    orderBy: { checkoutAt: 'desc' },
    include: {
      user: { select: { fullName: true, role: true } },
      copy: { include: { book: { select: { title: true } } } },
    },
  })

  const portals = [
    {
      title: 'Student Portal',
      description: 'Browse the catalogue, manage loans, view reading history, and reserve study spaces.',
      href: '/student/dashboard',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-100',
      stats: [
        { label: 'Students', value: totalStudents },
        { label: 'Active Loans', value: loanedCopies },
        { label: 'Pending Holds', value: pendingHolds },
      ],
      features: ['Catalogue Search', 'Courses & Materials', 'E-Resources', 'Bookmarks', 'Holds & Returns', 'History'],
    },
    {
      title: 'Staff Portal',
      description: 'Staff tools for browsing resources, managing personal library, and booking spaces.',
      href: '/staff/dashboard',
      icon: Briefcase,
      color: 'from-[#0B1A3B] to-[#132859]',
      bg: 'bg-[#0B1A3B]/5',
      iconColor: 'text-[#0B1A3B] dark:text-white',
      borderColor: 'border-[#E4E7EE] dark:border-white/10',
      stats: [
        { label: 'Staff', value: totalStaff },
        { label: "Today's Loans", value: todayLoans },
        { label: "Today's Returns", value: todayReturns },
      ],
      features: ['Catalogue Search', 'Courses & Materials', 'AV & Boardroom Booking', 'Equipment Booking', 'Fines & Charges', 'Help Centre'],
    },
    {
      title: 'Desk Portal',
      description: 'Front desk operations for check-in, check-out, member verification, and inventory.',
      href: '/desk/dashboard',
      icon: Monitor,
      color: 'from-amber-500 to-amber-600',
      bg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      borderColor: 'border-amber-100',
      stats: [
        { label: 'Desk Users', value: totalDesk },
        { label: "Today's Transactions", value: todayLoans + todayReturns },
        { label: 'Overdue Items', value: overdueLoans },
      ],
      features: ['Issue & Returns', 'Issue Log', 'Lost & Found', 'Daily Reports', 'Member Management', 'Access Cards'],
    },
    {
      title: 'Executive Portal',
      description: 'Executive oversight with analytics, governance reports, and institutional reporting.',
      href: '/executive/dashboard',
      icon: Zap,
      color: 'from-emerald-500 to-emerald-600',
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      borderColor: 'border-emerald-100',
      stats: [
        { label: 'Executives', value: totalExecutive },
        { label: 'Total Members', value: activeMembers },
        { label: 'Outstanding Fines', value: `KES ${totalFinesOwed._sum.amount ?? 0}` },
      ],
      features: ['Reports & Analytics', 'Policy Rules', 'Approval Queue', 'Roles Overview', 'Account Lookup', 'Spaces & Bookings'],
    },
    {
      title: 'Library Head Portal',
      description: 'Full library operations — inventory, bookings, staff management, and content management.',
      href: '/library-head/dashboard',
      icon: BookMarked,
      color: 'from-sky-500 to-sky-600',
      bg: 'bg-sky-50',
      iconColor: 'text-sky-500',
      borderColor: 'border-sky-100',
      stats: [
        { label: 'Library Heads', value: totalLibraryHead },
        { label: 'Total Books', value: totalBooks },
        { label: "Today's Bookings", value: todayBookings },
      ],
      features: ['Operations', 'Inventory & Stocktake', 'Member Management', 'Approval Queues', 'Content Management', 'Charges & Loans'],
    },
    {
      title: 'Administration & Resources',
      description: 'Manage digital collections, learning materials, policies, and system controls from one place.',
      href: '/super-admin/digital-resources',
      icon: Database,
      color: 'from-violet-500 to-violet-600',
      bg: 'bg-violet-50',
      iconColor: 'text-violet-600',
      borderColor: 'border-violet-100',
      stats: [
        { label: 'Admin Users', value: totalSuperAdmin },
        { label: 'Active Members', value: activeMembers },
        { label: 'Library Books', value: totalBooks },
      ],
      features: ['Digital Resources', 'Learning Resources', 'Policies & Rules', 'Automations & Jobs'],
    },
  ]

  const featureIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'Catalogue Search': Search,
    'Courses & Materials': GraduationCap,
    'E-Resources': BookOpen,
    'Bookmarks': BookMarked,
    'Holds & Returns': Package,
    'History': Clock,
    'AV & Boardroom Booking': CalendarCheck,
    'Equipment Booking': Settings,
    'Fines & Charges': BarChart3,
    'Help Centre': Eye,
    'Issue & Returns': ArrowDownToLine,
    'Issue Log': ClipboardList,
    'Lost & Found': Search,
    'Daily Reports': BarChart3,
    'Member Management': Users,
    'Access Cards': CreditCard,
    'Reports & Analytics': TrendingUp,
    'Policy Rules': Shield,
    'Approval Queue': CheckCircle2,
    'Roles Overview': Users,
    'Account Lookup': Eye,
    'Spaces & Bookings': CalendarCheck,
    'Operations': Settings,
    'Inventory & Stocktake': Package,
    'Approval Queues': CheckCircle2,
    'Content Management': BookPlus,
    'Charges & Loans': BarChart3,
  }

  const roleDistributionSegments = [
    { value: totalStudents, color: '#5B9BD5', label: 'Students' },
    { value: totalStaff, color: '#0B1A3B', label: 'Staff' },
    { value: totalDesk, color: '#E8A63C', label: 'Desk' },
    { value: totalExecutive, color: '#10B981', label: 'Executives' },
    { value: totalLibraryHead, color: '#38BDF8', label: 'Library Heads' },
    { value: totalSuperAdmin, color: '#8B5CF6', label: 'Super Admin' },
  ]

  const copyStatusSegments = [
    { value: availableCopies, color: '#10B981', label: 'Available' },
    { value: loanedCopies, color: '#5B9BD5', label: 'Loaned' },
    { value: reservedCopies, color: '#E8A63C', label: 'Reserved' },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-4 sm:p-5 md:p-6 space-y-6">
        <div>
          <h1 className="text-[22px] sm:text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] font-[var(--font-poppins)]">
            {greeting()}, Administrator
          </h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">
            Access and monitor all portals in the system with live data
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

        {/* System Summary Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Total Users', value: totalUsers, icon: Users, color: 'text-blue-500' },
            { label: 'Active Members', value: activeMembers, icon: CheckCircle2, color: 'text-emerald-500' },
            { label: 'Total Books', value: totalBooks, icon: BookOpen, color: 'text-[#5B9BD5]' },
            { label: 'Available Copies', value: availableCopies, icon: Package, color: 'text-emerald-500' },
            { label: 'On Loan Copies', value: loanedCopies, icon: ArrowDownToLine, color: 'text-amber-500' },
            { label: 'Overdue Loans', value: overdueLoans, icon: AlertTriangle, color: overdueLoans > 0 ? 'text-red-500' : 'text-slate-400' },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon
            return (
              <Link
                key={portal.href}
                href={portal.href}
                className="group relative bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm dark:shadow-none hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${portal.color} px-6 py-5`}>
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white/90 dark:bg-[#0E1F3F]/15 flex items-center justify-center">
                      <Icon className={`h-5 w-5 ${portal.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-[16px] font-medium text-white">{portal.title}</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    {portal.stats.map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-lg font-bold text-white">{s.value}</p>
                        <p className="text-[10px] text-white/70">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-[14px] text-slate-500 dark:text-[#6B7A99] leading-relaxed">
                    {portal.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {portal.features.map((feat) => {
                      const FeatIcon = featureIcons[feat] ?? BarChart3
                      return (
                        <div
                          key={feat}
                          className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg ${portal.bg} border ${portal.borderColor}`}
                        >
                          <FeatIcon className={`h-3.5 w-3.5 ${portal.iconColor} shrink-0`} />
                          <span className="text-[12px] font-normal text-slate-600 dark:text-[#94A3B8] truncate">
                            {feat}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-white/[0.06]">
                    <span className="text-[13px] text-slate-400 dark:text-[#6B7A99]">Click to open</span>
                    <div className={`h-8 w-8 rounded-lg ${portal.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <ArrowRight className={`h-4 w-4 ${portal.iconColor}`} />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Visual Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Role Distribution Donut */}
          <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-[#5B9BD5]" />
              <h3 className="text-[14px] font-medium text-slate-900 dark:text-white font-[var(--font-poppins)]">
                Role Distribution
              </h3>
            </div>
            <div className="flex items-center justify-center">
              <DonutChart segments={roleDistributionSegments} size={140} strokeWidth={20} />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {roleDistributionSegments.map((seg) => (
                <div key={seg.label} className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-[11px] text-slate-500 dark:text-[#6B7A99] truncate">{seg.label}</span>
                  <span className="text-[11px] font-medium text-slate-700 dark:text-white/70 ml-auto">{seg.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copy Status Donut */}
          <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-4 w-4 text-[#E8A63C]" />
              <h3 className="text-[14px] font-medium text-slate-900 dark:text-white font-[var(--font-poppins)]">
                Copy Status
              </h3>
            </div>
            <div className="flex items-center justify-center">
              <DonutChart segments={copyStatusSegments} size={140} strokeWidth={20} />
            </div>
            <div className="space-y-2 mt-4">
              {copyStatusSegments.map((seg) => (
                <div key={seg.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{seg.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-slate-700 dark:text-white/70">{seg.value}</span>
                    <span className="text-[10px] text-slate-400 dark:text-white/30">
                      ({totalCopies > 0 ? Math.round((seg.value / totalCopies) * 100) : 0}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Trends Bar Chart */}
          <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-emerald-500" />
              <h3 className="text-[14px] font-medium text-slate-900 dark:text-white font-[var(--font-poppins)]">
                Loan Trends (7 Days)
              </h3>
            </div>
            <BarChart data={loanDays} maxValue={maxLoanDayValue} />
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#5B9BD5]" />
                <span className="text-[11px] text-slate-500 dark:text-[#6B7A99]">Loans</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-slate-500 dark:text-[#6B7A99]">Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Connectivity Indicators */}
        <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="h-4 w-4 text-slate-400" />
            <h3 className="text-[14px] font-medium text-slate-900 dark:text-white font-[var(--font-poppins)]">
              System Overview
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: 'Total Users', value: totalUsers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
              { label: 'Active', value: activeMembers, icon: Wifi, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
              { label: 'Books', value: totalBooks, icon: BookOpen, color: 'text-[#5B9BD5]', bg: 'bg-blue-50 dark:bg-[#5B9BD5]/10' },
              { label: 'Copies', value: totalCopies, icon: Package, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
              { label: 'Loans Active', value: loanedCopies, icon: ArrowDownToLine, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-500/10' },
              { label: 'Overdue', value: overdueLoans, icon: AlertTriangle, color: overdueLoans > 0 ? 'text-red-500' : 'text-slate-400', bg: overdueLoans > 0 ? 'bg-red-50 dark:bg-red-500/10' : 'bg-slate-50 dark:bg-white/5' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-white/[0.02]">
                  <div className={`h-9 w-9 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-[18px] font-bold text-slate-900 dark:text-white">{item.value}</p>
                    <p className="text-[10px] text-slate-500 dark:text-[#6B7A99]">{item.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 dark:border-white/[0.06]">
              <h2 className="text-[15px] font-medium text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-white/[0.04]">
              {recentActivity.map((loan) => (
                <div key={loan.id} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${loan.returnedAt ? 'bg-emerald-50 dark:bg-emerald-500/10' : loan.dueAt < new Date() ? 'bg-red-50 dark:bg-red-500/10' : 'bg-blue-50 dark:bg-blue-500/10'}`}>
                      {loan.returnedAt
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        : loan.dueAt < new Date()
                          ? <AlertTriangle className="h-4 w-4 text-red-500" />
                          : <ArrowDownToLine className="h-4 w-4 text-blue-500" />
                      }
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
                    <p className={`text-[11px] font-medium ${loan.returnedAt ? 'text-emerald-500' : loan.dueAt < new Date() ? 'text-red-500' : 'text-blue-500'}`}>
                      {loan.returnedAt ? 'Returned' : loan.dueAt < new Date() ? 'Overdue' : 'Active'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
