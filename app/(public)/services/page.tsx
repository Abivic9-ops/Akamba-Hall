import type { Metadata } from 'next'
import ServicesPageClient from './services-page'

export const metadata: Metadata = {
  title: 'Library Services',
  description: 'Borrow books, reserve study spaces, lend equipment, attend events, and get research help at Akamba Hall Library, Starehe Boys\' Centre.',
  openGraph: {
    title: 'Library Services — Akamba Hall Library',
    description: 'Borrow books, reserve spaces, lend equipment, attend events, and get support at Akamba Hall Library.',
  },
  alternates: { canonical: 'https://library.stareheboyscentre.org/services' },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
