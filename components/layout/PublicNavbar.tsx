'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, Clock, User, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Mission & Purpose', href: '/about#mission' },
      { label: 'Library Identity', href: '/about#identity' },
      { label: 'Who We Serve', href: '/about#who-we-serve' },
      { label: 'Our Values', href: '/about#values' },
      { label: 'Library Leadership', href: '/about#leadership' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Borrowing & Returns', href: '/services#borrowing' },
      { label: 'Space Bookings', href: '/services#bookings' },
      { label: 'Equipment Lending', href: '/services#equipment' },
      { label: 'Newspapers & Periodicals', href: '/services#newspapers' },
      { label: 'Events & Attendance', href: '/services#events' },
      { label: 'Support Services', href: '/services#support' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Catalogue Search', href: '/resources#catalogue' },
      { label: 'Physical Collections', href: '/resources#physical' },
      { label: 'Digital Resources', href: '/resources#digital' },
      { label: 'Study Help', href: '/resources#study-help' },
      { label: 'Suggested Reading', href: '/resources#suggested' },
    ],
  },
  {
    label: 'News & Updates',
    href: '/news',
    children: [
      { label: 'Announcements', href: '/news#announcements' },
      { label: 'New Arrivals', href: '/news#arrivals' },
      { label: 'Events Calendar', href: '/news#events' },
      { label: 'Library Notices', href: '/news#notices' },
      { label: 'Reading Campaigns', href: '/news#campaigns' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Visit Us', href: '/contact#visit' },
      { label: 'Ask a Librarian', href: '/contact#help-desk' },
      { label: 'Feedback', href: '/contact#feedback' },
      { label: 'Lost Card Help', href: '/contact#lost-card' },
      { label: 'Library Hours', href: '/contact#hours' },
    ],
  },
]

function Dropdown({ item, isActive }: { item: typeof navItems[number]; isActive: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        href={item.href}
        className={`flex items-center gap-1 text-[13px] font-medium transition-colors py-2 ${
          isActive ? 'text-gold' : 'text-white/70 hover:text-white'
        }`}
        onClick={() => setOpen(false)}
      >
        {item.label}
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isActive ? 'text-gold/60' : 'text-white/40'} ${open ? 'rotate-180' : ''}`} />
      </Link>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-[#0E2150] border border-white/10 rounded-xl py-2 shadow-xl z-50">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-[12px] text-white/60 hover:text-gold hover:bg-white/5 transition-colors"
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function PublicNavbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1A3B] shadow-lg shadow-black/15 py-2'
          : 'bg-[#0B1A3B] py-3'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative h-14 w-11 shrink-0">
            <Image src="/images/starehe-logo.png" alt="Starehe Boys' Centre Crest" fill className="object-contain" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-widest">Starehe Boys&apos; Centre</span>
            <span className="font-medium text-[15px] text-white tracking-tight">Akamba Hall Library</span>
            <span className="text-[10px] font-medium text-white/40 tracking-wide">Knowledge &bull; Character &bull; Leadership</span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center space-x-5">
          {navItems.map((item) =>
            item.children ? (
              <Dropdown key={item.label} item={item} isActive={isActive(item.href)} />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[13px] font-medium transition-colors py-2 ${
                  isActive(item.href) ? 'text-gold font-medium' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="hidden xl:flex items-center gap-5">
          <div className="flex items-center gap-2.5 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 hover:bg-gold/20 transition-colors cursor-default">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <Clock className="h-3.5 w-3.5 text-gold/70" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-medium text-gold uppercase tracking-widest">Open Now</span>
              <span className="text-[11px] text-white/60">Mon – Fri, 7:30 AM – 6:00 PM</span>
            </div>
          </div>
          <div className="h-6 w-px bg-white/20" />
          <Link href="/login">
            <Button className="gap-2 bg-gold hover:bg-gold-hover text-navy font-medium px-5 h-9 rounded-full text-[13px] shadow-md shadow-gold/20 transition-all">
              <User className="h-3.5 w-3.5" />
              Portal Login
            </Button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0E2150] border-t border-white/10 px-4 py-6 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-1 text-[14px] font-medium">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      className={`w-full flex items-center justify-between py-2 transition-colors ${isActive(item.href) ? 'text-gold' : 'text-white/70 hover:text-white'}`}
                      onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 text-white/40 transition-transform ${mobileSection === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileSection === item.label && (
                      <div className="pl-4 pb-2 flex flex-col gap-1">
                        <Link href={item.href} className="py-1.5 text-[13px] text-gold font-medium" onClick={() => setMobileOpen(false)}>
                          View all
                        </Link>
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href} className="py-1.5 text-[13px] text-white/50 hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className={`py-2 block transition-colors ${isActive(item.href) ? 'text-gold font-medium' : 'text-white/70 hover:text-white'}`} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 bg-gold/10 border border-gold/20 rounded-full px-4 py-2.5 w-fit">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <Clock className="h-3.5 w-3.5 text-gold/70" />
              <span className="text-[11px] text-white/60 font-medium">Mon – Fri, 7:30 AM – 6:00 PM</span>
            </div>
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button className="w-full gap-2 bg-gold hover:bg-gold-hover text-navy font-medium h-10 rounded-full text-[13px]">
                <User className="h-3.5 w-3.5" />
                Portal Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
