'use client'

import { Bookmark, Search } from 'lucide-react'
import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'

interface BookmarkItem {
  id: string
  bookTitle: string
  author: string
  category: string | null
  coverUrl: string | null
  notes: string | null
  createdAt: string
}

function format_date(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function BookmarksList({ bookmarks }: { bookmarks: BookmarkItem[] }) {
  const [search, set_search] = useState('')

  const filtered = bookmarks.filter((b) => {
    if (!search) return true
    const q = search.toLowerCase()
    return b.bookTitle.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
  })

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Bookmark className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Bookmarks</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Your saved books and reading list</p>
          </div>
        </div>

        <SectionCard title="My Bookmarks" icon={Bookmark}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={search}
              onChange={(e) => set_search(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
            />
          </div>

          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No bookmarks yet</p>
            ) : (
              filtered.map((b) => (
                <div key={b.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <Bookmark className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{b.bookTitle}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">
                      {b.author} · {b.category ?? 'General'} · Saved {format_date(b.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
