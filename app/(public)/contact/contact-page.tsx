'use client'

import { MapPin, Phone, Mail, Clock, MessageCircle, AlertTriangle, CreditCard, HelpCircle, Send, Navigation, BookOpen, Users, Shield } from 'lucide-react'
import { FadeIn, StaggerChildren, StaggerItem, ScaleOnHover } from '@/components/motion'

export default function ContactPageClient() {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="bg-[#0B1A3B] py-20 px-4 pb-28">
        <FadeIn>
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 bg-gold/10 text-gold text-[11px] font-medium uppercase tracking-widest px-4 py-1.5 rounded-full">
            <Phone className="h-3 w-3" aria-hidden="true" />
            Get In Touch
          </span>
          <h1 className="text-[40px] md:text-[52px] font-medium text-white mt-5 leading-tight tracking-tight">
            Contact Us
          </h1>
          <p className="text-[16px] md:text-[17px] text-white/50 mt-5 max-w-2xl mx-auto leading-relaxed">
            If you cannot find what you need, there is a clear and easy way to get help. The library is reachable, responsive, and ready to support you. Every request is reviewed during working hours.
          </p>
        </div>
        </FadeIn>
      </section>

      {/* Separator */}
      <div className="mx-4 h-px bg-gradient-to-r from-gold/0 via-gold/35 to-gold/0 sm:mx-6 lg:mx-8" />

      {/* Quick anchor nav - mini navbar */}
      <div className="sticky top-[80px] z-40 w-full border-b border-[#E4E7EE] bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {['#visit', '#help-desk', '#feedback', '#lost-card', '#hours'].map((id) => (
              <a key={id} href={id} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#E4E7EE] bg-[#F5F6FA] text-[12px] sm:text-[13px] font-medium text-[#5B6376] hover:bg-gold hover:text-navy hover:border-gold transition-all capitalize shrink-0">
                {id.replace('#', '').replace('-', ' ')}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Visit Us + Contact Info */}
      <section id="visit" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Visit */}
          <FadeIn>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
                <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                Find Us
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Visit Us</h2>
            <p className="text-[16px] text-[#5B6376] leading-relaxed mb-6">
              Akamba Hall Library is located within the Starehe Boys&apos; Centre campus, along General Waruinge Street in Nairobi. The school is easily accessible by public transport — both matatus and buses serve the route. Entry is through the main school gate, where you will be directed to the library.
            </p>
            <p className="text-[16px] text-[#5B6376] leading-relaxed mb-8">
              Visitors must report at the school reception and be sponsored by a staff member before accessing the library. All visitors are expected to follow the same rules as regular members — silence, no food or drinks, and respect for shared resources.
            </p>
            <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[20px] p-6 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <span className="text-[14px] font-medium text-[#101828]">Address</span>
                  <p className="text-[15px] text-[#5B6376] mt-1 leading-relaxed">
                    P.O. Box 30178 – 00100<br />
                    General Waruinge Street<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-gold shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <span className="text-[14px] font-medium text-[#101828]">Phone</span>
                  <p className="text-[15px] text-[#5B6376] mt-1">+254 727 531 001</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gold shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <span className="text-[14px] font-medium text-[#101828]">Email</span>
                  <p className="text-[15px] text-[#5B6376] mt-1 break-all">info@stareheboyscentre.ac.ke</p>
                </div>
              </div>
            </div>
          </div>
          </FadeIn>

          {/* Hours */}
          <FadeIn>
          <div id="hours">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Opening Hours
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Library Hours</h2>
            <p className="text-[16px] text-[#5B6376] leading-relaxed mb-8">
              The library follows a regular schedule during school terms. Hours may change during exam periods, school holidays, or special events. Check the News & Updates page for any schedule changes before visiting.
            </p>
            <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[20px] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#0B1A3B]">
                    <th className="px-6 py-4 text-[13px] font-medium text-gold uppercase tracking-wider">Day</th>
                    <th className="px-6 py-4 text-[13px] font-medium text-gold uppercase tracking-wider">Hours</th>
                    <th className="px-6 py-4 text-[13px] font-medium text-gold uppercase tracking-wider">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E4E7EE] hover:bg-white/60 transition-colors">
                    <td className="px-6 py-4 text-[14px] font-medium text-[#101828]">Monday – Friday</td>
                    <td className="px-6 py-4 text-[14px] font-medium text-[#0B1A3B]">7:30 AM – 6:00 PM</td>
                    <td className="px-6 py-4 text-[13px] text-[#5B6376]">Regular school days</td>
                  </tr>
                  <tr className="border-b border-[#E4E7EE] hover:bg-white/60 transition-colors">
                    <td className="px-6 py-4 text-[14px] font-medium text-[#101828]">Saturday</td>
                    <td className="px-6 py-4 text-[14px] font-medium text-[#0B1A3B]">8:00 AM – 1:00 PM</td>
                    <td className="px-6 py-4 text-[13px] text-[#5B6376]">Half day</td>
                  </tr>
                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="px-6 py-4 text-[14px] font-medium text-[#101828]">Sunday &amp; Public Holidays</td>
                    <td className="px-6 py-4 text-[14px] font-medium text-red-500">Closed</td>
                    <td className="px-6 py-4 text-[13px] text-[#5B6376]">No access</td>
                  </tr>
                </tbody>
              </table>
              <div className="px-6 py-4 bg-gold/5 border-t border-[#E4E7EE]">
                <p className="text-[13px] text-[#5B6376] leading-relaxed">
                  During exam periods, the library extends hours on weekdays. The reading hall and discussion rooms stay open until 7:00 PM. The computer lab and equipment lending close at the regular time.
                </p>
              </div>
            </div>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* Help Desk */}
      <section id="help-desk" className="py-24 px-4 bg-[#F5F6FA]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 bg-white/80 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Ask a Librarian
            </span>
          </div>
          <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Ask a Librarian</h2>
          <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
            Have a question about borrowing, resources, spaces, or the library system? Submit your request here and a member of the library team will respond during working hours. For urgent matters, visit the library desk directly — the help desk is staffed during all opening hours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Form */}
            <FadeIn>
            <div className="bg-white border border-[#E4E7EE] rounded-[20px] p-8">
              <h3 className="text-[18px] font-medium text-[#101828] mb-6">Submit Your Request</h3>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#101828]">Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="h-11 bg-[#F5F6FA] border border-[#E4E7EE] rounded-xl px-3 text-[15px] text-[#101828] placeholder:text-[#5B6376]/50 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                      aria-label="Your full name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#101828]">Email</label>
                    <input
                      type="email"
                      placeholder="you@stareheboyscentre.ac.ke"
                      className="h-11 bg-[#F5F6FA] border border-[#E4E7EE] rounded-xl px-3 text-[15px] text-[#101828] placeholder:text-[#5B6376]/50 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                      aria-label="Your email address"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#101828]">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="h-11 bg-[#F5F6FA] border border-[#E4E7EE] rounded-xl px-3 text-[15px] text-[#101828] placeholder:text-[#5B6376]/50 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    aria-label="Request subject"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#101828]">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Describe your question or request in as much detail as possible…"
                    className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-xl px-3 py-3 text-[15px] text-[#101828] placeholder:text-[#5B6376]/50 focus:outline-none focus:ring-2 focus:ring-gold resize-none transition-all"
                    aria-label="Your message"
                  />
                </div>
                <button className="h-11 bg-gold hover:bg-gold-hover text-navy font-medium rounded-xl text-[15px] flex items-center justify-center gap-2 transition-all" aria-label="Send request to librarian">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send Request
                </button>
              </div>
            </div>
            </FadeIn>

            {/* What we can help with */}
            <div className="flex flex-col gap-6">
              <h3 className="text-[18px] font-medium text-[#101828]">What We Can Help With</h3>
              <StaggerChildren>
              {[
                { icon: BookOpen, title: 'Finding Books', desc: 'Help locating specific titles, authors, or subjects in the catalogue or on the shelves. We can also suggest alternatives if a book is unavailable.' },
                { icon: CreditCard, title: 'Account Issues', desc: 'Problems with your QR card, login issues, overdue fines, or account restrictions. Most account issues are resolved at the desk within minutes.' },
                { icon: Users, title: 'Booking Problems', desc: 'Issues with space reservations, equipment lending, or event registration. We can override system limits when justified.' },
                { icon: Shield, title: 'Policy Questions', desc: 'Clarification on borrowing rules, loan limits, overdue policies, or any other library regulation. Understanding the rules helps you use the library better.' },
              ].map((item, i) => (
                <StaggerItem key={i}>
                <ScaleOnHover>
                <div className="flex gap-4 bg-white border border-[#E4E7EE] rounded-[16px] p-5 hover:shadow-md transition-shadow">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-medium text-[#101828]">{item.title}</h4>
                    <p className="text-[14px] text-[#5B6376] leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
                </ScaleOnHover>
                </StaggerItem>
              ))}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section id="feedback" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <FadeIn>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Your Voice Matters
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Feedback</h2>
            <p className="text-[16px] text-[#5B6376] leading-relaxed mb-4">
              We want the library to work well for you. If you have suggestions, observations, or complaints, share them here. Feedback helps us improve services, fix problems, and plan for the future.
            </p>
            <p className="text-[16px] text-[#5B6376] leading-relaxed mb-4">
              All feedback is reviewed by the library team. Serious concerns are escalated to school leadership. You can choose to remain anonymous — but providing your name helps us follow up if needed.
            </p>
            <p className="text-[16px] text-[#5B6376] leading-relaxed">
              The library holds a feedback review meeting every month. Common themes from feedback are addressed publicly in the News & Updates section so the community can see how their input shapes library services.
            </p>
          </div>
          </FadeIn>
          <FadeIn>
          <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[20px] p-7">
            <MessageCircle className="h-6 w-6 text-gold mb-4" aria-hidden="true" />
            <h3 className="text-[18px] font-medium text-[#101828] mb-4">Submit Feedback</h3>
            <div className="flex flex-col gap-4">
              <textarea
                rows={4}
                placeholder="Share your feedback, suggestion, or concern…"
                className="bg-white border border-[#E4E7EE] rounded-xl px-3 py-3 text-[15px] text-[#101828] placeholder:text-[#5B6376]/50 focus:outline-none focus:ring-2 focus:ring-gold resize-none transition-all"
                aria-label="Your feedback"
              />
              <button className="h-10 bg-gold hover:bg-gold-hover text-navy font-medium rounded-xl text-[14px] transition-all" aria-label="Submit feedback">
                Submit Feedback
              </button>
            </div>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* Lost Card */}
      <section id="lost-card" className="py-24 px-4 bg-[#F5F6FA]">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <FadeIn>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-white/80 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
                <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
                Access Recovery
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Lost Card / Login Help</h2>
            <p className="text-[16px] text-[#5B6376] leading-relaxed mb-6">
              Lost your QR access card or cannot log in to the portal? Report the issue immediately so your old card can be deactivated. A replacement will be issued after verification at the library desk. Your account and loan history are preserved — nothing is lost.
            </p>

            {/* Step by step recovery */}
            <div className="bg-white border border-[#E4E7EE] rounded-[20px] p-7">
              <h3 className="text-[18px] font-medium text-[#101828] mb-6">Steps to Recover Access</h3>
              <div className="flex flex-col gap-5">
                {[
                  { step: 1, title: 'Report', desc: 'Report the lost card through the portal or at the library desk. This deactivates your old card immediately to prevent unauthorized use.' },
                  { step: 2, title: 'Verify', desc: 'Visit the library desk with your student ID for identity verification. The librarian confirms your account details and loan history.' },
                  { step: 3, title: 'Issue', desc: 'A new QR card is printed and activated on the spot. The process takes approximately 5 minutes from start to finish.' },
                  { step: 4, title: 'Confirm', desc: 'Log in to the portal with your new card to confirm everything is working. Your borrowing history, bookings, and account data are all preserved.' },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="shrink-0 h-8 w-8 rounded-full bg-gold text-navy text-[13px] font-medium flex items-center justify-center">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#101828]">{s.title}</h4>
                      <p className="text-[14px] text-[#5B6376] leading-relaxed mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </FadeIn>

          <div>
            <FadeIn>
            <div className="bg-white border border-[#E4E7EE] rounded-[20px] p-7">
              <AlertTriangle className="h-5 w-5 text-gold mb-4" aria-hidden="true" />
              <h3 className="text-[18px] font-medium text-[#101828] mb-2">Report a Problem</h3>
              <p className="text-[14px] text-[#5B6376] leading-relaxed mb-6">
                Fill in the details below and we will respond during working hours. For immediate assistance, visit the library desk in person.
              </p>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your full name"
                  className="h-11 bg-[#F5F6FA] border border-[#E4E7EE] rounded-xl px-3 text-[15px] text-[#101828] placeholder:text-[#5B6376]/50 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                  aria-label="Your full name"
                />
                <input
                  type="text"
                  placeholder="Student ID or form number"
                  className="h-11 bg-[#F5F6FA] border border-[#E4E7EE] rounded-xl px-3 text-[15px] text-[#101828] placeholder:text-[#5B6376]/50 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                  aria-label="Student ID or form number"
                />
                <select className="h-11 bg-[#F5F6FA] border border-[#E4E7EE] rounded-xl px-3 text-[15px] text-[#5B6376] focus:outline-none focus:ring-2 focus:ring-gold transition-all" aria-label="Issue type">
                  <option value="">Select issue type</option>
                  <option value="lost">Lost QR Card</option>
                  <option value="login">Cannot Log In</option>
                  <option value="account">Account Issue</option>
                  <option value="other">Other</option>
                </select>
                <button className="h-11 bg-gold hover:bg-gold-hover text-navy font-medium rounded-xl text-[15px] transition-all" aria-label="Submit lost card or login report">
                  Submit Report
                </button>
              </div>
            </div>
            </FadeIn>

            {/* Emergency contact */}
            <FadeIn>
            <div className="mt-6 bg-[#0B1A3B] rounded-[20px] p-7">
              <h3 className="text-[17px] font-medium text-white mb-3">Need Immediate Help?</h3>
              <p className="text-[14px] text-white/50 leading-relaxed mb-4">
                For urgent matters — lost cards, account security concerns, or time-sensitive borrowing needs — contact the library desk directly during working hours.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  <span className="text-[14px] text-white/70">+254 727 531 001</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  <span className="text-[14px] text-white/70">info@stareheboyscentre.ac.ke</span>
                </div>
              </div>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
