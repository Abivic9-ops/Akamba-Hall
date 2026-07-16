'use client'

import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search, User, ArrowRight, Star, BookOpen, Users, Monitor, Sparkles,
  ShieldCheck, Headphones, Clock, Calendar, ChevronLeft, ChevronRight,
  MapPin, CheckCircle, Send, Quote, Globe, BookMarked,
  Printer, FileText, GraduationCap, BookCopy,
  Laptop, TrendingUp, Target, Award, Scale, Heart, History,
  Eye, Lightbulb, BookPlus, Newspaper, AlertCircle, Megaphone,
  Phone, Mail, Navigation, ArrowUpRight, HelpCircle
} from 'lucide-react'
import { FadeIn, StaggerChildren, StaggerItem, ScaleOnHover } from '@/components/motion'

/* ─── Data Constants ─── */

const heroStats = [
  { icon: BookOpen, number: '8,462', label: 'Books Available', color: 'bg-blue-500/20 text-blue-400' },
  { icon: Users, number: '2,145', label: 'Active Members', color: 'bg-green-500/20 text-green-400' },
  { icon: MapPin, number: '17', label: 'Study Spaces', color: 'bg-amber-500/20 text-amber-400' },
  { icon: Calendar, number: '5', label: 'Events This Week', color: 'bg-navy/20 text-white/70' },
  { icon: BookCopy, number: '24', label: 'New Arrivals', color: 'bg-gold/20 text-gold' },
  { icon: Sparkles, number: 'AI', label: 'Ask Akamba AI', color: 'bg-accent-blue/20 text-accent-blue', isAI: true },
]

const whyFeatures = [
  { icon: BookMarked, color: 'bg-navy/10 text-[#0B1A3B]', title: 'Extensive Collection', desc: 'Over 8,400 books, journals, and periodicals curated for academic excellence. The collection is aligned with the Kenya curriculum and updated each term with new acquisitions and recommended readings.', link: '/resources' },
  { icon: Globe, color: 'bg-green-100 text-green-700', title: 'Digital Library', desc: 'Access e-books, academic databases, and digital archives from anywhere, anytime. JSTOR, curated learning links, and school-specific resources are available 24/7 through the member portal.', link: '/resources#digital' },
  { icon: Sparkles, color: 'bg-accent-blue/10 text-accent-blue', title: 'AI Research Assistant', desc: 'Get instant help with research, citations, and finding the right resources. Akamba AI handles routine questions so library staff can focus on deeper research support.', link: '/services#support' },
  { icon: Users, color: 'bg-blue-100 text-blue-700', title: 'Collaborative Spaces', desc: 'Purpose-built discussion rooms and group study areas for teamwork. Book through the portal, arrive on time, and collaborate with your peers in a structured environment.', link: '/services#bookings' },
  { icon: GraduationCap, color: 'bg-gold/10 text-gold', title: 'Academic Excellence', desc: 'Past papers, research guides, and librarian support to help you excel. The library hosts workshops on research skills, citation, and study strategies throughout the term.', link: '/resources#study-help' },
  { icon: ShieldCheck, color: 'bg-[#0B1A3B]/10 text-[#0B1A3B]', title: 'Secure QR Access', desc: 'Tap your QR card for fast, contactless entry and borrowing. Your card tracks your loans, bookings, and account status — all in one place.', link: '/services#borrowing' },
]

const bannerStats = [
  { icon: BookOpen, number: '8,500+', label: 'Books & Journals' },
  { icon: Users, number: '2,100+', label: 'Active Members' },
  { icon: Star, number: '95%', label: 'Student Satisfaction' },
  { icon: Monitor, number: '350+', label: 'Digital Resources' },
  { icon: FileText, number: '120+', label: 'Research Papers' },
  { icon: Globe, number: '24/7', label: 'Digital Access' },
]

