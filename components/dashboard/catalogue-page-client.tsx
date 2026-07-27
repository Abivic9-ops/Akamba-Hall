'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search, BookOpen, Grid3X3, List,
} from 'lucide-react'

interface CatalogueItem {
  id: string
  title: string
  author: string
  category: string | null
  status: string
  availableCopies: number
  totalCopies: number
  year: number | null
  isbn: string | null
}

const categories = ['All', 'Science', 'Mathematics', 'Fiction', 'History', 'Language', 'Technology']

export function CataloguePageClient({ books }: { books: CatalogueItem[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filtered = books.filter((item) => {
    const matchesSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-[22px] sm:text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0]">Catalogue</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">
            Browse the complete Akamba Hall Library collection.
          </p>
        </div>

        <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-[#6B7A99]" />
              <input
                type="text"
                placeholder="Search by title, author, ISBN, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[15px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
              />
            </div>
            <div className="flex gap-1 bg-slate-100 dark:bg-white/[0.06] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-[#0E1F3F] text-slate-800 dark:text-[#E2E8F0] shadow-sm' : 'text-slate-400 dark:text-[#6B7A99] hover:text-slate-600'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-[#0E1F3F] text-slate-800 dark:text-[#E2E8F0] shadow-sm' : 'text-slate-400 dark:text-[#6B7A99] hover:text-slate-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-normal whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[14px] text-slate-500 dark:text-[#6B7A99]">
            Showing {filtered.length} of {books.length} items
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/item/${item.id}`}
                className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#0E1F3F] dark:to-[#13285A] flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-slate-300 dark:text-white/10" />
                </div>
                <div className="p-4">
                  <p className="text-[15px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate group-hover:text-[#2563EB] dark:group-hover:text-[#5B9BD5] transition-colors">{item.title}</p>
                  <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] mt-0.5">{item.author}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-[12px] px-2 py-0.5 rounded-full ${
                      item.status === 'available' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' :
                      'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                    }`}>
                      {item.status === 'available' ? 'Available' : 'On Loan'}
                    </span>
                    <span className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{item.availableCopies}/{item.totalCopies}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] overflow-hidden">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/item/${item.id}`}
                className="flex items-center gap-4 p-4 border-b border-slate-50 dark:border-white/[0.04] last:border-0 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-10 h-14 rounded-lg bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4 text-slate-400 dark:text-[#6B7A99]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{item.title}</p>
                  <p className="text-[13px] text-slate-500 dark:text-[#6B7A99]">{item.author}{item.year ? ` · ${item.year}` : ''}</p>
                </div>
                <span className={`text-[12px] px-2.5 py-0.5 rounded-full shrink-0 ${
                  item.status === 'available' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' :
                  'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                }`}>
                  {item.status === 'available' ? 'Available' : 'On Loan'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
