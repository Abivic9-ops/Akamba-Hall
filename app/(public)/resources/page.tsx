import type { Metadata } from 'next'
import ResourcesPageClient from './resources-page'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Search the catalogue, explore physical and digital collections, find study guides, and discover suggested reading at Akamba Hall Library, Starehe Boys\' Centre.',
  openGraph: {
    title: 'Resources — Akamba Hall Library',
    description: 'Catalogue search, physical collections, digital resources, study help, and suggested reading.',
  },
  alternates: { canonical: 'https://library.stareheboyscentre.org/resources' },
}

export default function ResourcesPage() {
  return <ResourcesPageClient />
}
