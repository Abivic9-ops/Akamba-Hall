import Link from 'next/link'
import Image from 'next/image'
import { 
  Search, Bell, MessageSquare, Moon, CheckSquare, 
  Activity, PieChart, Calendar, QrCode, AlertTriangle, 
  Archive, BarChart2, Users, User, Megaphone, 
  FileText, Settings, HelpCircle, LifeBuoy, LogOut,
  ChevronRight, Home, Zap, ChevronDown
} from 'lucide-react'

export default function GovernanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-[260px] bg-[#0B1B3D] flex flex-col h-screen sticky top-0 text-white overflow-y-auto custom-scrollbar shadow-xl z-20">
        
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="relative h-12 w-10 shrink-0">
            <Image src="/images/starehe-logo.png" alt="Starehe Logo" fill className="object-contain drop-shadow-md" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-white text-[15px] leading-tight">Starehe Student</span>
            <span className="text-white/80 text-[11px] font-medium leading-none mt-0.5">Akamba Hall Library</span>
            <span className="text-blue-400 text-[10px] font-bold leading-none mt-1 uppercase tracking-wider">Governance Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 py-2 flex flex-col gap-1 flex-1">
          
          <Link href="/head-dashboard" className="flex items-center gap-3 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-[13px] transition shadow-md shadow-blue-900/50 mb-2">
            <Home className="h-4 w-4" /> Overview
          </Link>

          <Link href="/approvals" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <CheckSquare className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> Approvals
            </div>
            <span className="bg-[#F5A623] text-[#0B1B3D] text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">12</span>
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> Circulation Overview
            </div>
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <PieChart className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> Collection Health
            </div>
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> Bookings
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/40" />
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <QrCode className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> QR Management
            </div>
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> Incidents
            </div>
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <Archive className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> Inventory
            </div>
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <BarChart2 className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> Reports & Analytics
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/40" />
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> Staff Management
            </div>
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> Members
            </div>
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <Megaphone className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> CMS / Announcements
            </div>
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> Audit Logs
            </div>
          </Link>

          <Link href="/head-dashboard" className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition group">
            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4 group-hover:text-blue-400 transition-colors" /> Settings
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/40" />
          </Link>
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 mt-auto border-t border-white/5 flex flex-col gap-1">
          <Link href="/head-dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition">
            <HelpCircle className="h-4 w-4" /> Help Center
          </Link>
          <Link href="/head-dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition">
            <LifeBuoy className="h-4 w-4" /> Support
          </Link>
          <Link href="/login" className="flex items-center gap-3 px-4 py-2 text-[13px] font-bold text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition mt-2">
            <LogOut className="h-4 w-4" /> Log Out
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search books, members, reports, QR cards..." 
              className="w-full h-10 pl-10 pr-12 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="bg-white border border-slate-200 rounded text-slate-400 font-bold px-1.5 text-[10px] shadow-sm">⌘</kbd>
              <kbd className="bg-white border border-slate-200 rounded text-slate-400 font-bold px-1.5 text-[10px] shadow-sm">K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition text-[13px] font-bold text-slate-700">
              <Zap className="h-4 w-4 text-blue-600" fill="currentColor" /> Quick Actions <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
            
            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer group">
                <Bell className="h-5 w-5 text-slate-500 group-hover:text-[#0B1B3D] transition" />
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 border-2 border-white text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">8</span>
              </div>
              <div className="relative cursor-pointer group">
                <MessageSquare className="h-5 w-5 text-slate-500 group-hover:text-[#0B1B3D] transition" />
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 border-2 border-white text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">3</span>
              </div>
              <div className="cursor-pointer group">
                <Moon className="h-5 w-5 text-slate-500 group-hover:text-[#0B1B3D] transition" />
              </div>
            </div>

            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden relative border-2 border-transparent group-hover:border-blue-500 transition-all">
                <Image src="https://i.pravatar.cc/150?u=memo" alt="Mr. Memo" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#0B1B3D] leading-tight">Mr. Memo</span>
                <span className="text-[11px] text-slate-500 leading-tight">Library Head</span>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </div>
      </main>
    </div>
  )
}
