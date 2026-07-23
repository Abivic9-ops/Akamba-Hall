'use client'

import { useState } from 'react'
import {
  ThumbsUp, ShieldAlert, HelpCircle,
  Send, Clock, Phone, Mail, MapPin,
  ChevronDown, ChevronUp, ExternalLink,
} from 'lucide-react'

const faqs = [
  {
    q: 'How do I borrow a book?',
    a: 'Search the catalogue for available titles, click "Borrow," and collect the book from the Main Desk. You will need your QR access card. Maximum 3 books at a time for students.',
  },
  {
    q: 'How do I renew a book?',
    a: 'Go to My Loans and click "Renew" next to the book. Renewals extend the due date by 14 days. Books can be renewed up to 2 times. Overdue books must be renewed at the library desk.',
  },
  {
    q: 'What happens if I return a book late?',
    a: 'A fine of KES 50 per day is charged for each overdue book. Fines must be cleared before you can borrow new items. You will receive email reminders 3 days before the due date.',
  },
  {
    q: 'How do I reserve a book that is currently on loan?',
    a: 'Go to the Catalogue, find the book, and click "Reserve." You will be placed in a queue. When the book is returned, you will receive a notification and have 3 business days to collect it.',
  },
  {
    q: 'Can I book a study space or the AVR?',
    a: 'Yes. Go to the Bookings page and select the type of space you need (Reading Seat, AVR, or Boardroom). Choose your preferred time slot and submit the request. Bookings are subject to approval.',
  },
  {
    q: 'How do I get a new QR access card?',
    a: 'Visit the library desk with your school ID. A new card will be issued immediately. If your card is lost, report it immediately so it can be deactivated.',
  },
]

const contactOptions = [
  { label: 'Visit the Library Desk', detail: 'Akamba Hall, Ground Floor', icon: MapPin, color: 'text-[#2563EB]' },
  { label: 'Call Us', detail: '+254 712 345 678', icon: Phone, color: 'text-[#0D9488]' },
  { label: 'Email Us', detail: 'library@starehe.ac.ke', icon: Mail, color: 'text-amber-500' },
  { label: 'Operating Hours', detail: 'Mon–Fri 7:30 AM – 6:00 PM', icon: Clock, color: 'text-[#5B9BD5]' },
]

export function HelpPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [feedbackType, setFeedbackType] = useState('suggestion')
  const [feedbackText, setFeedbackText] = useState('')

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">

        {/* header */}
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Help & Support</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">
            Find answers to common questions or get in touch with the library team.
          </p>
        </div>

        {/* quick contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactOptions.map((opt) => {
            const Icon = opt.icon
            return (
              <div key={opt.label} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] p-4 hover:shadow-sm dark:shadow-none dark:shadow-none transition-all">
                <Icon className={`h-5 w-5 ${opt.color} mb-2`} />
                <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{opt.label}</p>
                <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{opt.detail}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* FAQ */}
          <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] p-6">
            <div className="flex items-center gap-2 mb-5">
              <HelpCircle className="h-5 w-5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              <h2 className="text-[17px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-white/[0.04] dark:bg-white/[0.04] dark:hover:bg-white dark:bg-[#0E1F3F]/[0.04] dark:bg-white/[0.04] transition-colors"
                  >
                    <span className="text-[14px] font-normal text-slate-700 dark:text-[#E2E8F0] pr-4">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="h-4 w-4 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* feedback form */}
          <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] p-6">
            <div className="flex items-center gap-2 mb-5">
              <ThumbsUp className="h-5 w-5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              <h2 className="text-[17px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Feedback & Requests</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mb-1 block">Type</label>
                <select
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-white/10 dark:border-white/10 text-[14px] text-slate-700 dark:text-[#E2E8F0] focus:outline-none focus:border-[#2563EB] transition-colors bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]"
                >
                  <option value="suggestion">Book Suggestion</option>
                  <option value="feedback">General Feedback</option>
                  <option value="complaint">Complaint</option>
                  <option value="request">Service Request</option>
                </select>
              </div>

              <div>
                <label className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mb-1 block">Your Message</label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Describe your suggestion, feedback, or request..."
                  rows={5}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 dark:border-white/10 text-[14px] text-slate-700 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] transition-colors resize-none"
                />
              </div>

              <button className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors">
                <Send className="h-4 w-4" />
                Submit Feedback
              </button>
            </div>

            {/* report card loss */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[14px] font-medium text-slate-700 dark:text-[#E2E8F0]">Lost Card / Login Issues?</p>
                  <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">
                    Report a lost QR card or login problem immediately. Your card will be deactivated to prevent misuse.
                  </p>
                  <button className="inline-flex items-center gap-1.5 mt-2 h-7 px-3.5 rounded-full border border-[#2563EB]/20 text-[12px] text-[#2563EB] font-medium bg-[#2563EB]/5 hover:bg-[#2563EB]/10 transition-colors">
                    Report Issue <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
