'use client'

import { MessageSquare, AlertTriangle, CheckCircle2, Clock, Search } from 'lucide-react'
import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'

interface IssueLogItem {
  id: string
  title: string
  description: string
  category: string
  severity: string
  status: string
  createdAt: string
}

const severity_config: Record<string, { label: string; color: string }> = {
  low: { label: 'Low', color: 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99]' },
  medium: { label: 'Medium', color: 'bg-amber-100 text-amber-600' },
  high: { label: 'High', color: 'bg-red-100 text-red-500' },
}

const status_config: Record<string, { label: string; color: string }> = {
  open: { label: 'Open', color: 'bg-blue-100 text-blue-600' },
  in_progress: { label: 'In Progress', color: 'bg-amber-100 text-amber-600' },
  resolved: { label: 'Resolved', color: 'bg-emerald-100 text-emerald-600' },
  closed: { label: 'Closed', color: 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99]' },
}

function format_date(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function FeedbackInboxClient({ issues }: { issues: IssueLogItem[] }) {
  const [search, set_search] = useState('')
  const [filter, set_filter] = useState('ALL')

  const filtered = issues.filter((i) => {
    if (filter !== 'ALL' && i.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!i.title.toLowerCase().includes(q) && !i.description.toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Feedback Inbox</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Review and manage user feedback and reports</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {['ALL', 'open', 'in_progress', 'resolved', 'closed'].map((s) => (
            <button
              key={s}
              onClick={() => set_filter(s)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                filter === s
                  ? 'bg-[#5B9BD5] text-white'
                  : 'bg-white dark:bg-[#0E1F3F] text-slate-600 dark:text-[#6B7A99] border border-slate-200 dark:border-white/[0.08]'
              }`}
            >
              {s === 'ALL' ? 'All' : s.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>

        <SectionCard title="Issues" icon={MessageSquare}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search issues..."
              value={search}
              onChange={(e) => set_search(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
            />
          </div>

          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No issues found</p>
            ) : (
              filtered.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-slate-50 dark:bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                    {item.severity === 'high' ? <AlertTriangle className="h-4 w-4 text-red-500" /> : <Clock className="h-4 w-4 text-slate-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{item.title}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${severity_config[item.severity]?.color ?? ''}`}>
                        {severity_config[item.severity]?.label ?? item.severity}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] line-clamp-1">{item.description}</p>
                    <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] mt-1">
                      {item.category} · {format_date(item.createdAt)}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status_config[item.status]?.color ?? ''}`}>
                    {status_config[item.status]?.label ?? item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
