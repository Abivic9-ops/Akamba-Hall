'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Bell,
  BellOff,
  Megaphone,
  CalendarCheck,
  Clock,
  PackageCheck,
  CheckCheck,
  Trash2,
} from 'lucide-react'
import {
  get_notifications,
  get_unread_notification_count,
  type Notification,
} from '@/lib/actions/notifications'

const icon_map: Record<string, React.ElementType> = {
  Megaphone,
  CalendarCheck,
  Clock,
  PackageCheck,
}

function relative_time(date_str: string): string {
  const now = Date.now()
  const then = new Date(date_str).getTime()
  const diff_s = Math.floor((now - then) / 1000)

  if (diff_s < 60) return 'Just now'
  if (diff_s < 3600) return `${Math.floor(diff_s / 60)}m ago`
  if (diff_s < 86400) return `${Math.floor(diff_s / 3600)}h ago`
  if (diff_s < 604800) return `${Math.floor(diff_s / 86400)}d ago`
  return new Date(date_str).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })
}

export function NotificationBell() {
  const [open, set_open] = useState(false)
  const [count, set_count] = useState(0)
  const [notifications, set_notifications] = useState<Notification[]>([])
  const [dismissed, set_dismissed] = useState<Set<string>>(new Set())
  const [loading, set_loading] = useState(false)
  const panel_ref = useRef<HTMLDivElement>(null)
  const button_ref = useRef<HTMLButtonElement>(null)

  const fetch_count = useCallback(async () => {
    try {
      const c = await get_unread_notification_count()
      set_count(c)
    } catch {}
  }, [])

  const fetch_notifications = useCallback(async () => {
    set_loading(true)
    try {
      const n = await get_notifications()
      set_notifications(n)
    } catch {} finally {
      set_loading(false)
    }
  }, [])

  useEffect(() => {
    fetch_count()
    const interval = setInterval(fetch_count, 30000)
    return () => clearInterval(interval)
  }, [fetch_count])

  useEffect(() => {
    if (open && notifications.length === 0) fetch_notifications()
  }, [open, notifications.length, fetch_notifications])

  useEffect(() => {
    function handle_click_outside(e: MouseEvent) {
      if (
        panel_ref.current && !panel_ref.current.contains(e.target as Node) &&
        button_ref.current && !button_ref.current.contains(e.target as Node)
      ) set_open(false)
    }
    document.addEventListener('mousedown', handle_click_outside)
    return () => document.removeEventListener('mousedown', handle_click_outside)
  }, [])

  function handle_mark_all_read() {
    set_count(0)
    set_notifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function handle_dismiss(id: string) {
    set_dismissed((prev) => new Set(prev).add(id))
    if (count > 0) set_count((c) => Math.max(0, c - 1))
  }

  function handle_clear_all() {
    const allIds = new Set(visible.map((n) => n.id))
    set_dismissed(allIds)
    set_count(0)
  }

  const visible = notifications.filter((n) => !dismissed.has(n.id))
  const unread_visible = visible.filter((n) => !n.read).length

  return (
    <div className="relative">
      <button
        ref={button_ref}
        onClick={() => set_open((prev) => !prev)}
        className="relative h-[40px] w-[40px] rounded-full flex items-center justify-center text-[#1E275B] dark:text-[#B9C2D8] hover:bg-[#EEF4FF] dark:hover:bg-[#13285A] transition-all duration-200 cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="h-[20px] w-[20px]" />
        {count > 0 && (
          <span className="absolute top-1.5 right-1.5 min-h-[18px] min-w-[18px] bg-[#F23D4F] rounded-full flex items-center justify-center px-1">
            <span className="text-[9px] font-bold text-white leading-none">{count > 99 ? '99+' : count}</span>
          </span>
        )}
      </button>

      {open && (
        <div
          ref={panel_ref}
          className="absolute right-0 top-full mt-2 w-80 max-h-[420px] bg-white dark:bg-[#0E1F3F] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-[#E7EBF2] dark:border-white/[0.08] z-50 flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F3F4F6] dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#7C869D] dark:text-[#6B7A99]" />
              <h3 className="text-[14px] font-semibold text-[#1F2937] dark:text-[#E2E8F0]">Notifications</h3>
            </div>
            <div className="flex items-center gap-1.5">
              {unread_visible > 0 && (
                <button
                  onClick={handle_mark_all_read}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-[#1747D6] dark:text-[#5B9BD5] hover:bg-[#EEF4FF] dark:hover:bg-[#13285A] transition-colors cursor-pointer"
                  title="Mark all as read"
                >
                  <CheckCheck className="h-3 w-3" /> Read all
                </button>
              )}
              {visible.length > 0 && (
                <button
                  onClick={handle_clear_all}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-[#F23D4F] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                  title="Clear all"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain">
            {loading && visible.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-[#7C869D] dark:text-[#6B7A99]">
                <div className="h-5 w-5 border-2 border-[#DDE2EB] dark:border-white/10 border-t-[#1747D6] rounded-full animate-spin mb-3" />
                <span className="text-[13px]">Loading...</span>
              </div>
            ) : visible.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-[#7C869D] dark:text-[#6B7A99]">
                <BellOff className="h-8 w-8 mb-3 opacity-40" />
                <span className="text-[13px] font-medium">No notifications</span>
                <span className="text-[12px] mt-1 opacity-60">You&apos;re all caught up</span>
              </div>
            ) : (
              visible.map((n) => {
                const Icon = icon_map[n.icon] ?? Bell
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-[#F6F8FC] dark:hover:bg-[#13285A] transition-colors border-b border-[#F3F4F6] dark:border-white/[0.04] last:border-b-0 group ${n.read ? 'opacity-60' : ''}`}
                  >
                    <a href={n.href} onClick={() => set_open(false)} className="flex-1 min-w-0 flex items-start gap-3">
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-opacity-10 ${n.color.replace('text-', 'bg-').replace('500', '50')}`}>
                        <Icon className={`h-4 w-4 ${n.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-[#1F2937] dark:text-[#E2E8F0] leading-tight truncate">{n.title}</p>
                        <p className="text-[12px] text-[#7C869D] dark:text-[#6B7A99] leading-snug mt-0.5 line-clamp-2">{n.body}</p>
                        <p className="text-[11px] text-[#A0AABE] dark:text-[#4B5775] mt-1">{relative_time(n.createdAt)}</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-1 shrink-0 mt-0.5">
                      {!n.read && <div className="h-2 w-2 rounded-full bg-[#1747D6]" />}
                      <button
                        onClick={(e) => { e.stopPropagation(); handle_dismiss(n.id) }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer"
                        title="Dismiss"
                      >
                        <Trash2 className="h-3 w-3 text-slate-400 dark:text-[#6B7A99]" />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {visible.length > 0 && (
            <div className="border-t border-[#F3F4F6] dark:border-white/[0.06] px-4 py-2.5">
              <button
                onClick={() => set_open(false)}
                className="w-full text-center text-[13px] font-medium text-[#1747D6] dark:text-[#5B9BD5] hover:text-[#1439B0] dark:hover:text-[#7DB5EA] transition-colors cursor-pointer"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
