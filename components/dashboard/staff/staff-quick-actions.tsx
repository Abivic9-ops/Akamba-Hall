'use client'

import {
  Search, BookMarked, DoorOpen, Armchair, Monitor,
  RefreshCw, BookPlus, MessageCircle, Bookmark,
} from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

const actions = [
  { label: 'Search Catalogue', icon: Search, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  { label: 'Reserve Book', icon: BookMarked, color: 'text-[#0D9488]', bg: 'bg-teal-50' },
  { label: 'Book a Room', icon: DoorOpen, color: 'text-[#5B9BD5]', bg: 'bg-[#5B9BD5]/10' },
  { label: 'Reading Seat', icon: Armchair, color: 'text-[#0EA5E9]', bg: 'bg-sky-50' },
  { label: 'Equipment', icon: Monitor, color: 'text-slate-500', bg: 'bg-slate-100' },
  { label: 'Renew Items', icon: RefreshCw, color: 'text-[#18A957]', bg: 'bg-emerald-50' },
  { label: 'Request Book', icon: BookPlus, color: 'text-[#F97316]', bg: 'bg-orange-50' },
  { label: 'Ask a Librarian', icon: MessageCircle, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  { label: 'My Bookmarks', icon: Bookmark, color: 'text-[#5B9BD5]', bg: 'bg-[#5B9BD5]/10' },
]

export function StaffQuickActions() {
  return (
    <SectionCard title="Quick Actions">
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 p-3.5 rounded-xl bg-[#F8F9FB] hover:bg-slate-100 hover:shadow-sm active:scale-[0.97] transition-all cursor-pointer"
            >
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${action.bg}`}>
                <Icon className={`h-4 w-4 ${action.color}`} />
              </div>
              <span className="text-[12px] font-normal text-slate-600 text-center leading-tight">
                {action.label}
              </span>
            </button>
          )
        })}
      </div>
    </SectionCard>
  )
}
