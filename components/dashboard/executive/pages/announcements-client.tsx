'use client'

import { Megaphone, ArrowRight } from 'lucide-react'

const announcements = [
  { title: 'AI Literacy Week 2026', detail: 'Workshops all week in the Computer Lab', date: '22 Jun 2026', status: 'New', priority: 'normal' },
  { title: 'Library Closed on Public Holiday', detail: 'Thursday, 26 June 2026', date: '20 Jun 2026', status: 'Notice', priority: 'normal' },
  { title: 'New E-Resources Added', detail: 'Springer & IEEE now available!', date: '18 Jun 2026', status: 'Update', priority: 'normal' },
  { title: 'Extended Hours for Exam Period', detail: 'Library open until 8:00 PM until 15 Jul', date: '15 Jun 2026', status: 'Notice', priority: 'normal' },
  { title: 'New Book Arrivals — June Batch', detail: '45 new titles added to the collection', date: '12 Jun 2026', status: 'Update', priority: 'normal' },
  { title: 'Emergency Drill — Fire Safety', detail: 'Mandatory drill on 28 June at 10:00 AM', date: '10 Jun 2026', status: 'Urgent', priority: 'high' },
]

const status_colors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700',
  Notice: 'bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8]',
  Update: 'bg-emerald-100 text-emerald-700',
  Urgent: 'bg-red-100 text-red-600',
}

export function AnnouncementsClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Announcements</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Institutional library announcements</p>
      </div>
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="divide-y divide-slate-50">
          {announcements.map((a, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                <Megaphone className="h-5 w-5 text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0]">{a.title}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${status_colors[a.status]}`}>{a.status}</span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{a.detail}</p>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] shrink-0">{a.date}</span>
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
