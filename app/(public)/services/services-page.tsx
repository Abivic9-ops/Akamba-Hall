'use client'

import { BookCopy, Calendar, Laptop, Newspaper, CalendarDays, Headphones, Bell, ArrowRight, Clock, AlertCircle, CheckCircle2, Search, CreditCard, RotateCcw, AlertTriangle, Users, Monitor, FileText, Star } from 'lucide-react'
import Link from 'next/link'
import { FadeIn, StaggerChildren, StaggerItem, ScaleOnHover } from '@/components/motion'

const services = [
  {
    id: 'borrowing',
    icon: BookCopy,
    title: 'Borrowing & Returns',
    desc: 'The core function of any library. Akamba Hall Library uses a QR-coded access system that makes borrowing fast, trackable, and fair. Every book borrowed is logged, every return is recorded, and every overdue triggers a reminder.',
    items: [
      { heading: 'How Borrowing Works', text: 'Scan your QR card at the desk or self-check station. Choose your book, confirm the loan, and you will see the due date on your screen. Standard loan periods follow school library policy — typically 7 to 14 days depending on the item type. Textbooks may have shorter loan periods during peak revision seasons.' },
      { heading: 'Renewals', text: 'If you need more time, renew through the member portal before the due date. Renewals are allowed if no one else has placed a hold on the same item. You will see your updated due date immediately. Most items can be renewed up to twice, provided no holds exist.' },
      { heading: 'Overdue Handling', text: 'Overdue items trigger automatic reminders through the system — first at 3 days before due, then on the due date, then daily after. Persistent overdue items may result in borrowing restrictions. Return on time to keep your account in good standing and your access uninterrupted.' },
      { heading: 'Loan Rules', text: 'Loan limits, item types, and borrowing periods are set by library policy. The system enforces these limits automatically — you will be notified if you try to exceed them. Students may borrow up to 3 books at a time. Teachers and staff have extended borrowing privileges.' },
    ],
    steps: [
      { step: 1, title: 'Search', desc: 'Find your book through the catalogue or on the shelves', icon: Search },
      { step: 2, title: 'Scan', desc: 'Present your QR card at the circulation desk', icon: CreditCard },
      { step: 3, title: 'Confirm', desc: 'Verify the loan details and due date on screen', icon: CheckCircle2 },
      { step: 4, title: 'Borrow', desc: 'Take the book. Due date reminder is set automatically', icon: BookCopy },
    ],
  },
  {
    id: 'bookings',
    icon: Calendar,
    title: 'Space Bookings',
    desc: 'Study spaces are limited and in high demand. The booking system ensures fair access — first come, first served, with clear rules that prevent hoarding and no-shows.',
    items: [
      { heading: 'Study Seats', text: 'Reserve a reading hall seat through the portal. Choose your preferred time slot and confirm. Your seat is held until 15 minutes after the booking start time — after which it becomes available to others. The reading hall seats 80 students and is the most popular space in the library.' },
      { heading: 'Discussion Rooms', text: 'Book a discussion room for group study sessions. Rooms accommodate 4 to 12 students depending on the space. Add your group members to the booking so everyone gets access. Discussion rooms are equipped with whiteboards and power outlets.' },
      { heading: 'AVR & Boardroom', text: 'The AV Presentation Room and boardroom can be booked for presentations, seminars, and meetings. These spaces require advance booking and staff approval. The AVR seats 40 and includes a projector, screen, and sound system.' },
      { heading: 'Cancellation Policy', text: 'Cancel bookings at least 2 hours before the start time through the portal. Repeated no-shows (3 or more in a term) may limit your future booking access. The system tracks your booking history and flags patterns of misuse.' },
    ],
    steps: [
      { step: 1, title: 'Choose', desc: 'Select your space type and preferred time slot', icon: Calendar },
      { step: 2, title: 'Reserve', desc: 'Confirm your booking through the member portal', icon: CheckCircle2 },
      { step: 3, title: 'Arrive', desc: 'Check in within 15 minutes of your booking start time', icon: Clock },
      { step: 4, title: 'Use', desc: 'Study, collaborate, and return the space in good condition', icon: Users },
    ],
  },
  {
    id: 'equipment',
    icon: Laptop,
    title: 'Equipment Lending',
    desc: 'Academic equipment is available for loan — laptops, projectors, chargers, tablets, and other tools that support learning. Equipment lending follows stricter terms than book borrowing because of the value and fragility of the items.',
    items: [
      { heading: 'Available Equipment', text: 'Laptops, projectors, chargers, tablets, and other academic equipment can be borrowed through the library. Equipment lending follows stricter terms than book borrowing. Available items are listed on the portal with photos and condition notes.' },
      { heading: 'Eligibility', text: 'Equipment lending is available to students with active accounts and no outstanding overdue items. Teachers and staff may borrow equipment for academic use with departmental approval. A refundable deposit may be required for high-value items.' },
      { heading: 'Return & Condition', text: 'Equipment must be returned on the agreed date and in the condition it was issued. Report any damage at the time of borrowing. Late returns or damage may result in restricted access or replacement costs. All equipment is checked before and after each loan.' },
    ],
  },
  {
    id: 'newspapers',
    icon: Newspaper,
    title: 'Newspapers & Periodicals',
    desc: 'Daily newspapers and weekly periodicals keep the school community informed about current affairs. These materials stay in the library — they are for in-house reading only.',
    items: [
      { heading: 'Reading Access', text: 'Daily newspapers and weekly periodicals are available in the reading hall. These items do not leave the library — they are for in-house reading only. A dedicated newspaper rack is positioned near the entrance for easy access.' },
      { heading: 'Reading Accountability', text: 'Readers sign in for each newspaper or periodical issue they access. This tracking helps the library manage inventory and ensure materials are available to all. Sign-in is done through the QR card at the newspaper station.' },
      { heading: 'Issue Tracking', text: 'Each physical issue is logged and tracked. If an issue is missing or damaged, the system records it for follow-up. Report any issues you find to the library desk. The library maintains a 30-day archive of newspapers for reference.' },
    ],
  },
  {
    id: 'events',
    icon: CalendarDays,
    title: 'Events & Attendance',
    desc: 'The library hosts events that build skills, introduce new ideas, and bring the school community together around knowledge.',
    items: [
      { heading: 'What Happens', text: 'The library hosts reading competitions, author talks, research workshops, orientations, and awareness campaigns throughout the school term. Events are announced on the News & Updates page and through the portal. Major events include AI Literacy Week, Author Meet & Greet, and the Read 30 Challenge.' },
      { heading: 'Signing In', text: 'Register for events through the portal. On the day, sign in using your QR card. Attendance is tracked for record-keeping and to plan future events. Students who attend 80% or more of a term\'s events receive recognition at the term assembly.' },
      { heading: 'Open vs. Invited', text: 'Some events are open to all members. Others are limited to specific groups — for example, Form 6 students or staff. Check the event listing for eligibility. The library also hosts inter-school events in partnership with other institutions.' },
    ],
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'Support Services',
    desc: 'The library team is available to help with anything — from finding a book to recovering a lost account. No question is too small, and no problem is ignored.',
    items: [
      { heading: 'Help Desk', text: 'The library help desk handles day-to-day questions — account issues, borrowing problems, booking assistance, and general guidance. Visit the desk or submit a request through the portal. The help desk is staffed during all library opening hours.' },
      { heading: 'Ask a Librarian', text: 'Need help finding a book, a research source, or the right citation format? Use the Ask a Librarian feature on the portal or the AI assistant for quick answers. For deeper research support, book a one-on-one session with a librarian.' },
      { heading: 'Lost Card Assistance', text: 'Lost your QR access card? Report it through the portal immediately. A replacement will be issued after verification. Your old card is deactivated to prevent misuse. Replacement cards are issued at the library desk during working hours.' },
      { heading: 'Notifications', text: 'The system sends reminders for due dates, upcoming bookings, hold pickups, and event invitations. Check your portal notifications regularly to stay informed. Notifications are also sent via SMS for urgent items like overdue alerts.' },
    ],
  },
]

