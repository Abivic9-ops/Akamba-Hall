'use client'

import {
  UserPlus, ScanLine, BookOpen, RotateCcw, RefreshCw,
  Search, CalendarCheck, CreditCard, LogIn,
} from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

const actions = [
  { label: 'New Member', icon: UserPlus, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  { label: 'Scan Item', icon: ScanLine, color: 'text-[#0D9488]', bg: 'bg-teal-50' },
  { label: 'Issue Item', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Return Item', icon: RotateCcw, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Renew Item', icon: RefreshCw, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Lost Item', icon: Search, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Reserve Book', icon: CalendarCheck, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  { label: 'Print QR Card', icon: CreditCard, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Check In/Out', icon: LogIn, color: 'text-[#0D9488]', bg: 'bg-teal-50' },
]

export function DeskQuickActions() {
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