const books = [
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', rating: 4.8, borrowed: 342, cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop' },
  { title: 'Deep Work', author: 'Cal Newport', rating: 4.7, borrowed: 289, cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', rating: 4.9, borrowed: 412, cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop' },
  { title: 'Clean Code', author: 'Robert C. Martin', rating: 4.6, borrowed: 198, cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=450&fit=crop' },
  { title: 'Atomic Habits', author: 'James Clear', rating: 4.9, borrowed: 456, cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=450&fit=crop' },
  { title: 'The 5 AM Club', author: 'Robin Sharma', rating: 4.5, borrowed: 267, cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=450&fit=crop' },
  { title: 'Educated', author: 'Tara Westover', rating: 4.7, borrowed: 312, cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=450&fit=crop' },
  { title: 'The Lean Startup', author: 'Eric Ries', rating: 4.6, borrowed: 234, cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=450&fit=crop' },
]

const spaces = [
  { name: 'Reading Hall', desc: 'Quiet individual study with natural lighting and comfortable seating for 80 students', seats: 80, img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop' },
  { name: 'Discussion Rooms', desc: 'Collaborative spaces for group projects, equipped with whiteboards and power outlets', seats: 12, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop' },
  { name: 'Computer Lab', desc: 'High-speed workstations with academic software access for research and assignments', seats: 30, img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop' },
  { name: 'AV Presentation Room', desc: 'Presentations, screenings, and seminars with full AV setup for 40 people', seats: 40, img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop' },
  { name: 'Innovation Corner', desc: 'Creative maker-space for projects, prototypes, and hands-on learning', seats: 15, img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop' },
]

const services = [
  { icon: BookCopy, label: 'Borrow & Renew' },
  { icon: MapPin, label: 'Book Spaces' },
  { icon: GraduationCap, label: 'Research Help' },
  { icon: Globe, label: 'Digital Access' },
  { icon: Laptop, label: 'Equipment' },
  { icon: Printer, label: 'Print & Scan' },
  { icon: FileText, label: 'Past Papers' },
  { icon: BookMarked, label: 'Citations' },
  { icon: ArrowRight, label: 'Inter-Library' },
]

const events = [
  { day: '21', month: 'Jul', title: 'AI Literacy Week', time: '9:00 AM – 4:00 PM', desc: 'Workshops on artificial intelligence, data literacy, and responsible technology use for all students.', action: 'Register' },
  { day: '28', month: 'Jul', title: 'Author Meet & Greet', time: '2:00 PM – 3:30 PM', desc: 'A local author discusses their writing process and answers questions about publishing.', action: 'Register' },
  { day: '04', month: 'Aug', title: 'Debate Club: Library Edition', time: '3:00 PM – 5:00 PM', desc: 'Students debate digital vs. physical libraries in modern education.', action: 'Join' },
  { day: '11', month: 'Aug', title: 'Research Skills Workshop', time: '10:00 AM – 12:00 PM', desc: 'Hands-on session on finding, evaluating, and citing academic sources.', action: 'Register' },
]

const testimonials = [
  { quote: 'Walking into Akamba Hall Library every morning gives me a sense of purpose. The quiet spaces, the organised shelves, and the warmth of the librarians make me feel like I truly belong here. This library has given me more than books — it has given me confidence.', name: 'Brian O.', role: 'Form 6 Student', avatar: 'https://i.pravatar.cc/150?img=11' },
  { quote: 'As a teacher, I have watched students transform because of the resources this library provides. The digital databases, the research support, the reading programmes — they all come together to create something truly special. I am deeply grateful for Akamba Hall Library.', name: 'Mrs. Wambui', role: 'Physics Teacher', avatar: 'https://i.pravatar.cc/150?img=32' },
  { quote: 'Years after leaving Starehe, the reading habits and discipline I developed in Akamba Hall Library still guide me. Every time I open a book, I remember the librarians who believed in me. I owe so much of my success to this place.', name: 'James K.', role: 'Alumnus — Class of 2018', avatar: 'https://i.pravatar.cc/150?img=53' },
]

const aiSuggestions = [
  'Find books on renewable energy',
  'What are the library opening hours?',
  'Help me with citation (APA)',
  'Recommend a book on leadership',
]

const aboutHighlights = [
  { icon: Target, title: 'Our Mission', desc: 'To support learning, reading, and discipline through structured access to books, digital resources, and study spaces. Every policy is built around making your learning experience better.', link: '/about#mission' },
  { icon: History, title: 'Our History', desc: 'Founded in 1959 alongside Starehe Boys\' Centre, the library has grown from a single room of donated books into a modern learning centre serving over 2,100 active members.', link: '/about#history' },
  { icon: Scale, title: 'Our Values', desc: 'Order, accessibility, accountability, privacy, and service. These values are embedded in every policy, every process, and every interaction at Akamba Hall Library.', link: '/about#values' },
  { icon: Award, title: 'Our Identity', desc: 'An academic support centre, community hub, and discipline framework — all in one. The library teaches responsibility while providing the tools for academic excellence.', link: '/about#identity' },
]

const quickFacts = [
  { label: 'Established', value: '1959' },
  { label: 'Active Members', value: '2,100+' },
  { label: 'Collection Size', value: '8,400+' },
  { label: 'Study Spaces', value: '17' },
  { label: 'Digital Resources', value: '350+' },
  { label: 'Events per Term', value: '12+' },
]

const newArrivals = [
  { title: 'The Psychology of Money', author: 'Morgan Housel', category: 'Finance' },
  { title: 'Educated', author: 'Tara Westover', category: 'Memoir' },
  { title: 'Atomic Habits', author: 'James Clear', category: 'Self-Development' },
  { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science' },
]

const newsHighlights = [
  { date: '14 Jul', title: 'Library Hours Extended for Exam Period', desc: 'The library will remain open until 7:00 PM on weekdays during exam preparation.', tag: 'Schedule' },
  { date: '10 Jul', title: 'New E-Resource: JSTOR Access', desc: 'All registered members can now access JSTOR through the digital resources portal.', tag: 'New' },
  { date: '05 Jul', title: 'QR Card Replacement Week', desc: 'Students with damaged or lost QR cards can get free replacements this week.', tag: 'Notice' },
]

/* ─── JSON-LD Structured Data ─── */

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Akamba Hall Library',
  url: 'https://library.stareheboyscentre.org',
  logo: 'https://library.stareheboyscentre.org/images/starehe-logo.png',
  parentOrganization: {
    '@type': 'EducationalOrganization',
    name: "Starehe Boys' Centre",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'General Waruinge Street, P.O. Box 30178',
      addressLocality: 'Nairobi',
      postalCode: '00100',
      addressCountry: 'KE',
    },
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Akamba Hall Library',
  url: 'https://library.stareheboyscentre.org',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://library.stareheboyscentre.org/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

/* ─── Pill Header Component ─── */

function PillHeader({ icon: Icon, label, className = '' }: { icon: React.ElementType; label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[12px] font-bold uppercase tracking-widest px-4 py-2 rounded-full ${className}`}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      {label}
    </span>
  )
}

function PillHeaderLight({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 bg-gold/10 text-gold text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
      <Icon className="h-3 w-3" aria-hidden="true" />
      {label}
    </span>
  )
}

function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 bg-gold/10 text-gold text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-gold hover:text-navy transition-all duration-300 group"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </Link>
  )
}

function SatisfactionRing({ percentage, label }: { percentage: number; label: string }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (circumference * percentage) / 100

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative w-[100px] h-[100px]">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#E4E7EE" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r={radius} fill="none" stroke="#E8A63C" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={animated ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[22px] font-extrabold text-[#101828]">{percentage}%</span>
        </div>
      </div>
      <span className="text-[12px] font-semibold text-[#5B6376] text-center">{label}</span>
    </div>
  )
}

/* ─── Page Component ─── */

export default function PublicLandingPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Script id="org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Script id="website-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <div className="w-full bg-white overflow-hidden">
        {/* ═══════════════════════════════════════════
            SECTION B — HERO (unchanged)
           ═══════════════════════════════════════════ */}
        <section className="relative w-full min-h-[600px] flex items-center bg-[#0B1A3B] overflow-hidden">
          <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.png')" }} />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B1A3B] via-[#0B1A3B]/90 to-[#0B1A3B]/30" />
          <div className="container relative z-10 mx-auto px-4 pt-0 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex flex-col gap-6 max-w-2xl">
              <h1 className="text-[42px] font-bold leading-[1.08] tracking-tight text-white">
                The Heart of Learning at{' '}
                <span className="text-gold">Starehe Boys&apos; Centre</span>
              </h1>
              <p className="text-[14px] md:text-[14px] text-white/60 font-light max-w-xl leading-relaxed">
                Akamba Hall Library is more than a place to borrow books. It is the academic heart
                of Starehe Boys&apos; Centre — providing access to quality collections, collaborative
                learning spaces, digital resources, and innovative technologies that give every
                student what they need to excel. Established in 1959 alongside the school, the library
                has grown from a single room of donated books into a modern, technology-enabled learning
                centre serving over 2,100 active members.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-1">
                <Button className="h-12 px-7 text-[14px] font-bold bg-gold hover:bg-gold-hover text-navy rounded-full shadow-lg shadow-gold/20 transition-all gap-2">
                  Explore the Library <ArrowRight className="h-4 w-4" />
                </Button>
                <Button className="h-12 px-7 text-[14px] font-bold border border-white/20 bg-transparent text-white hover:bg-white/10 rounded-full transition-all gap-2">
                  <User className="h-4 w-4" />
                  Access Member Portal
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-4 pt-6 border-t border-white/10">
                {[
                  { icon: ShieldCheck, title: 'QR-Powered Access', sub: 'Tap. Scan. Access.' },
                  { icon: Globe, title: 'Digital Resources', sub: '24/7 Anywhere' },
                  { icon: Headphones, title: 'Expert Support', sub: 'Ask, Learn, Grow.' },
                  { icon: CheckCircle, title: 'Safe & Secure', sub: 'Your data, protected.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <item.icon className="h-4 w-4 text-white/40 mt-0.5 shrink-0" aria-hidden="true" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[12px] font-semibold text-white">{item.title}</span>
                      <span className="text-[10px] text-white/40">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex w-full max-w-[480px] ml-auto items-center -mt-16">
              <div className="w-full bg-[#13285A] rounded-[20px] p-7 shadow-2xl shadow-black/30 border border-white/5">
                <h2 className="text-[20px] font-bold text-white mb-5 tracking-tight">Find What You Need</h2>
                <div className="flex gap-2 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" aria-hidden="true" />
                    <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search books, journals, authors, topics…" className="pl-9 h-11 bg-[#0B1A3B] border-white/10 text-white text-[13px] rounded-xl placeholder:text-white/30 focus-visible:ring-gold" aria-label="Search library catalogue" />
                  </div>
                  <Button className="h-11 px-5 rounded-xl font-bold text-[13px] bg-gold hover:bg-gold-hover text-navy shrink-0">Search</Button>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {heroStats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-1.5 bg-[#0B1A3B]/50 rounded-xl p-3 border border-white/5">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${stat.color}`}><stat.icon className="h-4 w-4" aria-hidden="true" /></div>
                      <span className="text-[16px] font-bold text-white leading-none">{stat.number}</span>
                      <span className="text-[10px] text-white/40 leading-tight">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full h-11 rounded-xl font-bold text-[13px] border border-gold/30 bg-transparent text-gold hover:bg-gold/10 transition-all">Quick Login <ArrowRight className="h-3.5 w-3.5 ml-1" /></Button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION — ABOUT PREVIEW
           ═══════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <PillHeader icon={BookOpen} label="About Us" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#101828] tracking-tight mt-5 mb-3">
                Akamba Hall Library
              </h2>
              <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-6">
                The central library hub of Starehe Boys&apos; Centre — serving the school community since 1959. From a single room of donated books to a modern learning centre with over 8,400 resources and 2,100 active members, the library is built on a legacy of service, discipline, and academic excellence.
              </p>
            </FadeIn>

            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10" staggerDelay={0.1}>
              {aboutHighlights.map((item, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[20px] p-6 flex flex-col gap-4 hover:shadow-lg hover:border-gold/30 transition-all duration-300 h-full">
                      <div className="h-12 w-12 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-[17px] font-bold text-[#101828]">{item.title}</h3>
                      <p className="text-[15px] text-[#5B6376] leading-relaxed flex-1">{item.desc}</p>
                      <PillLink href={item.link}>Read more</PillLink>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerChildren>

            {/* Quick Facts Row */}
            <FadeIn delay={0.3}>
              <div className="mt-10 bg-[#0B1A3B] rounded-[20px] p-8 grid grid-cols-3 md:grid-cols-6 gap-6">
                {quickFacts.map((f, i) => (
                  <div key={i} className="text-center">
                    <span className="text-[24px] md:text-[28px] font-extrabold text-gold leading-none block">{f.value}</span>
                    <span className="text-[12px] text-white/50 mt-1 block">{f.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION — WHY AKAMBA HALL?
           ═══════════════════════════════════════════ */}
        <section className="py-24 bg-[#F5F6FA]">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <PillHeader icon={Star} label="Why Us" />
              </div>
              <div className="text-center mb-14">
                <h2 className="text-[32px] md:text-[40px] font-bold text-[#101828] tracking-tight">Why Akamba Hall?</h2>
                <p className="text-[16px] text-[#5B6376] mt-3 max-w-lg mx-auto">A modern library built to support reading, research, discipline, and academic excellence for every Starehe student.</p>
              </div>
            </FadeIn>

            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
              {whyFeatures.map((feat, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="group bg-white border border-[#E4E7EE] rounded-[20px] p-7 flex flex-col items-center text-center gap-4 hover:shadow-xl hover:border-gold/30 transition-all duration-300 h-full">
                      <motion.div
                        className={`h-14 w-14 rounded-full flex items-center justify-center ${feat.color}`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <feat.icon className="h-6 w-6" aria-hidden="true" />
                      </motion.div>
                      <h3 className="font-bold text-[17px] text-[#101828]">{feat.title}</h3>
                      <p className="text-[15px] text-[#5B6376] leading-relaxed">{feat.desc}</p>
                      <PillLink href={feat.link}>Learn more</PillLink>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION — STATS BANNER
           ═══════════════════════════════════════════ */}
        <section className="py-10 px-4">
          <div className="container mx-auto">
            <FadeIn>
              <div className="bg-[#0B1A3B] rounded-[24px] py-16 px-6 md:px-12 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gold/5" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gold/5" />
                <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
                  <PillHeaderLight icon={TrendingUp} label="By the Numbers" />
                </div>
                <h2 className="text-[30px] md:text-[36px] font-bold text-white text-center mb-12 tracking-tight relative z-10">
                  Akamba Hall Library by the Numbers
                </h2>
                <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6 relative z-10" staggerDelay={0.1}>
                  {bannerStats.map((stat, i) => (
                    <StaggerItem key={i}>
                      <motion.div
                        className="flex flex-col items-center text-center gap-3"
                        whileHover={{ y: -5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
                          <stat.icon className="h-5 w-5 text-gold" aria-hidden="true" />
                        </div>
                        <span className="text-[28px] md:text-[32px] font-extrabold text-white leading-none">{stat.number}</span>
                        <span className="text-[13px] text-white/50">{stat.label}</span>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION — FEATURED COLLECTIONS
           ═══════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <PillHeader icon={BookOpen} label="Popular Books" />
              <div className="flex items-end justify-between mb-10 mt-5">
                <div>
                  <h2 className="text-[32px] md:text-[40px] font-bold text-[#101828] tracking-tight">Featured Collections</h2>
                  <p className="text-[16px] text-[#5B6376] mt-2">Staff picks, high-circulation titles, and new arrivals worth your time.</p>
                </div>
                <PillLink href="/search">View full catalogue</PillLink>
              </div>
            </FadeIn>

            <div className="relative">
              <div id="book-scroll" className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                {books.map((book, i) => (
                  <motion.div key={i} className="shrink-0 w-[180px] snap-start" whileHover={{ y: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <div className="bg-white border border-[#E4E7EE] rounded-[16px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-[240px] w-full bg-slate-100">
                        <Image src={book.cover} alt={`Cover of ${book.title} by ${book.author}`} width={300} height={450} className="object-cover w-full h-full" loading={i > 1 ? 'lazy' : undefined} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-3.5 flex flex-col gap-1.5">
                        <h4 className="text-[13px] font-bold text-[#101828] leading-tight line-clamp-2">{book.title}</h4>
                        <p className="text-[11px] text-[#5B6376]">{book.author}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-gold fill-gold" aria-hidden="true" />
                          <span className="text-[11px] font-semibold text-[#101828]">{book.rating}</span>
                          <span className="text-[10px] text-[#5B6376] ml-1">· {book.borrowed} borrowed</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 h-10 w-10 rounded-full bg-white shadow-lg border border-[#E4E7EE] flex items-center justify-center text-[#101828] hover:bg-slate-50 hover:scale-110 transition-all hidden md:flex" aria-label="Scroll books left" onClick={() => document.getElementById('book-scroll')?.scrollBy({ left: -300, behavior: 'smooth' })}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 h-10 w-10 rounded-full bg-white shadow-lg border border-[#E4E7EE] flex items-center justify-center text-[#101828] hover:bg-slate-50 hover:scale-110 transition-all hidden md:flex" aria-label="Scroll books right" onClick={() => document.getElementById('book-scroll')?.scrollBy({ left: 300, behavior: 'smooth' })}>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="sm:hidden mt-4">
              <PillLink href="/search">View full catalogue</PillLink>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION — EXPLORE OUR SPACES
           ═══════════════════════════════════════════ */}
        <section className="py-24 bg-[#F5F6FA]">
          <div className="container mx-auto px-4">
            <FadeIn>
              <PillHeader icon={Users} label="Study Spaces" />
              <div className="flex items-end justify-between mb-10 mt-5">
                <div>
                  <h2 className="text-[32px] md:text-[40px] font-bold text-[#101828] tracking-tight">Explore Our Spaces</h2>
                  <p className="text-[16px] text-[#5B6376] mt-2">Book a space that fits your study style — from quiet reading to collaborative group work.</p>
                </div>
                <PillLink href="/services#bookings">Book a space</PillLink>
              </div>
            </FadeIn>

            <div className="relative">
              <div id="space-scroll" className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                {spaces.map((space, i) => (
                  <motion.div key={i} className="shrink-0 w-[260px] h-[320px] relative rounded-[20px] overflow-hidden snap-start group cursor-pointer" whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <Image src={space.img} alt={`${space.name} — ${space.desc}`} width={600} height={400} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A3B] via-[#0B1A3B]/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
                      <h3 className="text-[16px] font-bold text-white">{space.name}</h3>
                      <p className="text-[13px] text-white/60 leading-relaxed">{space.desc}</p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1.5 text-white/50 text-[11px]">
                          <Users className="h-3.5 w-3.5" aria-hidden="true" />
                          {space.seats} seats
                        </div>
                        <span className="text-[10px] font-semibold bg-[#2E8B57]/20 text-green-400 px-2.5 py-0.5 rounded-full">Available</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 h-10 w-10 rounded-full bg-white shadow-lg border border-[#E4E7EE] flex items-center justify-center text-[#101828] hover:bg-slate-50 hover:scale-110 transition-all z-10 hidden md:flex" aria-label="Scroll spaces left" onClick={() => document.getElementById('space-scroll')?.scrollBy({ left: -300, behavior: 'smooth' })}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 h-10 w-10 rounded-full bg-white shadow-lg border border-[#E4E7EE] flex items-center justify-center text-[#101828] hover:bg-slate-50 hover:scale-110 transition-all z-10 hidden md:flex" aria-label="Scroll spaces right" onClick={() => document.getElementById('space-scroll')?.scrollBy({ left: 300, behavior: 'smooth' })}>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION — SERVICES + EVENTS + AI
           ═══════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <StaggerChildren className="grid grid-cols-1 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
              {/* Column 1: Library Services */}
              <StaggerItem>
                <ScaleOnHover>
                  <div className="bg-[#FAFAFA] border border-[#E4E7EE] rounded-[24px] p-7 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                    <PillHeader icon={BookCopy} label="Services" />
                    <h3 className="text-[20px] font-bold text-[#101828] mt-4 mb-1">Library Services</h3>
                    <p className="text-[15px] text-[#5B6376] mb-6">Everything you need — from borrowing books to booking spaces and accessing digital resources.</p>
                    <div className="grid grid-cols-3 gap-3 flex-1">
                      {services.map((svc, i) => (
                        <motion.div key={i} className="flex flex-col items-center text-center gap-2 p-2 rounded-xl hover:bg-white transition-colors" whileHover={{ y: -3 }}>
                          <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center"><svc.icon className="h-4 w-4" aria-hidden="true" /></div>
                          <span className="text-[11px] font-medium text-[#101828] leading-tight">{svc.label}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-5"><PillLink href="/services">View all services</PillLink></div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>

              {/* Column 2: Upcoming Events */}
              <StaggerItem>
                <ScaleOnHover>
                  <div className="bg-[#FAFAFA] border border-[#E4E7EE] rounded-[24px] p-7 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                    <PillHeader icon={Calendar} label="Events" />
                    <h3 className="text-[20px] font-bold text-[#101828] mt-4 mb-1">Upcoming Events</h3>
                    <p className="text-[15px] text-[#5B6376] mb-6">Workshops, author talks, debates, and research skills sessions happening soon.</p>
                    <div className="flex flex-col gap-4 flex-1">
                      {events.map((evt, i) => (
                        <motion.div key={i} className="flex items-start gap-3 group" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                          <div className="shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex flex-col items-center justify-center leading-none group-hover:bg-gold/20 transition-colors">
                            <span className="text-[16px] font-bold text-gold">{evt.day}</span>
                            <span className="text-[9px] font-semibold text-gold/70 uppercase">{evt.month}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[14px] font-bold text-[#101828] leading-tight truncate">{evt.title}</h4>
                            <p className="text-[12px] text-[#5B6376] mt-0.5 line-clamp-1">{evt.desc}</p>
                            <p className="text-[11px] text-[#5B6376] mt-0.5 flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{evt.time}</p>
                          </div>
                          <Button className="shrink-0 h-7 px-3 rounded-lg text-[11px] font-semibold bg-gold/10 text-gold hover:bg-gold hover:text-navy border-0 transition-colors">{evt.action}</Button>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-5"><PillLink href="/news#events">See full calendar</PillLink></div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>

              {/* Column 3: Ask Akamba AI */}
              <StaggerItem>
                <ScaleOnHover>
                  <div className="bg-[#FAFAFA] border border-[#E4E7EE] rounded-[24px] p-7 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                    <PillHeader icon={Sparkles} label="AI Assistant" />
                    <h3 className="text-[20px] font-bold text-[#101828] mt-4 mb-1">Ask Akamba AI</h3>
                    <p className="text-[15px] text-[#5B6376] mb-5">Your intelligent library assistant — available 24/7 to answer questions and guide your research.</p>
                    <div className="flex-1 bg-white border border-[#E4E7EE] rounded-[16px] p-4 flex flex-col gap-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <motion.div className="h-9 w-9 rounded-full bg-[#0B1A3B] flex items-center justify-center shrink-0" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
                          <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
                        </motion.div>
                        <div className="bg-[#F5F6FA] rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                          <p className="text-[13px] text-[#101828] leading-relaxed">Hello! I&apos;m Akamba AI. How can I help you today?</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {aiSuggestions.map((sug, i) => (
                          <motion.span key={i} className="text-[11px] bg-[#F5F6FA] border border-[#E4E7EE] text-[#5B6376] px-3 py-1.5 rounded-full cursor-pointer hover:border-gold/40 hover:text-gold hover:bg-gold/5 transition-all" whileHover={{ scale: 1.05 }}>{sug}</motion.span>
                        ))}
                      </div>
                      <div className="mt-auto flex gap-2">
                        <Input placeholder="Type your question…" className="flex-1 h-10 bg-[#F5F6FA] border-[#E4E7EE] text-[13px] rounded-xl placeholder:text-[#5B6376]/50 focus-visible:ring-gold" aria-label="Ask Akamba AI a question" />
                        <Button className="h-10 w-10 rounded-xl bg-gold hover:bg-gold-hover text-navy p-0 shrink-0" aria-label="Send question to Akamba AI"><Send className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            </StaggerChildren>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION — NEW ARRIVALS + NEWS PREVIEW
           ═══════════════════════════════════════════ */}
        <section className="py-24 bg-[#F5F6FA]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* New Arrivals */}
              <FadeIn direction="left">
                <div>
                  <PillHeader icon={BookPlus} label="New Arrivals" />
                  <h2 className="text-[28px] md:text-[34px] font-bold text-[#101828] tracking-tight mt-5 mb-4">Fresh Additions</h2>
                  <p className="text-[16px] text-[#5B6376] leading-relaxed mb-8">Recently acquired titles available for borrowing. New arrivals are displayed on a dedicated shelf near the entrance for the first two weeks.</p>
                  <div className="flex flex-col gap-4">
                    {newArrivals.map((book, i) => (
                      <motion.div key={i} className="bg-white border border-[#E4E7EE] rounded-[16px] p-5 flex items-start gap-4 hover:shadow-md hover:border-gold/20 transition-all" whileHover={{ x: 6 }}>
                        <div className="shrink-0 h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center"><BookOpen className="h-5 w-5" aria-hidden="true" /></div>
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-gold uppercase tracking-wider">{book.category}</span>
                          <h3 className="text-[15px] font-bold text-[#101828] mt-0.5">{book.title}</h3>
                          <p className="text-[13px] text-[#5B6376]">{book.author}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6"><PillLink href="/resources#suggested">Browse all resources</PillLink></div>
                </div>
              </FadeIn>

              {/* News Highlights */}
              <FadeIn direction="right">
                <div>
                  <PillHeader icon={Newspaper} label="Latest News" />
                  <h2 className="text-[28px] md:text-[34px] font-bold text-[#101828] tracking-tight mt-5 mb-4">News &amp; Updates</h2>
                  <p className="text-[16px] text-[#5B6376] leading-relaxed mb-8">Stay informed about schedule changes, new resources, events, and library notices. Check this page regularly for the latest updates.</p>
                  <div className="flex flex-col gap-4">
                    {newsHighlights.map((item, i) => (
                      <motion.div key={i} className="bg-white border border-[#E4E7EE] rounded-[16px] p-5 hover:shadow-md hover:border-gold/20 transition-all" whileHover={{ x: -6 }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[11px] font-bold text-[#5B6376]">{item.date}</span>
                          <span className="text-[10px] font-bold bg-gold/10 text-gold px-2 py-0.5 rounded-full">{item.tag}</span>
                        </div>
                        <h3 className="text-[15px] font-bold text-[#101828]">{item.title}</h3>
                        <p className="text-[14px] text-[#5B6376] leading-relaxed mt-1">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6"><PillLink href="/news">View all updates</PillLink></div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION — TESTIMONIALS
           ═══════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="flex items-start justify-between mb-14">
                <div>
                  <PillHeader icon={Quote} label="Testimonials" className="mb-4" />
                  <h2 className="text-[32px] md:text-[40px] font-bold text-[#101828] tracking-tight">What Our Community Says</h2>
                  <p className="text-[16px] text-[#5B6376] mt-3">Hear from students, teachers, and alumni who use the library every day.</p>
                </div>
                <div className="hidden md:flex items-center gap-6 mt-4">
                  <SatisfactionRing percentage={95} label="Student Satisfaction" />
                  <SatisfactionRing percentage={92} label="Would Recommend" />
                  <div className="hidden lg:flex items-center gap-2">
                    <button className="h-10 w-10 rounded-full bg-white shadow-lg border border-[#E4E7EE] flex items-center justify-center text-[#101828] hover:bg-slate-50 hover:scale-110 transition-all" aria-label="Previous testimonials" onClick={() => document.getElementById('testimonial-scroll')?.scrollBy({ left: -400, behavior: 'smooth' })}>
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button className="h-10 w-10 rounded-full bg-white shadow-lg border border-[#E4E7EE] flex items-center justify-center text-[#101828] hover:bg-slate-50 hover:scale-110 transition-all" aria-label="Next testimonials" onClick={() => document.getElementById('testimonial-scroll')?.scrollBy({ left: 400, behavior: 'smooth' })}>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div id="testimonial-scroll" className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
              {testimonials.map((t, i) => (
                <motion.div key={i} className="shrink-0 w-[380px] snap-start" whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[24px] p-7 flex flex-col gap-5 h-full">
                    <Quote className="h-8 w-8 text-gold/30" aria-hidden="true" />
                    <p className="text-[15px] text-[#101828] leading-relaxed italic flex-1">&ldquo;{t.quote}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-[#E4E7EE]">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 bg-slate-100">
                        <Image src={t.avatar} alt={`Photo of ${t.name}`} width={40} height={40} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-[#101828]">{t.name}</span>
                        <span className="text-[11px] text-[#5B6376]">{t.role}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-10" role="group" aria-label="Testimonial pagination">
              <motion.div className="h-2.5 w-2.5 rounded-full bg-gold" whileHover={{ scale: 1.3 }} />
              <motion.div className="h-2.5 w-2.5 rounded-full bg-[#E4E7EE] cursor-pointer hover:bg-gold/50" whileHover={{ scale: 1.3 }} />
              <motion.div className="h-2.5 w-2.5 rounded-full bg-[#E4E7EE] cursor-pointer hover:bg-gold/50" whileHover={{ scale: 1.3 }} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION — CONTACT CTA
           ═══════════════════════════════════════════ */}
        <section className="py-10 px-4">
          <div className="container mx-auto">
            <FadeIn>
              <div className="bg-[#0B1A3B] rounded-[24px] py-14 px-8 md:px-14 relative overflow-hidden">
                <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto relative z-10">
                  <PillHeaderLight icon={HelpCircle} label="Have Questions in mind?" />
                  <h2 className="text-[30px] md:text-[38px] font-bold text-white leading-tight tracking-tight">
                    Curious About Something?Reach out to us!
                  </h2>
                  <p className="text-[16px] text-white/50 leading-relaxed">
                    The library is open Monday to Friday, 7:30 AM to 6:00 PM, and Saturday 8:00 AM to 1:00 PM.
                    Located on General Waruinge Street, Nairobi. For urgent matters, call +254 727 531 001.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-6 mt-1">
                    <div className="flex items-center gap-2 text-white/40 text-[13px]"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />General Waruinge St</div>
                    <div className="flex items-center gap-2 text-white/40 text-[13px]"><Phone className="h-3.5 w-3.5" aria-hidden="true" />+254 727 531 001</div>
                    <div className="flex items-center gap-2 text-white/40 text-[13px]"><Mail className="h-3.5 w-3.5" aria-hidden="true" />info@stareheboyscentre.ac.ke</div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <Link href="/contact">
                      <Button className="h-12 px-6 font-bold text-[14px] bg-gold hover:bg-gold-hover text-navy rounded-full shadow-lg shadow-gold/20 transition-all gap-2">
                        Chat With Us <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button className="h-12 px-6 font-bold text-[14px] border border-white/20 bg-transparent text-white hover:bg-white/10 rounded-full transition-all">
                        About the Library
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button className="h-12 px-6 font-bold text-[14px] border border-white/20 bg-transparent text-white hover:bg-white/10 rounded-full transition-all">
                        Portal Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  )
}
