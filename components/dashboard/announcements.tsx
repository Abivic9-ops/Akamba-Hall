'use client'

import {
  Megaphone, AlertCircle, CalendarDays, Globe, Bell,
  FileText, BookHeart,
} from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'

interface Announcement {
  id: string
  type: 'closure' | 'event' | 'eresource' | 'reminder' | 'policy' | 'campaign'
  title: string
  subtitle: string
  createdAt: string
}

interface AnnouncementsProps {
  announcements: Announcement[]
}

const type_config: Record<string, { icon: typeof AlertCircle; color: string }> = {
  closure: { icon: AlertCircle, color: 'text-red-500' },
  event: { icon: CalendarDays, color: 'text-[#2563EB]' },
  eresource: { icon: Globe, color: 'text-[#0D9488]' },
  reminder: { icon: Bell, color: 'text-amber-500' },
  policy: { icon: FileText, color: 'text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]' },
  campaign: { icon: BookHeart, color: 'text-[#5B9BD5]' },
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function isNew(iso: string): boolean {
  return Date.now() - new Date(iso).getTime() < 24 * 60 * 60 * 1000
}

export function Announcements({ announcements }: AnnouncementsProps) {
  return (
    <SectionCard
      title="Announcements"
      icon={Megaphone}
      cta={{ label: 'See all', href: '#' }}
    >
      {announcements.length === 0 ? (
        <p className="text-[15px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No announcements</p>
      ) : (
        <div className="space-y-2.5">
          {announcements.map((ann) => {
            const cfg = type_config[ann.type] ?? type_config.policy
            const Icon = cfg.icon
            return (
              <div
                key={ann.id}
                className="flex flex-col sm:flex-row sm:items-start gap-3 rounded-xl border border-slate-100/70 bg-white/70 px-3 py-3 hover:bg-slate-50 dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                <div className="h-7 w-7 rounded-lg bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className={`h-3.5 w-3.5 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{ann.title}</p>
                    {isNew(ann.createdAt) && (
                      <Badge variant="new" className="text-[10px] px-1.5 py-0">NEW</Badge>
                    )}
                  </div>
                  <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-0.5">{ann.subtitle}</p>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-[#6B7A99] shrink-0 sm:mt-1">
                  {timeAgo(ann.createdAt)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </SectionCard>
  )
}
