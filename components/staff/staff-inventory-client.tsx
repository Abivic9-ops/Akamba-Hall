'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Library, Search, Filter, BookOpen, CheckCircle, AlertTriangle, Package } from 'lucide-react'

interface BookItem {
  id: string
  title: string
  author: string
  isbn: string | null
  category: string | null
  coverUrl: string | null
  description: string | null
  year: number | null
  totalCopies: number
  availableCopies: number
  loanedCopies: number
  status: string
}

interface BookStats {
  totalBooks: number
  totalCopies: number
  availableCopies: number
  loanedCopies: number
  lostCopies: number
  damagedCopies: number
}

interface StaffInventoryClientProps {
  books: BookItem[]
  stats: BookStats
}

export function StaffInventoryClient({ books, stats }: StaffInventoryClientProps) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const categories = ['All', ...new Set(books.map((b) => b.category).filter(Boolean) as string[])]

  const filtered = books.filter((book) => {
    const q = search.toLowerCase()
    const matchSearch =
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      (book.isbn ?? '').toLowerCase().includes(q)
    const matchCategory = categoryFilter === 'All' || book.category === categoryFilter
    return matchSearch && matchCategory
  })

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <SectionCard title="Total Titles">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-slate-400 dark:text-[#6B7A99]" />
            <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0] leading-none">{stats.totalBooks.toLocaleString()}</p>
          </div>
          <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-2">Unique titles</p>
        </SectionCard>
        <SectionCard title="Total Copies">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-slate-400 dark:text-[#6B7A99]" />
            <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0] leading-none">{stats.totalCopies.toLocaleString()}</p>
          </div>
          <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-2">All copies</p>
        </SectionCard>
        <SectionCard title="Available">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-[#18A957]" />
            <p className="text-[32px] font-bold text-[#18A957] leading-none">{stats.availableCopies.toLocaleString()}</p>
          </div>
          <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-2">On shelves</p>
        </SectionCard>
        <SectionCard title="On Loan">
          <div className="flex items-center gap-2">
            <Library className="h-5 w-5 text-[#2563EB]" />
            <p className="text-[32px] font-bold text-[#2563EB] leading-none">{stats.loanedCopies.toLocaleString()}</p>
          </div>
          <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-2">Checked out</p>
        </SectionCard>
        <SectionCard title="Lost">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#DC2626]" />
            <p className="text-[32px] font-bold text-[#DC2626] leading-none">{stats.lostCopies.toLocaleString()}</p>
          </div>
          <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-2">Unaccounted</p>
        </SectionCard>
        <SectionCard title="Damaged">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#F59E0B]" />
            <p className="text-[32px] font-bold text-[#F59E0B] leading-none">{stats.damagedCopies.toLocaleString()}</p>
          </div>
          <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-2">Needs repair</p>
        </SectionCard>
      </div>

      <SectionCard title="Collection Overview" icon={Library}>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-[#6B7A99]" />
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[14px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99]" />
            <div className="flex gap-1.5 overflow-x-auto">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all ${
                    categoryFilter === cat
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#F8F9FB] dark:bg-[#071224] text-slate-600 dark:text-[#94A3B8] border border-slate-200 dark:border-white/10 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {filtered.length === 0 ? (
            <p className="text-[13px] text-slate-400 text-center py-8">No books found in the collection.</p>
          ) : (
            filtered.map((book) => (
              <div key={book.id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-lg px-2 transition-colors">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/[0.06] dark:to-white/[0.02] flex items-center justify-center shrink-0 border border-slate-100 dark:border-white/[0.08]">
                  <BookOpen className="h-5 w-5 text-slate-400 dark:text-[#6B7A99]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{book.title}</p>
                  <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-0.5">{book.author}{book.year ? ` · ${book.year}` : ''}</p>
                </div>
                {book.category && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#94A3B8] shrink-0 hidden sm:inline">
                    {book.category}
                  </span>
                )}
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-[13px] text-slate-600 dark:text-[#E2E8F0] font-medium">{book.totalCopies} cop{book.totalCopies !== 1 ? 'ies' : 'y'}</p>
                  <p className="text-[11px] text-slate-400 dark:text-[#6B7A99]">{book.availableCopies} available</p>
                </div>
                <Badge
                  variant={book.status === 'available' ? 'success' : 'danger'}
                  className="text-[10px]"
                >
                  {book.status === 'available' ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
            ))
          )}
        </div>
        {filtered.length > 0 && (
          <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-3 text-right">
            Showing {filtered.length} of {books.length} titles
          </p>
        )}
      </SectionCard>
    </>
  )
}
