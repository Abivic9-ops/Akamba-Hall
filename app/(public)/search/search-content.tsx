'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, BookOpen, ArrowLeft } from 'lucide-react'
import { search_books } from '@/lib/actions/books'

interface BookResult {
  id: string; title: string; author: string; isbn: string | null;
  category: string | null; coverUrl: string | null; description: string | null;
  year: number | null; totalCopies: number; availableCopies: number;
  status: string;
}

export function SearchPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') ?? ''

  const [query, setQuery] = useState<string>(initialQuery)
  const [results, setResults] = useState<BookResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')

  const doSearch = useCallback(async (q: string) => {
    if (!q || q.trim().length < 2) {
      setResults([])
      setSearched(false)
      return
    }
    setLoading(true)
    setSearched(true)
    try {
      const data = await search_books(q.trim())
      setResults(data)
    } catch {
      setResults([])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (initialQuery) doSearch(initialQuery)
  }, [initialQuery, doSearch])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      doSearch(query.trim())
    }
  }

  const categories = ['All', ...Array.from(new Set(results.map((r) => r.category).filter((c): c is string => Boolean(c))))]
  const filtered = activeCategory === 'All' ? results : results.filter((r) => r.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-[13px] text-slate-500 dark:text-[#6B7A99] hover:text-[#2563EB] dark:hover:text-[#5B9BD5] transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0]">Catalogue Search</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">
            Search our entire database of physical and digital materials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-white dark:bg-[#13285A] border border-slate-100 dark:border-white/[0.08] rounded-2xl shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 dark:text-[#6B7A99]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, subject, or keyword..."
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-[#F8F9FB] dark:bg-[#0E1F3F] text-[15px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
              autoFocus
            />
          </div>
          <button type="submit" className="h-12 px-8 rounded-xl bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors shrink-0">
            Search
          </button>
        </form>

        {searched && categories.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white dark:bg-[#13285A] text-slate-600 dark:text-[#94A3B8] border border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && searched && filtered.length === 0 && (
          <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-12 text-center">
            <Search className="h-12 w-12 text-slate-200 dark:text-white/10 mx-auto mb-3" />
            <p className="text-[16px] font-medium text-slate-500 dark:text-[#6B7A99]">No results found for &ldquo;{initialQuery}&rdquo;</p>
            <p className="text-[13px] text-slate-400 dark:text-[#4B5775] mt-1">Try different keywords or browse the catalogue.</p>
          </div>
        )}

        {!loading && !searched && (
          <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-12 text-center">
            <Search className="h-12 w-12 text-slate-200 dark:text-white/10 mx-auto mb-3" />
            <p className="text-[16px] font-medium text-slate-500 dark:text-[#6B7A99]">Enter a search term</p>
            <p className="text-[13px] text-slate-400 dark:text-[#4B5775] mt-1">Search by title, author, ISBN, subject, or keyword.</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((book) => (
              <Link
                key={book.id}
                href={`/item/${book.id}`}
                className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] overflow-hidden hover:shadow-md transition-all group"
              >
                {book.coverUrl ? (
                  <div className="h-48 overflow-hidden">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#0E1F3F] dark:to-[#13285A] flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-slate-300 dark:text-white/10" />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-[15px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate group-hover:text-[#2563EB] dark:group-hover:text-[#5B9BD5] transition-colors">{book.title}</p>
                  <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] mt-0.5">{book.author}{book.year ? ` · ${book.year}` : ''}</p>
                  {book.category && (
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#2563EB]/10 text-[#2563EB]">{book.category}</span>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-[12px] px-2 py-0.5 rounded-full ${
                      book.status === 'available' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' :
                      'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                    }`}>
                      {book.status === 'available' ? 'Available' : 'On Loan'}
                    </span>
                    <span className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{book.availableCopies}/{book.totalCopies}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
