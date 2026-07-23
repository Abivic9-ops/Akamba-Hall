'use client'

import {
  MessageCircle, ThumbsUp, ShieldAlert, CalendarX, HelpCircle,
  ChevronRight,
} from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

const options = [
  {
    title: 'Ask a Librarian',
    description: 'Get real-time help from our library team',
    icon: MessageCircle,
    color: '#2563EB',
    gradient: 'from-[#2563EB]/5 to-transparent',
  },
  {
    title: 'Feedback & Requests',
    description: 'Suggest a book or share your thoughts',
    icon: ThumbsUp,
    color: '#0D9488',
    gradient: 'from-[#0D9488]/5 to-transparent',
  },
  {
    title: 'Lost Card / Login Help',
    description: 'Report a missing card or access issue',
    icon: ShieldAlert,
    color: '#D97706',
    gradient: 'from-[#D97706]/5 to-transparent',
  },
  {
    title: 'Booking Help',
    description: 'Questions about seats, AVR, or rooms',
    icon: CalendarX,
    color: '#7C3AED',
    gradient: 'from-[#7C3AED]/5 to-transparent',
  },
]

export function Support() {
  return (
    <SectionCard title="Need Help?" icon={HelpCircle}>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const Icon = opt.icon
          return (
            <button
              key={opt.title}
              className={`relative flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] bg-gradient-to-r ${opt.gradient} hover:shadow-sm dark:shadow-none dark:shadow-none hover:border-slate-200 dark:border-white/10 dark:border-white/10 transition-all text-left cursor-pointer group`}
            >
              {/* left accent line */}
              <div
                className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                style={{ backgroundColor: opt.color }}
              />

              {/* icon */}
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${opt.color}12` }}
              >
                <Icon className="h-5 w-5" style={{ color: opt.color }} />
              </div>

              {/* text */}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{opt.title}</p>
                <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{opt.description}</p>
              </div>

              {/* arrow */}
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] transition-colors shrink-0" />
            </button>
          )
        })}
      </div>
    </SectionCard>
  )
}
