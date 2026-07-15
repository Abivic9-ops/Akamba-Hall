import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, Calendar, Armchair, TrendingUp, ChevronRight, 
  ChevronLeft, QrCode, Download, Search, MonitorPlay, Users,
  MessageCircle, Star, AlertTriangle, ArrowRight, Bell, PenTool, Lightbulb, Bookmark,
  HelpCircle, FileText
} from 'lucide-react'

export default function StaffDashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B1B3D] tracking-tight">Good afternoon, Mr. Mwangi 👋</h1>
          <p className="text-slate-500 mt-1">Welcome back to <span className="font-bold text-[#0B1B3D]">Akamba Hall Library</span></p>
        </div>
        <div className="bg-white px-5 py-3 rounded-xl border border-slate-200/60 shadow-sm italic text-slate-500 text-sm border-l-4 border-l-primary max-w-sm">
          "A good teacher inspires hope, ignites the imagination, and instills a love of learning." — <span className="text-primary font-semibold not-italic">Brad Henry</span>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-3xl font-extrabold text-[#0B1B3D]">2</span>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-[13px] text-[#0B1B3D]">Active Loans</span>
              <span className="text-[11px] text-blue-600 font-medium flex items-center mt-1 cursor-pointer hover:underline">
                Due this week <ArrowRight className="h-3 w-3 ml-1" />
              </span>
            </div>
            <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="text-3xl font-extrabold text-[#0B1B3D]">1</span>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-[13px] text-[#0B1B3D]">Hold Ready</span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">Pickup by 20 Jun</span>
            </div>
            <div className="h-6 w-6 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <Armchair className="h-5 w-5" />
            </div>
            <span className="text-3xl font-extrabold text-[#0B1B3D]">3</span>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-[13px] text-[#0B1B3D]">Upcoming Bookings</span>
              <span className="text-[11px] text-emerald-600 font-medium mt-1">Next: Today, 2:00 PM</span>
            </div>
            <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Star className="h-5 w-5" />
            </div>
            <span className="text-3xl font-extrabold text-[#0B1B3D]">2,450</span>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-[13px] text-[#0B1B3D]">Library Points</span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">Silver Scholar</span>
            </div>
            <div className="h-6 w-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>
        
        {/* Card 5 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Bell className="h-5 w-5" />
            </div>
            <span className="text-3xl font-extrabold text-[#0B1B3D]">5</span>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-[13px] text-[#0B1B3D]">Unread Alerts</span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">Notifications</span>
            </div>
            <div className="h-6 w-6 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      {/* HERO BANNER */}
      <div className="relative w-full h-[240px] rounded-2xl overflow-hidden bg-[#0B1B3D] shadow-md group">
        <Image src="/images/hero-bg.png" alt="Teacher Library" fill className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3D] via-[#0B1B3D]/90 to-transparent" />
        
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center">
          <span className="text-primary font-bold text-[10px] tracking-widest uppercase mb-2">Faculty Resource Spotlight</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Enhance Your Teaching<br/>Inspire Your Students
          </h2>
          <p className="text-slate-300 text-sm mt-3 max-w-md">
            Explore curated academic resources, teaching kits and past papers.
          </p>
          <div className="flex gap-3 mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-6 rounded-lg text-[13px] border-none">
              Explore Resources
            </Button>
            <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/10 h-10 px-6 rounded-lg text-[13px] font-bold">
              View Past Papers
            </Button>
          </div>
        </div>

        {/* Carousel controls */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/20 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/40 opacity-0 group-hover:opacity-100 transition">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/20 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/40 opacity-0 group-hover:opacity-100 transition">
          <ChevronRight className="h-4 w-4" />
        </button>
        
        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
        </div>
      </div>

      {/* GRID SECTIONS */}
      
      {/* ROW 3: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COL 1: MY LOANS */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="p-5 flex justify-between items-center border-b border-slate-50">
            <div className="flex items-center gap-2 font-bold text-[#0B1B3D]">
              <BookOpen className="h-4 w-4 text-slate-400" /> My Loans
            </div>
            <Link href="/staff/dashboard" className="text-[12px] font-bold text-blue-600 hover:underline">View all</Link>
          </div>
          
          <div className="p-5 flex flex-col gap-5 flex-1">
            <div className="flex gap-4">
              <div className="h-16 w-12 bg-slate-900 rounded shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
                <div className="text-[6px] text-white/50 px-1 text-center font-serif leading-tight">Advanced<br/>Physics</div>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[13px] text-[#0B1B3D]">Advanced Physics</span>
                <span className="text-[11px] text-slate-500">David Halliday</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-red-500 font-medium">Due: 28 Jun 2026</span>
                  <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">3 days left</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-16 w-12 bg-blue-900 rounded shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
                <div className="text-[6px] text-white/50 px-1 text-center font-serif leading-tight">Calculus<br/>Transcendentals</div>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[13px] text-[#0B1B3D]">Calculus: Early Transcendentals</span>
                <span className="text-[11px] text-slate-500">James Stewart</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-slate-500">Due: 05 Jul 2026</span>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100">10 days left</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="h-16 w-12 bg-indigo-900 rounded shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
                <div className="text-[6px] text-white/50 px-1 text-center font-serif leading-tight">Data Science<br/>for Educators</div>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[13px] text-[#0B1B3D]">Data Science for Educators</span>
                <span className="text-[11px] text-slate-500">D. J. Patil</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-slate-500">Due: 18 Jul 2026</span>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">23 days left</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-slate-50 flex gap-2">
            <Button variant="outline" className="flex-1 h-9 text-[12px] font-bold text-slate-600 gap-2"><TrendingUp className="h-3 w-3" /> Renew All Eligible</Button>
            <Button variant="ghost" className="h-9 px-3 text-[12px] font-bold text-slate-600">Manage Loans <ChevronRight className="h-3 w-3 ml-1" /></Button>
          </div>
        </div>

        {/* COL 2: HOLDS READY */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="p-5 flex justify-between items-center border-b border-slate-50">
            <div className="flex items-center gap-2 font-bold text-[#0B1B3D]">
              Hold Ready for Pickup
            </div>
            <Link href="/staff/dashboard" className="text-[12px] font-bold text-blue-600 hover:underline">View all</Link>
          </div>
          
          <div className="p-5 flex flex-col gap-4 flex-1">
            <div className="flex gap-4">
              <div className="h-28 w-20 bg-white rounded shadow-sm flex-shrink-0 flex items-center justify-center border border-slate-200">
                <div className="text-[8px] font-bold text-[#0B1B3D] px-1 text-center leading-tight">Atomic<br/>Habits</div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-[15px] text-[#0B1B3D]">Atomic Habits</span>
                <span className="text-[12px] text-slate-500 mb-2">James Clear</span>
                <span className="text-[13px] font-bold text-emerald-600">Ready for Pickup</span>
                <span className="text-[11px] text-slate-500 mt-2 leading-snug">Collect at Circulation Desk<br/>by 20 Jun, 4:00 PM</span>
              </div>
            </div>
          </div>

          <div className="p-5 pt-0 flex flex-col gap-2">
            <Button className="w-full h-10 font-bold bg-blue-800 hover:bg-blue-900 text-white rounded-lg">Pick Up Now</Button>
            <Button variant="outline" className="w-full h-10 font-bold text-slate-600 rounded-lg">Cancel Hold</Button>
          </div>
        </div>

        {/* COL 3: MY DIGITAL ACCESS CARD */}
        <div className="bg-[#0B1B3D] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full flex flex-col">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
          
          <div className="flex justify-between items-center mb-5 relative z-10">
            <div className="flex items-center gap-2 font-bold text-[14px]">
              My Digital Access Card
            </div>
            <HelpCircle className="h-4 w-4 text-slate-400 cursor-pointer hover:text-white" />
          </div>
          
          <div className="bg-white p-3 rounded-xl mx-auto w-44 h-44 flex items-center justify-center mb-5 relative z-10 shadow-inner">
            {/* Dummy QR Code UI */}
            <div className="w-full h-full bg-slate-100 border border-slate-200 p-2 flex flex-wrap gap-1 items-center justify-center overflow-hidden opacity-80 relative">
              {Array.from({length: 49}).map((_, i) => (
                <div key={i} className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>
              ))}
              <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded flex items-center justify-center shadow">
                <div className="w-6 h-8 relative"><Image src="/images/starehe-logo.png" alt="Logo" fill className="object-contain" /></div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end relative z-10 mb-5 flex-1">
            <div className="flex flex-col">
              <span className="text-[18px] font-bold">James Mwangi</span>
              <span className="text-[12px] text-amber-400 font-mono mt-0.5">ID: SBC-STF-2206</span>
            </div>
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">Active</span>
          </div>

          <div className="flex gap-2 relative z-10 mt-auto">
            <Button className="flex-1 bg-transparent hover:bg-white/10 text-white font-bold h-9 text-[12px] border border-white/20">View Full Card</Button>
            <Button className="w-10 bg-transparent hover:bg-white/10 text-white font-bold h-9 p-0 border border-white/20"><Download className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      {/* ROW 4: 2/3 and 1/3 Span */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COL 1+2: TODAY'S SCHEDULE */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2 font-bold text-[#0B1B3D]">
              <Calendar className="h-4 w-4 text-slate-400" /> Today's Schedule & Bookings
            </div>
            <Link href="/staff/dashboard" className="text-[12px] font-bold text-blue-600 hover:underline">View Calendar</Link>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-100 group hover:border-slate-300 transition cursor-pointer">
              <div className="flex flex-col min-w-[70px]">
                <span className="font-bold text-[13px] text-[#0B1B3D]">2:00 PM</span>
                <span className="text-[10px] text-slate-400">- 3:30 PM</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <MonitorPlay className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[13px] text-[#0B1B3D]">AVR Session Booking</span>
                <span className="text-[11px] text-slate-500">Audio Visual Room &bull; Physics Department Meeting</span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100 uppercase tracking-wider hidden sm:block">Confirmed</span>
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
            </div>

            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-100 group hover:border-slate-300 transition cursor-pointer">
              <div className="flex flex-col min-w-[70px]">
                <span className="font-bold text-[13px] text-[#0B1B3D]">4:00 PM</span>
                <span className="text-[10px] text-slate-400">- 5:00 PM</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[13px] text-[#0B1B3D]">Boardroom Booking</span>
                <span className="text-[11px] text-slate-500">Boardroom &bull; Curriculum Review</span>
              </div>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 uppercase tracking-wider hidden sm:block">Upcoming</span>
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
            </div>
            
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-100 group hover:border-slate-300 transition cursor-pointer">
              <div className="flex flex-col min-w-[70px]">
                <span className="font-bold text-[13px] text-[#0B1B3D]">6:00 PM</span>
                <span className="text-[10px] text-slate-400">- 7:30 PM</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <Armchair className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[13px] text-[#0B1B3D]">Silent Reading Seat</span>
                <span className="text-[11px] text-slate-500">Level 2 &bull; Zone A &bull; Seat 08</span>
              </div>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 uppercase tracking-wider hidden sm:block">Upcoming</span>
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
            </div>
          </div>
        </div>

        {/* COL 3: QUICK ACTIONS */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-[15px] text-[#0B1B3D] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            
            <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Search className="h-4 w-4" /></div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Search<br/>Catalogue</span>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
              <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><BookOpen className="h-4 w-4" /></div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Reserve<br/>Book</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
              <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><MonitorPlay className="h-4 w-4" /></div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Book a<br/>Room</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
              <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center"><Armchair className="h-4 w-4" /></div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Reading<br/>Seat</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><PenTool className="h-4 w-4" /></div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Equipment</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
              <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><TrendingUp className="h-4 w-4" /></div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Renew<br/>Items</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
              <div className="h-10 w-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center"><Lightbulb className="h-4 w-4" /></div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Request<br/>Book</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
              <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><MessageCircle className="h-4 w-4" /></div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Ask a<br/>Librarian</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Bookmark className="h-4 w-4" /></div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">My<br/>Bookmarks</span>
            </div>
          </div>
        </div>

      </div>

      {/* ROW 5: 3 Equal Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COL 1: ALERTS & ANNOUNCEMENTS */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[15px] font-bold text-[#0B1B3D]">Library Alerts & Announcements</h3>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="mt-1 h-7 w-7 shrink-0 flex items-center justify-center text-red-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[12px] text-[#0B1B3D]">Library Closed on Public Holiday</span>
                  <span className="text-[9px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded ml-2">New</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">Thursday, 26th June 2026</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="mt-1 h-7 w-7 shrink-0 flex items-center justify-center text-blue-500">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[12px] text-[#0B1B3D]">IEEE eBook Collection Now Available</span>
                  <span className="text-[9px] text-slate-400 whitespace-nowrap ml-2">2d ago</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">Access thousands of engineering eBooks.</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="mt-1 h-7 w-7 shrink-0 flex items-center justify-center text-indigo-500">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[12px] text-[#0B1B3D]">Academic Integrity Workshop</span>
                  <span className="text-[9px] text-slate-400 whitespace-nowrap ml-2">3d ago</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">27th June 2026 &bull; 3:00 PM &bull; AVR</span>
              </div>
            </div>
          </div>
        </div>

        {/* COL 2: RECENT ACTIVITY */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[15px] font-bold text-[#0B1B3D]">Recent Activity</h3>
            <Link href="/staff/dashboard" className="text-[11px] font-bold text-blue-600 hover:underline">View all</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500">
                <TrendingUp className="h-3 w-3" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[12px] text-[#0B1B3D]">Renewed 'Advanced Physics'</span>
                <span className="text-[10px] text-slate-500">Today, 9:12 AM</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500">
                <MonitorPlay className="h-3 w-3" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[12px] text-[#0B1B3D]">Booked AVR for Physics Dept. Meeting</span>
                <span className="text-[10px] text-slate-500">Today, 8:45 AM</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
                <BookOpen className="h-3 w-3" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[12px] text-[#0B1B3D]">Picked up 'Atomic Habits' (Hold)</span>
                <span className="text-[10px] text-slate-500">Yesterday, 4:02 PM</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-500">
                <Lightbulb className="h-3 w-3" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-[12px] text-[#0B1B3D]">Submitted Book Suggestion</span>
                <span className="text-[10px] text-slate-500">Yesterday, 10:20 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* COL 3: OVERDUE SUMMARY */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[15px] font-bold text-[#0B1B3D]">Overdue Summary</h3>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center mb-4">
            <div className="relative h-32 w-32 rounded-full border-4 border-slate-100 flex flex-col items-center justify-center">
              {/* Fake arc representing progress */}
              <svg className="absolute inset-0 h-full w-full transform -rotate-90">
                <circle cx="60" cy="60" r="58" stroke="transparent" strokeWidth="4" fill="none" />
                <circle cx="60" cy="60" r="58" stroke="#ef4444" strokeWidth="4" fill="none" strokeDasharray="364" strokeDashoffset="240" />
              </svg>
              <span className="text-3xl font-extrabold text-[#0B1B3D]">2</span>
              <span className="text-[10px] text-slate-500">Items</span>
            </div>
            
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span className="text-[11px] text-slate-600">Overdue <strong className="text-[#0B1B3D] ml-1">2</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                <span className="text-[11px] text-slate-600">Due This Week <strong className="text-[#0B1B3D] ml-1">1</strong></span>
              </div>
            </div>
          </div>

          <Button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold h-10 text-[12px]">
            View All Loans
          </Button>
        </div>

      </div>

      {/* ROW 6: Recommended + Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* RECOMMENDED FOR YOU */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-[15px] text-[#0B1B3D]">Recommended For You</span>
            <Link href="/staff/dashboard" className="text-[12px] font-bold text-blue-600 hover:underline">See more</Link>
          </div>
          <p className="text-[11px] font-bold text-blue-600 mb-4">Based on your teaching & reading history</p>
          
          <div className="flex items-center gap-4 overflow-x-auto pb-2 custom-scrollbar">
            <div className="flex flex-col w-28 shrink-0 cursor-pointer group">
              <div className="h-36 w-full bg-slate-900 rounded-lg shadow-sm border border-slate-200 mb-2 relative overflow-hidden flex items-center justify-center">
                <div className="text-[9px] text-white px-2 text-center font-serif leading-tight">Teaching in<br/>Higher Ed.</div>
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-2">Teaching in Higher Ed.</span>
              <span className="text-[9px] text-slate-500">Bonsall & Elson</span>
            </div>

            <div className="flex flex-col w-28 shrink-0 cursor-pointer group">
              <div className="h-36 w-full bg-slate-800 rounded-lg shadow-sm border border-slate-200 mb-2 relative overflow-hidden flex items-center justify-center">
                <div className="text-[8px] text-white/80 px-2 text-center font-serif leading-tight">HOW LEARNING<br/>WORKS</div>
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-1">How Learning Works</span>
              <span className="text-[9px] text-slate-500">Ambrose et al.</span>
            </div>
            
            <div className="flex flex-col w-28 shrink-0 cursor-pointer group">
              <div className="h-36 w-full bg-sky-100 rounded-lg shadow-sm border border-slate-200 mb-2 relative overflow-hidden flex items-center justify-center">
                <div className="text-[8px] text-sky-800 px-2 text-center font-serif leading-tight">Make It Stick</div>
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-2">Make It Stick: The Science of...</span>
              <span className="text-[9px] text-slate-500">Successful Learning</span>
            </div>

            <div className="flex flex-col w-28 shrink-0 cursor-pointer group">
              <div className="h-36 w-full bg-slate-900 rounded-lg shadow-sm border border-slate-200 mb-2 relative overflow-hidden flex items-center justify-center">
                <div className="text-[10px] text-amber-500 px-2 text-center font-serif leading-tight">DEEP<br/>WORK</div>
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-1">Deep Work</span>
              <span className="text-[9px] text-slate-500">Cal Newport</span>
            </div>
            
            <div className="flex flex-col w-28 shrink-0 cursor-pointer group">
              <div className="h-36 w-full bg-[#fdfaf5] rounded-lg shadow-sm border border-slate-200 mb-2 relative overflow-hidden flex items-center justify-center">
                <div className="text-[9px] text-slate-800 px-2 text-center font-serif leading-tight">THINKING,<br/>FAST AND SLOW</div>
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-1">Thinking, Fast and Slow</span>
              <span className="text-[9px] text-slate-500">Daniel Kahneman</span>
            </div>
          </div>
        </div>

        {/* UPCOMING EVENTS */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[15px] font-bold text-[#0B1B3D]">Upcoming Events</h3>
            <Link href="/staff/dashboard" className="text-[11px] font-bold text-blue-600 hover:underline">See all</Link>
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
                  <span className="text-[10px] text-slate-500">3:00 PM &bull; AVR</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-600 cursor-pointer hover:text-[#0B1B3D]">Register</span>
            </div>

            <div className="flex items-center justify-between group">
              <div className="flex gap-3 items-center">
                <div className="flex flex-col items-center justify-center text-red-500 w-8 h-10 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider leading-none">Jun</span>
                  <span className="text-[16px] font-extrabold leading-none mt-0.5">27</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[12px] text-[#0B1B3D]">Debate Club: Library Edition</span>
                  <span className="text-[10px] text-slate-500">4:00 PM &bull; Reading Hall</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-600 cursor-pointer hover:text-[#0B1B3D]">Join</span>
            </div>

            <div className="flex items-center justify-between group">
              <div className="flex gap-3 items-center">
                <div className="flex flex-col items-center justify-center text-purple-500 w-8 h-10 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider leading-none">Jul</span>
                  <span className="text-[16px] font-extrabold leading-none mt-0.5">02</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[12px] text-[#0B1B3D]">New E-Resources Orientation</span>
                  <span className="text-[10px] text-slate-500">3:00 PM &bull; Computer Lab</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-600 cursor-pointer hover:text-[#0B1B3D]">Join</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
