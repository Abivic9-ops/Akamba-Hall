'use client'

import { useState } from 'react'
import {
  Search, BookOpen, Grid3X3, List, Star,
} from 'lucide-react'

interface CatalogueItem {
  id: string
  title: string
  author: string
  category: string
  status: 'available' | 'on_loan' | 'reserved'
  rating: number
  copies: number
  year: number
  isbn: string
}

const mockCatalogue: CatalogueItem[] = [
  { id: 'cat-1', title: 'Introduction to Physics', author: 'J.K. Kariuki', category: 'Science', status: 'available', rating: 4.5, copies: 3, year: 2022, isbn: '978-0-123456-01-1' },
  { id: 'cat-2', title: 'Secondary School Mathematics', author: 'A.O. Awino', category: 'Mathematics', status: 'on_loan', rating: 4.2, copies: 2, year: 2021, isbn: '978-0-123456-02-8' },
  { id: 'cat-3', title: 'The Secret Runner', author: 'Tim Kennemar', category: 'Fiction', status: 'available', rating: 4.8, copies: 1, year: 2023, isbn: '978-0-123456-03-5' },
  { id: 'cat-4', title: 'Chemistry Practical Guide', author: 'P.O. Owuor', category: 'Science', status: 'reserved', rating: 4.0, copies: 0, year: 2020, isbn: '978-0-123456-04-2' },
  { id: 'cat-5', title: 'Kenyan History: Pre-Colonial to Modern', author: 'M.W. Odhiambo', category: 'History', status: 'available', rating: 4.6, copies: 4, year: 2023, isbn: '978-0-123456-05-9' },
  { id: 'cat-6', title: 'Advanced English Grammar', author: 'Wanjiku Kamau', category: 'Language', status: 'on_loan', rating: 4.3, copies: 2, year: 2022, isbn: '978-0-123456-06-6' },
  { id: 'cat-7', title: 'Computer Studies for Secondary Schools', author: 'James Mwangi', category: 'Technology', status: 'available', rating: 4.1, copies: 5, year: 2024, isbn: '978-0-123456-07-3' },
  { id: 'cat-8', title: 'Biology: A Complete Guide', author: 'Grace Achieng', category: 'Science', status: 'available', rating: 4.7, copies: 3, year: 2023, isbn: '978-0-123456-08-0' },
]

const categories = ['All', 'Science', 'Mathematics', 'Fiction', 'History', 'Language', 'Technology']

const status_map = {
  available: { label: 'Available', variant: 'success' as const },
  on_loan: { label: 'On Loan', variant: 'warning' as const },
  reserved: { label: 'Reserved', variant: 'info' as const },
}

export function CataloguePageClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filtered = mockCatalogue.filter((item) => {
    const matchesSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">

        {/* header */}
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Catalogue</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">
            Browse the complete Akamba Hall Library collection. Search by title, author, or subject.
          </p>
        </div>

        {/* search bar */}
        <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              <input
                type="text"
                placeholder="Search by title, author, ISBN, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-slate-200 dark:border-white/10 dark:border-white/10 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] text-[15px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
              />
            </div>
            <div className="flex gap-1 bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] text-slate-800 dark:text-[#E2E8F0] shadow-sm dark:shadow-none dark:shadow-none' : 'text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] hover:text-slate-600 dark:hover:text-slate-300 dark:text-[#94A3B8] dark:hover:text-slate-300 dark:text-[#94A3B8]'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] text-slate-800 dark:text-[#E2E8F0] shadow-sm dark:shadow-none dark:shadow-none' : 'text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] hover:text-slate-600 dark:hover:text-slate-300 dark:text-[#94A3B8] dark:hover:text-slate-300 dark:text-[#94A3B8]'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* category chips */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-normal whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] hover:bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 dark:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* results count */}
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">
            Showing {filtered.length} of {mockCatalogue.length} items
          </p>
        </div>

        {/* results */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((item) => {
              const st = status_map[item.status]
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] overflow-hidden hover:shadow-md transition-all group"
                >
                  <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-slate-300" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{item.rating}</span>
                    </div>
                    <p className="text-[15px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{item.title}</p>
                    <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{item.author}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className={`text-[12px] px-2 py-0.5 rounded-full ${
                        item.status === 'available' ? 'bg-emerald-50 text-emerald-700' :
                        item.status === 'on_loan' ? 'bg-amber-50 text-amber-700' :
                        'bg-sky-50 text-sky-700'
                      }`}>
                        {st.label}
                      </span>
                      <span className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{item.copies} copies</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] overflow-hidden">
            {filtered.map((item) => {
              const st = status_map[item.status]
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="w-10 h-14 rounded-lg bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                    <BookOpen className="h-4 w-4 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{item.title}</p>
                    <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{item.author} · {item.year}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{item.rating}</span>
                  </div>
                  <span className={`text-[12px] px-2.5 py-0.5 rounded-full shrink-0 ${
                    item.status === 'available' ? 'bg-emerald-50 text-emerald-700' :
                    item.status === 'on_loan' ? 'bg-amber-50 text-amber-700' :
                    'bg-sky-50 text-sky-700'
                  }`}>
                    {st.label}
                  </span>
                  <button className="h-8 px-4 rounded-lg bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors shrink-0">
                    {item.status === 'available' ? 'Borrow' : 'Reserve'}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
