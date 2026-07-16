import type { Metadata } from 'next'
import AboutPageClient from './about-page'

export const metadata: Metadata = {
  title: 'About Akamba Hall Library',
  description: 'Learn about Akamba Hall Library — the central library hub of Starehe Boys\' Centre. Our mission, values, who we serve, and how we support learning since 1959.',
  openGraph: {
    title: 'About Akamba Hall Library — Starehe Boys\' Centre',
    description: 'The central library hub of Starehe Boys\' Centre. Mission, values, leadership, and how we support the school community.',
  },
  alternates: { canonical: 'https://library.stareheboyscentre.org/about' },
}

export default function AboutPage() {
  return <AboutPageClient />
}
