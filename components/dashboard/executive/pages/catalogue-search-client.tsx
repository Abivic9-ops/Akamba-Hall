'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

const results = [
  { title: 'Introduction to Algorithms', author: 'Thomas Cormen', year: 2022, category: 'Computer Science', available: true },
  { title: 'The Art of Strategy', author: 'Avinash Dixit', year: 2021, category: 'Economics', available: true },
  { title: 'Campus Biology', author: 'Kenneth Miller', year: 2023, category: 'Science', available: false },
  { title: 'Modern World History', author: 'Southington', year: 2020, category: 'History', available: true },
  { title: 'Principles of Economics', author: 'N. Gregory Mankiw', year: 2022, category: 'Economics', available: true },
]

export function CatalogueSearchClient() {
  const [query, setQuery] = useState('')
  const filtered = results.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.author.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900">Catalogue Search</h1>
        <p className="text-[15px] text-slate-500 mt-1">Search the library catalogue</p>
      </div>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or ISBN..."
          className="w-full h-12 pl-12 pr-4 rounded-full border border-slate-200 bg-white text-[14px] text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
        />
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filtered.map((r, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50/50 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-800">{r.title}</p>
                <p className="text-[11px] text-slate-400">{r.author} · {r.year} · {r.category}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.available ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                {r.available ? 'Available' : 'On Loan'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
