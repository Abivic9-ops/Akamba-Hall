import type { Metadata } from 'next'
import ContactPageClient from './contact-page'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Akamba Hall Library — visit us, call, email, ask a librarian, report a lost card, or send feedback. We are here to help.',
  openGraph: {
    title: 'Contact Us — Akamba Hall Library',
    description: 'Visit, call, email, or send a request to Akamba Hall Library. We are here to help.',
  },
  alternates: { canonical: 'https://library.stareheboyscentre.org/contact' },
}

export default function ContactPage() {
  return <ContactPageClient />
}
