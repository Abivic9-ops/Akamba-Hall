import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, Calendar, Armchair, TrendingUp, ChevronRight, 
  ChevronLeft, QrCode, Download, Search, MonitorPlay, Users,
  MessageCircle, AlertTriangle, ArrowRight, Target, Bot,
  FileText, HelpCircle, Trophy
} from 'lucide-react'

export default function StudentDashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B1B3D] tracking-tight">Good afternoon, Victor 👋</h1>
          <p className="text-slate-500 mt-1">Welcome back to <span className="font-bold text-[#0B1B3D]">Akamba Hall Library</span></p>
        </div>
        <div className="bg-white px-5 py-3 rounded-xl border border-slate-200/60 shadow-sm italic text-slate-500 text-sm border-l-4 border-l-primary max-w-sm">
          "Knowledge is the key that opens every door." — <span className="text-primary font-semibold not-italic">SBC Motto</span>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-3xl font-extrabold text-[#0B1B3D]">3</span>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-[13px] text-[#0B1B3D]">Active Loans</span>
              <span className="text-[11px] text-blue-600 font-medium flex items-center mt-1 cursor-pointer hover:underline">
                View all <ArrowRight className="h-3 w-3 ml-1" />
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
              <span className="font-bold text-[13px] text-[#0B1B3D]">Holds Ready</span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">Pickup by Fri, 20 Jun</span>
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
            <span className="text-3xl font-extrabold text-[#0B1B3D]">2</span>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-[13px] text-[#0B1B3D]">Upcoming Bookings</span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">Today &bull; 2:00 PM</span>
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
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-3xl font-extrabold text-[#0B1B3D]">1,240</span>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-[13px] text-[#0B1B3D]">Library Points</span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">Top 12% this term</span>
            </div>
            <div className="h-6 w-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      {/* HERO BANNER */}
      <div className="relative w-full h-[240px] rounded-2xl overflow-hidden bg-[#0B1B3D] shadow-md group">
        <Image src="/images/hero-bg.png" alt="Library Students" fill className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3D] via-[#0B1B3D]/90 to-transparent" />
        
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center">
          <span className="text-primary font-bold text-[10px] tracking-widest uppercase mb-2">This Week at Akamba</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Study Smart, Lead <br/>Stronger
          </h2>
          <p className="text-slate-300 text-sm mt-3 max-w-sm">
            Join our AI Literacy Week sessions and level up your academic game.
          </p>
          <div className="flex gap-3 mt-6">
            <Button className="bg-primary hover:bg-primary/90 text-[#0B1B3D] font-bold h-10 px-6 rounded-lg text-[13px]">
              View Events
            </Button>
            <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/10 h-10 px-6 rounded-lg text-[13px] font-bold">
              Join a Study Group
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1 & 2 SPAN */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MY LOANS */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full">
              <div className="p-5 flex justify-between items-center border-b border-slate-50">
                <div className="flex items-center gap-2 font-bold text-[#0B1B3D]">
                  <BookOpen className="h-4 w-4 text-slate-400" /> My Loans
                </div>
                <Link href="/dashboard" className="text-[12px] font-bold text-blue-600 hover:underline">View all</Link>
              </div>
              
              <div className="p-5 flex flex-col gap-5 flex-1">
                <div className="flex gap-4">
                  <div className="h-16 w-12 bg-slate-800 rounded shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for book cover */}
                    <div className="text-[6px] text-white/50 px-1 text-center font-serif leading-tight">Clean<br/>Code</div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-bold text-[13px] text-[#0B1B3D]">Clean Code</span>
                    <span className="text-[11px] text-slate-500">Robert C. Martin</span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-red-500 font-medium">Due: 25 Jun 2026</span>
                      <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">2 days left</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-16 w-12 bg-orange-100 rounded shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden border border-orange-200">
                    <div className="text-[6px] text-orange-800 px-1 text-center font-serif leading-tight">Thinking,<br/>Fast & Slow</div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-bold text-[13px] text-[#0B1B3D]">Thinking, Fast and Slow</span>
                    <span className="text-[11px] text-slate-500">Daniel Kahneman</span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-slate-500">Due: 02 Jul 2026</span>
                      <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100">9 days left</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-16 w-12 bg-blue-900 rounded shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <div className="text-[6px] text-white/50 px-1 text-center font-serif leading-tight">Algorithms<br/>Unlocked</div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-bold text-[13px] text-[#0B1B3D]">Algorithms Unlocked</span>
                    <span className="text-[11px] text-slate-500">Thomas H. Cormen</span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-slate-500">Due: 15 Jul 2026</span>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">22 days left</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-slate-50 flex gap-2">
                <Button variant="outline" className="flex-1 h-9 text-[12px] font-bold text-slate-600">Renew All Eligible</Button>
                <Button variant="ghost" className="h-9 px-3 text-[12px] font-bold text-slate-600">Manage <ChevronRight className="h-3 w-3 ml-1" /></Button>
              </div>
            </div>

            {/* HOLDS & RESERVATIONS */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full">
              <div className="p-5 flex justify-between items-center border-b border-slate-50">
                <div className="flex items-center gap-2 font-bold text-[#0B1B3D]">
                  <Target className="h-4 w-4 text-slate-400" /> Holds & Reservations
                </div>
                <Link href="/dashboard" className="text-[12px] font-bold text-blue-600 hover:underline">View all</Link>
              </div>
              
              <div className="p-5 flex flex-col gap-4 flex-1">
                <div className="flex gap-4 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                  <div className="h-20 w-14 bg-white rounded shadow-sm flex-shrink-0 flex items-center justify-center border border-slate-200">
                    <div className="text-[7px] font-bold text-[#0B1B3D] px-1 text-center leading-tight">Atomic<br/>Habits</div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[14px] text-[#0B1B3D]">Atomic Habits</span>
                    <span className="text-[11px] text-slate-500 mb-2">James Clear</span>
                    <span className="text-[12px] font-bold text-emerald-600">Ready for Pickup</span>
                    <span className="text-[10px] text-slate-500 mt-1 leading-snug">Collect at Circulation Desk<br/>by 20 Jun, 4:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex flex-col gap-2">
                <Button className="w-full h-10 font-bold bg-[#0B1B3D] hover:bg-[#0B1B3D]/90 text-white rounded-lg">Pick Up Now</Button>
                <Button variant="outline" className="w-full h-10 font-bold text-slate-600 rounded-lg">Cancel Hold</Button>
              </div>
            </div>
          </div>

          {/* SCHEDULE & BOOKINGS */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2 font-bold text-[#0B1B3D]">
                <Calendar className="h-4 w-4 text-slate-400" /> Your Schedule & Bookings
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[12px] font-bold text-slate-600 bg-slate-100 rounded-lg px-2 py-1">
                  <ChevronLeft className="h-3 w-3 cursor-pointer" /> Today <ChevronRight className="h-3 w-3 cursor-pointer" />
                </div>
                <Link href="/dashboard" className="text-[12px] font-bold text-blue-600 hover:underline">View Calendar</Link>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 bg-[#F8FAFC] p-3 rounded-xl border border-slate-100 group hover:border-slate-300 transition cursor-pointer">
                <div className="flex flex-col min-w-[70px]">
                  <span className="font-bold text-[13px] text-[#0B1B3D]">2:00 PM</span>
                  <span className="text-[10px] text-slate-400">- 3:30 PM</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <MonitorPlay className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[13px] text-[#0B1B3D]">AVR Session Booking</span>
                  <span className="text-[11px] text-slate-500">Audio Visual Room &bull; Project Group Presentation</span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md uppercase tracking-wider hidden sm:block">Approved</span>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
              </div>

              <div className="flex items-center gap-4 bg-[#F8FAFC] p-3 rounded-xl border border-slate-100 group hover:border-slate-300 transition cursor-pointer">
                <div className="flex flex-col min-w-[70px]">
                  <span className="font-bold text-[13px] text-[#0B1B3D]">4:00 PM</span>
                  <span className="text-[10px] text-slate-400">- 5:00 PM</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Armchair className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[13px] text-[#0B1B3D]">Silent Reading Seat</span>
                  <span className="text-[11px] text-slate-500">Level 2 &bull; Zone B &bull; Seat 14</span>
                </div>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-md uppercase tracking-wider hidden sm:block">Upcoming</span>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
              </div>
              
              <div className="flex items-center gap-4 bg-[#F8FAFC] p-3 rounded-xl border border-slate-100 group hover:border-slate-300 transition cursor-pointer opacity-70">
                <div className="flex flex-col min-w-[70px]">
                  <span className="font-bold text-[12px] text-[#0B1B3D]">Wed, 25 Jun</span>
                  <span className="text-[10px] text-slate-400">3:30 PM</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[13px] text-[#0B1B3D]">Boardroom Booking</span>
                  <span className="text-[11px] text-slate-500">Group 6 &bull; Software Project Meeting</span>
                </div>
                <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded-md uppercase tracking-wider hidden sm:block">Pending Review</span>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
              </div>
            </div>
          </div>

          {/* RECENTLY BORROWED */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <span className="font-bold text-[15px] text-[#0B1B3D]">Recently Borrowed</span>
              <Link href="/dashboard" className="text-[12px] font-bold text-blue-600 hover:underline">View History</Link>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto pb-4 custom-scrollbar">
              
              <div className="flex flex-col w-24 shrink-0 cursor-pointer group">
                <div className="h-32 w-full bg-slate-900 rounded-lg shadow-sm border border-slate-200 mb-2 relative overflow-hidden flex items-center justify-center group-hover:shadow-md transition">
                   <div className="text-[8px] text-amber-500 px-1 text-center font-serif leading-tight">DEEP<br/>WORK</div>
                </div>
                <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-1">Deep Work</span>
                <span className="text-[9px] text-slate-500">Cal Newport</span>
              </div>
              
              <div className="flex flex-col w-24 shrink-0 cursor-pointer group">
                <div className="h-32 w-full bg-slate-100 rounded-lg shadow-sm border border-slate-200 mb-2 relative overflow-hidden flex items-center justify-center group-hover:shadow-md transition">
                   <div className="text-[7px] text-slate-800 px-1 text-center font-serif leading-tight">The Pragmatic<br/>Programmer</div>
                </div>
                <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-1">The Pragmatic Pr...</span>
                <span className="text-[9px] text-slate-500">Hunt & Thomas</span>
              </div>
              
              <div className="flex flex-col w-24 shrink-0 cursor-pointer group">
                <div className="h-32 w-full bg-orange-500 rounded-lg shadow-sm border border-orange-200 mb-2 relative overflow-hidden flex items-center justify-center group-hover:shadow-md transition">
                   <div className="text-[8px] text-white px-1 text-center font-serif leading-tight">THE<br/>5 AM<br/>CLUB</div>
                </div>
                <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-1">The 5 AM Club</span>
                <span className="text-[9px] text-slate-500">Robin Sharma</span>
              </div>

              <div className="flex flex-col w-24 shrink-0 cursor-pointer group">
                <div className="h-32 w-full bg-emerald-900 rounded-lg shadow-sm border border-emerald-800 mb-2 relative overflow-hidden flex items-center justify-center group-hover:shadow-md transition">
                   <div className="text-[7px] text-emerald-100 px-1 text-center font-serif leading-tight">DATA<br/>STRUCTURES<br/>Using Python</div>
                </div>
                <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-2">Data Structures<br/>Using Python</span>
                <span className="text-[9px] text-slate-500">N. Zaki</span>
              </div>

              <div className="flex flex-col w-24 shrink-0 cursor-pointer group">
                <div className="h-32 w-full bg-[#f4e8d8] rounded-lg shadow-sm border border-[#e3d5c1] mb-2 relative overflow-hidden flex items-center justify-center group-hover:shadow-md transition">
                   <div className="text-[10px] text-red-800 px-1 text-center font-serif leading-tight">Educated</div>
                </div>
                <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-1">Educated</span>
                <span className="text-[9px] text-slate-500">Tara Westover</span>
              </div>

            </div>
          </div>
          {/* RECOMMENDED FOR YOU */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mt-0">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-[15px] text-[#0B1B3D]">Recommended For You</span>
              <Link href="/dashboard" className="text-[12px] font-bold text-blue-600 hover:underline">See more</Link>
            </div>
            <p className="text-[11px] font-bold text-blue-600 mb-4">Based on your reading & activity</p>
            
            <div className="flex items-center gap-4 overflow-x-auto pb-2 custom-scrollbar">
              <div className="flex flex-col w-24 shrink-0 cursor-pointer group">
                <div className="h-32 w-full bg-blue-900 rounded-lg shadow-sm border border-slate-200 mb-2 relative overflow-hidden flex items-center justify-center">
                  <div className="text-[8px] text-white px-1 text-center font-serif leading-tight">Design<br/>Patterns</div>
                </div>
                <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-2">Design Patterns</span>
                <span className="text-[9px] text-slate-500">Gang of Four</span>
                <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-sm mt-1 w-fit">Programming</span>
              </div>

              <div className="flex flex-col w-24 shrink-0 cursor-pointer group">
                <div className="h-32 w-full bg-[#f1f5f9] rounded-lg shadow-sm border border-slate-200 mb-2 relative overflow-hidden flex items-center justify-center">
                  <div className="text-[9px] text-slate-700 px-1 text-center font-serif leading-tight">Mindset</div>
                </div>
                <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-1">Mindset</span>
                <span className="text-[9px] text-slate-500">Carol S. Dweck</span>
                <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-sm mt-1 w-fit">Personal Growth</span>
              </div>

              <div className="flex flex-col w-24 shrink-0 cursor-pointer group">
                <div className="h-32 w-full bg-slate-800 rounded-lg shadow-sm border border-slate-200 mb-2 relative overflow-hidden flex items-center justify-center">
                  <div className="text-[9px] text-white/80 px-1 text-center font-serif leading-tight">Digital Logic</div>
                </div>
                <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-1">Digital Logic</span>
                <span className="text-[9px] text-slate-500">M. Mano</span>
                <span className="text-[9px] font-bold bg-pink-50 text-pink-600 px-1.5 py-0.5 rounded-sm mt-1 w-fit">Computing</span>
              </div>
              
              <div className="flex flex-col w-24 shrink-0 cursor-pointer group">
                <div className="h-32 w-full bg-indigo-950 rounded-lg shadow-sm border border-slate-200 mb-2 relative overflow-hidden flex items-center justify-center">
                  <div className="text-[7px] text-indigo-200 px-1 text-center font-serif leading-tight">A Brief History<br/>of Time</div>
                </div>
                <span className="text-[11px] font-bold text-[#0B1B3D] leading-tight line-clamp-2">A Brief History of Time</span>
                <span className="text-[9px] text-slate-500">Stephen Hawking</span>
                <span className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-sm mt-1 w-fit">Physics</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* COLUMN 3 */}
        <div className="flex flex-col gap-6">
          
          {/* QR ACCESS CARD */}
          <div className="bg-[#0B1B3D] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
            
            <div className="flex justify-between items-center mb-5 relative z-10">
              <div className="flex items-center gap-2 font-bold text-[14px]">
                <QrCode className="h-4 w-4" /> My QR Access Card
              </div>
              <HelpCircle className="h-4 w-4 text-slate-400 cursor-pointer hover:text-white" />
            </div>
            
            <div className="bg-white p-3 rounded-xl mx-auto w-48 h-48 flex items-center justify-center mb-5 relative z-10 shadow-inner">
              {/* Dummy QR Code UI */}
              <div className="w-full h-full bg-slate-100 border border-slate-200 p-2 flex flex-wrap gap-1 items-center justify-center overflow-hidden opacity-80">
                {Array.from({length: 64}).map((_, i) => (
                  <div key={i} className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>
                ))}
                <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded flex items-center justify-center shadow">
                  <div className="w-6 h-8 relative"><Image src="/images/starehe-logo.png" alt="Logo" fill className="object-contain" /></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end relative z-10 mb-5">
              <div className="flex flex-col">
                <span className="text-[18px] font-bold">Victor Otieno</span>
                <span className="text-[12px] text-amber-400 font-mono mt-0.5">ID: SBC-24-11876</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-500/30">Active</span>
            </div>

            <div className="flex gap-2 relative z-10">
              <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold h-9 text-[12px] border border-white/5">View Full Card</Button>
              <Button className="w-10 bg-white/10 hover:bg-white/20 text-white font-bold h-9 p-0 border border-white/5"><Download className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-[15px] text-[#0B1B3D] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              
              <div className="flex flex-col items-center justify-center gap-2 p-3 bg-[#F8FAFC] rounded-xl cursor-pointer hover:bg-blue-50 transition group">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Search className="h-4 w-4" /></div>
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Search<br/>Catalogue</span>
              </div>
              
              <div className="flex flex-col items-center justify-center gap-2 p-3 bg-[#F8FAFC] rounded-xl cursor-pointer hover:bg-amber-50 transition group">
                <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform"><BookOpen className="h-4 w-4" /></div>
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Reserve<br/>Book</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 p-3 bg-[#F8FAFC] rounded-xl cursor-pointer hover:bg-emerald-50 transition group">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Armchair className="h-4 w-4" /></div>
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Book a<br/>Seat</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 p-3 bg-[#F8FAFC] rounded-xl cursor-pointer hover:bg-purple-50 transition group">
                <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform"><MonitorPlay className="h-4 w-4" /></div>
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">AVR<br/>Booking</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 p-3 bg-[#F8FAFC] rounded-xl cursor-pointer hover:bg-slate-100 transition group">
                <div className="h-10 w-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform"><MonitorPlay className="h-4 w-4" /></div>
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Equipment</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 p-3 bg-[#F8FAFC] rounded-xl cursor-pointer hover:bg-emerald-50 transition group">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Users className="h-4 w-4" /></div>
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">My<br/>Groups</span>
              </div>
            </div>
            
            <Button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold border border-indigo-100 h-10 text-[12px] gap-2">
              <Bot className="h-4 w-4" /> AI Study Assistant <ChevronRight className="h-3 w-3 ml-auto text-indigo-400" />
            </Button>
          </div>

          {/* ANNOUNCEMENTS */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[15px] font-bold text-[#0B1B3D]">Announcements</h3>
              <Link href="/dashboard" className="text-[11px] font-bold text-slate-400 hover:text-[#0B1B3D]">See all &rsaquo;</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                  <AlertTriangle className="h-3 w-3" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Library Closed on Public Holiday</span>
                    <span className="text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded ml-2">New</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Thursday, 28th June 2026</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Calendar className="h-3 w-3" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">AI Literacy Week Begins</span>
                    <span className="text-[9px] text-slate-400 whitespace-nowrap ml-2">2d ago</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Workshops start next week!</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <FileText className="h-3 w-3" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">New E-Resources Added</span>
                    <span className="text-[9px] text-slate-400 whitespace-nowrap ml-2">3d ago</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Springer & IEEE now available!</span>
                </div>
              </div>
            </div>
          </div>

          {/* UPCOMING EVENTS */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[15px] font-bold text-[#0B1B3D]">Upcoming Events</h3>
              <Link href="/dashboard" className="text-[11px] font-bold text-slate-400 hover:text-[#0B1B3D]">See all &rsaquo;</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between group">
                <div className="flex gap-3 items-center">
                  <div className="flex flex-col items-center justify-center bg-red-50 text-red-600 rounded-lg w-10 h-10 shrink-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider leading-none">Jun</span>
                    <span className="text-[14px] font-extrabold leading-none mt-0.5">24</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">AI Prompt Engineering Workshop</span>
                    <span className="text-[10px] text-slate-500">3:30 PM &bull; AVR</span>
                  </div>
                </div>
                <Button variant="outline" className="h-7 text-[10px] font-bold px-3 py-0">Register</Button>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex gap-3 items-center">
                  <div className="flex flex-col items-center justify-center bg-red-50 text-red-600 rounded-lg w-10 h-10 shrink-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider leading-none">Jun</span>
                    <span className="text-[14px] font-extrabold leading-none mt-0.5">27</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Debate Club: Library Edition</span>
                    <span className="text-[10px] text-slate-500">4:00 PM &bull; Reading Hall</span>
                  </div>
                </div>
                <Button variant="outline" className="h-7 text-[10px] font-bold px-3 py-0">Join</Button>
              </div>
            </div>
          </div>

          {/* LIBRARY HOURS */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[15px] font-bold text-[#0B1B3D]">Library Hours</h3>
              <Link href="/dashboard" className="text-[11px] font-bold text-blue-600 hover:underline">View full schedule &rsaquo;</Link>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-bold text-emerald-600">Open Now</span>
              <span className="text-[11px] text-slate-400">&bull;</span>
              <span className="text-[11px] font-bold text-emerald-600">Closes 6:00 PM</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-500 font-medium">Mon - Fri</span>
                <span className="text-[11px] text-[#0B1B3D] font-bold">7:30 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-500 font-medium">Sat</span>
                <span className="text-[11px] text-[#0B1B3D] font-bold">8:00 AM - 1:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-500 font-medium">Sun</span>
                <span className="text-[11px] text-slate-400 font-bold">Closed</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
