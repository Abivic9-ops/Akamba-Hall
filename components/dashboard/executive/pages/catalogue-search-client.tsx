'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

interface Book {
  id: string
  title: string
  author: string
  category: string | null
  year: number | null
  status: string
}

export function CatalogueSearchClient({ books }: { books: Book[] }) {
  const [query, setQuery] = useState('')
  const filtered = books.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.author.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Catalogue Search</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Search the library catalogue</p>
      </div>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or ISBN..."
          className="w-full h-12 pl-12 pr-4 rounded-full border border-slate-200 dark:border-white/10 dark:border-white/10 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] text-[14px] text-slate-700 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
        />
      </div>
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filtered.map((r) => (
            <div key={r.id} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50/50 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0]">{r.title}</p>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{r.author} · {r.year ?? 'N/A'} · {r.category ?? 'Uncategorised'}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.status === 'available' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                {r.status === 'available' ? 'Available' : 'On Loan'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
