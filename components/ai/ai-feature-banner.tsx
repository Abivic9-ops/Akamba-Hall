'use client'

import { useState, useEffect } from 'react'
import { Sparkles, X } from 'lucide-react'

interface Props {
  title: string
  description: string
  feature: string
  pageKey: string
}

export function AiFeatureBanner({ title, description, feature, pageKey }: Props) {
  const [dismissed, set_dismissed] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem(`ai-seen-${pageKey}`)
    if (seen) set_dismissed(true)
  }, [pageKey])

  function handle_dismiss() {
    set_dismissed(true)
    localStorage.setItem(`ai-seen-${pageKey}`, '1')
  }

  if (dismissed) return null

  return (
    <div className="relative bg-gradient-to-r from-[#0B1A3B] to-[#13285A] rounded-2xl border border-white/[0.08] p-5 sm:p-6 overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 rounded-full translate-y-12 -translate-x-12" />

      <button
        onClick={handle_dismiss}
        className="absolute top-3 right-3 p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors cursor-pointer z-10"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative flex flex-col sm:flex-row items-start gap-4">
        <div className="h-10 w-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
          <Sparkles className="h-5 w-5 text-gold" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h3 className="text-[14px] font-semibold text-white">{title}</h3>
            <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold text-[10px] font-medium uppercase tracking-wider">{feature}</span>
          </div>
          <p className="text-[12px] sm:text-[13px] text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