const reminders = [
  { icon: Clock, text: 'Return books by the due date to avoid borrowing restrictions. Overdue fines are KES 10 per day per item.' },
  { icon: AlertCircle, text: 'Cancel bookings at least 2 hours before the start time. Three no-shows in a term limits your booking access.' },
  { icon: CheckCircle2, text: 'Report lost cards immediately through the portal. Your old card is deactivated to prevent unauthorized use.' },
  { icon: Bell, text: 'Check your notifications regularly for reminders, event invitations, and schedule changes.' },
]

export default function ServicesPageClient() {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <FadeIn>
        <section className="bg-[#0B1A3B] py-20 px-4 pb-32">
          <div className="container mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 bg-gold/10 text-gold text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
              <BookCopy className="h-3 w-3" aria-hidden="true" />
              What You Can Do
            </span>
            <h1 className="text-[40px] md:text-[52px] font-bold text-white mt-5 leading-tight tracking-tight">
              Library Services
            </h1>
            <p className="text-[16px] md:text-[17px] text-white/50 mt-5 max-w-2xl mx-auto leading-relaxed">
              Borrow books, reserve spaces, lend equipment, attend events, and get support — everything you need to make the library work for you. Every service follows clear rules designed to ensure fair access for all members.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Separator */}
      <div className="mx-4 h-px bg-gradient-to-r from-gold/0 via-gold/35 to-gold/0 sm:mx-6 lg:mx-8" />

      {/* Quick anchor nav - mini navbar */}
      <div className="sticky top-[80px] z-40 w-full border-b border-[#E4E7EE] bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {services.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#E4E7EE] bg-[#F5F6FA] text-[11px] sm:text-[12px] font-semibold text-[#5B6376] hover:bg-gold hover:text-navy hover:border-gold transition-all shrink-0">
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      {services.map((service, i) => (
        <FadeIn key={service.id} delay={0.1} direction="up" duration={0.6}>
          <section
            id={service.id}
            className={`py-24 px-4 ${i % 2 === 1 ? 'bg-[#F5F6FA]' : ''}`}
          >
            <div className="container mx-auto max-w-5xl">
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center gap-2 ${i % 2 === 1 ? 'bg-white/80' : 'bg-[#0B1A3B]/5'} text-[#0B1A3B] text-[12px] font-bold uppercase tracking-widest px-4 py-2 rounded-full`}>
                  <service.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {service.title}
                </span>
              </div>
              <h2 className="text-[30px] md:text-[36px] font-bold text-[#101828] mt-6 mb-3">{service.title}</h2>
              <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">{service.desc}</p>

              {/* Step-by-step flow */}
              {service.steps && (
                <div className="mb-12">
                  <h3 className="text-[18px] font-bold text-[#101828] mb-6">How It Works</h3>
                  <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
                    {service.steps.map((s, j) => (
                      <StaggerItem key={j}>
                        <ScaleOnHover scale={1.03}>
                          <div className="relative bg-white border border-[#E4E7EE] rounded-[16px] p-6 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                            {/* Step number */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-7 w-7 rounded-full bg-gold text-navy text-[11px] font-bold flex items-center justify-center shadow-sm">
                              {s.step}
                            </div>
                            <div className="h-12 w-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mt-2">
                              <s.icon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <h4 className="text-[15px] font-bold text-[#101828]">{s.title}</h4>
                            <p className="text-[14px] text-[#5B6376] leading-relaxed">{s.desc}</p>
                          </div>
                        </ScaleOnHover>
                      </StaggerItem>
                    ))}
                  </StaggerChildren>
                  {/* Connector arrows between steps */}
                  <div className="hidden lg:flex justify-center gap-0 mt-[-140px] mb-[100px] pointer-events-none">
                    {service.steps.slice(0, -1).map((_, j) => (
                      <div key={j} className="flex-1 flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-gold/40" aria-hidden="true" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detail cards */}
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
                {service.items.map((item, j) => (
                  <StaggerItem key={j}>
                    <ScaleOnHover scale={1.03}>
                      <div className="bg-white border border-[#E4E7EE] rounded-[16px] p-7 hover:shadow-md transition-shadow">
                        <h3 className="text-[16px] font-bold text-[#101828] mb-3">{item.heading}</h3>
                        <p className="text-[15px] text-[#5B6376] leading-relaxed">{item.text}</p>
                      </div>
                    </ScaleOnHover>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </section>
        </FadeIn>
      ))}

      {/* Reminders */}
      <FadeIn>
        <section className="py-24 px-4 bg-[#0B1A3B]">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-gold/10 text-gold text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                <Bell className="h-3 w-3" aria-hidden="true" />
                Good to Know
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-bold text-white text-center mt-6 mb-12">
              Important Reminders
            </h2>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
              {reminders.map((r, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover scale={1.03}>
                    <div className="bg-[#13285A] border border-white/5 rounded-[16px] p-6 flex flex-col gap-4 hover:border-gold/20 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                        <r.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <p className="text-[15px] text-white/60 leading-relaxed">{r.text}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerChildren>
            <div className="text-center mt-12">
              <Link href="/contact" className="inline-flex items-center gap-2 text-[15px] font-semibold text-gold hover:underline">
                Need help? Contact us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  )
}
