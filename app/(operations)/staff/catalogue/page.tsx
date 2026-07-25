import { requireRole } from '@/lib/auth/roleGuard'
import { get_books } from '@/lib/actions/books'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Search, BookOpen, Star, Filter } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StaffCataloguePage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const books = await get_books({ limit: 50 })

  const availableCount = books.filter((b) => b.status === 'available').length
  const onLoanCount = books.filter((b) => b.status === 'unavailable').length

  const categories = ['All', ...new Set(books.map((b) => b.category).filter(Boolean) as string[])]

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0]">Catalogue Search</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">Search the library collection by title, author, subject, or ISBN.</p>
        </div>

        <SectionCard title="Search" icon={Search}>
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-[#6B7A99]" />
              <input
                type="text"
                placeholder="Search by title, author, subject, ISBN..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[14px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
              />
            </div>
            <button className="h-11 px-6 rounded-xl bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors shrink-0">
              Search
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99]" />
            <div className="flex gap-1.5 overflow-x-auto">
              {categories.map((f, i) => (
                <button
                  key={f}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all ${
                    i === 0
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#F8F9FB] dark:bg-[#071224] text-slate-600 dark:text-[#94A3B8] border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:bg-white/[0.06]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Total Titles">
            <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0]">{books.length}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">In search results</p>
          </SectionCard>
          <SectionCard title="Available">
            <p className="text-[32px] font-bold text-[#18A957]">{availableCount}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Ready to borrow</p>
          </SectionCard>
          <SectionCard title="On Loan">
            <p className="text-[32px] font-bold text-[#2563EB]">{onLoanCount}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Currently checked out</p>
          </SectionCard>
        </div>

        <SectionCard title="Results" icon={BookOpen}>
          <div className="space-y-0">
            {books.length === 0 ? (
              <p className="text-[13px] text-slate-400 text-center py-8">No books in the catalogue yet.</p>
            ) : (
              books.map((book) => (
                <div key={book.id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-lg px-2 transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center shrink-0 border border-slate-100 dark:border-white/[0.08]">
                    <BookOpen className="h-5 w-5 text-slate-400 dark:text-[#6B7A99]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{book.title}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-0.5">{book.author}{book.year ? ` · ${book.year}` : ''}</p>
                  </div>
                  {book.category && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#94A3B8] shrink-0">
                      {book.category}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 dark:text-[#6B7A99] shrink-0">{book.availableCopies} cop{book.availableCopies !== 1 ? 'ies' : 'y'}</span>
                  <Badge variant={book.status === 'available' ? 'success' : 'info'} className="text-[10px]">
                    {book.status === 'available' ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
