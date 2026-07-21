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
} from 'lucide-react'
import { useAuth } from '@/lib/contexts/auth-context'
import { getNavigationSections } from '@/lib/config/navigation'
import { role_display_names, role_short_names } from '@/lib/types/role'
import type { Role } from '@/lib/types/role'

const icon_map: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  Shield,
  Activity,
  ScrollText,
  Settings,
  CalendarCheck,
  Library,
  BriefcaseBusiness,
  GraduationCap,
  Briefcase,
  Monitor,
  Zap,
  BookMarked,
  Grid3X3,
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
  // for SUPER_ADMIN, pick sidebar based on which section they're viewing
  if (actualRole === 'SUPER_ADMIN') {
    for (const [prefix, sidebarRole] of Object.entries(path_role_map)) {
      if (pathname.startsWith(prefix)) return sidebarRole
    }
    return actualRole
  }
  return actualRole
}

export function dashboard_sidebar() {
  const { user, role } = useAuth()
  const pathname = usePathname()
  const [collapsed, set_collapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sidebar_collapsed')
    if (saved === 'true') set_collapsed(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('sidebar_collapsed', String(collapsed))
  }, [collapsed])

  const sidebarRole = getSidebarRole(pathname, (role as Role) ?? 'STUDENT')
  const sections = getNavigationSections(sidebarRole)
  const display_role = role_short_names[sidebarRole] ?? ''
  const viewingOther = sidebarRole !== role
  const user_name = user?.fullName ?? 'User'
  const initials = user_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-[#0B1A3B] flex flex-col h-screen sticky top-0 text-white overflow-hidden z-20 shadow-xl"
    >
      {/* logo area */}
      <div className="p-4 flex items-center gap-3 shrink-0">
        <div className="relative h-10 w-8 shrink-0">
          <Image src="/images/starehe-logo.png" alt="Logo" fill className="object-contain drop-shadow-md" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col min-w-0"
            >
              <span className="font-extrabold text-white text-[14px] leading-tight truncate">Akamba Hall</span>
              <span className="text-white/60 text-[11px] font-medium leading-none mt-0.5 truncate">Library System</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* collapse toggle */}
      <button
        onClick={() => set_collapsed(!collapsed)}
        className="mx-3 mb-2 flex items-center justify-center h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors cursor-pointer"
      >
        {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* viewing-as indicator for super admin previewing other roles */}
      {viewingOther && !collapsed && (
        <div className="mx-3 mb-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <span className="text-[10px] font-bold text-amber-400">
            Viewing as {display_role}
          </span>
        </div>
      )}

      {/* navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-1 custom-scrollbar">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 px-2 block"
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const Icon = resolve_icon(item.icon)
                const is_active = pathname === item.path

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 rounded-xl text-[13px] font-medium transition-all ${
                      collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5'
                    } ${
                      is_active
                        ? 'bg-[#E8A63C] text-[#0B1A3B] font-bold shadow-md shadow-amber-900/30'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* user profile + sign out */}
      <div className="shrink-0 p-3 border-t border-white/5">
        <AnimatePresence>
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                  {user?.avatarUrl ? (
                    <Image src={user.avatarUrl} alt={user_name} width={32} height={32} className="rounded-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-white truncate">{user_name}</span>
                  <span className="text-[10px] text-white/50 truncate">{display_role}</span>
                </div>
              </div>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 px-3 py-2 text-[12px] font-bold text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-white">
                {initials}
              </div>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="text-red-400 hover:text-red-300 transition cursor-pointer" title="Sign Out">
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
