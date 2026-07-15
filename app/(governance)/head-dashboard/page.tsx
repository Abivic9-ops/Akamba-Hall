import Image from 'next/image'
import Link from 'next/link'
import { 
  Users, Book, CornerUpLeft, Armchair, Calendar, AlertTriangle, 
  QrCode, UserPlus, ShieldCheck, Bell, CheckSquare, 
  CalendarClock, Clock, Check, X, BookOpen, Laptop, Briefcase, 
  Lightbulb, ShieldAlert, ArrowUp, ArrowDown, ChevronDown, Activity, RefreshCw, FileText
} from 'lucide-react'

// Simple SVG sparkline components
const SparklineBlue = () => (
  <svg width="48" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12L10 6L18 9L28 3L38 8L47 2" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const SparklineGreen = () => (
  <svg width="48" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 13L12 8L20 11L30 4L38 6L47 1" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const SparklineRed = () => (
  <svg width="48" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 2L10 8L18 6L28 12L38 9L47 14" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const SparklineTeal = () => (
  <svg width="48" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 10L10 5L18 8L28 2L38 6L47 1" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function HeadDashboardPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-6">
      
      {/* MAIN COLUMN */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-[#0B1B3D] tracking-tight">Good Morning, <span className="font-extrabold text-[#0B1B3D]">Mr. Memo</span> 👋</h1>
            <p className="text-slate-500 font-medium text-[13px] mt-1">Library Head • Akamba Hall</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
              <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <CalendarClock className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Current Term</span>
                <span className="text-[12px] font-bold text-[#0B1B3D]">Term II, 2026</span>
                <span className="text-[10px] text-slate-400">Apr - Jul 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
              <div className="h-8 w-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Library Status</span>
                <span className="text-[12px] font-bold text-[#0B1B3D]">Operational</span>
                <span className="text-[10px] text-slate-400">All Systems Normal</span>
              </div>
            </div>
          </div>
        </div>

        {/* STATS GRID (4x3 = 12 items) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Row 1 */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-blue-50 text-blue-500 rounded flex items-center justify-center"><Users className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Members Today</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">324</span>
                <span className="text-[10px] font-bold text-emerald-500 mt-2 flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 18% <span className="text-slate-400 font-medium">vs yesterday</span></span>
              </div>
              <SparklineBlue />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-purple-50 text-purple-500 rounded flex items-center justify-center"><Book className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Books Borrowed</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">126</span>
                <span className="text-[10px] font-bold text-emerald-500 mt-2 flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 12% <span className="text-slate-400 font-medium">vs yesterday</span></span>
              </div>
              <SparklineGreen />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-emerald-50 text-emerald-500 rounded flex items-center justify-center"><CornerUpLeft className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Returns Pending</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">28</span>
                <span className="text-[10px] font-bold text-red-500 mt-2 flex items-center gap-0.5"><ArrowDown className="h-3 w-3" /> 8% <span className="text-slate-400 font-medium">vs yesterday</span></span>
              </div>
              <SparklineRed />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-blue-50 text-blue-500 rounded flex items-center justify-center"><Armchair className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Available Seats</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">68</span>
                <span className="text-[10px] font-bold text-emerald-500 mt-2 flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 5% <span className="text-slate-400 font-medium">vs yesterday</span></span>
              </div>
              <SparklineTeal />
            </div>
          </div>

          {/* Row 2 */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-blue-50 text-blue-500 rounded flex items-center justify-center"><Calendar className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Bookings Today</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">24</span>
                <span className="text-[10px] font-bold text-emerald-500 mt-2 flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 14% <span className="text-slate-400 font-medium">vs yesterday</span></span>
              </div>
              <SparklineGreen />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-red-50 text-red-500 rounded flex items-center justify-center"><AlertTriangle className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Overdue Items</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">15</span>
                <span className="text-[10px] font-bold text-red-500 mt-2 flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 20% <span className="text-slate-400 font-medium">vs yesterday</span></span>
              </div>
              <SparklineRed />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-blue-50 text-blue-400 rounded flex items-center justify-center"><QrCode className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Active QR Cards</span>
            </div>
            <div className="flex justify-between items-end mt-auto">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">1,248</span>
                <span className="text-[10px] font-bold text-emerald-500 mt-2 flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 6% <span className="text-slate-400 font-medium">vs yesterday</span></span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-purple-50 text-purple-500 rounded flex items-center justify-center"><UserPlus className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Today's Visitors</span>
            </div>
            <div className="flex justify-between items-end mt-auto">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">412</span>
                <span className="text-[10px] font-bold text-emerald-500 mt-2 flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 11% <span className="text-slate-400 font-medium">vs yesterday</span></span>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-emerald-50 text-emerald-500 rounded flex items-center justify-center"><ShieldCheck className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Collection Health</span>
            </div>
            <div className="flex justify-between items-end mt-auto">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">96%</span>
                <span className="text-[10px] font-bold text-emerald-500 mt-2 flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 3% <span className="text-slate-400 font-medium">vs last week</span></span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-amber-50 text-amber-500 rounded flex items-center justify-center"><Bell className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Inventory Alerts</span>
            </div>
            <div className="flex justify-between items-end mt-auto">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">7</span>
                <span className="text-[10px] font-bold text-amber-500 mt-2 cursor-pointer hover:underline">View alerts</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-amber-50 text-amber-500 rounded flex items-center justify-center"><CheckSquare className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Pending Approvals</span>
            </div>
            <div className="flex justify-between items-end mt-auto">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">12</span>
                <span className="text-[10px] font-bold text-amber-500 mt-2">Needs your action</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-red-50 text-red-500 rounded flex items-center justify-center"><ShieldAlert className="h-3 w-3" /></div>
              <span className="text-[11px] font-bold text-slate-600">Open Incidents</span>
            </div>
            <div className="flex justify-between items-end mt-auto">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">5</span>
                <span className="text-[10px] font-bold text-red-500 mt-2 cursor-pointer hover:underline">View incidents</span>
              </div>
            </div>
          </div>

        </div>

        {/* MIDDLE ROW (Pending Approvals & Live Feed) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Pending Approvals */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-[14px] text-[#0B1B3D]">Pending Approvals</h3>
              <span className="bg-orange-50 text-orange-500 text-[10px] font-extrabold px-2 py-0.5 rounded-full">12</span>
            </div>
            
            <div className="flex flex-col px-5 py-2">
              {/* Item 1 */}
              <div className="flex items-center justify-between py-3 border-b border-slate-50 group">
                <div className="flex gap-3 items-center">
                  <div className="h-9 w-9 bg-cyan-50 text-cyan-500 rounded-lg flex items-center justify-center shrink-0">
                    <Armchair className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Study Room Booking</span>
                    <span className="text-[10px] text-slate-500">Group 6A • Today, 2:00 PM - 4:00 PM</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-[11px] text-[#0B1B3D]">Emma W.</span>
                    <span className="text-[9px] text-slate-400">2 min ago</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-7 w-7 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition"><Check className="h-4 w-4" /></button>
                    <button className="h-7 w-7 rounded-md border border-red-200 bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"><X className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between py-3 border-b border-slate-50 group">
                <div className="flex gap-3 items-center">
                  <div className="h-9 w-9 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center shrink-0">
                    <Laptop className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Laptop Loan Request</span>
                    <span className="text-[10px] text-slate-500">HP EliteBook • 7 days</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-[11px] text-[#0B1B3D]">Brian O.</span>
                    <span className="text-[9px] text-slate-400">15 min ago</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-7 w-7 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition"><Check className="h-4 w-4" /></button>
                    <button className="h-7 w-7 rounded-md border border-red-200 bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"><X className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between py-3 border-b border-slate-50 group">
                <div className="flex gap-3 items-center">
                  <div className="h-9 w-9 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Executive Boardroom Booking</span>
                    <span className="text-[10px] text-slate-500">Mon, 26 May • 10:00 AM - 12:00 PM</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-[11px] text-[#0B1B3D]">Dr. M. Njoroge</span>
                    <span className="text-[9px] text-slate-400">30 min ago</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-7 w-7 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition"><Check className="h-4 w-4" /></button>
                    <button className="h-7 w-7 rounded-md border border-red-200 bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"><X className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center justify-between py-3 border-b border-slate-50 group">
                <div className="flex gap-3 items-center">
                  <div className="h-9 w-9 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center shrink-0">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Book Acquisition Suggestion</span>
                    <span className="text-[10px] text-slate-500">Atomic Habits • James Clear</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-[11px] text-[#0B1B3D]">Staff Member</span>
                    <span className="text-[9px] text-slate-400">1 hr ago</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-7 w-7 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition"><Check className="h-4 w-4" /></button>
                    <button className="h-7 w-7 rounded-md border border-red-200 bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"><X className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>

              {/* Item 5 */}
              <div className="flex items-center justify-between py-3 group">
                <div className="flex gap-3 items-center">
                  <div className="h-9 w-9 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
                    <QrCode className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">QR Card Reissue</span>
                    <span className="text-[10px] text-slate-500">Card lost • Replacement request</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-[11px] text-[#0B1B3D]">Victor K.</span>
                    <span className="text-[9px] text-slate-400">2 hrs ago</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-7 w-7 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition"><Check className="h-4 w-4" /></button>
                    <button className="h-7 w-7 rounded-md border border-red-200 bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"><X className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="p-3 border-t border-slate-50 mt-auto">
              <Link href="/approvals" className="text-[11px] font-bold text-blue-600 hover:underline">View all approvals &rarr;</Link>
            </div>
          </div>

          {/* Live Feed */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <div className="p-5 flex justify-between items-center">
              <h3 className="font-bold text-[14px] text-[#0B1B3D]">Library Operations – Live Feed</h3>
              <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">View all &rarr;</Link>
            </div>
            
            <div className="px-5 pb-5 flex flex-col relative h-[310px] overflow-hidden">
              <div className="absolute left-[39px] top-2 bottom-0 w-px bg-slate-100"></div>
              
              <div className="flex flex-col gap-4 relative z-10">
                {/* Event 1 */}
                <div className="flex gap-4 items-start">
                  <span className="text-[10px] font-bold text-slate-400 w-12 text-right pt-1 shrink-0">09:25 AM</span>
                  <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-500 border-2 border-white flex items-center justify-center shrink-0 mt-0.5">
                    <CornerUpLeft className="h-3 w-3" />
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Book returned</span>
                    <span className="text-[10px] text-slate-500">The Pragmatic Programmer • Returned by Brian O.</span>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex gap-4 items-start">
                  <span className="text-[10px] font-bold text-slate-400 w-12 text-right pt-1 shrink-0">09:18 AM</span>
                  <div className="h-6 w-6 rounded-full bg-blue-50 text-blue-500 border-2 border-white flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="h-3 w-3" />
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Member checked in</span>
                    <span className="text-[10px] text-slate-500">Emmanuel G. • QR scanned at Main Entrance</span>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex gap-4 items-start">
                  <span className="text-[10px] font-bold text-slate-400 w-12 text-right pt-1 shrink-0">09:10 AM</span>
                  <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-500 border-2 border-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckSquare className="h-3 w-3" />
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Booking approved</span>
                    <span className="text-[10px] text-slate-500">AVR Room • Today, 11:00 AM - 1:00 PM</span>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="flex gap-4 items-start">
                  <span className="text-[10px] font-bold text-slate-400 w-12 text-right pt-1 shrink-0">08:58 AM</span>
                  <div className="h-6 w-6 rounded-full bg-purple-50 text-purple-500 border-2 border-white flex items-center justify-center shrink-0 mt-0.5">
                    <QrCode className="h-3 w-3" />
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">QR Card issued</span>
                    <span className="text-[10px] text-slate-500">New member • Tinashe M. • Student</span>
                  </div>
                </div>

                {/* Event 5 */}
                <div className="flex gap-4 items-start">
                  <span className="text-[10px] font-bold text-slate-400 w-12 text-right pt-1 shrink-0">08:45 AM</span>
                  <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-500 border-2 border-white flex items-center justify-center shrink-0 mt-0.5">
                    <Activity className="h-3 w-3" />
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Inventory updated</span>
                    <span className="text-[10px] text-slate-500">Non-Fiction Section • 24 items scanned</span>
                  </div>
                </div>

                {/* Event 6 */}
                <div className="flex gap-4 items-start">
                  <span className="text-[10px] font-bold text-slate-400 w-12 text-right pt-1 shrink-0">08:30 AM</span>
                  <div className="h-6 w-6 rounded-full bg-blue-50 text-blue-500 border-2 border-white flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="h-3 w-3" />
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Library opened</span>
                    <span className="text-[10px] text-slate-500">Good morning! Have a productive day.</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW (Collection Health, Overdue Risk, QR Mgmt) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          
          {/* Collection Health Donut */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[14px] text-[#0B1B3D]">Collection Health</h3>
              <button className="text-[10px] font-bold text-slate-500 flex items-center gap-1 border border-slate-200 rounded px-2 py-1">This Week <ChevronDown className="h-3 w-3" /></button>
            </div>
            
            <div className="flex flex-col items-center justify-center relative mb-4">
              {/* Fake Donut Chart SVG */}
              <svg width="140" height="140" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray="9 250" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="13 250" strokeDashoffset="-9" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a855f7" strokeWidth="16" strokeDasharray="28 250" strokeDashoffset="-22" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="16" strokeDasharray="68 250" strokeDashoffset="-50" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="16" strokeDasharray="133 250" strokeDashoffset="-118" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-[#0B1B3D] leading-none">3,842</span>
                <span className="text-[9px] text-slate-500 font-medium mt-1">Total items</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <div className="flex justify-between items-center text-[11px]">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-slate-600 font-bold">Available</span></div>
                <div><span className="font-extrabold text-[#0B1B3D]">2,145</span> <span className="text-slate-400">(56%)</span></div>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-slate-600 font-bold">Borrowed</span></div>
                <div><span className="font-extrabold text-[#0B1B3D]">1,025</span> <span className="text-slate-400">(27%)</span></div>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span className="text-slate-600 font-bold">Reserved</span></div>
                <div><span className="font-extrabold text-[#0B1B3D]">342</span> <span className="text-slate-400">(9%)</span></div>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-slate-600 font-bold">Under Repair</span></div>
                <div><span className="font-extrabold text-[#0B1B3D]">180</span> <span className="text-slate-400">(5%)</span></div>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="text-slate-600 font-bold">Lost</span></div>
                <div><span className="font-extrabold text-[#0B1B3D]">150</span> <span className="text-slate-400">(3%)</span></div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-50 text-left">
              <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View full collection report &rarr;</Link>
            </div>
          </div>

          {/* Overdue Risk */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[14px] text-[#0B1B3D]">Overdue Risk</h3>
              <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">More details</Link>
            </div>

            <div className="flex gap-2 mb-6">
              <div className="flex-1 bg-red-50 border border-red-100 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-red-600">High Risk</span>
                <span className="text-xl font-extrabold text-red-600 my-1">7</span>
                <span className="text-[9px] text-red-400 font-medium">&gt; 7 days</span>
              </div>
              <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-amber-600">Medium Risk</span>
                <span className="text-xl font-extrabold text-amber-600 my-1">5</span>
                <span className="text-[9px] text-amber-400 font-medium">4 - 7 days</span>
              </div>
              <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-emerald-600">Low Risk</span>
                <span className="text-xl font-extrabold text-emerald-600 my-1">23</span>
                <span className="text-[9px] text-emerald-400 font-medium">1 - 3 days</span>
              </div>
            </div>

            <div className="flex justify-between items-end mt-auto pt-4 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500">Total Overdue Items</span>
                <span className="text-2xl font-extrabold text-[#0B1B3D]">35</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-500">Overdue Rate</span>
                <div className="flex items-end gap-1.5">
                  <span className="text-2xl font-extrabold text-[#0B1B3D]">2.1%</span>
                  <span className="text-[10px] font-bold text-red-500 flex items-center mb-1"><ArrowUp className="h-3 w-3" /> 0.6%</span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Management table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[14px] text-[#0B1B3D]">QR Management</h3>
              <button className="text-[10px] font-bold text-slate-500 flex items-center gap-1 border border-slate-200 rounded px-2 py-1">This Month <ChevronDown className="h-3 w-3" /></button>
            </div>
            
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex justify-between items-center text-[11px] py-1 border-b border-slate-50">
                <div className="flex items-center gap-2 text-slate-600"><CheckSquare className="h-3 w-3 text-emerald-500" /> Issued</div>
                <div className="flex items-center gap-4 w-20 justify-end">
                  <span className="font-extrabold text-[#0B1B3D]">86</span>
                  <span className="text-emerald-500 font-bold w-10 text-right flex items-center justify-end"><ArrowUp className="h-2 w-2 mr-0.5"/> 22%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[11px] py-1 border-b border-slate-50">
                <div className="flex items-center gap-2 text-slate-600"><Clock className="h-3 w-3 text-amber-500" /> Expired</div>
                <div className="flex items-center gap-4 w-20 justify-end">
                  <span className="font-extrabold text-[#0B1B3D]">4</span>
                  <span className="text-red-500 font-bold w-10 text-right flex items-center justify-end"><ArrowDown className="h-2 w-2 mr-0.5"/> 20%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[11px] py-1 border-b border-slate-50">
                <div className="flex items-center gap-2 text-slate-600"><CheckSquare className="h-3 w-3 text-slate-400" /> Inactive</div>
                <div className="flex items-center gap-4 w-20 justify-end">
                  <span className="font-extrabold text-[#0B1B3D]">12</span>
                  <span className="text-slate-400 font-bold w-10 text-right">— 0%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[11px] py-1 border-b border-slate-50">
                <div className="flex items-center gap-2 text-slate-600"><AlertTriangle className="h-3 w-3 text-red-500" /> Lost Cards</div>
                <div className="flex items-center gap-4 w-20 justify-end">
                  <span className="font-extrabold text-[#0B1B3D]">3</span>
                  <span className="text-red-500 font-bold w-10 text-right flex items-center justify-end"><ArrowDown className="h-2 w-2 mr-0.5"/> 40%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[11px] py-1 border-b border-slate-50">
                <div className="flex items-center gap-2 text-slate-600"><RefreshCw className="h-3 w-3 text-blue-500" /> Reissued</div>
                <div className="flex items-center gap-4 w-20 justify-end">
                  <span className="font-extrabold text-[#0B1B3D]">7</span>
                  <span className="text-emerald-500 font-bold w-10 text-right flex items-center justify-end"><ArrowUp className="h-2 w-2 mr-0.5"/> 16%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[11px] py-1">
                <div className="flex items-center gap-2 text-slate-600"><Clock className="h-3 w-3 text-slate-400" /> Pending Activation</div>
                <div className="flex items-center gap-4 w-20 justify-end">
                  <span className="font-extrabold text-[#0B1B3D]">9</span>
                  <span className="text-slate-400 font-bold w-10 text-right">— 0%</span>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-3 text-left border-t border-slate-50">
              <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">Manage QR Cards &rarr;</Link>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full xl:w-[320px] flex flex-col gap-4 shrink-0">
        
        {/* Library Health Donut */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col items-center">
          <h3 className="font-bold text-[14px] text-[#0B1B3D] w-full mb-6">Library Health</h3>
          <div className="relative flex items-center justify-center">
            {/* Simple circle SVG */}
            <svg width="180" height="180" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="10" strokeDasharray="250 250" strokeDashoffset="2" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-[#0B1B3D] tracking-tighter">99.4<span className="text-lg">%</span></span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Operational</span>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-[12px] font-bold text-[#0B1B3D]">
            <div className="h-2 w-2 bg-emerald-500 rounded-full"></div> Excellent
          </div>
        </div>

        {/* Space Utilization */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[14px] text-[#0B1B3D]">Space Utilization</h3>
            <button className="text-[10px] font-bold text-slate-500 flex items-center gap-1">Today <ChevronDown className="h-3 w-3" /></button>
          </div>
          
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-700">Study Rooms</span>
                <span className="text-slate-500">72%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full" style={{width: '72%'}}></div></div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-700">Boardroom</span>
                <span className="text-slate-500">66%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full" style={{width: '66%'}}></div></div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-700">Digital Lab</span>
                <span className="text-slate-500">48%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full" style={{width: '48%'}}></div></div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-700">Reading Hall</span>
                <span className="text-slate-500">38%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full" style={{width: '38%'}}></div></div>
            </div>
          </div>
          
          <div className="pt-3">
            <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View full schedule &rarr;</Link>
          </div>
        </div>

        {/* Today's Events */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-[14px] text-[#0B1B3D]">Today's Events</h3>
            <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View all</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <span className="bg-blue-50 text-blue-600 font-bold text-[10px] px-2 py-1 rounded w-16 text-center">10:00 AM</span>
              <div className="flex flex-col">
                <span className="font-bold text-[12px] text-[#0B1B3D]">Reading Session</span>
                <span className="text-[10px] text-slate-500">Reading Hall</span>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="bg-blue-50 text-blue-600 font-bold text-[10px] px-2 py-1 rounded w-16 text-center">11:30 AM</span>
              <div className="flex flex-col">
                <span className="font-bold text-[12px] text-[#0B1B3D]">Research Workshop</span>
                <span className="text-[10px] text-slate-500">Digital Lab</span>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="bg-blue-50 text-blue-600 font-bold text-[10px] px-2 py-1 rounded w-16 text-center">02:00 PM</span>
              <div className="flex flex-col">
                <span className="font-bold text-[12px] text-[#0B1B3D]">Book Club Meeting</span>
                <span className="text-[10px] text-slate-500">Study Room 2</span>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="bg-blue-50 text-blue-600 font-bold text-[10px] px-2 py-1 rounded w-16 text-center">04:00 PM</span>
              <div className="flex flex-col">
                <span className="font-bold text-[12px] text-[#0B1B3D]">Digital Literacy Class</span>
                <span className="text-[10px] text-slate-500">AVR Room</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-10">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-[14px] text-[#0B1B3D]">Notifications</h3>
            <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View all</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-bold text-[11px] text-[#0B1B3D]">12 approvals pending</span>
                <span className="text-[10px] text-slate-500">Requires your action</span>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-bold text-[11px] text-[#0B1B3D]">5 overdue items</span>
                <span className="text-[10px] text-slate-500">Need attention</span>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-bold text-[11px] text-[#0B1B3D]">Inventory alert</span>
                <span className="text-[10px] text-slate-500">7 items need review</span>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center shrink-0">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-bold text-[11px] text-[#0B1B3D]">System update</span>
                <span className="text-[10px] text-slate-500">Completed successfully</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
