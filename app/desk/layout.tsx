import Link from 'next/link'
import Image from 'next/image'
import { 
  Menu, Search, Bell, MessageSquare, LayoutDashboard, 
  BookOpen, Bookmark, Clock, Book, Bot, FileText, 
  Newspaper, Armchair, MonitorPlay, Users, Calendar, 
  Trophy, HelpCircle, MessageCircle, LogOut, Award, Target,
  FileSearch, PenTool, Lightbulb, UserCheck, Moon, RefreshCw, 
  Archive, Briefcase, CreditCard, UserPlus, CalendarCheck, BarChart, AlertTriangle, List, Home, FolderOpen, Database, ChevronRight
} from 'lucide-react'

export default function OperationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 w-1/4">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-8 shrink-0">
              <Image src="/images/starehe-logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[#0B1B3D] text-[15px] leading-tight">Starehe Library Portal</span>
              <span className="text-[#0B1B3D] text-[11px] font-medium leading-none">Akamba Hall Library</span>
            </div>
          </div>
          <button className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 ml-4 transition hidden lg:flex">
            <Menu className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 max-w-2xl px-4 hidden md:block">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search member by name, ID or scan QR / barcode..." 
              className="w-full bg-slate-100/80 border-transparent rounded-full h-10 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition"
            />
            <div className="absolute right-3 top-2.5 flex items-center gap-1">
              <kbd className="bg-white border border-slate-200 rounded px-1.5 text-[10px] font-bold text-slate-400">⌘</kbd>
              <kbd className="bg-white border border-slate-200 rounded px-1.5 text-[10px] font-bold text-slate-400">K</kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 w-1/4">
          <div className="cursor-pointer">
            <Moon className="h-5 w-5 text-slate-600 hover:text-primary transition" />
          </div>
          <div className="relative cursor-pointer">
            <Bell className="h-5 w-5 text-slate-600 hover:text-primary transition" />
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">5</span>
          </div>
          <div className="cursor-pointer">
            <MessageSquare className="h-5 w-5 text-slate-600 hover:text-primary transition" />
          </div>
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden relative border border-slate-200">
              <Image src="https://i.pravatar.cc/150?u=mary" alt="Mary Wanjiku" fill className="object-cover" />
            </div>
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-[13px] font-bold text-[#0B1B3D]">Mary Wanjiku</span>
              <span className="text-[11px] text-slate-500">Library Assistant</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-[260px] bg-[#0B1B3D] border-r border-slate-200 hidden lg:flex flex-col h-[calc(100vh-64px)] sticky top-16 overflow-y-auto overflow-x-hidden custom-scrollbar text-white">
          <div className="p-4 flex flex-col gap-6">
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2 px-2">MAIN</span>
              <Link href="/desk/dashboard" className="flex items-center justify-between px-3 py-2.5 text-[13px] font-medium text-[#F5A623] bg-white/10 rounded-lg transition relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#F5A623] rounded-r-md"></div>
                <div className="flex items-center gap-3"><Home className="h-4 w-4" /> Circulation Desk</div>
                <span className="text-white/40"><ChevronRight className="h-4 w-4" /></span>
              </Link>
              <Link href="/desk/dashboard" className="flex items-center justify-between px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <div className="flex items-center gap-3"><Archive className="h-4 w-4" /> Returns</div>
              </Link>
              <Link href="/desk/dashboard" className="flex items-center justify-between px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <div className="flex items-center gap-3"><RefreshCw className="h-4 w-4" /> Renew Items</div>
              </Link>
              <Link href="/reservations" className="flex items-center justify-between px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <div className="flex items-center gap-3"><Clock className="h-4 w-4" /> Holds Queue</div>
                <span className="h-5 w-5 rounded-full bg-[#F5A623] text-[#0B1B3D] text-[10px] font-bold flex items-center justify-center">3</span>
              </Link>
              <Link href="/desk/dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <FileText className="h-4 w-4" /> Issue Log
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2 px-2">RESOURCES</span>
              <Link href="/catalogue" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <Search className="h-4 w-4" /> Catalogue Search
              </Link>
              <Link href="/catalogue" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <Database className="h-4 w-4" /> Item Management
              </Link>
              <Link href="/catalogue" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <List className="h-4 w-4" /> Inventory & Stocktake
              </Link>
              <Link href="/desk/dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <FolderOpen className="h-4 w-4" /> Lost & Found
              </Link>
              <Link href="/catalogue" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <Newspaper className="h-4 w-4" /> Newspapers / Periodicals
              </Link>
              <Link href="/desk/dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <MonitorPlay className="h-4 w-4" /> Equipment Lending
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2 px-2">MEMBERS</span>
              <Link href="/members" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <UserCheck className="h-4 w-4" /> Member Lookup
              </Link>
              <Link href="/members" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <UserPlus className="h-4 w-4" /> New Member
              </Link>
              <Link href="/members" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <Users className="h-4 w-4" /> Member Management
              </Link>
              <Link href="/members" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <CreditCard className="h-4 w-4" /> Card Management
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2 px-2">SERVICES</span>
              <Link href="/desk/dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <Briefcase className="h-4 w-4" /> Room Bookings
              </Link>
              <Link href="/desk/dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <CalendarCheck className="h-4 w-4" /> Event Attendance
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2 px-2">REPORTS</span>
              <Link href="/desk/dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <BarChart className="h-4 w-4" /> Daily Reports
              </Link>
              <Link href="/desk/dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <AlertTriangle className="h-4 w-4" /> Overdues Report
              </Link>
              <Link href="/desk/dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
                <FileSearch className="h-4 w-4" /> Audit Logs
              </Link>
            </div>
          </div>
          
          <div className="mt-auto p-4 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
              <span className="font-bold text-[13px] text-white">Today's Summary</span>
              <span className="text-[11px] text-white/50 mb-1">June 20, 2026</span>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl text-white">24</span>
                  <span className="text-[10px] text-white/70">Loans Issued</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl text-white">17</span>
                  <span className="text-[10px] text-white/70">Returns Processed</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl text-white">5</span>
                  <span className="text-[10px] text-white/70">New Members</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl text-white">2</span>
                  <span className="text-[10px] text-white/70">Overdue Items</span>
                </div>
              </div>
              
              <Link href="/desk/dashboard" className="mt-2 w-full py-2 bg-transparent border border-white/20 text-white rounded font-bold text-[11px] text-center hover:bg-white/10 transition">
                View Full Report
              </Link>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full overflow-y-auto bg-slate-50 relative">
          <div className="absolute inset-0 z-0 bg-[#F8FAFC]"></div>
          <div className="relative z-10 w-full min-h-full">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  )
}
