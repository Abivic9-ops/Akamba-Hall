'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Megaphone, Search, Filter, Pin, Calendar, AlertTriangle, BookPlus, GraduationCap, Globe, FileText, Newspaper, GraduationCap as Workshop, Tag } from 'lucide-react'

interface AnnouncementItem {
  id: string
  title: string
  body: string
  category: string
  attachmentUrl: string | null
  isPinned: boolean
  publishedAt: string
  createdAt: string
}

interface StaffAnnouncementsClientProps {
  announcements: AnnouncementItem[]
}

const categoryConfig: Record<string, { icon: typeof AlertTriangle; color: string; label: string }> = {
  general: { icon: Megaphone, color: 'text-slate-500 dark:text-[#6B7A99]', label: 'General' },
  event: { icon: Calendar, color: 'text-[#2563EB]', label: 'Event' },
  closure: { icon: AlertTriangle, color: 'text-red-500', label: 'Closure' },
  eresource: { icon: Globe, color: 'text-[#8B5CF6]', label: 'E-Resource' },
  policy: { icon: FileText, color: 'text-slate-500 dark:text-[#6B7A99]', label: 'Policy' },
  campaign: { icon: Megaphone, color: 'text-[#F59E0B]', label: 'Campaign' },
  workshop: { icon: GraduationCap, color: 'text-[#0D9488]', label: 'Workshop' },
  acquisition: { icon: BookPlus, color: 'text-[#18A957]', label: 'Acquisition' },
}

const categoryBadgeVariant: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  general: 'neutral',
  event: 'info',
  closure: 'danger',
  eresource: 'info',
  policy: 'neutral',
  campaign: 'warning',
  workshop: 'success',
  acquisition: 'success',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return formatDate(iso)
}

export function StaffAnnouncementsClient({ announcements }: StaffAnnouncementsClientProps) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const allCategories = ['all', ...new Set(announcements.map((a) => a.category))]

  const filtered = announcements.filter((a) => {
    const q = search.toLowerCase()
    const matchSearch =
      a.title.toLowerCase().includes(q) ||
      a.body.toLowerCase().includes(q)
    const matchCategory = categoryFilter === 'all' || a.category === categoryFilter
    return matchSearch && matchCategory
  })

  const pinnedCount = announcements.filter((a) => a.isPinned).length

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionCard title="Total Announcements">
          <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0] leading-none">{announcements.length}</p>
          <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Published announcements</p>
        </SectionCard>
        <SectionCard title="Pinned">
          <div className="flex items-center gap-2">
            <Pin className="h-5 w-5 text-[#2563EB]" />
            <p className="text-[32px] font-bold text-[#2563EB] leading-none">{pinnedCount}</p>
          </div>
          <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Pinned to top</p>
        </SectionCard>
        <SectionCard title="Categories">
          <p className="text-[32px] font-bold text-[#8B5CF6] leading-none">{allCategories.length - 1}</p>
          <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Active categories</p>
        </SectionCard>
      </div>

      <SectionCard title="All Announcements" icon={Megaphone}>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-[#6B7A99]" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[14px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99]" />
            <div className="flex gap-1.5 overflow-x-auto">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all ${
                    categoryFilter === cat
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#F8F9FB] dark:bg-[#071224] text-slate-600 dark:text-[#94A3B8] border border-slate-200 dark:border-white/10 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'all' ? 'All' : (categoryConfig[cat]?.label ?? cat.charAt(0).toUpperCase() + cat.slice(1))}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {filtered.length === 0 ? (
            <p className="text-[13px] text-slate-400 text-center py-8">No announcements found.</p>
          ) : (
            filtered.map((ann) => {
              const cfg = categoryConfig[ann.category] ?? categoryConfig.general
              const Icon = cfg.icon
              return (
                <div
                  key={ann.id}
                  className={`py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-lg px-3 transition-colors ${ann.isPinned ? 'bg-[#2563EB]/[0.03] dark:bg-[#2563EB]/[0.08]' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-slate-50 dark:bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className={`h-4 w-4 ${cfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {ann.isPinned && (
                          <Pin className="h-3 w-3 text-[#2563EB] shrink-0" />
                        )}
                        <p className="text-[15px] font-medium text-slate-800 dark:text-[#E2E8F0]">{ann.title}</p>
                        <Badge variant={categoryBadgeVariant[ann.category] ?? 'neutral'} className="text-[10px]">
                          {cfg.label}
                        </Badge>
                      </div>
                      <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] mt-1 line-clamp-2">{ann.body}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[11px] text-slate-400 dark:text-[#6B7A99] flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(ann.publishedAt)}
                        </span>
                        {ann.attachmentUrl && (
                          <span className="text-[11px] text-[#2563EB] flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            Has attachment
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-[#6B7A99] shrink-0 mt-1">
                      {timeAgo(ann.publishedAt)}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>
        {filtered.length > 0 && (
          <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-3 text-right">
            Showing {filtered.length} of {announcements.length} announcements
          </p>
        )}
      </SectionCard>
    </>
  )
}
