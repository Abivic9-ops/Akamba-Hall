import type { Metadata } from 'next'
import NewsPageClient from './news-page'

export const metadata: Metadata = {
  title: 'News & Updates',
  description: 'Latest announcements, new arrivals, events, library notices, and reading campaigns at Akamba Hall Library, Starehe Boys\' Centre.',
  openGraph: {
    title: 'News & Updates — Akamba Hall Library',
    description: 'Latest announcements, new arrivals, events, and notices from Akamba Hall Library.',
  },
  alternates: { canonical: 'https://library.stareheboyscentre.org/news' },
}

export default function NewsPage() {
  return <NewsPageClient />
}
