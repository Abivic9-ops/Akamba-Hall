import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Akamba Hall Library',
    template: '%s | Akamba Hall Library',
  },
  description: 'Access your Akamba Hall Library account — sign in, register, or use QR code authentication to manage your loans, bookings, and reading activity.',
  robots: { index: false, follow: false },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
