'use client'

import {
  Search, BookMarked, Armchair, Video, Monitor,
  MessageCircle,
} from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

const actions = [
  { label: 'Search Catalogue', icon: Search, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  { label: 'Reserve Book', icon: BookMarked, color: 'text-[#0D9488]', bg: 'bg-teal-50' },
  { label: 'Book a Seat', icon: Armchair, color: 'text-[#5B9BD5]', bg: 'bg-[#5B9BD5]/10' },
  { label: 'AVR Booking', icon: Video, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Equipment', icon: Monitor, color: 'text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]', bg: 'bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06]' },
  { label: 'Ask a Librarian', icon: MessageCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

export function QuickActions() {
  return (
    <SectionCard title="Quick Actions">
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 p-3.5 rounded-xl bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224] hover:bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] dark:bg-white/[0.06] hover:shadow-sm dark:shadow-none dark:shadow-none active:scale-[0.97] transition-all cursor-pointer"
            >
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${action.bg}`}>
                <Icon className={`h-4 w-4 ${action.color}`} />
              </div>
              <span className="text-[12px] font-normal text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] text-center leading-tight">
                {action.label}
              </span>
            </button>
          )
        })}
      </div>
    </SectionCard>
  )
}
