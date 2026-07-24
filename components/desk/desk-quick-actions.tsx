'use client'

import {
  UserPlus, ScanLine, BookOpen, RotateCcw, RefreshCw,
  Search, CalendarCheck, CreditCard, LogIn,
} from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

const actions = [
  { label: 'New Member', icon: UserPlus, color: 'text-[#2563EB] dark:text-[#5B9BD5]', bg: 'bg-blue-50 dark:bg-blue-500/10', href: '/desk/new-member' },
  { label: 'Scan Item', icon: ScanLine, color: 'text-[#0D9488] dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-500/10', href: '/desk/returns' },
  { label: 'Issue Item', icon: BookOpen, color: 'text-[#5B9BD5]', bg: 'bg-[#5B9BD5]/10 dark:bg-[#5B9BD5]/10', href: '/desk/issue-log' },
  { label: 'Return Item', icon: RotateCcw, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', href: '/desk/returns' },
  { label: 'Renew Item', icon: RefreshCw, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', href: '/desk/loans' },
  { label: 'Lost Item', icon: Search, color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10', href: '/desk/lost-found' },
  { label: 'Reserve Book', icon: CalendarCheck, color: 'text-[#2563EB] dark:text-[#5B9BD5]', bg: 'bg-blue-50 dark:bg-blue-500/10', href: '/desk/reservations' },
  { label: 'Print QR Card', icon: CreditCard, color: 'text-[#5B9BD5]', bg: 'bg-[#5B9BD5]/10 dark:bg-[#5B9BD5]/10', href: '/desk/cards' },
  { label: 'Check In/Out', icon: LogIn, color: 'text-[#0D9488] dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-500/10', href: '/desk/member-lookup' },
]

export function DeskQuickActions() {
  return (
    <SectionCard title="Quick Actions">
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <a
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-3 sm:p-3.5 rounded-xl bg-[#F8F9FB] dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:shadow-sm active:scale-[0.97] transition-all cursor-pointer"
            >
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${action.bg}`}>
                <Icon className={`h-4 w-4 ${action.color}`} />
              </div>
              <span className="text-[11px] sm:text-[12px] font-normal text-slate-600 dark:text-white/60 text-center leading-tight">
                {action.label}
              </span>
            </a>
          )
        })}
      </div>
    </SectionCard>
  )
}
