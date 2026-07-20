'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Search, Bell, ChevronDown, Menu } from 'lucide-react'
import { useAuth } from '@/lib/contexts/auth-context'
import { role_display_names } from '@/lib/types/role'
import type { Role } from '@/lib/types/role'

interface dashboard_header_props {
  on_menu_toggle: () => void
}

function get_page_title(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const last = segments[segments.length - 1] ?? 'dashboard'
  return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, ' ')
}

export function dashboard_header({ on_menu_toggle }: dashboard_header_props) {
  const { user, role } = useAuth()
  const pathname = usePathname()
  const [dropdown_open, set_dropdown_open] = useState(false)
  const dropdown_ref = useRef<HTMLDivElement>(null)

  const display_role = role ? role_display_names[role as Role] : ''
  const user_name = user?.fullName ?? 'User'
  const initials = user_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const page_title = get_page_title(pathname)

  useEffect(() => {
    function handle_click_outside(e: MouseEvent) {
      if (dropdown_ref.current && !dropdown_ref.current.contains(e.target as Node)) {
        set_dropdown_open(false)
      }
    }
    document.addEventListener('mousedown', handle_click_outside)
    return () => document.removeEventListener('mousedown', handle_click_outside)
  }, [])

  return (
    <header className="h-16 bg-white border-b border-slate-100 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={on_menu_toggle}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-50 text-slate-500 transition-colors cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-[17px] font-bold text-slate-900 leading-tight font-[var(--font-poppins)]">
            {page_title}
          </h1>
          <span className="text-[11px] text-slate-400 font-medium">
            {display_role}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none w-40"
          />
        </div>

        {/* notifications */}
        <button className="relative p-2 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* user dropdown */}
        <div ref={dropdown_ref} className="relative">
          <button
            onClick={() => set_dropdown_open(!dropdown_open)}
            className="flex items-center gap-2 py-1.5 pl-1.5 pr-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-[#0B1A3B] flex items-center justify-center text-[11px] font-bold text-white">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user_name} className="h-8 w-8 rounded-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-[12px] font-bold text-slate-800 leading-tight">{user_name}</span>
              <span className="text-[10px] text-slate-400 leading-tight">{display_role}</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
          </button>

          {dropdown_open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
              <div className="px-3 py-2 border-b border-slate-50">
                <p className="text-[12px] font-bold text-slate-800">{user_name}</p>
                <p className="text-[10px] text-slate-400">{user?.email}</p>
              </div>
              <a href="/profile" className="block px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-50 font-medium">
                Profile
              </a>
              <a href="/settings" className="block px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-50 font-medium">
                Settings
              </a>
              <div className="border-t border-slate-50 mt-1 pt-1">
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="w-full text-left px-3 py-2 text-[12px] text-red-500 hover:bg-red-50 font-bold cursor-pointer"
                  >
                    Sign Out
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
