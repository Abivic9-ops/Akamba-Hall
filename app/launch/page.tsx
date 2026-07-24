'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function LaunchPage() {
  const router = useRouter()

  useEffect(() => {
    // Artificial delay to show the nice splash screen
    const timer = setTimeout(() => {
      router.push('/login')
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0B1A3B] via-[#0F2350] to-[#0B1A3B] flex flex-col items-center justify-center z-[9999]">
      <div className="h-28 w-28 rounded-[2rem] bg-[#E8A63C]/10 border border-[#E8A63C]/20 shadow-2xl flex items-center justify-center shrink-0 overflow-hidden mb-12 animate-pulse">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/starehe-logo.png" alt="Akamba Hall" className="h-16 w-16 object-contain" />
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 text-[#E8A63C] animate-spin" />
        <p className="text-white/80 text-sm font-medium tracking-wide animate-pulse">
          Starting Akamba Hall...
        </p>
      </div>
    </div>
  )
}
