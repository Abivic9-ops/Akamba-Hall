import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Akamba Hall Library',
  description: 'Sign in to your Akamba Hall Library account to access your loans, bookings, and QR card.',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
