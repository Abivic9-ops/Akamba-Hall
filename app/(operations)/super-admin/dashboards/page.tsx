import { requireRole } from '@/lib/auth/roleGuard'
import Link from 'next/link'
import {
  GraduationCap, Briefcase, Monitor, Zap, BookMarked,
  Shield, ArrowRight, Users, BarChart3, BookOpen,
  CalendarCheck, ClipboardList, Settings, Eye,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const dashboards = [
  {
    title: 'Student Dashboard',
    description: 'Browse the catalogue, manage loans, view reading history, and reserve study spaces.',
    href: '/student/dashboard',
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    borderColor: 'border-blue-100',
    features: ['Catalogue Browsing', 'Loan Management', 'Space Reservations', 'Reading History'],
  },
  {
    title: 'Staff Dashboard',
    description: 'Staff tools for managing daily library operations, processing loans, and assisting members.',
    href: '/staff/dashboard',
    icon: Briefcase,
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-500',
    borderColor: 'border-purple-100',
    features: ['Loan Processing', 'Member Assistance', 'Daily Operations', 'Reports'],
  },
  {
    title: 'Desk Dashboard',
    description: 'Front desk operations for check-in, check-out, member verification, and walk-in management.',
    href: '/desk/dashboard',
    icon: Monitor,
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    borderColor: 'border-amber-100',
    features: ['Check-in / Check-out', 'Member Verification', 'QR Scanning', 'Walk-in Management'],
  },
  {
    title: 'Executive Dashboard',
    description: 'Executive oversight with analytics, performance metrics, and institutional reporting.',
    href: '/executive/dashboard',
    icon: Zap,
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    borderColor: 'border-emerald-100',
    features: ['Analytics & Reports', 'Performance Metrics', 'Institutional Oversight', 'Strategic Views'],
  },
  {
    title: 'Library Head Dashboard',
    description: 'Full library operations — inventory, bookings, staff management, and collection analytics.',
    href: '/library-head/dashboard',
    icon: BookMarked,
    color: 'from-sky-500 to-sky-600',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-500',
    borderColor: 'border-sky-100',
    features: ['Inventory Management', 'Booking Oversight', 'Staff Coordination', 'Collection Analytics'],
  },
]

const feature_icons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Catalogue Browsing': BookOpen,
  'Loan Management': ClipboardList,
  'Space Reservations': CalendarCheck,
  'Reading History': BarChart3,
  'Loan Processing': ClipboardList,
  'Member Assistance': Users,
  'Daily Operations': Settings,
  'Reports': BarChart3,
  'Check-in / Check-out': ArrowRight,
  'Member Verification': Users,
  'QR Scanning': Eye,
  'Walk-in Management': Users,
  'Analytics & Reports': BarChart3,
  'Performance Metrics': BarChart3,
  'Institutional Oversight': Shield,
  'Strategic Views': Eye,
  'Inventory Management': BookOpen,
  'Booking Oversight': CalendarCheck,
  'Staff Coordination': Users,
  'Collection Analytics': BarChart3,
}

export default async function all_dashboards_page() {
  await requireRole(['SUPER_ADMIN'])

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-8">
        {/* header */}
        <div>
          <h1 className="text-[22px] font-extrabold text-slate-900 font-[var(--font-poppins)] flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-[#E8A63C] flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            All Dashboards
          </h1>
          <p className="text-[13px] text-slate-500 mt-1 ml-11">
            Preview and access any role dashboard in the system
          </p>
        </div>

        {/* dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dashboards.map((dash) => {
            const Icon = dash.icon
            return (
              <Link
                key={dash.href}
                href={dash.href}
                className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* gradient header */}
                <div className={`bg-gradient-to-r ${dash.color} px-6 py-5`}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-[15px] font-extrabold text-white">
                        {dash.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* body */}
                <div className="p-5 space-y-4">
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    {dash.description}
                  </p>

                  {/* features */}
                  <div className="grid grid-cols-2 gap-2">
                    {dash.features.map((feat) => {
                      const FeatIcon = feature_icons[feat] ?? BarChart3
                      return (
                        <div
                          key={feat}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${dash.bg} border ${dash.borderColor}`}
                        >
                          <FeatIcon className={`h-3 w-3 ${dash.iconColor} shrink-0`} />
                          <span className="text-[10px] font-semibold text-slate-600 truncate">
                            {feat}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* open button */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-[11px] text-slate-400">Click to open</span>
                    <div className={`h-7 w-7 rounded-lg ${dash.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <ArrowRight className={`h-3.5 w-3.5 ${dash.iconColor}`} />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
