'use client'

import {
  MessageCircle, ThumbsUp, ShieldAlert, CalendarX, HelpCircle,
} from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

const options = [
  {
    title: 'Ask a Librarian',
    description: 'Get real-time help from our library team',
    icon: MessageCircle,
    color: 'text-[#2563EB]',
    bg: 'bg-blue-50',
  },
  {
    title: 'Feedback & Requests',
    description: 'Suggest a book or share your thoughts',
    icon: ThumbsUp,
    color: 'text-[#0D9488]',
    bg: 'bg-teal-50',
  },
  {
    title: 'Lost Card / Login Help',
    description: 'Report a missing card or access issue',
    icon: ShieldAlert,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    title: 'Booking Help',
    description: 'Questions about seats, AVR, or rooms',
    icon: CalendarX,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
]

export function Support() {
  return (
    <SectionCard title="Need Help?" icon={HelpCircle}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const Icon = opt.icon
          return (
            <button
              key={opt.title}
              className="flex items-start gap-3 p-5 rounded-xl bg-[#F8F9FB] hover:bg-slate-100 hover:shadow-sm transition-all text-left cursor-pointer group"
            >
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${opt.bg}`}>
                <Icon className={`h-5 w-5 ${opt.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-slate-800">{opt.title}</p>
                <p className="text-[13px] text-slate-400 mt-0.5">{opt.description}</p>
              </div>
              <span className="text-slate-300 group-hover:text-slate-500 transition-colors mt-1 text-lg">→</span>
            </button>
          )
        })}
      </div>
    </SectionCard>
  )
}
