import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, ScanLine, MapPin, HeadphonesIcon,
  UserCheck, ShieldCheck, FileText, Calendar, MessageCircle,
  AlertTriangle, BookOpen, Users, ArrowRight, Star,
  Laptop, ChevronDown
} from 'lucide-react'

export default function PublicLandingPage() {
  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* HERO SECTION */}
      <section className="relative w-full h-[600px] flex items-center bg-[#0B1829] overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B1B3D] via-[#0B1B3D]/90 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col gap-6 max-w-2xl mt-8">
            <span className="text-primary font-bold text-[13px] tracking-widest uppercase">
              Akamba Hall Library System
            </span>
            <h1 className="text-5xl md:text-[64px] font-extrabold text-white leading-[1.1] tracking-tight">
              Empowering Minds.<br/>
              Building <span className="text-primary">Futures.</span>
            </h1>
            <p className="text-[17px] text-slate-300 font-light max-w-xl">
              Explore. Learn. Grow. Your gateway to knowledge,<br/>
              resources, and endless possibilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" className="h-14 px-8 text-[15px] font-bold shadow-xl shadow-primary/10 rounded-md">
                <Link href="/login" className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Access Member Portal
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-[15px] font-bold border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-md">
                <Link href="/search" className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Our Catalogue
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-8">
              <div className="flex items-start gap-3">
                <ScanLine className="h-5 w-5 text-slate-300 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-white">QR Access Card</span>
                  <span className="text-[11px] text-slate-400">Seamless & Secure</span>
                </div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex items-start gap-3">
                <Laptop className="h-5 w-5 text-slate-300 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-white">24/7 Resources</span>
                  <span className="text-[11px] text-slate-400">Digital Library</span>
                </div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-slate-300 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-white">Study Spaces</span>
                  <span className="text-[11px] text-slate-400">Book & Reserve</span>
                </div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex items-start gap-3">
                <HeadphonesIcon className="h-5 w-5 text-slate-300 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-white">Expert Support</span>
                  <span className="text-[11px] text-slate-400">Always Here</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Card */}
          <div className="hidden lg:block w-full max-w-[500px] ml-auto">
            <div className="bg-[#0B1B3D]/70 backdrop-blur-md border border-white/10 rounded-[20px] p-8 shadow-2xl">
              <h2 className="text-[22px] font-bold text-white mb-2 tracking-tight">Discover Your <span className="text-primary">Next Read</span></h2>
              <p className="text-slate-300 mb-6 text-[13px]">Search thousands of books, journals, and digital resources.</p>
              
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search by title, author, subject, or keyword..." 
                    className="pl-9 h-11 bg-white text-[#0B1B3D] text-[13px] rounded-md border-0 focus-visible:ring-0"
                  />
                </div>
                <Button className="h-11 px-6 rounded-md font-bold text-[13px] bg-primary hover:bg-primary/90 text-primary-foreground">Search</Button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-medium text-slate-400 mr-1">Popular searches:</span>
                <span className="text-[11px] bg-white/10 border border-white/5 px-3 py-1 rounded text-slate-200 cursor-pointer hover:bg-white/20 transition">Machine Learning</span>
                <span className="text-[11px] bg-white/10 border border-white/5 px-3 py-1 rounded text-slate-200 cursor-pointer hover:bg-white/20 transition">Physics</span>
                <span className="text-[11px] bg-white/10 border border-white/5 px-3 py-1 rounded text-slate-200 cursor-pointer hover:bg-white/20 transition">Leadership</span>
                <span className="text-[11px] bg-white/10 border border-white/5 px-3 py-1 rounded text-slate-200 cursor-pointer hover:bg-white/20 transition">History</span>
                <span className="text-[11px] bg-white/10 border border-white/5 px-3 py-1 rounded text-slate-200 cursor-pointer hover:bg-white/20 transition mt-1">Data Science</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="container mx-auto px-4 -mt-10 relative z-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          
          <Link href="/login" className="block group bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 p-4 transition-all hover:shadow-md hover:border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[14px] text-[#0B1B3D]">My Account</span>
                  <span className="text-[11px] text-slate-500 mt-1 leading-snug">Manage loans, holds<br/>and reservations</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
            </div>
          </Link>

          <Link href="/login" className="block group bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 p-4 transition-all hover:shadow-md hover:border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[14px] text-[#0B1B3D]">Book a Space</span>
                  <span className="text-[11px] text-slate-500 mt-1 leading-snug">Reserve study seats,<br/>rooms & equipment</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
            </div>
          </Link>

          <Link href="/search" className="block group bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 p-4 transition-all hover:shadow-md hover:border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[14px] text-[#0B1B3D]">E-Resources</span>
                  <span className="text-[11px] text-slate-500 mt-1 leading-snug">Access journals, eBooks<br/>and databases</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
            </div>
          </Link>

          <Link href="/login" className="block group bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 p-4 transition-all hover:shadow-md hover:border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[14px] text-[#0B1B3D]">Events & Workshops</span>
                  <span className="text-[11px] text-slate-500 mt-1 leading-snug">Join library events,<br/>clubs and workshops</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
            </div>
          </Link>

          <Link href="/login" className="block group bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 p-4 transition-all hover:shadow-md hover:border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[14px] text-[#0B1B3D]">Ask a Librarian</span>
                  <span className="text-[11px] text-slate-500 mt-1 leading-snug">Get help & research<br/>support</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
            </div>
          </Link>

        </div>
      </section>

      {/* DASHBOARD GRID */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-6">
          
          {/* Featured Event Card */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm lg:col-span-1 h-[380px] flex flex-col justify-end bg-[#0B1B3D]">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/images/ai-week.png" 
                alt="AI Literacy Week" 
                fill 
                className="object-cover opacity-60" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/80 to-transparent" />
            </div>
            
            <div className="relative z-10 p-8 flex flex-col items-start gap-2">
              <span className="text-primary font-bold text-[11px] tracking-wider mb-1">This Week at Akamba</span>
              <h3 className="text-[28px] font-bold text-white leading-tight tracking-tight">AI Literacy Week<br/>2026</h3>
              <p className="text-slate-300 text-[13px] mb-4 mt-2 max-w-[90%] leading-relaxed">
                A week of talks, workshops and hands-on sessions to build the skills of tomorrow.
              </p>
              <Button className="w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-md px-5">
                View Event Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col h-[380px]">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-[16px] font-bold text-[#0B1B3D]">Latest Announcements</h3>
              <Link href="/login" className="text-[13px] text-blue-600 font-medium hover:underline">View all</Link>
            </div>
            
            <div className="flex flex-col gap-6 flex-1">
              <div className="flex gap-4 items-start">
                <div className="mt-1 h-9 w-9 shrink-0 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[14px] text-[#0B1B3D]">Library Closed on Public Holiday</span>
                    <span className="text-[10px] font-bold bg-pink-50 text-red-600 px-2 py-0.5 rounded ml-2 border border-pink-100">New</span>
                  </div>
                  <span className="text-[12px] text-slate-500 mt-1">Thursday, 28th June 2026</span>
                </div>
                <ArrowRight className="h-3 w-3 text-slate-300 mt-2" />
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 h-9 w-9 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[14px] text-[#0B1B3D]">New E-Resources Added</span>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap ml-2">2d ago</span>
                  </div>
                  <span className="text-[12px] text-slate-500 mt-1">Springer & IEEE now available!</span>
                </div>
                <ArrowRight className="h-3 w-3 text-slate-300 mt-2" />
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 h-9 w-9 shrink-0 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                  <UserCheck className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[14px] text-[#0B1B3D]">AI Literacy Week Begins</span>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap ml-2">3d ago</span>
                  </div>
                  <span className="text-[12px] text-slate-500 mt-1">Workshops start next week!</span>
                </div>
                <ArrowRight className="h-3 w-3 text-slate-300 mt-2" />
              </div>
            </div>
            
            <Link href="/login" className="text-[13px] font-medium text-center text-slate-500 hover:text-[#0B1B3D] mt-2 pt-4 flex items-center justify-center gap-1 transition-colors">
              More announcements <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>

          {/* At a glance stats */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col h-[380px]">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-[16px] font-bold text-[#0B1B3D]">Library at a Glance</h3>
              <div className="flex items-center gap-1 text-[13px] text-slate-500 cursor-pointer">
                This Month <ChevronDown className="h-3 w-3" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="bg-[#F8FAFC] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-[22px] font-extrabold text-[#0B1B3D] leading-none">8,462</span>
                <span className="text-[12px] text-slate-500">Books & Materials</span>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-green-50 text-emerald-600 flex items-center justify-center mb-1">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-[22px] font-extrabold text-[#0B1B3D] leading-none">2,145</span>
                <span className="text-[12px] text-slate-500">Active Members</span>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 relative">
                <div className="h-10 w-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
                </div>
                <span className="text-[22px] font-extrabold text-[#0B1B3D] leading-none">3,257</span>
                <div className="flex flex-col items-center">
                  <span className="text-[11px] text-slate-500">Items Borrowed</span>
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center mt-1">↑ 12.5%</span>
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 relative">
                <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center mb-1">
                  <Star className="h-5 w-5" />
                </div>
                <span className="text-[22px] font-extrabold text-[#0B1B3D] leading-none">98%</span>
                <div className="flex flex-col items-center">
                  <span className="text-[11px] text-slate-500">Satisfaction Rate</span>
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center mt-1">↑ 6.3%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="container mx-auto px-4 pb-16">
        <div className="bg-[#0B1B3D] rounded-2xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
          {/* Abstract BG pattern */}
          <div className="absolute right-0 top-0 w-64 h-full bg-primary/10 rounded-l-full blur-3xl" />
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="h-16 w-16 hidden md:flex shrink-0 rounded-xl border border-white/10 bg-white/5 items-center justify-center text-primary">
              <Star className="h-8 w-8" />
            </div>
            <div className="flex flex-col max-w-xl">
              <h2 className="text-[22px] font-bold text-white mb-2">Ready to unlock a world of knowledge?</h2>
              <p className="text-slate-300 text-[14px]">Join Akamba Hall Library and start your learning journey today.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10">
            <Button size="lg" className="h-12 px-8 font-bold text-[14px] bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-lg shadow-primary/20">
              <Link href="/login" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Become a Member
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 font-bold text-[14px] border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-md">
              <Link href="/login" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                View Membership Info
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
