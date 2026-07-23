import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { ThemeProvider } from '@/lib/contexts/theme-context'
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-poppins antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
