'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Shield, Activity, ScrollText,
  Settings, CalendarCheck, Library, BriefcaseBusiness,
  GraduationCap, Briefcase, Monitor, Zap, BookMarked,
  Grid3X3, ChevronLeft, ChevronRight, LogOut,
  BookOpen, Bookmark, Megaphone, User, HelpCircle, LogIn,
  Search, PackageCheck, Star, Globe, Video,
  ClipboardCheck, ShieldCheck, BarChart2, FileSearch, Armchair,
  FileText, UserSearch, ArrowDownToLine, RefreshCw, Package,
  SearchCheck, Newspaper, UserPlus, CreditCard, AlertTriangle,
} from 'lucide-react'
import { useAuth } from '@/lib/contexts/auth-context'
import { getNavigationSections } from '@/lib/config/navigation'
import { role_short_names } from '@/lib/types/role'
import type { Role } from '@/lib/types/role'

const icon_map: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Users, Shield, Activity, ScrollText,
  Settings, CalendarCheck, Library, BriefcaseBusiness,
  GraduationCap, Briefcase, Monitor, Zap, BookMarked,
  Grid3X3, BookOpen, Bookmark, Megaphone, User, HelpCircle, LogIn,
  Search, PackageCheck, Star, Globe, Video,
  ClipboardCheck, ShieldCheck, BarChart2, FileSearch, Armchair,
  FileText, UserSearch, ArrowDownToLine, RefreshCw, Package,
  SearchCheck, Newspaper, UserPlus, CreditCard, AlertTriangle,
}

function resolve_icon(name: string) {
  return icon_map[name] ?? LayoutDashboard
}

const path_role_map: Record<string, Role> = {
  '/super-admin': 'SUPER_ADMIN',
  '/library-head': 'LIBRARY_HEAD',
  '/student': 'STUDENT',
  '/staff': 'STAFF',
  '/desk': 'ASSISTANT',
  '/executive': 'EXECUTIVE',
}

function getSidebarRole(pathname: string, actualRole: Role): Role {
  if (actualRole === 'SUPER_ADMIN') {
    for (const [prefix, sidebarRole] of Object.entries(path_role_map)) {
      if (pathname.startsWith(prefix)) return sidebarRole
    }
    return actualRole
  }
  return actualRole
}

const portal_labels: Record<string, string> = {
  STUDENT: 'Student Portal',
  STAFF: 'Staff Portal',
  ASSISTANT: 'Desk Portal',
  CAPTAIN: 'Desk Portal',
  PREFECT: 'Desk Portal',
  EXECUTIVE: 'Executive Portal',
  LIBRARY_HEAD: 'Library Head Portal',
  SUPER_ADMIN: 'Admin Portal',
}

const notification_badges: Record<string, number> = {
  '/student/loans': 2,
}

const new_badges: Record<string, boolean> = {
  '/student/catalogue': true,
}

