'use client'

import { HelpCircle, BookOpen, Users, CalendarCheck, Clock, Shield, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const faq_sections = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    items: [
      { q: 'How do I borrow a book?', a: 'Visit the library desk with your student ID card. The librarian will check out the book to your account. You can borrow up to 3 books at a time for a 14-day period.' },
      { q: 'How do I reserve a study space?', a: 'Navigate to Bookings in your dashboard and select an available space. Choose your preferred date and time slot, then submit the reservation request.' },
      { q: 'How do I access e-resources?', a: 'Go to the E-Resources section in your dashboard. All digital resources are accessible with your library credentials.' },
    ],
  },
  {
    title: 'Account & Memberships',
    icon: Users,
    items: [
      { q: 'How do I update my profile?', a: 'Go to Settings in your dashboard to update your personal information, contact details, and notification preferences.' },
      { q: 'What happens if I lose my ID card?', a: 'Report it immediately through the Lost & Found section or visit the library desk. A replacement card can be issued.' },
      { q: 'How do I check my fines?', a: 'Navigate to the Fines section in your dashboard to view any outstanding charges.' },
    ],
  },
  {
    title: 'Bookings & Reservations',
    icon: CalendarCheck,
    items: [
      { q: 'Can I cancel a booking?', a: 'Yes, you can cancel an upcoming booking from the Bookings section. Cancel at least 2 hours before your scheduled time.' },
      { q: 'How do holds work?', a: 'Place a hold on a borrowed book and you will be notified when it is returned. You have 3 days to pick it up from the main desk.' },
      { q: 'What happens if I miss my booking?', a: 'Your booking will be marked as a No-Show. Repeated no-shows may result in booking restrictions.' },
    ],
  },
  {
    title: 'Overdue & Fines',
    icon: Clock,
    items: [
      { q: 'What are the overdue fines?', a: 'Overdue fines are calculated per day for each book past its due date. Check the Policies section for the current fee schedule.' },
      { q: 'How do I return a book?', a: 'Bring the book to the library desk. The librarian will process the return and update your account.' },
      { q: 'Can I renew a book?', a: 'Yes, you can renew up to 2 times if no one has placed a hold on the book. Renewals extend the loan by 14 days.' },
    ],
  },
  {
    title: 'Policies & Support',
    icon: Shield,
    items: [
      { q: 'Where can I find library policies?', a: 'All library policies are available in the Policies section of your dashboard, organized by category.' },
      { q: 'How do I report an issue?', a: 'Use the Feedback section to submit a report. You can also visit the library desk for immediate assistance.' },
      { q: 'What are the library hours?', a: 'The library is open Monday to Friday, 8:00 AM to 6:00 PM, and Saturday, 9:00 AM to 4:00 PM.' },
    ],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, set_open] = useState(false)
  return (
    <div className="border border-slate-100 dark:border-white/[0.06] rounded-xl overflow-hidden">
      <button
        onClick={() => set_open(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors"
      >
        <span className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] pr-4">{q}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export function HelpPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Help & Support</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Frequently asked questions and guides</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {faq_sections.map((section) => (
              <div key={section.title} className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-2">
                  <section.icon className="h-4 w-4 text-slate-400 dark:text-[#6B7A99]" />
                  <h2 className="text-[15px] font-medium text-slate-900 dark:text-[#E2E8F0]">{section.title}</h2>
                </div>
                <div className="p-4 space-y-2">
                  {section.items.map((item) => (
                    <FaqItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-6">
              <h3 className="text-[15px] font-medium text-slate-900 dark:text-[#E2E8F0] mb-3">Need More Help?</h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-white/[0.04] rounded-xl">
                  <p className="text-[13px] font-medium text-slate-700 dark:text-[#E2E8F0]">Visit the Library Desk</p>
                  <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Mon–Fri, 8 AM – 6 PM</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-white/[0.04] rounded-xl">
                  <p className="text-[13px] font-medium text-slate-700 dark:text-[#E2E8F0]">Email Support</p>
                  <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">library@akambahall.ac.ke</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-white/[0.04] rounded-xl">
                  <p className="text-[13px] font-medium text-slate-700 dark:text-[#E2E8F0]">Phone</p>
                  <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">+254 700 123 456</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#5B9BD5] to-[#2563EB] rounded-2xl p-6 text-white">
              <h3 className="text-[15px] font-medium mb-2">Quick Links</h3>
              <div className="space-y-2">
                {['Browse Catalogue', 'View Policies', 'Report an Issue', 'Access E-Resources'].map((link) => (
                  <div key={link} className="text-[13px] text-white/80 hover:text-white cursor-pointer transition-colors">
                    → {link}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
