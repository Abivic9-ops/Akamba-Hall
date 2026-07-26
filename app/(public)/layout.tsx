import { PublicNavbar } from '@/components/layout/PublicNavbar'
import { MiniNavbar } from '@/components/layout/mini-navbar'
import { Footer } from '@/components/layout/Footer'
import { AiChatWidget } from '@/components/ai/ai-chat-widget'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col force-light">
      <PublicNavbar />
      <MiniNavbar />
      <main className="flex-1 w-full pt-[72px]">{children}</main>
      <Footer />
      <AiChatWidget />
    </div>
  )
}
