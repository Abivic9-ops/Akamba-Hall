'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Search, BookOpen, BookMarked, Grid3X3 } from 'lucide-react'

interface CatalogueBook {
  id: string
  title: string
  author: string
  category: string
  available: boolean
  copies: number
  totalCopies: number
  shelfLocation: string
  isbn: string
}

const categories = ['All', 'General Books', 'Reference', 'Periodicals', 'Digital']

export function CataloguePageClient({ books }: { books: CatalogueBook[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = books.filter((book) => {
    if (activeCategory !== 'All' && book.category !== activeCategory) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.isbn.toLowerCase().includes(q) ||
        book.shelfLocation.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="bg-[#F8F9FB] min-h-screen">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Grid3X3 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] tracking-tight">Catalogue Search</h1>
            <p className="text-[12px] text-slate-500">Browse and search the library collection</p>
          </div>
        </div>

        <SectionCard title="Search Collection" icon={Search} contentClassName="p-5 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title, author, ISBN, or shelf location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-lg border border-slate-200 bg-white text-[13px] text-[#0B1B3D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                />
              </div>
              <div className="flex gap-2 items-center">
                <BookMarked className="h-4 w-4 text-slate-400 shrink-0" />
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-[13px] text-[#0B1B3D] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition appearance-none pr-8"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`h-8 px-4 rounded-full text-[12px] font-bold transition ${
                    activeCategory === cat
                      ? 'bg-[#0B1B3D] text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="ml-auto flex items-center text-[12px] text-slate-400 font-medium">
                {filtered.length} book{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition flex flex-col gap-3"
            >
              <div className="flex gap-3">
                <div className="h-20 w-14 bg-slate-900 rounded shadow-sm flex-shrink-0 flex items-center justify-center border border-slate-200 relative overflow-hidden">
                  <div className="text-[5px] text-white/50 px-1 text-center font-serif leading-tight">
                    {book.title.split(' ').slice(0, 3).join(' ').toUpperCase()}
                  </div>
                  <div className={`absolute inset-0 ${
                    book.available ? 'bg-emerald-600/15' : 'bg-red-600/15'
                  }`}></div>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="text-[13px] font-bold text-[#0B1B3D] leading-tight truncate">{book.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">{book.author}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={book.category === 'Reference' ? 'info' : book.category === 'Periodicals' ? 'warning' : book.category === 'Digital' ? 'new' : 'neutral'}>
                      {book.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-[9px] text-slate-500 font-bold uppercase">Shelf</p>
                  <p className="text-[12px] font-bold text-[#0B1B3D]">{book.shelfLocation || 'N/A'}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-[9px] text-slate-500 font-bold uppercase">Copies</p>
                  <p className="text-[12px] font-bold text-[#0B1B3D]">{book.copies}/{book.totalCopies}</p>
                </div>
                <div className={`rounded-lg p-2 ${book.available ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  <p className="text-[9px] font-bold uppercase" style={{ color: book.available ? '#059669' : '#DC2626' }}>Status</p>
                  <p className="text-[12px] font-bold" style={{ color: book.available ? '#059669' : '#DC2626' }}>
                    {book.available ? 'Available' : 'Unavailable'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 h-8 rounded-lg border border-slate-200 bg-white text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition">
                  View Details
                </button>
                <button
                  disabled={!book.available}
                  className="flex-1 h-8 rounded-lg bg-[#0B1B3D] text-white text-[11px] font-bold hover:bg-[#162950] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {book.available ? 'Issue' : 'Reserve'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center">
            <BookOpen className="h-12 w-12 text-slate-200 mx-auto mb-3" />
            <p className="text-[14px] font-bold text-slate-400">No books found</p>
            <p className="text-[12px] text-slate-300 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
