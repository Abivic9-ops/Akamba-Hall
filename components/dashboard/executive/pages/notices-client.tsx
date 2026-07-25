'use client'

import { FileText, ArrowRight } from 'lucide-react'

interface Notice {
  id: string
  title: string
  detail: string
  date: string
  category: string
}

const category_colors: Record<string, string> = {
  announcement: 'bg-blue-50 text-blue-600',
  event: 'bg-emerald-50 text-emerald-600',
  hours: 'bg-blue-50 text-blue-600',
  reminder: 'bg-amber-50 text-amber-600',
  update: 'bg-emerald-50 text-emerald-600',
  policy: 'bg-[#5B9BD5]/10 text-[#5B9BD5]',
  maintenance: 'bg-red-50 text-red-500',
}

export function NoticesClient({ notices }: { notices: Notice[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Notices</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Official library notices and reminders</p>
      </div>
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="divide-y divide-slate-50">
          {notices.map((n) => (
            <div key={n.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0]">{n.title}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${category_colors[n.category] ?? 'bg-slate-100 text-slate-600'}`}>{n.category.charAt(0).toUpperCase() + n.category.slice(1)}</span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{n.detail}</p>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] shrink-0">{new Date(n.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
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
