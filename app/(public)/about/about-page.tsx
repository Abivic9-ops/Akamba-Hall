'use client'

import { BookOpen, Users, Shield, Eye, Heart, Target, Award, Scale, Lock, Handshake, ArrowRight, CheckCircle, GraduationCap, Globe, Library, Building2, History } from 'lucide-react'
import { FadeIn, StaggerChildren, StaggerItem, ScaleOnHover } from '@/components/motion'

const values = [
  { icon: Scale, title: 'Order', desc: 'Every process,from borrowing to space use ,runs on clear rules. Order protects everyone\'s access and keeps the library running well. When order is maintained, every student knows what they can access, when, and how.' },
  { icon: Handshake, title: 'Accessibility', desc: 'All approved members can use the library\'s resources. We remove barriers to reading, research, and study wherever we can. The library does not discriminate — it serves every student who follows the rules.' },
  { icon: Shield, title: 'Accountability', desc: 'Every book, every space, every visit is tracked. Accountability builds trust between the library and the community it serves. When members know their actions are recorded, they take better care of shared resources.' },
  { icon: Lock, title: 'Privacy', desc: 'Member records, reading history, and personal data are handled with care. Your information is protected at every level. The library system logs activity for governance, not surveillance.' },
  { icon: Heart, title: 'Service', desc: 'The library exists to serve the school community. Every policy, tool, and process is built around making your learning experience better. Service means putting the student\'s needs first — always.' },
]

const serves = [
  { icon: GraduationCap, title: 'Students', desc: 'The primary users — borrowing books, reserving spaces, accessing digital resources, and building reading habits that last beyond school. Every Form 1 student receives a library orientation during their first week. By Form 4, most students have developed independent research skills through regular library use.' },
  { icon: Users, title: 'Teachers & Staff', desc: 'Research support, classroom materials, professional reading, and event coordination through the library system. Teachers can request bulk reservations for class study sessions, access curriculum-aligned resource lists, and collaborate with librarians on subject-specific collections.' },
  { icon: Shield, title: 'School Leadership', desc: 'Governance data, usage reports, policy enforcement, and role-based access that supports institutional oversight. The library dashboard provides real-time data on borrowing patterns, space utilization, and member engagement — helping leadership make informed decisions.' },
  { icon: Globe, title: 'Approved Visitors', desc: 'Alumni, partners, and guests who are granted library access for research, events, or academic purposes. Visitors must be pre-registered and sponsored by a staff member. Access is time-limited and scope-restricted.' },
]

const history = [
  { year: '1959', event: 'Starehe Boys\' Centre founded by Geoffrey William Griffin, Geoffrey Gatama Geturo, and Joseph Kamiru Gikubu as a rescue home for boys displaced by Kenya\'s independence struggle.' },
  { year: '1960s', event: 'The school library begins as a small collection of donated books in a single room. Teachers manage the collection alongside their teaching duties.' },
  { year: '1970s', event: 'As student numbers grow, the library expands into a dedicated space. The first formal borrowing system is introduced using paper cards.' },
  { year: '1980s', event: 'The library collection grows to over 3,000 volumes. A part-time librarian is appointed. Reading programmes are introduced to encourage regular library use.' },
  { year: '2000s', event: 'The library undergoes major renovations. Computer workstations are added. The first digital catalogue is introduced, replacing the card-based system.' },
  { year: '2010s', event: 'Akamba Hall Library is named and formally established. The library adopts an integrated library management system. QR-coded access cards replace paper-based borrowing.' },
  { year: '2020s', event: 'Digital transformation accelerates. E-resources, online catalogue search, space booking through the portal, and AI-assisted research support are introduced. The library serves over 2,100 active members.' },
]

const milestones = [
  { number: '65+', label: 'Years of Service', desc: 'Serving the Starehe community since 1959' },
  { number: '15,000+', label: 'Alumni Network', desc: 'Old Boys serving in leadership worldwide' },
  { number: '8,400+', label: 'Books & Resources', desc: 'Physical and digital materials available' },
  { number: '2,100+', label: 'Active Members', desc: 'Students and staff using the library regularly' },
]

