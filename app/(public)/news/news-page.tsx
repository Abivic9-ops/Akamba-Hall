'use client'

import { AlertTriangle, BookPlus, Calendar, AlertCircle, Megaphone, Bell, Archive, Clock, ArrowRight, Newspaper, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { FadeIn, StaggerChildren, StaggerItem, ScaleOnHover } from '@/components/motion'

const announcements = [
  { date: '14 Jul 2026', title: 'Library Hours Extended for Exam Period', desc: 'The library will remain open until 7:00 PM on weekdays during the exam preparation period. This extension applies to the reading hall and discussion rooms only. The computer lab closes at its regular time. Weekend hours remain unchanged. Students are encouraged to make use of the extended hours for revision and group study.', tag: 'Schedule' },
  { date: '10 Jul 2026', title: 'New E-Resource: JSTOR Access Now Available', desc: 'All registered members can now access JSTOR through the digital resources portal. This includes academic journals across multiple disciplines — humanities, social sciences, and sciences. JSTOR provides access to over 12 million academic journal articles, books, and primary sources. Access is available both on-campus and off-campus through the member portal.', tag: 'New' },
  { date: '05 Jul 2026', title: 'QR Card Replacement Notice', desc: 'Students with damaged or lost QR cards should visit the library desk this week for free replacements. Bring your student ID for verification. This week only — normal replacement fee of KES 200 is waived. After this period, replacements will resume at the standard fee. Each replacement takes approximately 5 minutes to process.', tag: 'Notice' },
]

const newArrivals = [
  { title: 'The Psychology of Money', author: 'Morgan Housel', category: 'Finance', desc: 'Timeless lessons on wealth, greed, and happiness. Housel explores the strange ways people think about money and teaches you how to make better sense of one of life\'s most important topics.' },
  { title: 'Educated', author: 'Tara Westover', category: 'Memoir', desc: 'A memoir about a young girl who leaves her survivalist family and goes on to earn a PhD from Cambridge University. A powerful story about the transformative power of education.' },
  { title: 'Atomic Habits', author: 'James Clear', category: 'Self-Development', desc: 'An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results. Applicable to study habits, personal discipline, and academic performance.' },
  { title: 'Wealth of Nations', author: 'Adam Smith', category: 'Economics', desc: 'The foundational work of modern economics. Smith\'s analysis of markets, division of labor, and free trade remains essential reading for anyone studying economics or business.' },
  { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', desc: 'A landmark volume in science writing that explores the universe — from the Big Bang to black holes. Hawisky makes complex physics accessible to the general reader.' },
  { title: 'The Art of War', author: 'Sun Tzu', category: 'Strategy', desc: 'An ancient Chinese military treatise that has become one of the most influential books on strategy and leadership. Applicable far beyond warfare — to business, sports, and personal development.' },
]

const events = [
  { date: '21 Jul', time: '9:00 AM – 4:00 PM', title: 'AI Literacy Week', desc: 'A week of workshops on artificial intelligence, data literacy, and responsible technology use. Sessions cover how AI works, its applications in education, and how students can use AI tools ethically. Open to all forms. Certificates of participation will be issued.', status: 'Open', audience: 'All Students' },
  { date: '28 Jul', time: '2:00 PM – 3:30 PM', title: 'Author Meet & Greet', desc: 'A local author discusses their writing process and answers student questions about publishing. The session includes a book signing and a Q&A on creative writing. Limited to 50 seats — register early.', status: 'Open', audience: 'All Students' },
  { date: '04 Aug', time: '3:00 PM – 5:00 PM', title: 'Debate Club: Library Edition', desc: 'Students debate the role of digital vs. physical libraries in modern education. Teams of 4 will argue for and against the motion. The audience votes on the winning team. Refreshments provided.', status: 'Open', audience: 'All Students' },
  { date: '11 Aug', time: '10:00 AM – 12:00 PM', title: 'Research Skills Workshop', desc: 'A hands-on session on finding, evaluating, and citing academic sources for school projects. Participants will practice searching the catalogue, evaluating source credibility, and formatting citations in APA and MLA. Bring your laptop if available.', status: 'Register', audience: 'Form 4 – 6' },
]

const notices = [
  { icon: AlertTriangle, text: 'The reading hall will be closed on 28 July for scheduled maintenance. Discussion rooms remain open. Students with bookings for that day will receive automatic rescheduling notifications through the portal.', date: '12 Jul' },
  { icon: Bell, text: 'All outstanding overdue books must be returned before the start of the new term. Accounts with unresolved overdues will be flagged and borrowing privileges suspended until the items are returned or the fine is paid.', date: '08 Jul' },
  { icon: AlertCircle, text: 'The computer lab will undergo software updates on 20 July. No bookings available that day. The lab will reopen on 21 July with updated software including the latest versions of Microsoft Office and reference management tools.', date: '05 Jul' },
]

const campaigns = [
  { title: 'Read 30 Challenge', desc: 'Read 30 books before the end of term. Track your progress on the portal and earn recognition at the term assembly. The challenge includes fiction, non-fiction, and academic reading. Participants who complete the challenge receive a certificate and a place on the Library Honour Board.', status: 'Active', progress: 'Week 6 of 12' },
  { title: 'New Member Welcome Week', desc: 'New students are invited to a library orientation session. Learn how to borrow, book spaces, and use digital resources. The session covers the library rules, the QR card system, and the member portal. Attendance is compulsory for all Form 1 students.', status: 'Upcoming', progress: 'Starts 28 Jul' },
]

export default function NewsPageClient() {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <FadeIn>
        <section className="bg-[#0B1A3B] py-20 px-4 pb-32">
          <div className="container mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 bg-gold/10 text-gold text-[13px] font-medium uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Newspaper className="h-3 w-3" aria-hidden="true" />
              Stay Informed
            </span>
            <h1 className="text-[40px] md:text-[52px] font-medium text-white mt-5 leading-tight tracking-tight">
              News &amp; Updates
            </h1>
            <p className="text-[16px] md:text-[17px] text-white/50 mt-5 max-w-2xl mx-auto leading-relaxed">
              Announcements, new arrivals, events, notices, and reading campaigns — everything happening at the library right now. Check this page regularly to stay informed about schedule changes, new resources, and upcoming events.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Separator */}
      <div className="w-full bg-[#0B1A3B]">
        <div className="container mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>
      </div>

      {/* Quick anchor nav - mini navbar */}
      <div className="sticky top-0 z-50 w-full bg-white py-3 border-b border-[#E4E7EE]">
        <div className="flex items-center justify-center px-4">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {['#announcements', '#arrivals', '#events', '#notices', '#campaigns'].map((id) => (
              <a key={id} href={id} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#E4E7EE] bg-[#F5F6FA] text-[12px] sm:text-[13px] font-medium text-[#5B6376] hover:bg-gold hover:text-navy hover:border-gold transition-all capitalize">
                {id.replace('#', '').replace('-', ' ')}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements */}
      <section id="announcements" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
              <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
              Announcements
            </span>
          </div>
          <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Latest Announcements</h2>
          <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
            Important updates from the library team. These announcements affect borrowing, access, scheduling, and available resources. Read each one carefully to understand how it may affect your library use.
          </p>
          <StaggerChildren className="flex flex-col gap-6">
            {announcements.map((a, i) => (
              <StaggerItem key={i}>
                <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[20px] p-7 flex flex-col sm:flex-row gap-5 hover:shadow-md transition-shadow">
                  <div className="shrink-0 flex flex-col items-center w-20 h-20 rounded-2xl bg-gold/10 justify-center">
                    <span className="text-[13px] font-medium text-gold/70 uppercase">
                      {a.date.split(' ')[1]}
                    </span>
                    <span className="text-[18px] font-medium text-gold leading-none">
                      {a.date.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-[17px] font-medium text-[#101828]">{a.title}</h3>
                      <span className="text-[13px] font-medium bg-gold/10 text-gold px-2.5 py-0.5 rounded-full">{a.tag}</span>
                    </div>
                    <p className="text-[15px] text-[#5B6376] leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* New Arrivals */}
      <section id="arrivals" className="py-24 px-4 bg-[#F5F6FA]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 bg-white/80 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
              <BookPlus className="h-3.5 w-3.5" aria-hidden="true" />
              New Arrivals
            </span>
          </div>
          <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">New Arrivals</h2>
          <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
            Fresh additions to the library collection. These books have been recently acquired and are available for borrowing. New arrivals are displayed on a dedicated shelf near the entrance for the first two weeks after acquisition.
          </p>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivals.map((book, i) => (
              <StaggerItem key={i}>
                <ScaleOnHover>
                  <div className="bg-white border border-[#E4E7EE] rounded-[20px] p-7 flex flex-col gap-3 hover:shadow-lg hover:border-gold/30 transition-all duration-300">
                    <span className="text-[13px] font-medium text-gold uppercase tracking-wider">{book.category}</span>
                    <h3 className="text-[17px] font-medium text-[#101828]">{book.title}</h3>
                    <p className="text-[13px] text-[#5B6376]">{book.author}</p>
                    <p className="text-[14px] text-[#5B6376] leading-relaxed mt-1">{book.desc}</p>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <div className="text-center mt-12">
            <Link href="/resources#suggested" className="inline-flex items-center gap-2 text-[15px] font-medium text-gold hover:underline">
              View all resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              Events Calendar
            </span>
          </div>
          <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Events Calendar</h2>
          <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
            Upcoming events at the library. Register through the portal to secure your spot. Events fill up quickly — register early to avoid missing out. All events are free for registered library members.
          </p>
          <StaggerChildren className="flex flex-col gap-5">
            {events.map((evt, i) => (
              <StaggerItem key={i}>
                <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[20px] p-7 flex items-start gap-5 hover:shadow-md transition-shadow">
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-gold/10 flex flex-col items-center justify-center leading-none">
                    <span className="text-[18px] font-medium text-gold">{evt.date.split(' ')[1]}</span>
                    <span className="text-[13px] font-medium text-gold/70 uppercase">{evt.date.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[17px] font-medium text-[#101828]">{evt.title}</h3>
                      <span className="text-[13px] font-medium bg-[#0B1A3B]/10 text-[#0B1A3B] px-2 py-0.5 rounded-full">{evt.audience}</span>
                    </div>
                    <p className="text-[13px] text-[#5B6376] flex items-center gap-1.5 mb-2">
                      <Clock className="h-3 w-3" aria-hidden="true" /> {evt.time}
                    </p>
                    <p className="text-[15px] text-[#5B6376] leading-relaxed">{evt.desc}</p>
                  </div>
                  <span className="shrink-0 text-[13px] font-medium bg-gold/10 text-gold px-3 py-1 rounded-full">
                    {evt.status}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Notices */}
      <section id="notices" className="py-24 px-4 bg-[#F5F6FA]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 bg-white/80 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Library Notices
            </span>
          </div>
          <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Library Notices</h2>
          <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
            Operational notices that affect library access, services, and availability. These notices are time-sensitive — read them promptly and follow the instructions provided.
          </p>
          <StaggerChildren className="flex flex-col gap-5">
            {notices.map((n, i) => (
              <StaggerItem key={i}>
                <div className="bg-white border border-[#E4E7EE] rounded-[20px] p-7 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                    <n.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] text-[#101828] leading-relaxed">{n.text}</p>
                    <span className="text-[13px] text-[#5B6376] mt-2 block">Published: {n.date}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Reading Campaigns */}
      <section id="campaigns" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              Reading Campaigns
            </span>
          </div>
          <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Reading Campaigns</h2>
          <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
            Programme initiatives designed to build reading habits, encourage exploration of the collection, and reward consistent library use. Participation is open to all registered members.
          </p>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {campaigns.map((c, i) => (
              <StaggerItem key={i}>
                <ScaleOnHover>
                  <div className="bg-[#0B1A3B] rounded-[20px] p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[18px] font-medium text-white">{c.title}</h3>
                      <span className="text-[13px] font-medium bg-gold/20 text-gold px-3 py-1 rounded-full">{c.status}</span>
                    </div>
                    <p className="text-[15px] text-white/50 leading-relaxed">{c.desc}</p>
                    <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/10">
                      <Clock className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                      <span className="text-[13px] text-white/40">{c.progress}</span>
                    </div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Archive hint */}
      <FadeIn>
        <section className="py-16 px-4 bg-[#F5F6FA]">
          <div className="container mx-auto max-w-5xl text-center">
            <Archive className="h-6 w-6 text-[#5B6376] mx-auto mb-4" aria-hidden="true" />
            <p className="text-[15px] text-[#5B6376] max-w-xl mx-auto leading-relaxed">
              Looking for older updates? Past announcements and notices are archived and available on request at the library desk. Ask any library staff member for access to historical announcements.
            </p>
          </div>
        </section>
      </FadeIn>
    </div>
  )
}
