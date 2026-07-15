import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpen, Calendar, CheckSquare, Star, Bell, ChevronLeft,
  ChevronRight, ArrowRight, RotateCcw, Plus, QrCode, Download,
  BarChart2, Users, BookMarked, Cpu, MessageCircle, FileText,
  MapPin, Clock, Building2, Tv, AlertCircle, Info
} from 'lucide-react'

/* ── QR code placeholder ── */
const QRPlaceholder = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
    <rect width="120" height="120" fill="white" />
    {/* TL finder */}
    <rect x="8" y="8" width="30" height="30" rx="3" fill="#0B1B3D" />
    <rect x="14" y="14" width="18" height="18" rx="1" fill="white" />
    <rect x="18" y="18" width="10" height="10" fill="#0B1B3D" />
    {/* TR finder */}
    <rect x="82" y="8" width="30" height="30" rx="3" fill="#0B1B3D" />
    <rect x="88" y="14" width="18" height="18" rx="1" fill="white" />
    <rect x="92" y="18" width="10" height="10" fill="#0B1B3D" />
    {/* BL finder */}
    <rect x="8" y="82" width="30" height="30" rx="3" fill="#0B1B3D" />
    <rect x="14" y="88" width="18" height="18" rx="1" fill="white" />
    <rect x="18" y="92" width="10" height="10" fill="#0B1B3D" />
    {/* Data dots */}
    {[46,50,54,58,62,66,70,74,46,54,62,70,50,58,66,74,46,50,54,62,66,70,46,54,58,66,74,50,62,70].map((x, i) => (
      <rect key={i} x={x} y={46 + (Math.floor(i / 6) * 8)} width="3" height="3" fill="#0B1B3D" />
    ))}
  </svg>
)

/* ── Book cover block ── */
const BookCover = ({ color, title }: { color: string; title: string }) => (
  <div className="h-[88px] w-[62px] rounded-lg shadow-md flex flex-col items-center justify-end pb-2 shrink-0" style={{ background: color }}>
    <span className="text-[7px] text-white/80 font-bold text-center px-1 leading-tight">{title}</span>
  </div>
)

