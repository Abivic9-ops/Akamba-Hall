import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { ThemeProvider } from '@/lib/contexts/theme-context'
import { PWAInstallPrompt } from '@/components/pwa/PWAInstallPrompt'
import { InitialLoader } from '@/components/layout/initial-loader'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Akamba Hall Library',
    default: 'Akamba Hall Library',
  },
  description: 'The digital home of Akamba Hall Library — catalogue, loans, spaces, and more.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Akamba Hall',
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#0B1A3B" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-poppins antialiased">
        <ThemeProvider>
          <InitialLoader />
          {children}
          <PWAInstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  )
}
