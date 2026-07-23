'use client'

import { FileText, ArrowRight } from 'lucide-react'

const notices = [
  { title: 'Exam Period Library Hours', detail: 'Extended hours: 7:00 AM – 8:00 PM from 1 Jul – 15 Jul', date: '25 Jun 2026', category: 'Hours' },
  { title: 'Book Return Reminder', detail: 'All books must be returned before end of term', date: '20 Jun 2026', category: 'Reminder' },
  { title: 'New Printing Rates', detail: 'Updated printing charges effective 1 Jul: KES 5/page B&W, KES 15/page Color', date: '18 Jun 2026', category: 'Update' },
  { title: 'Lost Card Replacement', detail: 'Replacement fee updated to KES 500. Report lost cards immediately.', date: '15 Jun 2026', category: 'Policy' },
  { title: 'WiFi Maintenance Notice', detail: 'Library WiFi will be down on 28 Jun from 2:00 AM – 6:00 AM', date: '12 Jun 2026', category: 'Maintenance' },
]

const category_colors: Record<string, string> = {
  Hours: 'bg-blue-50 text-blue-600',
  Reminder: 'bg-amber-50 text-amber-600',
  Update: 'bg-emerald-50 text-emerald-600',
  Policy: 'bg-[#5B9BD5]/10 text-[#5B9BD5]',
  Maintenance: 'bg-red-50 text-red-500',
}

export function NoticesClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900">Notices</h1>
        <p className="text-[15px] text-slate-500 mt-1">Official library notices and reminders</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {notices.map((n, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-slate-800">{n.title}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${category_colors[n.category]}`}>{n.category}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{n.detail}</p>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0">{n.date}</span>
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
