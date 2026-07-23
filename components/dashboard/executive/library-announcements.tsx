'use client'

import { Megaphone, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react'

interface Announcement {
  id: string
  title: string
  detail: string
  status: string
  icon: string
}

const icon_map: Record<string, React.ComponentType<{ className?: string }>> = {
  Megaphone,
  AlertTriangle,
  CheckCircle2,
}

const status_colors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700',
  Notice: 'bg-amber-100 text-amber-700',
  Update: 'bg-emerald-100 text-emerald-700',
}

export function LibraryAnnouncements({ items }: { items: Announcement[] }) {
  return (
    <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Library Announcements</h3>
          <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">Institutional updates</p>
        </div>
        <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 hover:text-blue-700 inline-flex items-center gap-1.5 transition-all duration-200">
          View all <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = icon_map[item.icon] ?? Megaphone
          return (
            <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] dark:bg-white/[0.04] dark:hover:bg-white dark:bg-[#0E1F3F]/[0.04] dark:bg-white/[0.04] transition-colors">
              <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="h-4 w-4 text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-slate-700 dark:text-[#E2E8F0] truncate">{item.title}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${status_colors[item.status] ?? 'bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]'}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{item.detail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
