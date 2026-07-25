'use client'

import { Globe, ExternalLink, Search } from 'lucide-react'
import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'

interface EResource {
  id: string
  title: string
  provider: string
  description: string | null
  url: string
  category: string | null
}

export function EResourcesList({ resources }: { resources: EResource[] }) {
  const [search, set_search] = useState('')

  const filtered = resources.filter((r) => {
    if (!search) return true
    const q = search.toLowerCase()
    return r.title.toLowerCase().includes(q) || r.provider.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q)
  })

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">E-Resources</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Digital databases and online resources</p>
          </div>
        </div>

        <SectionCard title="Digital Resources" icon={Globe}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => set_search(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8 col-span-2">No resources found</p>
            ) : (
              filtered.map((r) => (
                <div key={r.id} className="p-4 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl border border-slate-100 dark:border-white/[0.06] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{r.title}</p>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#5B9BD5]/10 text-[#5B9BD5]">{r.category}</span>
                  </div>
                  <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mb-2">{r.provider}</p>
                  <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] line-clamp-2 mb-2">{r.description}</p>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[12px] font-medium text-[#2563EB] dark:text-[#5B9BD5] hover:underline">
                    Visit <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
