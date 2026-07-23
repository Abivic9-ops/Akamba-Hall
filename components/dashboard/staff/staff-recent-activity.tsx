'use client'

import {
  RefreshCw, Video, PackageCheck, BookPlus, Armchair, RotateCcw, Activity,
} from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface ActivityItem {
  id: string
  type: 'renewal' | 'avr_booking' | 'hold_pickup' | 'book_suggestion' | 'seat_booking' | 'return'
  description: string
  detail: string
  timestamp: string
}

interface StaffRecentActivityProps {
  activities: ActivityItem[]
}

const type_icons: Record<string, typeof RefreshCw> = {
  renewal: RefreshCw,
  avr_booking: Video,
  hold_pickup: PackageCheck,
  book_suggestion: BookPlus,
  seat_booking: Armchair,
  return: RotateCcw,
}

const type_colors: Record<string, string> = {
  renewal: 'text-[#18A957]',
  avr_booking: 'text-[#F97316]',
  hold_pickup: 'text-[#0D9488]',
  book_suggestion: 'text-[#2563EB]',
  seat_booking: 'text-[#8B5CF6]',
  return: 'text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]',
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function StaffRecentActivity({ activities }: StaffRecentActivityProps) {
  return (
    <SectionCard
      title="Recent Activity"
      icon={Activity}
      cta={{ label: 'View all', href: '#' }}
    >
      {activities.length === 0 ? (
        <p className="text-[14px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] text-center py-6">No recent activity</p>
      ) : (
        <div className="space-y-0">
          {activities.map((item) => {
            const Icon = type_icons[item.type] ?? RefreshCw
            const color = type_colors[item.type] ?? 'text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]'
            return (
              <div
                key={item.id}
                className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0"
              >
                <div className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{item.description}</p>
                  {item.detail && (
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{item.detail}</p>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] shrink-0 mt-1">
                  {timeAgo(item.timestamp)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </SectionCard>
  )
}
