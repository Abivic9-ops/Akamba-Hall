'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Shield, Activity, ScrollText,
  Settings, CalendarCheck, Library, BriefcaseBusiness, X,
  GraduationCap, Briefcase, Monitor, Zap, BookMarked,
  Grid3X3, BookOpen, Bookmark, Megaphone, User, HelpCircle, LogIn,
  Search, PackageCheck, Star, Globe, Video,
  ClipboardCheck, ShieldCheck, BarChart2, FileSearch, Armchair,
  FileText, UserSearch,
} from 'lucide-react'
import { useAuth } from '@/lib/contexts/auth-context'
import { getNavigationForRole } from '@/lib/config/navigation'
import { role_short_names } from '@/lib/types/role'
import type { Role } from '@/lib/types/role'

const icon_map: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Users, Shield, Activity, ScrollText,
  Settings, CalendarCheck, Library, BriefcaseBusiness,
  GraduationCap, Briefcase, Monitor, Zap, BookMarked, Grid3X3,
  BookOpen, Bookmark, Megaphone, User, HelpCircle, LogIn,
  Search, PackageCheck, Star, Globe, Video,
  ClipboardCheck, ShieldCheck, BarChart2, FileSearch, Armchair,
  FileText, UserSearch,
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

interface mobile_nav_props {
  open: boolean
  on_close: () => void
}

export function mobile_nav({ open, on_close }: mobile_nav_props) {
  const { user, role } = useAuth()
  const pathname = usePathname()
  const sidebarRole = getSidebarRole(pathname, (role as Role) ?? 'STUDENT')
  const nav_items = getNavigationForRole(sidebarRole)
  const display_role = role_short_names[sidebarRole] ?? ''
  const viewingOther = sidebarRole !== role
  const user_name = user?.fullName ?? 'User'
  const initials = user_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={on_close}
          />

          {/* slide-in panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-72 bg-[#0B1A3B] z-50 lg:hidden flex flex-col shadow-2xl"
          >
            {/* header */}
            <div className="p-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-[13px] font-normal text-white">
                  {initials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-normal text-white truncate">{user_name}</span>
                  <span className="text-[12px] text-white/40 truncate">{display_role}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {sidebarRole === 'EXECUTIVE' && (
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    <Activity className="h-3 w-3 text-emerald-400" />
                    <span className="text-[10px] font-semibold text-emerald-400">Healthy</span>
                  </div>
                )}
                <button
                  onClick={on_close}
                  aria-label="Close navigation"
                  className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* viewing-as indicator + back to admin */}
            {viewingOther && (
              <div className="mx-3 mt-3 space-y-1.5">
                <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[12px] font-normal text-amber-400">
                    Viewing as {display_role}
                  </span>
                </div>
                <Link
                  href="/super-admin/dashboard"
                  onClick={on_close}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-[14px] font-normal bg-[#E8A63C]/10 text-[#E8A63C] hover:bg-[#E8A63C] hover:text-[#0B1A3B] transition-all"
                >
                  <Shield className="h-4 w-4 shrink-0" />
                  <span>Back to Admin</span>
                </Link>
              </div>
            )}

            {/* nav items */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {nav_items.map((item) => {
                const is_active = pathname === item.path
                const Icon = resolve_icon(item.icon)
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={on_close}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-normal transition-all mb-1 ${
                      is_active
                        ? 'bg-[#E8A63C] text-[#0B1A3B] font-medium'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* sign out */}
            <div className="p-3 border-t border-white/5">
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] font-normal text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition cursor-pointer"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
