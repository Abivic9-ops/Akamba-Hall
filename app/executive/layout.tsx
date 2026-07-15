import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard, BookOpen, Calendar, History, CreditCard,
  Building2, Tv, Package, Search, Globe, Monitor, Headphones,
  Megaphone, CalendarDays, MessageCircle, User, Bell,
  LogOut, ChevronRight, Star, Lock, Phone
} from 'lucide-react'

export default function ExecutiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">

      {/* SIDEBAR */}
      <aside className="w-[240px] bg-[#0B1B3D] flex flex-col h-screen sticky top-0 text-white overflow-y-auto shrink-0 z-20">

        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-3 border-b border-white/5">
          <div className="relative h-9 w-7 shrink-0">
            <Image src="/images/starehe-logo.png" alt="Starehe" fill className="object-contain" />
          </div>
          <span className="font-extrabold text-white text-[14px] leading-tight">Starehe Library Portal</span>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4 flex flex-col gap-0.5 flex-1 overflow-y-auto">

          {/* OVERVIEW */}
          <p className="text-[10px] font-bold text-white/35 uppercase tracking-widest px-3 pt-2 pb-1">Overview</p>
          <Link href="/executive/dashboard" className="flex items-center justify-between px-3 py-2 rounded-lg bg-amber-500/90 text-white font-bold text-[13px] shadow">
            <div className="flex items-center gap-2.5"><LayoutDashboard className="h-4 w-4" /> Dashboard</div>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>

          {/* MY ACCOUNT */}
          <p className="text-[10px] font-bold text-white/35 uppercase tracking-widest px-3 pt-4 pb-1">My Account</p>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <BookOpen className="h-4 w-4 shrink-0" /> My Loans
          </Link>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <Calendar className="h-4 w-4 shrink-0" /> Reservations
          </Link>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <History className="h-4 w-4 shrink-0" /> Reading History
          </Link>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <CreditCard className="h-4 w-4 shrink-0" /> Fines & Payments
          </Link>

          {/* RESERVATIONS */}
          <p className="text-[10px] font-bold text-white/35 uppercase tracking-widest px-3 pt-4 pb-1">Reservations</p>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <Building2 className="h-4 w-4 shrink-0" /> Room Bookings
          </Link>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <Tv className="h-4 w-4 shrink-0" /> AVR Booking
          </Link>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <Package className="h-4 w-4 shrink-0" /> Equipment
          </Link>

          {/* LIBRARY SERVICES */}
          <p className="text-[10px] font-bold text-white/35 uppercase tracking-widest px-3 pt-4 pb-1">Library Services</p>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <Search className="h-4 w-4 shrink-0" /> Catalogue Search
          </Link>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <Globe className="h-4 w-4 shrink-0" /> E-Resources
          </Link>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <Monitor className="h-4 w-4 shrink-0" /> Digital Library
          </Link>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <Headphones className="h-4 w-4 shrink-0" /> Research Support
          </Link>

          {/* COMMUNICATION */}
          <p className="text-[10px] font-bold text-white/35 uppercase tracking-widest px-3 pt-4 pb-1">Communication</p>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <Megaphone className="h-4 w-4 shrink-0" /> Announcements
          </Link>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <CalendarDays className="h-4 w-4 shrink-0" /> Events
          </Link>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <MessageCircle className="h-4 w-4 shrink-0" /> Ask a Librarian
          </Link>

          {/* PREFERENCES */}
          <p className="text-[10px] font-bold text-white/35 uppercase tracking-widest px-3 pt-4 pb-1">Preferences</p>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <User className="h-4 w-4 shrink-0" /> Profile Settings
          </Link>
          <Link href="/executive/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition">
            <Bell className="h-4 w-4 shrink-0" /> Notification Settings
          </Link>

          {/* Sign Out */}
          <div className="mt-4 pt-3 border-t border-white/5">
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-bold text-red-400 hover:bg-red-400/10 transition border border-red-400/20">
                <div className="flex items-center gap-2.5"><LogOut className="h-4 w-4" /> Sign Out</div>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </nav>

        {/* Executive Privileges Card */}
        <div className="m-3 mt-0 bg-gradient-to-br from-[#1a2f5a] to-[#0f1f40] border border-amber-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="font-bold text-[13px] text-amber-400">Executive Privileges</span>
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            {[
              { icon: BookOpen, label: 'Extended Loan Periods' },
              { icon: Star, label: 'Priority Bookings' },
              { icon: Lock, label: 'Special Access' },
              { icon: Phone, label: 'Confidential Support' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[11px] text-white/70">
                <Icon className="h-3 w-3 text-amber-400 shrink-0" />
                {label}
              </div>
            ))}
          </div>
          <button className="w-full h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-[11px] font-bold text-[#0B1B3D] transition">
            Learn More
          </button>
        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* TOP BAR */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center gap-4 px-5 shrink-0 shadow-sm z-10">
          <button className="h-8 w-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 transition lg:hidden">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>

          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search books, resources, events, or services..."
              className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-full text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition placeholder:text-slate-400"
            />
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="relative cursor-pointer">
              <Bell className="h-5 w-5 text-slate-500 hover:text-[#0B1B3D] transition" />
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 border-2 border-white text-[8px] font-extrabold text-white rounded-full flex items-center justify-center">3</span>
            </div>
            <MessageCircle className="h-5 w-5 text-slate-500 hover:text-[#0B1B3D] transition cursor-pointer" />
            <div className="h-7 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="h-9 w-9 rounded-full overflow-hidden relative border-2 border-slate-200 group-hover:border-blue-400 transition-all shrink-0">
                <Image src="https://i.pravatar.cc/150?u=drjohnkamau" alt="Dr. John Kamau" fill className="object-cover" />
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-[12px] font-bold text-[#0B1B3D]">Dr. John Kamau</span>
                <span className="text-[10px] text-slate-500">Executive Director</span>
              </div>
              <svg className="h-3.5 w-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          {children}
          <footer className="py-4 text-center text-[11px] text-slate-400 border-t border-slate-200 flex justify-between px-8 mt-2">
            <span>&copy; 2026 Starehe Boys' Centre - Akamba Hall Library. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-slate-600">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-600">Terms of Use</Link>
              <Link href="#" className="hover:text-slate-600">Help Center</Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
