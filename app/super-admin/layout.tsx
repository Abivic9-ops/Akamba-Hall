import Link from 'next/link'
import Image from 'next/image'
import { 
  Home, Users, Shield, Tag, Building2, Megaphone, 
  Library, Archive, Repeat, Calendar, Monitor, Newspaper,
  Settings, FileCheck, ToggleLeft, Link as LinkIcon, Bot,
  Database, Activity, FileText, HeartPulse, LogOut,
  Search, Moon, Bell, MessageSquare, Menu
} from 'lucide-react'

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-[260px] bg-[#0B1B3D] flex flex-col h-screen sticky top-0 text-white overflow-y-auto custom-scrollbar shadow-xl z-20">
        
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="relative h-10 w-8 shrink-0">
            <Image src="/images/starehe-logo.png" alt="Starehe Logo" fill className="object-contain drop-shadow-md" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-white text-[15px] leading-tight">Starehe Library System</span>
            <span className="text-white/80 text-[11px] font-medium leading-none mt-0.5">Akamba Hall Library</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 py-2 flex flex-col flex-1 pb-10">
          
          <div className="mb-4">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 px-4 block">SUPER ADMIN</span>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-[13px] transition shadow-md shadow-blue-900/50">
              <Home className="h-4 w-4" /> Dashboard
            </Link>
          </div>

          <div className="mb-4">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 px-4 block">SYSTEM MANAGEMENT</span>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Users className="h-4 w-4" /> Users & Roles
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Shield className="h-4 w-4" /> Role Permissions
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Tag className="h-4 w-4" /> Member Categories
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Building2 className="h-4 w-4" /> Departments & Houses
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Megaphone className="h-4 w-4" /> System Announcements
            </Link>
          </div>

          <div className="mb-4">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 px-4 block">LIBRARY MANAGEMENT</span>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Library className="h-4 w-4" /> Catalog Management
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Archive className="h-4 w-4" /> Inventory & Stock
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Repeat className="h-4 w-4" /> Loans & Transactions
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Calendar className="h-4 w-4" /> Reservations & Bookings
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Monitor className="h-4 w-4" /> Equipment Management
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Newspaper className="h-4 w-4" /> Newspapers / Periodicals
            </Link>
          </div>

          <div className="mb-4">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 px-4 block">SYSTEM CONFIGURATION</span>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Settings className="h-4 w-4" /> Settings & Preferences
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <FileCheck className="h-4 w-4" /> Policies & Rules
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <ToggleLeft className="h-4 w-4" /> Feature Flags
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <LinkIcon className="h-4 w-4" /> Integrations
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Bot className="h-4 w-4" /> Automation & Jobs
            </Link>
          </div>

          <div className="mb-2">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 px-4 block">MAINTENANCE</span>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Database className="h-4 w-4" /> Database & Backups
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <Activity className="h-4 w-4" /> Logs & Monitoring
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <FileText className="h-4 w-4" /> Audit Trails
            </Link>
            <Link href="/super-admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition">
              <HeartPulse className="h-4 w-4" /> System Health
            </Link>
          </div>
          
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 mt-auto border-t border-white/5">
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition border border-red-400/20">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 shadow-sm">
          
          <div className="flex items-center gap-3 lg:hidden">
            <button className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition">
              <Menu className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 max-w-2xl relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users, books, transactions, or settings..." 
              className="w-full h-10 pl-10 pr-12 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="bg-white border border-slate-200 rounded text-slate-400 font-bold px-1.5 py-0.5 text-[10px] shadow-sm">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center justify-end gap-5 flex-1">
            
            <div className="flex items-center gap-4">
              <div className="cursor-pointer group">
                <Moon className="h-5 w-5 text-slate-500 group-hover:text-[#0B1B3D] transition" />
              </div>
              <div className="relative cursor-pointer group">
                <Bell className="h-5 w-5 text-slate-500 group-hover:text-[#0B1B3D] transition" />
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 border-2 border-white text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">12</span>
              </div>
              <div className="relative cursor-pointer group">
                <MessageSquare className="h-5 w-5 text-slate-500 group-hover:text-[#0B1B3D] transition" />
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden relative border border-slate-200 group-hover:border-blue-500 transition-all">
                <Image src="https://i.pravatar.cc/150?u=superadmin" alt="Super Admin" fill className="object-cover" />
              </div>
              <div className="flex flex-col hidden sm:flex">
                <span className="text-[13px] font-bold text-[#0B1B3D] leading-tight">Super Admin</span>
                <span className="text-[11px] text-slate-500 leading-tight">System Owner</span>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          {children}
          
          <footer className="py-6 text-center text-[11px] text-slate-400 border-t border-slate-100 flex flex-col sm:flex-row justify-between px-8">
            <span>&copy; 2026 Starehe Boys' Centre - Akamba Hall Library. All rights reserved.</span>
            <div className="flex gap-4 mt-2 sm:mt-0">
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
