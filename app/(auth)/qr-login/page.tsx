import { redirect } from 'next/navigation'

export default async function QRLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { ref } = await searchParams

  if (!ref) {
    redirect('/login')
  }

  // QR login redirects to the main login page with QR tab active
  redirect('/login')
}