export default function AboutPageClient() {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="bg-[#0B1A3B] py-20 px-4 pb-28">
        <FadeIn delay={0} direction="up" duration={0.6}>
          <div className="container mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 bg-gold/10 text-gold text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
              <BookOpen className="h-3 w-3" aria-hidden="true" />
              About the Library
            </span>
            <h1 className="text-[40px] md:text-[52px] font-bold text-white mt-5 leading-tight tracking-tight">
              Akamba Hall Library
            </h1>
            <p className="text-[16px] md:text-[17px] text-white/50 mt-5 max-w-2xl mx-auto leading-relaxed">
              The central library hub of Starehe Boys&apos; Centre ;a place for reading, research, discipline, and responsible access to knowledge. Built on a legacy of service that stretches back to 1959.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Separator */}
      <div className="mx-4 h-px bg-gradient-to-r from-gold/0 via-gold/35 to-gold/0 sm:mx-6 lg:mx-8" />

      {/* Quick anchor nav - mini navbar */}
      <div className="sticky top-[72px] z-40 w-full border-b border-[#E4E7EE] bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {['#mission', '#history', '#identity', '#who-we-serve', '#values', '#leadership'].map((id) => (
              <a key={id} href={id} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#E4E7EE] bg-[#F5F6FA] text-[11px] sm:text-[12px] font-semibold text-[#5B6376] hover:bg-gold hover:text-navy hover:border-gold transition-all capitalize shrink-0">
                {id.replace('#', '').replace('-', ' ')}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <section id="mission" className="py-24 px-4">
        <FadeIn delay={0.1} direction="up" duration={0.6}>
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[12px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <Target className="h-3.5 w-3.5" aria-hidden="true" />
                Our Mission
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-8">
              <div>
                <h2 className="text-[30px] md:text-[36px] font-bold text-[#101828] leading-tight">
                  Built to support learning, reading, and discipline
                </h2>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-[16px] text-[#5B6376] leading-relaxed">
                  Akamba Hall Library exists to support the academic life of Starehe Boys&apos; Centre. It provides supervised access to books, journals, digital resources, and study spaces — all managed through systems that enforce order, protect privacy, and make resources available to those who need them.
                </p>
                <p className="text-[16px] text-[#5B6376] leading-relaxed">
                  The library is a structured service environment where borrowing, reservations, space use, and event participation all follow clear processes. Every member knows what they can access, how to access it, and what is expected of them.
                </p>
                <p className="text-[16px] text-[#5B6376] leading-relaxed">
                  Our purpose is to build a reading culture, support research, and give every student the tools to perform well academically — within a system that teaches responsibility and respect for shared resources.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* History Timeline */}
      <section id="history" className="py-24 px-4 bg-[#F5F6FA]">
        <div className="container mx-auto max-w-5xl">
          <FadeIn delay={0.1} direction="up" duration={0.6}>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[12px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <History className="h-3.5 w-3.5" aria-hidden="true" />
                Our History
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-bold text-[#101828] mt-6 mb-4">
              From Tin Huts to a Digital Library
            </h2>
            <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
              Starehe Boys&apos; Centre was founded in 1959 by Geoffrey William Griffin, Geoffrey Gatama Geturo, and Joseph Kamiru Gikubu as a rescue home for boys displaced by Kenya&apos;s independence struggle. What began with 17 homeless boys in tin huts donated by Kenya Shell Oil Company has grown into one of Kenya&apos;s most respected educational institutions — and Akamba Hall Library is at its academic heart.
            </p>
          </FadeIn>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[#E4E7EE]" />

            <StaggerChildren className="flex flex-col gap-8" staggerDelay={0.08}>
              {history.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-5 relative">
                    {/* Dot */}
                    <div className="shrink-0 w-10 h-10 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center z-10">
                      <span className="text-[10px] font-bold text-gold">{item.year.slice(-2)}</span>
                    </div>
                    <div className="bg-white border border-[#E4E7EE] rounded-[16px] p-5 flex-1 hover:shadow-md transition-shadow">
                      <span className="text-[13px] font-bold text-gold">{item.year}</span>
                      <p className="text-[16px] text-[#101828] mt-1 leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>

          {/* Milestones */}
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16" staggerDelay={0.08}>
            {milestones.map((m, i) => (
              <StaggerItem key={i}>
                <ScaleOnHover scale={1.03}>
                  <div className="bg-white border border-[#E4E7EE] rounded-[16px] p-6 text-center">
                    <span className="text-[32px] font-extrabold text-gold leading-none">{m.number}</span>
                    <h3 className="text-[14px] font-bold text-[#101828] mt-2">{m.label}</h3>
                    <p className="text-[13px] text-[#5B6376] mt-1">{m.desc}</p>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Identity */}
      <section id="identity" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <FadeIn delay={0.1} direction="up" duration={0.6}>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[12px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                Library Identity
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-bold text-[#101828] mt-6 mb-4">
              What Akamba Hall Is
            </h2>
            <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
              Akamba Hall Library is more than a building. It is a structured environment where every element — from the layout of the shelves to the design of the digital portal — is built to support learning, enforce discipline, and give every student fair access to knowledge.
            </p>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {[
              { icon: BookOpen, title: 'Academic Support Centre', desc: 'A place where students access textbooks, reference materials, past papers, and digital resources to support classroom learning and independent study. The library\'s collection is aligned with the Kenyan curriculum and supplemented with materials for wider reading.', color: 'bg-gold/10 text-gold' },
              { icon: Users, title: 'Community Hub', desc: 'A shared space where students, teachers, and staff interact around knowledge — through reading, research, events, and collaborative projects. The library hosts author talks, research workshops, reading competitions, and orientation sessions throughout the school term.', color: 'bg-[#5B9BD5]/10 text-[#5B9BD5]' },
              { icon: Award, title: 'Discipline Framework', desc: 'A system that teaches responsibility. Borrowing rules, overdue policies, QR access, and space bookings all build habits of accountability. The library trains students to manage time, respect deadlines, and care for shared resources.', color: 'bg-[#2E8B57]/10 text-[#2E8B57]' },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <ScaleOnHover scale={1.03}>
                  <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[20px] p-7 flex flex-col gap-5 hover:shadow-lg hover:border-gold/30 transition-all duration-300">
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center ${item.color}`}>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-[18px] font-bold text-[#101828]">{item.title}</h3>
                    <p className="text-[16px] text-[#5B6376] leading-relaxed">{item.desc}</p>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Who We Serve */}
      <section id="who-we-serve" className="py-24 px-4 bg-[#F5F6FA]">
        <div className="container mx-auto max-w-5xl">
          <FadeIn delay={0.1} direction="up" duration={0.6}>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[12px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Who We Serve
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-bold text-[#101828] mt-6 mb-4">
              Built for the Starehe Community
            </h2>
            <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
              Akamba Hall Library serves every member of the Starehe Boys&apos; Centre community. Each user group has different needs, different permissions, and different ways of interacting with the library. The system is designed to serve them all — fairly, efficiently, and securely.
            </p>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
            {serves.map((item, i) => (
              <StaggerItem key={i}>
                <ScaleOnHover scale={1.03}>
                  <div className="bg-white border border-[#E4E7EE] rounded-[20px] p-7 flex flex-col gap-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-[18px] font-bold text-[#101828]">{item.title}</h3>
                    </div>
                    <p className="text-[16px] text-[#5B6376] leading-relaxed">{item.desc}</p>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <FadeIn delay={0.1} direction="up" duration={0.6}>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[12px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                Our Values
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-bold text-[#101828] mt-6 mb-4">
              What Guides Every Decision
            </h2>
            <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
              These values are not decorative. They are embedded in every policy, every process, and every interaction at Akamba Hall Library. When you borrow a book, reserve a space, or access a digital resource, these values are at work behind the scenes.
            </p>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {values.map((v, i) => (
              <StaggerItem key={i}>
                <ScaleOnHover scale={1.03}>
                  <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[20px] p-7 flex flex-col gap-4 hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                      <v.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-[18px] font-bold text-[#101828]">{v.title}</h3>
                    <p className="text-[16px] text-[#5B6376] leading-relaxed">{v.desc}</p>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Digital Platform */}
      <section className="py-24 px-4 bg-[#F5F6FA]">
        <div className="container mx-auto max-w-5xl">
          <FadeIn delay={0.1} direction="up" duration={0.6}>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[12px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                Digital Platform
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-bold text-[#101828] mt-6 mb-4">
              How the System Supports the Library
            </h2>
            <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
              The library runs on an integrated digital platform that handles everything from borrowing to space reservations. This system reduces manual work, eliminates guesswork, and gives every member a clear view of what is available and what is expected of them.
            </p>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.08}>
            {[
              { label: 'Circulation', desc: 'Borrowing, returns, renewals, and overdue tracking — all managed digitally for speed and accuracy. The system enforces loan limits automatically and sends reminders before due dates.', icon: BookOpen },
              { label: 'Bookings', desc: 'Students reserve study seats, discussion rooms, and equipment through the portal, reducing congestion and conflict. Bookings are confirmed instantly and tracked in real time.', icon: Target },
              { label: 'Announcements', desc: 'The library posts updates, schedule changes, new arrivals, and event notices so the community stays informed without asking staff. Announcements are also displayed on screens at the library entrance.', icon: Eye },
              { label: 'QR Access', desc: 'Each member has a QR-coded access card. Tap to enter, tap to borrow. Fast, contactless, and secure. The card also serves as identification for space bookings and event registration.', icon: Shield },
              { label: 'Self-Service', desc: 'Members check their loan status, booking history, and account details through the portal — no queues, no paperwork. The portal also shows real-time availability of study spaces.', icon: Users },
              { label: 'AI Research Support', desc: 'The Akamba AI assistant helps students find books, format citations, and navigate the catalogue. It handles routine questions so library staff can focus on deeper research support.', icon: Library },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <ScaleOnHover scale={1.03}>
                  <div className="bg-white border border-[#E4E7EE] rounded-[16px] p-6 flex gap-4 hover:shadow-md transition-shadow">
                    <div className="shrink-0 h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-[#101828]">{item.label}</h3>
                      <p className="text-[15px] text-[#5B6376] leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-24 px-4 bg-[#0B1A3B]">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn delay={0.1} direction="up" duration={0.6}>
            <span className="inline-flex items-center gap-2 bg-gold/10 text-gold text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Shield className="h-3 w-3" aria-hidden="true" />
              Library Leadership
            </span>
            <h2 className="text-[30px] md:text-[36px] font-bold text-white mt-6">
              Governance Through the System
            </h2>
            <p className="text-[16px] text-white/50 mt-5 max-w-2xl mx-auto leading-relaxed">
              Akamba Hall Library operates under a role-based access model. Students, teachers, library staff, desk officers, and school executives each have defined permissions. The system supports governance by logging activity, enforcing rules, and giving leadership the data they need to make decisions.
            </p>
            <p className="text-[16px] text-white/50 mt-4 max-w-2xl mx-auto leading-relaxed">
              This structure ensures that the library is not only a place of learning but also a model of institutional order — reflecting the values that Starehe Boys&apos; Centre has upheld since 1959. The Starehe Way — integrity, discipline, service, and excellence — runs through every layer of the library&apos;s operations.
            </p>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12" staggerDelay={0.1}>
            {[
              { title: 'Students', desc: 'Borrow, reserve, access digital resources, attend events' },
              { title: 'Library Staff', desc: 'Manage collections, approve bookings, handle circulation' },
              { title: 'Leadership', desc: 'View reports, enforce policy, oversee operations' },
            ].map((role, i) => (
              <StaggerItem key={i}>
                <ScaleOnHover scale={1.03}>
                  <div className="bg-[#13285A] border border-white/5 rounded-[16px] p-6 text-center">
                    <h3 className="text-[16px] font-bold text-white">{role.title}</h3>
                    <p className="text-[14px] text-white/50 mt-2">{role.desc}</p>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </div>
  )
}
