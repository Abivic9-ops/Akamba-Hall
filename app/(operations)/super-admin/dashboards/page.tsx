import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import type { Role } from '@/lib/types/role'
import Link from 'next/link'
import {
  GraduationCap, Briefcase, Monitor, Zap, BookMarked,
  Shield, ArrowRight, Users, BarChart3, BookOpen,
  CalendarCheck, ClipboardList, Settings, Eye, AlertTriangle,
  TrendingUp, Clock, CheckCircle2, ArrowDownToLine,
  Package, CreditCard, Search, BookPlus,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const deskRoles: Role[] = ['ASSISTANT', 'CAPTAIN', 'PREFECT']

export default async function all_access_dashboard() {
  await requireRole(['SUPER_ADMIN'])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [
    totalStudents,
    totalStaff,
    totalDesk,
    totalExecutive,
    totalLibraryHead,
    totalSuperAdmin,
    totalBooks,
    totalCopies,
    availableCopies,
    loanedCopies,
    overdueLoans,
    todayLoans,
    todayReturns,
    todayBookings,
    totalMembers,
    recentActivity,
    pendingHolds,
    totalFinesOwed,
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.user.count({ where: { role: 'STAFF' } }),
    prisma.user.count({ where: { role: { in: deskRoles } } }),
    prisma.user.count({ where: { role: 'EXECUTIVE' } }),
    prisma.user.count({ where: { role: 'LIBRARY_HEAD' } }),
    prisma.user.count({ where: { role: 'SUPER_ADMIN' } }),
    prisma.book.count(),
    prisma.copy.count(),
    prisma.copy.count({ where: { status: 'AVAILABLE' } }),
    prisma.copy.count({ where: { status: 'LOANED' } }),
    prisma.loan.count({ where: { returnedAt: null, dueAt: { lt: new Date() } } }),
    prisma.loan.count({ where: { checkoutAt: { gte: today } } }),
    prisma.loan.count({ where: { returnedAt: { gte: today } } }),
    prisma.booking.count({ where: { createdAt: { gte: today } } }),
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.loan.findMany({
      take: 10,
      orderBy: { checkoutAt: 'desc' },
      include: {
        user: { select: { fullName: true, role: true } },
        copy: { include: { book: { select: { title: true } } } },
      },
    }),
    prisma.hold.count({ where: { status: 'PENDING' } }),
    prisma.fine.aggregate({
      where: { paid: false },
      _sum: { amount: true },
    }),
  ])

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
        { label: 'Today\'s Loans', value: todayLoans },
        { label: 'Today\'s Returns', value: todayReturns },
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
        { label: 'Today\'s Transactions', value: todayLoans + todayReturns },
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
        { label: 'Total Members', value: totalMembers },
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
        { label: 'Today\'s Bookings', value: todayBookings },
      ],
      features: ['Operations', 'Inventory & Stocktake', 'Member Management', 'Approval Queues', 'Content Management', 'Charges & Loans'],
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

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-8">
        {/* header */}
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] font-[var(--font-poppins)] flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#E8A63C] flex items-center justify-center">
              <Grid3X3 className="h-5 w-5 text-white" />
            </div>
            All Access Dashboard
          </h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1 ml-13">
            Monitor and access every portal in the system with live data
          </p>
        </div>

        {/* system summary bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Total Users', value: totalStudents + totalStaff + totalDesk + totalExecutive + totalLibraryHead + totalSuperAdmin, icon: Users, color: 'text-blue-500' },
            { label: 'Active Members', value: totalMembers, icon: CheckCircle2, color: 'text-emerald-500' },
            { label: 'Total Books', value: totalBooks, icon: BookOpen, color: 'text-[#5B9BD5]' },
            { label: 'Available Copies', value: availableCopies, icon: Package, color: 'text-emerald-500' },
            { label: 'On Loan', value: loanedCopies, icon: ArrowDownToLine, color: 'text-amber-500' },
            { label: 'Overdue', value: overdueLoans, icon: AlertTriangle, color: overdueLoans > 0 ? 'text-red-500' : 'text-slate-400' },
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

        {/* portal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon
            return (
              <Link
                key={portal.href}
                href={portal.href}
                className="group relative bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm dark:shadow-none hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* gradient header */}
                <div className={`bg-gradient-to-r ${portal.color} px-6 py-5`}>
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white/90 dark:bg-[#0E1F3F]/15 flex items-center justify-center">
                      <Icon className={`h-5 w-5 ${portal.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-[16px] font-medium text-white">{portal.title}</h2>
                    </div>
                  </div>
                  {/* live stats */}
                  <div className="flex items-center gap-4 mt-3">
                    {portal.stats.map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-lg font-bold text-white">{s.value}</p>
                        <p className="text-[10px] text-white/70">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* body */}
                <div className="p-5 space-y-4">
                  <p className="text-[14px] text-slate-500 dark:text-[#6B7A99] leading-relaxed">
                    {portal.description}
                  </p>

                  {/* features */}
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

                  {/* open button */}
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

        {/* recent activity */}
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

function Grid3X3({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}
