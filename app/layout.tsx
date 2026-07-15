import type { Metadata } from 'next'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import './globals.css'

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-poppins antialiased">
        {children}
      </body>
    </html>
  )
}
