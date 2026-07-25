'use client'

import { FileText, Search } from 'lucide-react'
import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'

interface PolicyItem {
  id: string
  title: string
  description: string
  category: string
  documentUrl: string | null
  createdAt: string
}

function format_date(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

const category_colors: Record<string, string> = {
  borrowing: 'bg-blue-50 text-blue-600',
  conduct: 'bg-amber-50 text-amber-600',
  facility: 'bg-emerald-50 text-emerald-600',
  digital: 'bg-[#5B9BD5]/10 text-[#5B9BD5]',
  general: 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99]',
}

export function PoliciesList({ policies }: { policies: PolicyItem[] }) {
  const [search, set_search] = useState('')

  const filtered = policies.filter((p) => {
    if (!search) return true
    const q = search.toLowerCase()
    return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  })

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Policies</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Library policies and guidelines</p>
          </div>
        </div>

        <SectionCard title="Library Policies" icon={FileText}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search policies..."
              value={search}
              onChange={(e) => set_search(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
            />
          </div>

          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No policies found</p>
            ) : (
              filtered.map((p) => (
                <div key={p.id} className="p-4 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl border border-slate-100 dark:border-white/[0.06] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{p.title}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${category_colors[p.category] ?? category_colors.general}`}>
                      {p.category}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] line-clamp-2 mb-1">{p.description}</p>
                  <p className="text-[11px] text-slate-400 dark:text-[#6B7A99]">Added {format_date(p.createdAt)}</p>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
