'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const SECTION_MAP: Record<string, { label: string; hash: string }[]> = {
  '/about': [
    { label: 'Mission', hash: '#mission' },
    { label: 'Identity', hash: '#identity' },
    { label: 'Who We Serve', hash: '#who-we-serve' },
    { label: 'Values', hash: '#values' },
    { label: 'Leadership', hash: '#leadership' },
  ],
  '/services': [
    { label: 'Borrowing', hash: '#borrowing' },
    { label: 'Bookings', hash: '#bookings' },
    { label: 'Equipment', hash: '#equipment' },
    { label: 'Newspapers', hash: '#newspapers' },
    { label: 'Events', hash: '#events' },
    { label: 'Support', hash: '#support' },
  ],
  '/resources': [
    { label: 'Catalogue', hash: '#catalogue' },
    { label: 'Physical', hash: '#physical' },
    { label: 'Digital', hash: '#digital' },
    { label: 'Study Help', hash: '#study-help' },
    { label: 'Suggested', hash: '#suggested' },
  ],
  '/news': [
    { label: 'Announcements', hash: '#announcements' },
    { label: 'Arrivals', hash: '#arrivals' },
    { label: 'Events', hash: '#events' },
    { label: 'Notices', hash: '#notices' },
    { label: 'Campaigns', hash: '#campaigns' },
  ],
  '/contact': [
    { label: 'Visit', hash: '#visit' },
    { label: 'Help Desk', hash: '#help-desk' },
    { label: 'Feedback', hash: '#feedback' },
    { label: 'Lost Card', hash: '#lost-card' },
    { label: 'Hours', hash: '#hours' },
  ],
}

export function MiniNavbar() {
  const pathname = usePathname()
  const [visible, set_visible] = useState(false)
  const [active_hash, set_active_hash] = useState('')
  const [mobile_open, set_mobile_open] = useState(false)
  const scroll_ref = useRef(0)

  const sections = SECTION_MAP[pathname] ?? []
  const has_sections = sections.length > 0

  useEffect(() => {
    if (!has_sections) return

    const onScroll = () => {
      const y = window.scrollY
      const main_nav_height = 72

      // Show mini-nav only when scrolled past the main navbar
      set_visible(y > main_nav_height + 100)

      // Detect active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].hash.slice(1))
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= main_nav_height + 80) {
            set_active_hash(sections[i].hash)
            break
          }
        }
      }

      scroll_ref.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [has_sections, sections])

  const handle_nav = useCallback((hash: string) => {
    const el = document.getElementById(hash.slice(1))
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72 - 48 - 24
      window.scrollTo({ top, behavior: 'smooth' })
    }
    set_mobile_open(false)
  }, [])

  if (!has_sections) return null

  return (
    <div
      className={`fixed top-[80px] left-0 right-0 z-40 border-b border-white/[0.06] bg-[#0D1F42]/95 backdrop-blur-md transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      {/* Desktop */}
      <div className="hidden h-12 lg:flex items-center">
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-1.5 overflow-x-auto px-4 sm:px-6 lg:px-8 scrollbar-none">
          {sections.map((s) => (
            <button
              key={s.hash}
              onClick={() => handle_nav(s.hash)}
              className={`px-4 py-2 rounded-lg text-[12px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                active_hash === s.hash
                  ? 'bg-gold/15 text-gold'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="h-12 px-4 sm:px-6 lg:hidden">
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between">
          <span className="text-[12px] font-medium text-white/60">Sections</span>
          <button
            onClick={() => set_mobile_open((p) => !p)}
            className="text-white/60 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Toggle sections"
          >
            {mobile_open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {mobile_open && (
          <div className="mx-auto flex w-full max-w-[1440px] flex-wrap gap-2 border-t border-white/[0.06] pb-4 pt-3">
            {sections.map((s) => (
              <button
                key={s.hash}
                onClick={() => handle_nav(s.hash)}
                className={`px-4 py-2 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  active_hash === s.hash
                    ? 'bg-gold/15 text-gold'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
