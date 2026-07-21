'use client'

import {
  Search, BookMarked, Armchair, Video, Monitor,
  MessageCircle,
} from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

const actions = [
  { label: 'Search Catalogue', icon: Search, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  { label: 'Reserve Book', icon: BookMarked, color: 'text-[#0D9488]', bg: 'bg-teal-50' },
  { label: 'Book a Seat', icon: Armchair, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'AVR Booking', icon: Video, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Equipment', icon: Monitor, color: 'text-slate-500', bg: 'bg-slate-100' },
  { label: 'Ask a Librarian', icon: MessageCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

export function QuickActions() {
  return (
    <SectionCard title="Quick Actions">
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2.5 p-5 rounded-xl bg-[#F8F9FB] hover:bg-slate-100 hover:shadow-sm active:scale-[0.97] transition-all cursor-pointer"
            >
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${action.bg}`}>
                <Icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <span className="text-[13px] font-normal text-slate-600 text-center leading-tight">
                {action.label}
              </span>
            </button>
          )
        })}
      </div>
    </SectionCard>
  )
}
