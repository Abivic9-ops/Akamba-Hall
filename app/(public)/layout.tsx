import { PublicNavbar } from '@/components/layout/PublicNavbar'
import { Footer } from '@/components/layout/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col force-light">
      <PublicNavbar />
      <main className="flex-1 w-full pt-[72px]">{children}</main>
      <Footer />
    </div>
  )
}
