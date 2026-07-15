import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, Archive, RefreshCw, UserPlus, AlertTriangle, 
  CheckCircle2, RotateCw, ScanLine, CreditCard, ChevronRight,
  ArrowRight, Search, FileText, UserCheck, MonitorPlay, Users,
  Calendar, Newspaper, Bookmark, Briefcase, Printer, LogIn,
  Clock, Check
} from 'lucide-react'

export default function CirculationDeskPage() {
  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto flex flex-col gap-6 pb-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B1B3D] tracking-tight">Good morning, Mary! 👋</h1>
          <p className="text-slate-500 mt-1">Ready to assist our members today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 font-bold text-[11px]">
            <CheckCircle2 className="h-3.5 w-3.5" /> System Online
          </div>
          <div className="flex items-center gap-2 bg-white text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 font-medium text-[11px]">
            Last Sync: 8:42 AM <RotateCw className="h-3 w-3 cursor-pointer hover:text-[#0B1B3D]" />
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">24</span>
            <span className="font-bold text-[12px] text-[#0B1B3D] mt-1">Loans Issued</span>
            <span className="text-[10px] text-slate-500">Today</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Archive className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">17</span>
            <span className="font-bold text-[12px] text-[#0B1B3D] mt-1">Returns Processed</span>
            <span className="text-[10px] text-slate-500">Today</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <RefreshCw className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">3</span>
            <span className="font-bold text-[12px] text-[#0B1B3D] mt-1">Renewals</span>
            <span className="text-[10px] text-slate-500">Today</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UserPlus className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">5</span>
            <span className="font-bold text-[12px] text-[#0B1B3D] mt-1">New Members</span>
            <span className="text-[10px] text-slate-500">Today</span>
          </div>
        </div>
        
        {/* Card 5 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="h-12 w-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">2</span>
            <span className="font-bold text-[12px] text-[#0B1B3D] mt-1">Overdue Items</span>
            <span className="text-[10px] text-slate-500">Today</span>
          </div>
        </div>
      </div>

      {/* QUICK ISSUE CARD */}
      <div className="bg-[#0B1B3D] rounded-2xl p-6 text-white shadow-lg flex flex-col gap-5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="flex justify-between items-end relative z-10">
          <div>
            <h2 className="text-xl font-bold">Quick Issue</h2>
            <p className="text-[12px] text-slate-300">Scan member card first</p>
          </div>
          <h3 className="text-[13px] font-bold text-slate-200">Transaction Summary</h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative z-10">
          {/* Scan Member */}
          <div className="flex-1 border border-white/10 rounded-xl bg-white/5 p-5 flex flex-col items-center justify-center text-center">
            <div className="h-14 w-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-3">
              <Users className="h-6 w-6" />
            </div>
            <span className="font-bold text-[14px]">No member scanned</span>
            <span className="text-[12px] text-slate-400 mt-1 mb-5">Scan member QR card<br/>to begin transaction</span>
            
            <div className="flex gap-3 w-full max-w-[240px]">
              <Button variant="outline" className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10 text-[12px] h-9">Clear</Button>
              <Button className="flex-1 bg-[#F5A623] hover:bg-[#E8931A] text-[#0B1B3D] font-bold text-[12px] h-9 border-none">Use Member ID</Button>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-slate-400" />
            </div>
          </div>

          {/* Scan Item */}
          <div className="flex-1 border border-white/10 rounded-xl bg-white/5 p-5 flex flex-col items-center justify-center text-center">
            <div className="h-14 w-14 bg-white/10 text-white rounded-xl flex items-center justify-center mb-3">
              {/* Fake barcode icon */}
              <div className="flex gap-1 h-6">
                <div className="w-1 bg-white h-full"></div>
                <div className="w-0.5 bg-white h-full"></div>
                <div className="w-1 bg-white h-full"></div>
                <div className="w-0.5 bg-white h-full"></div>
                <div className="w-1.5 bg-white h-full"></div>
                <div className="w-0.5 bg-white h-full"></div>
                <div className="w-1 bg-white h-full"></div>
              </div>
            </div>
            <span className="font-bold text-[14px]">Scan item barcode</span>
            <span className="text-[12px] text-slate-400 mt-1">Scan book or item barcode<br/>to issue</span>
          </div>

          {/* Transaction Summary */}
          <div className="flex-1 flex flex-col justify-between ml-0 lg:ml-10 max-w-xs">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[12px] text-slate-400 font-medium">Member</span>
                <span className="text-[12px] font-bold">—</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[12px] text-slate-400 font-medium">Item</span>
                <span className="text-[12px] font-bold">—</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[12px] text-slate-400 font-medium">Due Date</span>
                <span className="text-[12px] font-bold">—</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[12px] text-slate-400 font-medium">Item Type</span>
                <span className="text-[12px] font-bold">—</span>
              </div>
            </div>
            
            <Button className="w-full bg-white/5 text-slate-500 font-bold h-10 border border-white/10" disabled>
              Issue Item
            </Button>
          </div>
        </div>
      </div>

      {/* 3 COLUMNS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COL 1 & 2 wrapper for proper alignment */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* RECENT TRANSACTIONS */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[520px]">
            {/* Tabs */}
            <div className="flex border-b border-slate-100 px-2 overflow-x-auto custom-scrollbar">
              <button className="px-4 py-4 text-[12px] font-bold text-[#0B1B3D] border-b-2 border-primary whitespace-nowrap">Recent Transactions</button>
              <button className="px-4 py-4 text-[12px] font-bold text-slate-400 hover:text-slate-600 whitespace-nowrap">Holds Queue (3)</button>
              <button className="px-4 py-4 text-[12px] font-bold text-slate-400 hover:text-slate-600 whitespace-nowrap">Reservations</button>
              <button className="px-4 py-4 text-[12px] font-bold text-slate-400 hover:text-slate-600 whitespace-nowrap">Issue Log</button>
            </div>

            <div className="p-5 flex flex-col gap-4 flex-1 overflow-y-auto custom-scrollbar">
              {/* Transaction 1 */}
              <div className="flex gap-3 items-start group">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[13px] text-[#0B1B3D]">Issued: Deep Work</span>
                  <span className="text-[11px] text-slate-500">To: Allan M. (STU-24011790)</span>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-medium text-slate-500">General Books</span>
                  <span className="text-[10px] font-bold text-slate-600">02:45 PM</span>
                  <span className="text-[9px] text-slate-400">20 Jun 2026</span>
                </div>
                <div className="ml-2 mt-1">
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">Issued</span>
                </div>
              </div>
              <hr className="border-slate-50" />

              {/* Transaction 2 */}
              <div className="flex gap-3 items-start group">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Archive className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[13px] text-[#0B1B3D]">Returned: Thinking, Fast and Slow</span>
                  <span className="text-[11px] text-slate-500">From: Kevin O. (STU-24011245)</span>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-medium text-slate-500">General Books</span>
                  <span className="text-[10px] font-bold text-slate-600">02:20 PM</span>
                  <span className="text-[9px] text-slate-400">20 Jun 2026</span>
                </div>
                <div className="ml-2 mt-1">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">Returned</span>
                </div>
              </div>
              <hr className="border-slate-50" />

              {/* Transaction 3 */}
              <div className="flex gap-3 items-start group">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[13px] text-[#0B1B3D]">Issued: Data Structures Using Python</span>
                  <span className="text-[11px] text-slate-500">To: Brian M. (STU-24011823)</span>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-medium text-slate-500">Reference</span>
                  <span className="text-[10px] font-bold text-slate-600">01:30 PM</span>
                  <span className="text-[9px] text-slate-400">20 Jun 2026</span>
                </div>
                <div className="ml-2 mt-1">
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">Issued</span>
                </div>
              </div>
              <hr className="border-slate-50" />

              {/* Transaction 4 */}
              <div className="flex gap-3 items-start group">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <RefreshCw className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[13px] text-[#0B1B3D]">Renewed: Atomic Habits</span>
                  <span className="text-[11px] text-slate-500">By: Emmanuel G. (STU-24010876)</span>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-medium text-slate-500">General Books</span>
                  <span className="text-[10px] font-bold text-slate-600">01:15 PM</span>
                  <span className="text-[9px] text-slate-400">20 Jun 2026</span>
                </div>
                <div className="ml-2 mt-1">
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full">Renewed</span>
                </div>
              </div>
              <hr className="border-slate-50" />

              {/* Transaction 5 */}
              <div className="flex gap-3 items-start group">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Archive className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[13px] text-[#0B1B3D]">Returned: The Pragmatic Programmer</span>
                  <span className="text-[11px] text-slate-500">From: Brian M. (STU-24011522)</span>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-medium text-slate-500">General Books</span>
                  <span className="text-[10px] font-bold text-slate-600">12:55 PM</span>
                  <span className="text-[9px] text-slate-400">20 Jun 2026</span>
                </div>
                <div className="ml-2 mt-1">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">Returned</span>
                </div>
              </div>

            </div>

            <div className="p-3 border-t border-slate-50 text-center mt-auto">
              <Link href="#" className="text-[12px] font-bold text-blue-600 hover:underline">View all transactions &rarr;</Link>
            </div>
          </div>

          {/* HOLDS QUEUE */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[520px]">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-[15px] text-[#0B1B3D]">Holds Queue (3)</h3>
              <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">View all</Link>
            </div>

            <div className="p-5 flex flex-col gap-6 flex-1 overflow-y-auto custom-scrollbar">
              
              {/* Hold 1 */}
              <div className="flex gap-4">
                <div className="h-20 w-14 bg-slate-900 rounded shadow-sm flex-shrink-0 flex items-center justify-center border border-slate-200 relative overflow-hidden">
                   <div className="text-[6px] text-white/50 px-1 text-center font-serif leading-tight">DEEP<br/>WORK</div>
                   <div className="absolute inset-0 bg-red-600/20"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[14px] text-[#0B1B3D]">Deep Work</span>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">Ready</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mb-1.5">Cal Newport</span>
                  <span className="text-[10px] text-slate-600">Requested by: <strong className="text-[#0B1B3D]">Allan M. (STU-24011790)</strong></span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Position: 1 of 2</span>
                </div>
              </div>

              {/* Hold 2 */}
              <div className="flex gap-4">
                <div className="h-20 w-14 bg-slate-800 rounded shadow-sm flex-shrink-0 flex items-center justify-center border border-slate-200 relative overflow-hidden">
                   <div className="text-[6px] text-white/50 px-1 text-center font-serif leading-tight">CLEAN<br/>CODE</div>
                   <div className="absolute inset-0 bg-blue-600/20"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[14px] text-[#0B1B3D]">Clean Code</span>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">Ready</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mb-1.5">Robert C. Martin</span>
                  <span className="text-[10px] text-slate-600">Requested by: <strong className="text-[#0B1B3D]">George K. (STU-24011902)</strong></span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Position: 1 of 1</span>
                </div>
              </div>

              {/* Hold 3 */}
              <div className="flex gap-4">
                <div className="h-20 w-14 bg-[#fdfaf5] rounded shadow-sm flex-shrink-0 flex items-center justify-center border border-slate-200 relative overflow-hidden">
                   <div className="text-[6px] text-amber-900 px-1 text-center font-serif leading-tight">SAPIENS</div>
                   <div className="absolute inset-0 bg-amber-600/10"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[14px] text-[#0B1B3D] leading-tight pr-2">Sapiens: A Brief History of Humankind</span>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100">Waiting</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mb-1.5 mt-1">Yuval Noah Harari</span>
                  <span className="text-[10px] text-slate-600">Requested by: <strong className="text-[#0B1B3D]">David M. (STU-24012011)</strong></span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Position: 2 of 3</span>
                </div>
              </div>

            </div>

            <div className="p-3 border-t border-slate-50 text-center mt-auto">
              <Link href="#" className="text-[12px] font-bold text-blue-600 hover:underline">Manage holds &rarr;</Link>
            </div>
          </div>

          {/* Bottom row in left wrapper */}
          {/* LIBRARY NOTICES */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-[15px] font-bold text-[#0B1B3D] mb-5 flex items-center gap-2">
              <FileText className="h-4 w-4" /> Library Notices
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <div className="mt-1 h-7 w-7 bg-blue-50 text-blue-500 rounded flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">AI Literacy Week Begins</span>
                    <span className="text-[10px] text-slate-400">2d ago</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5">Workshops start this week! Check the events section.</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="mt-1 h-7 w-7 bg-amber-50 text-amber-500 rounded flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">New E-Resources Added</span>
                    <span className="text-[10px] text-slate-400">3d ago</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5">Springer & IEEE now available! Explore the digital library.</span>
                </div>
              </div>
            </div>
          </div>

          {/* UPCOMING EVENTS */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[15px] font-bold text-[#0B1B3D]">Upcoming Events</h3>
              <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">View calendar</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between group">
                <div className="flex gap-3 items-center">
                  <div className="flex flex-col items-center justify-center text-red-500 w-8 h-10 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider leading-none">Jun</span>
                    <span className="text-[16px] font-extrabold leading-none mt-0.5">24</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">AI in Education Workshop</span>
                    <span className="text-[10px] text-slate-500">3:00 PM - 4:30 PM &bull; AVR</span>
                  </div>
                </div>
                <Button variant="outline" className="h-7 px-3 text-[10px] font-bold rounded-lg border-slate-200">Register</Button>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex gap-3 items-center">
                  <div className="flex flex-col items-center justify-center text-red-500 w-8 h-10 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider leading-none">Jun</span>
                    <span className="text-[16px] font-extrabold leading-none mt-0.5">27</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Debate Club: Library Edition</span>
                    <span className="text-[10px] text-slate-500">4:00 PM - 5:00 PM &bull; Reading Hall</span>
                  </div>
                </div>
                <Button variant="outline" className="h-7 px-3 text-[10px] font-bold rounded-lg border-slate-200 text-blue-600 border-blue-200 bg-blue-50">Join</Button>
              </div>
            </div>
          </div>
          
        </div>

        {/* COL 3: Rightmost Column */}
        <div className="flex flex-col gap-6">
          
          {/* TODAY'S RETURNS */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-[15px] text-[#0B1B3D]">Today's Returns</h3>
              <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">View all <RotateCw className="h-3 w-3" /></Link>
            </div>
            
            <div className="flex flex-col gap-5">
              {/* Return 1 */}
              <div className="flex gap-3 relative">
                <div className="h-14 w-10 bg-[#fdfaf5] rounded shadow-sm border border-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                   <div className="text-[4px] text-slate-900 px-1 text-center font-serif leading-tight">THINKING,<br/>FAST AND SLOW</div>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">Thinking, Fast and Slow</span>
                  <span className="text-[10px] text-slate-500">Daniel Kahneman</span>
                  <span className="text-[9px] text-slate-400 mt-1">Due: 20 Jun 2026, 12:00 PM</span>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">Returned</span>
                  <span className="text-[9px] font-bold text-slate-500 mt-1">02:20 PM</span>
                </div>
              </div>

              {/* Return 2 */}
              <div className="flex gap-3 relative">
                <div className="h-14 w-10 bg-slate-900 rounded shadow-sm border border-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                   <div className="text-[5px] text-white/50 px-1 text-center font-serif leading-tight">CLEAN<br/>ARCHITECTURE</div>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">Clean Architecture</span>
                  <span className="text-[10px] text-slate-500">Robert C. Martin</span>
                  <span className="text-[9px] text-slate-400 mt-1">Due: 20 Jun 2026, 11:30 AM</span>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">Returned</span>
                  <span className="text-[9px] font-bold text-slate-500 mt-1">01:40 PM</span>
                </div>
              </div>

              {/* Return 3 */}
              <div className="flex gap-3 relative">
                <div className="h-14 w-10 bg-orange-600 rounded shadow-sm border border-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                   <div className="text-[5px] text-white px-1 text-center font-serif leading-tight">THE 5 AM<br/>CLUB</div>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">The 5 AM Club</span>
                  <span className="text-[10px] text-slate-500">Robin Sharma</span>
                  <span className="text-[9px] text-slate-400 mt-1">Due: 20 Jun 2026, 10:00 AM</span>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">Returned</span>
                  <span className="text-[9px] font-bold text-slate-500 mt-1">11:10 AM</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">View all returns &rarr;</Link>
            </div>
          </div>

          {/* OVERDUE ALERTS */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-[15px] text-[#0B1B3D]">Overdue Alerts</h3>
              <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">View all <RotateCw className="h-3 w-3" /></Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="h-14 w-10 bg-blue-600 rounded shadow-sm border border-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                   <div className="text-[4px] text-white text-center font-serif leading-tight">THE LEAN<br/>STARTUP</div>
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">The Lean Startup</span>
                    <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">4 days overdue</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5">Eric Ries</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[9px] text-slate-400">Due: 16 Jun 2026</span>
                    <span className="text-[9px] font-mono text-slate-500">STU-24011076</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-14 w-10 bg-amber-100 rounded shadow-sm border border-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                   <div className="text-[5px] text-amber-900 px-1 text-center font-serif leading-tight">EDUCATED</div>
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">Educated</span>
                    <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">2 days overdue</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5">Tara Westover</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[9px] text-slate-400">Due: 18 Jun 2026</span>
                    <span className="text-[9px] font-mono text-slate-500">STU-24011102</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">View all overdues &rarr;</Link>
            </div>
          </div>

          {/* INVENTORY SNAPSHOT */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-[15px] text-[#0B1B3D] mb-4">Inventory Snapshot</h3>
            
            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="flex flex-col gap-1 items-center bg-slate-50 p-2 rounded-lg">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                  <span className="text-[9px] font-bold">Total Items</span>
                </div>
                <span className="font-extrabold text-[15px] text-[#0B1B3D]">8,462</span>
              </div>
              <div className="flex flex-col gap-1 items-center bg-emerald-50/50 p-2 rounded-lg border border-emerald-50">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[9px] font-bold">Available</span>
                </div>
                <span className="font-extrabold text-[15px] text-[#0B1B3D]">5,213</span>
              </div>
              <div className="flex flex-col gap-1 items-center bg-amber-50/50 p-2 rounded-lg border border-amber-50">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MonitorPlay className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-[9px] font-bold">On Loan</span>
                </div>
                <span className="font-extrabold text-[15px] text-[#0B1B3D]">3,249</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-blue-600">61% Available</span>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
                <div className="bg-blue-600 h-full" style={{ width: '61%' }}></div>
                <div className="bg-amber-400 h-full" style={{ width: '39%' }}></div>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS GRID */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-[15px] text-[#0B1B3D] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-3">
              
              <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 bg-slate-50 hover:bg-blue-50 rounded-xl cursor-pointer transition border border-transparent hover:border-blue-100 group">
                <UserPlus className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">New<br/>Member</span>
              </div>
              
              <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer transition border border-transparent hover:border-slate-200 group">
                <ScanLine className="h-5 w-5 text-slate-600 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Scan<br/>Item</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 bg-slate-50 hover:bg-emerald-50 rounded-xl cursor-pointer transition border border-transparent hover:border-emerald-100 group">
                <BookOpen className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Issue<br/>Item</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 bg-slate-50 hover:bg-amber-50 rounded-xl cursor-pointer transition border border-transparent hover:border-amber-100 group">
                <Archive className="h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Return<br/>Item</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 bg-slate-50 hover:bg-purple-50 rounded-xl cursor-pointer transition border border-transparent hover:border-purple-100 group">
                <RefreshCw className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Renew<br/>Item</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 bg-slate-50 hover:bg-red-50 rounded-xl cursor-pointer transition border border-transparent hover:border-red-100 group">
                <AlertTriangle className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Lost<br/>Item</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 bg-slate-50 hover:bg-indigo-50 rounded-xl cursor-pointer transition border border-transparent hover:border-indigo-100 group">
                <Bookmark className="h-5 w-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Reserve<br/>Book</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer transition border border-transparent hover:border-slate-200 group">
                <Printer className="h-5 w-5 text-slate-600 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Print<br/>QR Card</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 bg-slate-50 hover:bg-emerald-50 rounded-xl cursor-pointer transition border border-transparent hover:border-emerald-100 group">
                <Check className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Check<br/>In/Out</span>
              </div>
            </div>
          </div>
          
        </div>

      </div>

    </div>
  )
}
