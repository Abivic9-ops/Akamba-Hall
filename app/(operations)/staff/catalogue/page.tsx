import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Search, BookOpen, Star, Filter } from 'lucide-react'

const books = [
  { id: 'b1', title: 'Advanced Physics: Principles and Applications', author: 'Serway & Jewett', year: 2022, rating: 4.8, status: 'available' as const, copies: 3, category: 'Science' },
  { id: 'b2', title: 'Teaching Mathematics in East Africa', author: 'Omenko & Gathemo', year: 2021, rating: 4.5, status: 'on_loan' as const, copies: 1, category: 'Education' },
  { id: 'b3', title: 'Laboratory Safety Manual', author: 'KIE', year: 2023, rating: 4.2, status: 'available' as const, copies: 5, category: 'Reference' },
  { id: 'b4', title: 'The Kenya Environment: A Reference Guide', author: 'Ochieng & Ngesa', year: 2020, rating: 4.6, status: 'available' as const, copies: 2, category: 'Science' },
  { id: 'b5', title: 'Data Structures and Algorithms', author: 'Cormen et al.', year: 2022, rating: 4.9, status: 'on_loan' as const, copies: 1, category: 'Computer Science' },
  { id: 'b6', title: 'A History of East Africa', author: 'Bennett & Rosberg', year: 2019, rating: 4.3, status: 'available' as const, copies: 4, category: 'History' },
]

const status_config = {
  available: { label: 'Available', variant: 'success' as const },
  on_loan: { label: 'On Loan', variant: 'info' as const },
}

const filters = ['All', 'Science', 'Education', 'Reference', 'Computer Science', 'History']

export default async function StaffCataloguePage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900">Catalogue Search</h1>
          <p className="text-[15px] text-slate-500 mt-1">Search the library collection by title, author, subject, or ISBN.</p>
        </div>

        <SectionCard title="Search" icon={Search}>
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, author, subject, ISBN..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
              />
            </div>
            <button className="h-11 px-6 rounded-xl bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors shrink-0">
              Search
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <div className="flex gap-1.5 overflow-x-auto">
              {filters.map((f, i) => (
                <button
                  key={f}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all ${
                    i === 0
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#F8F9FB] text-slate-600 border border-slate-200 hover:bg-slate-100'
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
            <p className="text-[32px] font-bold text-slate-900">{books.length}</p>
            <p className="text-[13px] text-slate-400 mt-1">In search results</p>
          </SectionCard>
          <SectionCard title="Available">
            <p className="text-[32px] font-bold text-[#18A957]">{books.filter((b) => b.status === 'available').length}</p>
            <p className="text-[13px] text-slate-400 mt-1">Ready to borrow</p>
          </SectionCard>
          <SectionCard title="On Loan">
            <p className="text-[32px] font-bold text-[#2563EB]">{books.filter((b) => b.status === 'on_loan').length}</p>
            <p className="text-[13px] text-slate-400 mt-1">Currently checked out</p>
          </SectionCard>
        </div>

        <SectionCard title="Results" icon={BookOpen}>
          <div className="space-y-0">
            {books.map((book) => {
              const cfg = status_config[book.status]
              return (
                <div key={book.id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-lg px-2 transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <BookOpen className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 truncate">{book.title}</p>
                    <p className="text-[12px] text-slate-400 mt-0.5">{book.author} · {book.year}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    <span className="text-[12px] font-medium text-slate-600">{book.rating}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">{book.copies} cop{book.copies !== 1 ? 'ies' : 'y'}</span>
                  <Badge variant={cfg.variant} className="text-[10px]">{cfg.label}</Badge>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
