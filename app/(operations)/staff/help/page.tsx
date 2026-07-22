import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { HelpCircle, BookOpen, MessageCircle, Phone, Mail, FileText, Search, CreditCard } from 'lucide-react'

const faqs = [
  { id: 'f1', question: 'How do I renew a borrowed book?', answer: 'You can renew a book from the My Loans page, or by visiting the library desk with your QR access card. Staff members get a 4-week loan period.' },
  { id: 'f2', question: 'How do I place a hold on a book?', answer: 'Search the catalogue, find the book you want, and click "Reserve". You will be notified when it becomes available for pickup at the Main Desk.' },
  { id: 'f3', question: 'What are the library operating hours?', answer: 'Monday to Friday: 7:30 AM – 6:00 PM. Saturday: 8:00 AM – 1:00 PM. Sunday: Closed. Hours may vary during holidays.' },
  { id: 'f4', question: 'How do I access e-resources from home?', answer: 'E-resources like JSTOR and EBSCO are accessible via the school network. For remote access, contact the library head for VPN credentials.' },
  { id: 'f5', question: 'How do I book the AVR or Boardroom?', answer: 'Navigate to AVR / Boardroom Booking from the sidebar, select your preferred date and time, and submit the request. You will receive confirmation once approved.' },
]

const contacts = [
  { label: 'Library Help Desk', value: 'Ext. 201', icon: Phone, color: 'text-[#2563EB]' },
  { label: 'Email Support', value: 'library@starehe.ac.ke', icon: Mail, color: 'text-[#0D9488]' },
  { label: 'Ask a Librarian', value: 'In-person at Main Desk', icon: MessageCircle, color: 'text-[#8B5CF6]' },
]

const quickLinks = [
  { label: 'Loan Policy', icon: FileText, href: '#' },
  { label: 'Catalogue Guide', icon: Search, href: '#' },
  { label: 'Fine Schedule', icon: CreditCard, href: '#' },
  { label: 'E-Resources Guide', icon: BookOpen, href: '#' },
]

export default async function StaffHelpPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900">Help Centre</h1>
          <p className="text-[15px] text-slate-500 mt-1">Get help with library services, policies, and account management.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <a key={link.label} href={link.href} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-3 hover:shadow-md hover:border-[#2563EB]/20 transition-all group">
                <div className="h-10 w-10 rounded-lg bg-[#2563EB]/5 flex items-center justify-center shrink-0 group-hover:bg-[#2563EB]/10 transition-colors">
                  <Icon className="h-5 w-5 text-[#2563EB]" />
                </div>
                <span className="text-[13px] font-medium text-slate-700">{link.label}</span>
              </a>
            )
          })}
        </div>

        <SectionCard title="Frequently Asked Questions" icon={HelpCircle}>
          <div className="space-y-0">
            {faqs.map((faq) => (
              <div key={faq.id} className="py-3.5 border-b border-slate-50 last:border-0">
                <p className="text-[14px] font-medium text-slate-800">{faq.question}</p>
                <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Contact Support" icon={MessageCircle}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contacts.map((contact) => {
              const Icon = contact.icon
              return (
                <div key={contact.label} className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FB] hover:bg-slate-100 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-100">
                    <Icon className={`h-4 w-4 ${contact.color}`} />
                  </div>
                  <div>
                    <p className="text-[12px] text-slate-400">{contact.label}</p>
                    <p className="text-[13px] font-medium text-slate-700">{contact.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
