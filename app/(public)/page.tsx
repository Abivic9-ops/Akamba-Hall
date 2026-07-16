import type { Metadata } from 'next'
import PublicLandingPage from './landing-page'

export const metadata: Metadata = {
  title: 'Akamba Hall Library — Starehe Boys\' Centre Digital Library',
  description: 'Explore 8,500+ books, digital resources, study spaces, and AI-powered research tools at Akamba Hall Library, Starehe Boys\' Centre. Borrow books, book spaces, and access e-resources.',
  keywords: ['Starehe Boys Centre', 'Akamba Hall Library', 'school library Kenya', 'digital library', 'Nairobi library', 'student resources'],
  openGraph: {
    title: 'Akamba Hall Library — Starehe Boys\' Centre',
    description: 'Access 8,500+ books, digital resources, study spaces, and AI-powered research tools at Akamba Hall Library.',
    url: 'https://library.stareheboyscentre.org',
    siteName: 'Akamba Hall Library',
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akamba Hall Library — Starehe Boys\' Centre',
    description: 'Access 8,500+ books, digital resources, study spaces, and AI-powered research tools.',
  },
  alternates: {
    canonical: 'https://library.stareheboyscentre.org',
  },
}

export default function PublicPage() {
  return <PublicLandingPage />
}
