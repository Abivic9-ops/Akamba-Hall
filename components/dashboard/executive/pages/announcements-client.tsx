'use client'

import { Megaphone, ArrowRight } from 'lucide-react'

interface Announcement {
  id: string
  title: string
  body: string
  category: string
  isPinned: boolean
  publishedAt: string
}

const status_colors: Record<string, string> = {
  general: 'bg-blue-100 text-blue-700',
  event: 'bg-emerald-100 text-emerald-700',
  closure: 'bg-red-100 text-red-600',
  eresource: 'bg-[#5B9BD5]/10 text-[#2563EB]',
  policy: 'bg-amber-100 text-amber-700',
  campaign: 'bg-blue-100 text-blue-700',
  workshop: 'bg-[#5B9BD5]/10 text-[#5B9BD5]',
  acquisition: 'bg-emerald-100 text-emerald-700',
}

const status_labels: Record<string, string> = {
  general: 'General',
  event: 'Event',
  closure: 'Closure',
  eresource: 'E-Resource',
  policy: 'Policy',
  campaign: 'Campaign',
  workshop: 'Workshop',
  acquisition: 'Acquisition',
}

export function AnnouncementsClient({ announcements }: { announcements: Announcement[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Announcements</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Institutional library announcements</p>
      </div>
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="divide-y divide-slate-50">
          {announcements.map((a) => (
            <div key={a.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                <Megaphone className="h-5 w-5 text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0]">{a.title}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${status_colors[a.category] ?? 'bg-slate-100 text-slate-600'}`}>{status_labels[a.category] ?? a.category}</span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{a.body}</p>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] shrink-0">{new Date(a.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 inline-flex items-center gap-1.5 transition-all duration-200">
                Read <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
