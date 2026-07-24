import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Akamba Hall Library',
    short_name: 'Akamba Hall',
    description: 'The digital home of Akamba Hall Library — catalogue, loans, spaces, and more.',
    start_url: '/login',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0B1A3B',
    theme_color: '#0B1A3B',
    categories: ['education', 'productivity'],
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
