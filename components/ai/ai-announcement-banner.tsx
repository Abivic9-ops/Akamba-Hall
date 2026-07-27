'use client'

import { useState } from 'react'
import { Sparkles, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AiAnnouncementBannerProps {
  portal: 'student' | 'staff' | 'desk' | 'executive' | 'library-head' | 'super-admin'
}

const messages: Record<string, { title: string; desc: string; link: string }> = {
  student: {
    title: 'New: AI Library Tools',
    desc: 'Get instant book summaries, generate citations, build study plans, and more — right from your catalogue and loan cards.',
    link: '/student/ai-tools',
  },
  staff: {
    title: 'New: AI Research & Citation Tools',
    desc: 'Summarise books, generate citations, and help students with research — all contextual to the books you are viewing.',
    link: '/student/ai-tools',
  },
  desk: {
    title: 'New: AI Renewal & Patron Assistant',
    desc: 'Get instant help with renewals, overdue alerts, and patron queries — contextual to every transaction on your desk.',
    link: '/student/ai-tools',
  },
  executive: {
    title: 'New: AI Oversight & Research Tools',
    desc: 'Summarise collection items, generate reports, and get research insights — all available contextually across your portal.',
    link: '/student/ai-tools',
  },
  'library-head': {
    title: 'New: AI Management & Research Tools',
    desc: 'Summarise books, assist patrons, and generate research insights — contextual tools for library management.',
    link: '/student/ai-tools',
  },
  'super-admin': {
    title: 'New: AI Library Tools',
    desc: 'AI-powered book summaries, citation generation, research assistance, and patron support tools — available across all portals.',
    link: '/student/ai-tools',
  },
}

export function AiAnnouncementBanner({ portal }: AiAnnouncementBannerProps) {
  const [dismissed, set_dismissed] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(`ai-banner-dismissed-${portal}`) === 'true'
  })
  const msg = messages[portal]

  function handle_dismiss() {
    localStorage.setItem(`ai-banner-dismissed-${portal}`, 'true')
    set_dismissed(true)
  }

  if (dismissed) return null

  return (
    <div className="bg-gradient-to-r from-[#0B1A3B] via-[#13285A] to-[#1A3A6E] rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
          <Sparkles className="h-5 w-5 text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-white">{msg.title}</p>
          <p className="text-[13px] text-white/60 mt-0.5">{msg.desc}</p>
        </div>
        <button onClick={handle_dismiss} className="text-white/40 hover:text-white/70 transition-colors cursor-pointer p-1 shrink-0">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={msg.link}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gold hover:bg-gold-hover text-[#0B1A3B] text-[13px] font-medium transition-all"
        >
          Explore <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