export function DashboardSidebar() {
  const { user, role } = useAuth()
  const pathname = usePathname()
  const [collapsed, set_collapsed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('sidebar_collapsed') === 'true'
  })

  useEffect(() => {
    window.localStorage.setItem('sidebar_collapsed', String(collapsed))
  }, [collapsed])

  useEffect(() => {
    function handle_toggle() {
      set_collapsed(prev => !prev)
    }
    window.addEventListener('toggle-sidebar', handle_toggle)
    return () => window.removeEventListener('toggle-sidebar', handle_toggle)
  }, [])

  const sidebarRole = getSidebarRole(pathname, (role as Role) ?? 'STUDENT')
  const sections = getNavigationSections(sidebarRole)
  const display_role = role_short_names[sidebarRole] ?? ''
  const viewingOther = role === 'SUPER_ADMIN' && sidebarRole !== role
  const firstName = user?.fullName?.split(' ')[0] ?? ''

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 264 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] dark:bg-[#0B1A3B] border-r border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08] dark:border-white/[0.08] flex flex-col h-screen sticky top-0 overflow-hidden z-20 shrink-0 transition-colors duration-300"
    >
      {/* logo area */}
      <div className="px-5 h-[72px] flex items-center gap-3 shrink-0 border-b border-[#F3F4F6] dark:border-white/[0.08]">
        <div className="relative h-10 w-8 shrink-0">
          <Image src="/images/starehe-logo.png" alt="Logo" fill className="object-contain" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col min-w-0"
            >
              <span className="font-medium text-[#1F2937] dark:text-[#E2E8F0] dark:text-[#E2E8F0] dark:text-[#E2E8F0] text-[15px] leading-tight truncate">Akamba Hall</span>
              <span className="text-[#7A819A] dark:text-[#6B7A99] dark:text-[#6B7A99] dark:text-[#6B7A99] text-[12px] font-normal leading-none mt-0.5 truncate">Library System</span>
              <span className="mt-1.5 inline-block px-2 py-[2px] rounded bg-[#EEF4FF] dark:bg-[#1747D6]/20 dark:bg-[#1747D6]/20 dark:bg-[#1747D6]/20 text-[10px] font-medium text-[#1747D6] dark:text-[#8BA9FF] w-fit truncate">
                {portal_labels[sidebarRole] ?? 'Portal'}
              </span>
             
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* collapse toggle */}
      <button
        onClick={() => set_collapsed(!collapsed)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute top-[52px] -right-3 h-6 w-6 rounded-full bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] dark:bg-[#13285A] border border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08] dark:border-white/10 shadow-sm dark:shadow-none dark:shadow-none flex items-center justify-center text-[#7A819A] dark:text-[#6B7A99] dark:text-[#6B7A99] dark:text-[#6B7A99] hover:text-[#1747D6] dark:hover:text-white hover:border-[#1747D6]/30 dark:hover:border-white/30 transition-all duration-200 cursor-pointer z-30"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {/* navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 custom-scrollbar">
        {sections.map((section) => (
          <div key={section.label} className="mb-5">
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] font-medium text-[#7A819A] dark:text-[#6B7A99] dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider mb-2 px-3 block"
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const Icon = resolve_icon(item.icon)
                const is_active = pathname === item.path
                const badge_count = notification_badges[item.path]
                const is_new = new_badges[item.path]

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative flex items-center gap-3 transition-all duration-200 ${
                      collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5'
                    } ${
                      is_active
                        ? 'rounded-[18px] bg-[#D6E4FF] dark:bg-[#13285A]'
                        : 'rounded-xl hover:bg-[#F3F7FF] dark:hover:bg-[#1E3A72] dark:hover:bg-[#1E3A72] dark:hover:bg-[#1E3A72]'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={`h-[18px] w-[18px] shrink-0 ${
                      is_active ? 'text-[#0E1F4D] dark:text-[#E2E8F0] dark:text-[#E2E8F0] dark:text-white' : 'text-[#132859] dark:text-[#E2E8F0] dark:text-[#E2E8F0] dark:text-[#8E95A9]'
                    }`} />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`truncate text-[14px] ${
                            is_active
                              ? 'text-[#0E1F4D] dark:text-[#E2E8F0] dark:text-[#E2E8F0] dark:text-white font-medium'
                              : 'text-[#132859] dark:text-[#E2E8F0] dark:text-[#E2E8F0] dark:text-[#8E95A9] font-normal'
                          }`}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* notification badge */}
                    {!collapsed && badge_count && badge_count > 0 && (
                      <span className="ml-auto h-[20px] min-w-[20px] rounded-full bg-[#F23D4F] flex items-center justify-center px-1.5">
                        <span className="text-[10px] font-bold text-white leading-none">{badge_count}</span>
                      </span>
                    )}

                    {/* "New" badge */}
                    {!collapsed && is_new && (
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-[#52D98B]/15 text-[10px] font-semibold text-[#16A34A]">
                        New
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* viewing-as indicator + back to admin — bottom of sidebar */}
      {viewingOther && (
        <div className="shrink-0 mx-3 mb-2 space-y-1.5">
          {!collapsed && (
            <div className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
              <span className="text-[12px] font-medium text-amber-600 dark:text-amber-400">
                Viewing as {display_role}
              </span>
            </div>
          )}
          <Link
            href="/super-admin/dashboard"
            className={`flex items-center gap-2 rounded-xl text-[13px] font-medium transition-all ${
              collapsed ? 'px-0 py-2 justify-center' : 'px-3 py-2'
            } bg-[#F59E0B]/10 dark:bg-[#F59E0B]/20 text-[#D97706] dark:text-[#FBBF24] hover:bg-[#F59E0B] hover:text-white dark:hover:bg-[#F59E0B] dark:hover:text-white`}
            title={collapsed ? 'Back to Admin' : undefined}
          >
            <Shield className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Back to Admin</span>}
          </Link>
        </div>
      )}

      {/* sign out */}
      <div className="shrink-0 p-3 border-t border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08] dark:border-white/[0.08]">
        <AnimatePresence>
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] font-medium text-[#F23D4F] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="text-[#F23D4F] hover:text-red-700 transition-colors cursor-pointer" title="Sign Out">
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  )
}
