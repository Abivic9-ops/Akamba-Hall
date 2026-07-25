'use client'

import { Megaphone, Pin } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'

interface Announcement {
  id: string
  title: string
  body: string
  category: string
  attachmentUrl: string | null
  isPinned: boolean
  publishedAt: string
  createdAt: string
}

const categoryColors: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  closure: 'danger',
  acquisition: 'success',
  workshop: 'info',
  ict: 'info',
  policy: 'warning',
  general: 'neutral',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function AnnouncementsList({ announcements }: { announcements: Announcement[] }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-[28px] font-medium text-[#0B1B3D] dark:text-[#E2E8F0]">Announcements</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">
            Latest library announcements and notices.
          </p>
        </div>

        <SectionCard title="All Announcements" icon={Megaphone}>
          {announcements.length === 0 ? (
            <EmptyState icon={Megaphone} message="No announcements yet." />
          ) : (
            <div className="space-y-3">
              {announcements.map((a) => {
                const variant = categoryColors[a.category] ?? 'neutral'
                return (
                  <div
                    key={a.id}
                    className="rounded-xl border border-slate-100 dark:border-white/[0.08] p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {a.isPinned && <Pin className="h-3.5 w-3.5 text-[#F97316] fill-[#F97316]" />}
                        <h3 className="text-[15px] font-medium text-[#0B1B3D] dark:text-[#E2E8F0]">{a.title}</h3>
                      </div>
                      <Badge variant={variant} className="text-[10px] shrink-0">{a.category}</Badge>
                    </div>
                    <p className="text-[14px] text-slate-600 dark:text-[#94A3B8] line-clamp-3">{a.body}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-[12px] text-slate-400 dark:text-[#6B7A99]">
                        {formatDate(a.publishedAt)}
                      </span>
                      {a.attachmentUrl && (
                        <a
                          href={a.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[12px] font-medium text-[#2563EB] hover:underline"
                        >
                          View Attachment
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}
