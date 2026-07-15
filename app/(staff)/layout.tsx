import Link from 'next/link'
import Image from 'next/image'
import { 
  Menu, Search, Bell, MessageSquare, LayoutDashboard, 
  BookOpen, Bookmark, Clock, Book, Bot, FileText, 
  Newspaper, Armchair, MonitorPlay, Users, Calendar, 
  Trophy, HelpCircle, MessageCircle, LogOut, Award, Target,
  FileSearch, PenTool, Lightbulb, UserCheck
} from 'lucide-react'

export default function StaffLayout({ children }: { children: React.ReactNode }) {
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
              <span className="font-extrabold text-[#0B1B3D] text-[15px] leading-tight">Starehe Staff Portal</span>
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
              placeholder="Search books, journals, resources, members..." 
              className="w-full bg-slate-100/80 border-transparent rounded-full h-10 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition"
            />
            <div className="absolute right-3 top-2.5 flex items-center gap-1">
              <kbd className="bg-white border border-slate-200 rounded px-1.5 text-[10px] font-bold text-slate-400">⌘</kbd>
              <kbd className="bg-white border border-slate-200 rounded px-1.5 text-[10px] font-bold text-slate-400">K</kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 w-1/4">
          <div className="relative cursor-pointer">
            <Bell className="h-5 w-5 text-slate-600 hover:text-primary transition" />
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">5</span>
          </div>
          <div className="cursor-pointer">
            <MessageSquare className="h-5 w-5 text-slate-600 hover:text-primary transition" />
          </div>
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-[13px] font-bold text-[#0B1B3D]">Mr. James Mwangi</span>
              <span className="text-[11px] text-slate-500">Senior Physics Teacher</span>
            </div>
            <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden relative border border-slate-200">
              <Image src="https://i.pravatar.cc/150?u=a042581f4e29026704e" alt="Mr. James Mwangi" fill className="object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-[260px] bg-white border-r border-slate-200 hidden lg:flex flex-col h-[calc(100vh-64px)] sticky top-16 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="p-4 flex flex-col gap-6">
            
            <Link href="/staff-dashboard" className="flex items-center gap-3 bg-[#0B1B3D] text-white px-4 py-3 rounded-xl font-semibold text-sm shadow-md shadow-primary/10 transition-transform hover:scale-[1.02]">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">My Library</span>
              <Link href="/staff-dashboard" className="flex items-center justify-between px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <div className="flex items-center gap-3"><BookOpen className="h-4 w-4" /> My Loans</div>
                <span className="h-5 w-5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center">2</span>
              </Link>
              <Link href="/staff-dashboard" className="flex items-center justify-between px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <div className="flex items-center gap-3"><Target className="h-4 w-4" /> Holds & Reservations</div>
                <span className="h-5 w-5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center">1</span>
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <Bookmark className="h-4 w-4" /> My Bookmarks
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <Clock className="h-4 w-4" /> History & Fines
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Discover & Learn</span>
              <Link href="/search" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <Search className="h-4 w-4" /> Catalogue Search
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <FileText className="h-4 w-4" /> E-Resources
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <Book className="h-4 w-4" /> Courses & Materials
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <Newspaper className="h-4 w-4" /> Newspaper Archive
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Spaces & Bookings</span>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <Armchair className="h-4 w-4" /> Reading Seats
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <MonitorPlay className="h-4 w-4" /> AVR Booking
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <Users className="h-4 w-4" /> Boardroom Booking
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <PenTool className="h-4 w-4" /> Equipment Booking
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Requests & Support</span>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <Lightbulb className="h-4 w-4" /> Book Suggestions
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <HelpCircle className="h-4 w-4" /> Ask a Librarian
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <MessageCircle className="h-4 w-4" /> Feedback & Requests
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Community</span>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <Calendar className="h-4 w-4" /> Events & Workshops
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <Users className="h-4 w-4" /> Study Groups
              </Link>
              <Link href="/staff-dashboard" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50 rounded-lg transition">
                <FileText className="h-4 w-4" /> Library News
              </Link>
            </div>

            <div className="border-t border-slate-100 pt-4 mt-2">
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50 rounded-lg transition group cursor-pointer">
                  <div className="flex items-center gap-3"><LogOut className="h-4 w-4" /> Sign Out</div>
                  <span className="text-red-300 group-hover:text-red-500 transition">&rsaquo;</span>
                </button>
              </form>
            </div>

            {/* Membership Card */}
            <div className="bg-[#0B1B3D] rounded-xl p-5 text-white shadow-lg mt-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-l-full blur-2xl"></div>
              <Award className="absolute right-4 top-4 h-12 w-12 text-white/5" />
              
              <h4 className="text-[13px] font-bold mb-4 relative z-10">Akamba Hall<br/>Staff Membership</h4>
              
              <div className="flex flex-col gap-1 mb-4 relative z-10">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Level</span>
                <span className="text-[13px] font-bold text-amber-400">Silver Scholar</span>
              </div>
              
              <div className="flex flex-col gap-2 relative z-10">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Points</span>
                    <span className="text-lg font-bold">2,450</span>
                  </div>
                  <Trophy className="h-4 w-4 text-slate-400 mb-1" />
                </div>
                
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '81%' }}></div>
                </div>
                <span className="text-[10px] text-slate-400">Next Level: Gold (3,000 pts)</span>
              </div>

              <button className="w-full mt-5 py-2 px-3 bg-white/10 hover:bg-white/20 transition rounded-lg text-[11px] font-bold flex items-center justify-between group relative z-10">
                View Achievements
                <span className="text-white/50 group-hover:text-white transition">&rsaquo;</span>
              </button>
            </div>

          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 bg-[#F8FAFC] h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </main>
        
      </div>
    </div>
  )
}
