import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronDown, Clock, MessageSquare, User } from 'lucide-react'

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        {/* LOGO & BRAND */}
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-14 shrink-0">
            <Image 
              src="/images/starehe-logo.png" 
              alt="Starehe Boys' Centre Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Starehe Boys&apos; Centre
            </span>
            <Link href="/" className="font-extrabold text-2xl text-[#0B1B3D] tracking-tight leading-tight hover:opacity-90">
              Akamba Hall Library
            </Link>
            <span className="text-[11px] font-medium text-slate-500">
              Knowledge &bull; Character &bull; Leadership
            </span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden lg:flex items-center space-x-6 text-[13px] font-bold text-[#0B1B3D]">
          <Link href="/" className="text-primary border-b-2 border-primary pb-1">Home</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Library</Link>
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group relative">
            Resources <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-primary" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group relative">
            Services <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-primary" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group relative">
            Community <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-primary" />
          </div>
          <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
          <Link href="/news" className="hover:text-primary transition-colors">News & Blog</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="hidden xl:flex items-center space-x-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#0B1B3D]">Library Hours</span>
              <span className="text-[10px] text-slate-500">7:30 AM - 6:00 PM</span>
            </div>
          </div>
          
          <div className="h-8 w-px bg-slate-200"></div>

          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#0B1B3D]">Ask a Librarian</span>
              <span className="text-[10px] text-slate-500">We&apos;re here to help</span>
            </div>
          </div>

          <Link href="/login">
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md shadow-primary/20 px-6 h-10 rounded-md">
              <User className="h-4 w-4" />
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
