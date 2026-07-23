'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Search, Bell, ChevronDown, Menu, User, Settings, HelpCircle, LogOut, Activity } from 'lucide-react'
import { useAuth } from '@/lib/contexts/auth-context'
import { useTheme } from '@/lib/contexts/theme-context'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { role_display_names } from '@/lib/types/role'
import type { Role } from '@/lib/types/role'

interface dashboard_header_props {
  on_menu_toggle: () => void
}

export function dashboard_header({ on_menu_toggle }: dashboard_header_props) {
  const { user, role } = useAuth()
  const pathname = usePathname()
  const { theme } = useTheme()
  const [dropdown_open, set_dropdown_open] = useState(false)
  const [search_focused, set_search_focused] = useState(false)
  const [search_value, set_search_value] = useState('')
  const dropdown_ref = useRef<HTMLDivElement>(null)
  const search_input_ref = useRef<HTMLInputElement>(null)

  const display_role = role ? role_display_names[role as Role] : ''
  const user_name = user?.fullName ?? 'User'
  const first_name = user_name.split(' ')[0] ?? 'User'
  const student_info = user?.studentId ?? display_role

  useEffect(() => {
    function handle_click_outside(e: MouseEvent) {
      if (dropdown_ref.current && !dropdown_ref.current.contains(e.target as Node)) {
        set_dropdown_open(false)
      }
    }
    document.addEventListener('mousedown', handle_click_outside)
    return () => document.removeEventListener('mousedown', handle_click_outside)
  }, [])

  const handle_search_shortcut = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      search_input_ref.current?.focus()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handle_search_shortcut)
    return () => document.removeEventListener('keydown', handle_search_shortcut)
  }, [handle_search_shortcut])

  const handle_sidebar_toggle = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('toggle-sidebar'))
    }
  }

  return (
    <header className="h-[72px] bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] dark:bg-[#0B1A3B] border-b border-[#EEF1F6] dark:border-white/[0.08] dark:border-white/[0.08] dark:border-white/[0.08] px-6 lg:px-8 flex items-center justify-between sticky top-0 z-10 shrink-0 transition-colors duration-300">
      {/* left section: toggle + search */}
      <div className="flex items-center gap-4 flex-1">
        {/* sidebar toggle */}
        <button
          onClick={handle_sidebar_toggle}
          className="hidden lg:flex h-[42px] w-[42px] rounded-full bg-[#F6F8FC] dark:bg-[#13285A] dark:bg-[#13285A] dark:bg-[#13285A] items-center justify-center text-[#1E275B] dark:text-[#B9C2D8] hover:bg-[#EEF4FF] dark:bg-[#1747D6]/20 dark:bg-[#1747D6]/20 dark:hover:bg-[#1E3A72] hover:text-[#1747D6] dark:hover:text-white transition-all duration-200 cursor-pointer shrink-0"
          aria-label="Toggle sidebar"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H17M1 7H17M1 13H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* mobile menu toggle */}
        <button
          onClick={on_menu_toggle}
          className="lg:hidden h-[42px] w-[42px] rounded-full bg-[#F6F8FC] dark:bg-[#13285A] dark:bg-[#13285A] dark:bg-[#13285A] flex items-center justify-center text-[#1E275B] dark:text-[#B9C2D8] hover:bg-[#EEF4FF] dark:bg-[#1747D6]/20 dark:bg-[#1747D6]/20 dark:hover:bg-[#1E3A72] transition-all duration-200 cursor-pointer shrink-0"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* global search */}
        <div className={`hidden md:flex items-center gap-3 w-[400px] h-[40px] rounded-full border transition-all duration-200 px-4 ${
          search_focused
            ? 'border-[#1747D6] ring-2 ring-[#1747D6]/10 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] dark:bg-[#13285A]'
            : 'border-[#DDE2EB] dark:border-white/10 dark:border-white/10 dark:border-white/10 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] dark:bg-[#13285A]/60 hover:border-[#C8CEDB] dark:hover:border-white/20'
        }`}>
          <Search className="h-[18px] w-[18px] text-[#7C869D] dark:text-[#6B7A99] dark:text-[#6B7A99] dark:text-[#6B7A99] shrink-0" />
          <input
            ref={search_input_ref}
            type="text"
            value={search_value}
            onChange={(e) => set_search_value(e.target.value)}
            onFocus={() => set_search_focused(true)}
            onBlur={() => set_search_focused(false)}
            placeholder="Search books, journals, resources, courses..."
            className="flex-1 bg-transparent text-[14px] text-[#1F2937] dark:text-[#E2E8F0] dark:text-[#E2E8F0] dark:text-[#E2E8F0] placeholder:text-[#8E95A9] dark:text-[#4B5775] dark:text-[#4B5775] dark:placeholder:text-[#4B5775] outline-none font-normal"
          />
          <kbd className="hidden lg:inline-flex h-[24px] items-center gap-1 rounded-md bg-[#F5F7FB] dark:bg-[#0B1A3B] border border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08] dark:border-white/10 px-1.5 text-[11px] font-medium text-[#8E95A9] dark:text-[#4B5775] dark:text-[#4B5775] dark:text-[#4B5775] shrink-0">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* executive-specific: system health + date */}
      {role === 'EXECUTIVE' && (
        <div className="hidden lg:flex items-center gap-4 mx-4">
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/40 rounded-full px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Activity className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">System Healthy</span>
          </div>
          <div className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] dark:text-slate-400 font-medium">
            {new Date().toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        </div>
      )}

      {/* right section: notifications, theme toggle, profile */}
      <div className="flex items-center gap-2 shrink-0">
        {/* notification bell */}
        <button
          className="relative h-[40px] w-[40px] rounded-full flex items-center justify-center text-[#1E275B] dark:text-[#B9C2D8] hover:bg-[#EEF4FF] dark:bg-[#1747D6]/20 dark:bg-[#1747D6]/20 dark:hover:bg-[#13285A] transition-all duration-200 cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="h-[20px] w-[20px]" />
          <span className="absolute top-2 right-2 h-[16px] w-[16px] bg-[#F23D4F] rounded-full flex items-center justify-center">
            <span className="text-[9px] font-bold text-white leading-none">3</span>
          </span>
        </button>

        {/* dark/light mode toggle — uses central ThemeContext + View Transition ripple */}
        <ThemeToggle />

        {/* divider */}
        <div className="h-6 w-px bg-[#E7EBF2] dark:bg-white/[0.08] mx-1" />

        {/* user profile */}
        <div ref={dropdown_ref} className="relative">
          <button
            onClick={() => set_dropdown_open(!dropdown_open)}
            className="flex items-center gap-3 py-1.5 pl-2 pr-3 rounded-full border border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08] dark:border-white/10 hover:bg-[#F3F7FF] dark:hover:bg-[#1E3A72] dark:hover:bg-[#1E3A72] dark:hover:bg-[#13285A] transition-all duration-200 cursor-pointer"
          >
            {/* avatar */}
            <div className="h-[38px] w-[38px] rounded-full overflow-hidden border-2 border-white dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.08)] shrink-0">
              <img
                src="/images/avatar.png"
                alt={first_name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* identity block */}
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-[13px] font-medium text-[#1F2937] dark:text-[#E2E8F0] dark:text-[#E2E8F0] dark:text-[#E2E8F0] leading-tight">{first_name}</span>
              <span className="text-[11px] text-[#7C869D] dark:text-[#6B7A99] dark:text-[#6B7A99] dark:text-[#6B7A99] leading-tight mt-0.5">{student_info} · {display_role}</span>
            </div>

            {/* chevron */}
            <ChevronDown className={`h-4 w-4 text-[#7C869D] dark:text-[#6B7A99] dark:text-[#6B7A99] dark:text-[#6B7A99] hidden sm:block transition-transform duration-200 ${dropdown_open ? 'rotate-180' : ''}`} />
          </button>

          {/* dropdown */}
          {dropdown_open && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] dark:bg-[#13285A] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08] dark:border-white/[0.08] py-1.5 z-50">
              <div className="px-4 py-3 border-b border-[#F3F4F6] dark:border-white/[0.06]">
                <p className="text-[14px] font-semibold text-[#1F2937] dark:text-[#E2E8F0] dark:text-[#E2E8F0] dark:text-[#E2E8F0]">{first_name}</p>
                <p className="text-[12px] text-[#7C869D] dark:text-[#6B7A99] dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{user?.email}</p>
              </div>
              <div className="py-1">
                <a href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#374151] dark:text-[#C4CDE0] hover:bg-[#F3F7FF] dark:hover:bg-[#1E3A72] dark:hover:bg-[#1E3A72] dark:hover:bg-[#1E3A72] transition-colors font-normal">
                  <User className="h-4 w-4 text-[#7C869D] dark:text-[#6B7A99] dark:text-[#6B7A99] dark:text-[#6B7A99]" /> Profile
                </a>
                <a href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#374151] dark:text-[#C4CDE0] hover:bg-[#F3F7FF] dark:hover:bg-[#1E3A72] dark:hover:bg-[#1E3A72] dark:hover:bg-[#1E3A72] transition-colors font-normal">
                  <Settings className="h-4 w-4 text-[#7C869D] dark:text-[#6B7A99] dark:text-[#6B7A99] dark:text-[#6B7A99]" /> Settings
                </a>
                <a href="/help" className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#374151] dark:text-[#C4CDE0] hover:bg-[#F3F7FF] dark:hover:bg-[#1E3A72] dark:hover:bg-[#1E3A72] dark:hover:bg-[#1E3A72] transition-colors font-normal">
                  <HelpCircle className="h-4 w-4 text-[#7C869D] dark:text-[#6B7A99] dark:text-[#6B7A99] dark:text-[#6B7A99]" /> Help &amp; Support
                </a>
              </div>
              <div className="border-t border-[#F3F4F6] dark:border-white/[0.06] mt-1 pt-1">
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="w-full text-left px-4 py-2.5 text-[14px] text-[#F23D4F] hover:bg-red-50 dark:hover:bg-red-900/20 font-normal cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