export default function ExecDashboard() {
  return (
    <div className="p-5 md:p-6 max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-5">

      {/* ══════════ LEFT / MAIN COLUMN ══════════ */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0B1B3D] tracking-tight">Executive Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-slate-500 text-[13px]">Welcome back, <span className="font-bold text-[#0B1B3D]">Dr. John Kamau</span></p>
              <span className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> Executive Access
              </span>
            </div>
          </div>
          <p className="text-slate-400 italic text-[11px] text-right max-w-[240px] leading-relaxed hidden lg:block">
            "Leadership is unlocking people's<br />potential to become better."<br />
            <span className="font-bold text-slate-500 not-italic">— Bill Bradley</span>
          </p>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            {
              icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50',
              num: '4', label: 'Active Loans', sub: 'Due dates this week', link: 'View all'
            },
            {
              icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50',
              num: '2', label: 'Upcoming Bookings', sub: 'Next: Today, 3:00 PM', link: 'View all'
            },
            {
              icon: CheckSquare, color: 'text-emerald-500', bg: 'bg-emerald-50',
              num: '1', label: 'Hold Ready', sub: 'Pickup by 21 Jun', link: 'View all'
            },
            {
              icon: Star, color: 'text-amber-500', bg: 'bg-amber-50',
              num: '2,850', label: 'Library Points', sub: 'Platinum Member', link: 'View details'
            },
            {
              icon: Bell, color: 'text-red-500', bg: 'bg-red-50',
              num: '3', label: 'Unread Alerts', sub: 'Notifications', link: 'View all'
            },
          ].map(({ icon: Icon, color, bg, num, label, sub, link }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
              <div className={`h-8 w-8 ${bg} ${color} rounded-lg flex items-center justify-center`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#0B1B3D] leading-none">{num}</div>
                <div className="text-[11px] font-bold text-[#0B1B3D] mt-1">{label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{sub}</div>
              </div>
              <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                {link} <ArrowRight className="h-2.5 w-2.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* ── HERO BANNER ── */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0a1628] min-h-[200px] flex items-center shadow-lg">
          {/* Background image overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/70 to-transparent z-10" />
            <div className="w-full h-full bg-gradient-to-br from-[#0a1628] to-[#1a3468]" />
            {/* Decorative library photo placeholder */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-amber-900/20 to-transparent flex items-center justify-end pr-12">
              <div className="h-40 w-32 rounded-lg bg-gradient-to-b from-amber-800/30 to-amber-900/50 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-amber-200/40" />
              </div>
            </div>
          </div>

          {/* Left nav arrow */}
          <button className="absolute left-3 z-20 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>

          {/* Content */}
          <div className="relative z-20 px-12 py-8 max-w-[420px]">
            <h2 className="text-2xl font-extrabold text-white leading-tight mb-2">Your Library, Your<br />Advantage</h2>
            <p className="text-white/70 text-[12px] leading-relaxed mb-5">
              Access premium resources, exclusive collections, and quiet spaces designed for leaders and thinkers.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#0B1B3D] font-bold text-[12px] rounded-lg transition shadow-md">
                Explore Resources
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[12px] rounded-lg border border-white/20 transition">
                Reserve a Room
              </button>
            </div>
          </div>

          {/* Right nav arrow */}
          <button className="absolute right-3 z-20 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
            <ChevronRight className="h-4 w-4 text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {[0,1,2,3].map(i => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/30'}`} />
            ))}
          </div>
        </div>

        {/* ── MY LOANS + UPCOMING BOOKINGS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* My Loans */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <div className="px-5 py-4 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-[14px] text-[#0B1B3D]">My Loans</h3>
              <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">View all</Link>
            </div>

            <div className="flex flex-col divide-y divide-slate-50 px-4 py-2">

              {/* Loan 1 */}
              <div className="flex items-center gap-3 py-3">
                <div className="h-14 w-10 rounded bg-[#1d4ed8] flex items-center justify-center shrink-0 shadow">
                  <BookOpen className="h-4 w-4 text-white/60" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight truncate">Strategic Management</span>
                  <span className="text-[10px] text-slate-500">Fred R. David</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Due: 28 Jun 2026</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-red-50 text-red-600 rounded-full whitespace-nowrap">5 days left</span>
              </div>

              {/* Loan 2 */}
              <div className="flex items-center gap-3 py-3">
                <div className="h-14 w-10 rounded bg-[#0f766e] flex items-center justify-center shrink-0 shadow">
                  <BookOpen className="h-4 w-4 text-white/60" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight truncate">The Innovator's Dilemma</span>
                  <span className="text-[10px] text-slate-500">Clayton M. Christensen</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Due: 05 Jul 2026</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full whitespace-nowrap">12 days left</span>
              </div>

              {/* Loan 3 */}
              <div className="flex items-center gap-3 py-3">
                <div className="h-14 w-10 rounded bg-[#7c3aed] flex items-center justify-center shrink-0 shadow">
                  <BookOpen className="h-4 w-4 text-white/60" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight truncate">Artificial Intelligence</span>
                  <span className="text-[10px] text-slate-500">Stuart Russell</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Due: 19 Jul 2026</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full whitespace-nowrap">25 days left</span>
              </div>
            </div>

            <div className="px-4 pb-4 mt-1">
              <button className="flex items-center gap-2 text-[11px] font-bold text-slate-600 hover:text-blue-600 transition">
                <RotateCcw className="h-3.5 w-3.5" /> Renew All Eligible
              </button>
            </div>
          </div>

          {/* Upcoming Bookings */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <div className="px-5 py-4 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-[14px] text-[#0B1B3D]">Upcoming Bookings</h3>
              <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">View all</Link>
            </div>

            <div className="flex flex-col divide-y divide-slate-50 px-4 py-2">

              <div className="flex items-start gap-3 py-3">
                <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-bold text-[12px] text-[#0B1B3D]">Boardroom Booking</span>
                  <span className="text-[10px] text-slate-500">Today, 2:00 PM – 3:00 PM</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">Confirmed</span>
              </div>

              <div className="flex items-start gap-3 py-3">
                <div className="h-8 w-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
                  <Tv className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-bold text-[12px] text-[#0B1B3D]">AVR Session</span>
                  <span className="text-[10px] text-slate-500">Tomorrow, 11:00 AM – 12:30 PM</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">Upcoming</span>
              </div>

              <div className="flex items-start gap-3 py-3">
                <div className="h-8 w-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-bold text-[12px] text-[#0B1B3D]">Reading Room (Executive)</span>
                  <span className="text-[10px] text-slate-500">Wed, 25 Jun, 10:00 AM – 11:00 AM</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">Upcoming</span>
              </div>
            </div>

            <div className="px-4 pb-4 mt-1">
              <button className="flex items-center gap-2 text-[11px] font-bold text-slate-600 hover:text-blue-600 transition">
                <Plus className="h-3.5 w-3.5" /> View My Schedule
              </button>
            </div>
          </div>
        </div>

        {/* ── RECOMMENDED + EVENTS + HOURS + QUICK ACTIONS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 pb-10">

          {/* Recommended For You */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-[13px] text-[#0B1B3D]">Recommended For You</h3>
              <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">See more</Link>
            </div>
            <p className="text-[10px] text-slate-400 mb-4">Based on your interests & leadership profile</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { color: '#15803d', title: 'Good to Great', author: 'Jim Collins' },
                { color: '#ea580c', title: 'The 5 AM Club', author: 'Robin Sharma' },
                { color: '#1d4ed8', title: 'Thinking, Fast and Slow', author: 'Kahneman' },
                { color: '#7c3aed', title: 'The Lean Startup', author: 'Eric Ries' },
                { color: '#0f766e', title: 'Leaders Eat Last', author: 'Simon Sinek' },
              ].map((b) => (
                <div key={b.title} className="flex flex-col gap-1.5 shrink-0 w-[58px]">
                  <div className="h-[78px] w-[58px] rounded-lg shadow-md flex items-end justify-center pb-1.5" style={{ background: b.color }}>
                    <span className="text-[5px] text-white/70 font-bold text-center px-1 leading-tight">{b.title}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="h-2 w-2 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[13px] text-[#0B1B3D]">Upcoming Events</h3>
              <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">See all</Link>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { day: '26', month: 'JUN', title: 'AI in Education Workshop', time: '3:00 PM – AVR', action: 'Register' },
                { day: '27', month: 'JUN', title: 'Debate Club: Library Edition', time: '4:30 PM – Reading Hall', action: 'Join' },
                { day: '02', month: 'JUL', title: 'New E-Resources Orientation', time: '3:00 PM – Computer Lab', action: 'Join' },
              ].map((ev) => (
                <div key={ev.title} className="flex gap-3 items-start">
                  <div className="flex flex-col items-center bg-blue-600 rounded-lg px-2 py-1.5 shrink-0 min-w-[40px]">
                    <span className="text-[14px] font-extrabold text-white leading-none">{ev.day}</span>
                    <span className="text-[8px] font-bold text-blue-200 uppercase tracking-wider">{ev.month}</span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-bold text-[11px] text-[#0B1B3D] leading-tight">{ev.title}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">{ev.time}</span>
                  </div>
                  <button className="text-[10px] font-bold text-blue-600 hover:underline shrink-0">{ev.action}</button>
                </div>
              ))}
            </div>
          </div>

          {/* Library Hours */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[13px] text-[#0B1B3D]">Library Hours</h3>
              <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View full schedule</Link>
            </div>
            <div className="flex items-center gap-1.5 mb-4 text-[11px] font-bold">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-emerald-600">Open Now</span>
              <span className="text-slate-400 font-medium">• Closes 6:00 PM</span>
            </div>
            <div className="flex flex-col gap-2.5 text-[11px]">
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Mon – Fri</span>
                <span className="font-extrabold text-[#0B1B3D]">7:30 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Sat</span>
                <span className="font-extrabold text-[#0B1B3D]">8:00 AM – 1:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Sun</span>
                <span className="font-extrabold text-red-500">Closed</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
            <h3 className="font-bold text-[13px] text-[#0B1B3D] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: QrCode, label: 'Scan QR Code', color: 'bg-blue-50 text-blue-600' },
                { icon: BookMarked, label: 'Reading Recommendations', color: 'bg-purple-50 text-purple-600' },
                { icon: Building2, label: 'Reserve a Room', color: 'bg-amber-50 text-amber-600' },
                { icon: MessageCircle, label: 'Ask a Librarian', color: 'bg-emerald-50 text-emerald-600' },
                { icon: FileText, label: 'Request Resource', color: 'bg-red-50 text-red-600' },
                { icon: BarChart2, label: 'View My Reports', color: 'bg-cyan-50 text-cyan-600' },
              ].map(({ icon: Icon, label, color }) => (
                <button key={label} className="flex flex-col items-center gap-1.5 group">
                  <div className={`h-11 w-11 ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-600 text-center leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ══════════ RIGHT SIDEBAR ══════════ */}
      <div className="w-full xl:w-[280px] flex flex-col gap-5 shrink-0">

        {/* Library Announcements */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mt-0 xl:mt-[118px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[14px] text-[#0B1B3D]">Library Announcements</h3>
            <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View all</Link>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center shrink-0">
                <Info className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">AI Literacy Week Begins</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Workshops start this week!</span>
                <span className="text-[9px] text-slate-400 mt-1">2d ago</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center shrink-0">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">New E-Resources Added</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Springer & IEEE now available!</span>
                <span className="text-[9px] text-slate-400 mt-1">3d ago</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">Library Closed on Public Holiday</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Thursday, 26 Jun 2026</span>
                <span className="text-[9px] text-slate-400 mt-1">5d ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* My QR Access Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[14px] text-[#0B1B3D]">My QR Access Card</h3>
            <button className="h-6 w-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] hover:bg-slate-200 transition">ⓘ</button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 flex items-center justify-center">
            <QRPlaceholder />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-bold text-[13px] text-[#0B1B3D]">Dr. John Kamau</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">ID: SBC-EXE-0007</div>
            </div>
            <span className="text-[10px] font-extrabold bg-emerald-500 text-white px-2.5 py-1 rounded-full">Active</span>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 h-9 bg-[#0B1B3D] hover:bg-[#172b5c] text-white rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1.5">
              <QrCode className="h-3.5 w-3.5" /> View Full Card
            </button>
            <button className="h-9 w-9 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center transition shrink-0">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="bg-[#0B1B3D] rounded-2xl p-5 flex flex-col gap-4 shadow-lg mb-10">
          <div>
            <h3 className="font-bold text-[14px] text-white">Today's Summary</h3>
            <p className="text-[10px] text-white/50 mt-0.5">June 20, 2026</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { val: '26', label: 'Loans Issued', color: 'text-blue-400' },
              { val: '18', label: 'Returns', color: 'text-emerald-400' },
              { val: '7', label: 'New Members', color: 'text-amber-400' },
              { val: '3', label: 'Lost Items', color: 'text-red-400' },
            ].map(({ val, label, color }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3 flex flex-col">
                <span className={`text-2xl font-extrabold ${color} leading-none`}>{val}</span>
                <span className="text-[10px] text-white/60 font-medium mt-1 leading-tight">{label}</span>
              </div>
            ))}
          </div>

          <button className="w-full h-9 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[12px] font-bold transition flex items-center justify-center gap-2">
            <BarChart2 className="h-4 w-4" /> View Full Report
          </button>
        </div>

      </div>
    </div>
  )
}
