import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Bookmark, Star, Trash2 } from 'lucide-react'

const bookmarks = [
  { id: 'bm1', title: 'Advanced Physics: Principles and Applications', author: 'Serway & Jewett', category: 'Science', addedDate: '18 Jul 2026' },
  { id: 'bm2', title: 'Teaching Mathematics in East Africa', author: 'Omenko & Gathemo', category: 'Education', addedDate: '15 Jul 2026' },
  { id: 'bm3', title: 'The Kenya Environment: A Reference Guide', author: 'Ochieng & Ngesa', category: 'Reference', addedDate: '10 Jul 2026' },
  { id: 'bm4', title: 'Data Structures and Algorithms', author: 'Cormen et al.', category: 'Computer Science', addedDate: '8 Jul 2026' },
  { id: 'bm5', title: 'A History of East Africa', author: 'Bennett & Rosberg', category: 'History', addedDate: '1 Jul 2026' },
]

const category_colors: Record<string, string> = {
  Science: 'bg-blue-50 text-blue-700',
  Education: 'bg-emerald-50 text-emerald-700',
  Reference: 'bg-[#5B9BD5]/10 text-[#2563EB]',
  'Computer Science': 'bg-amber-50 text-amber-700',
  History: 'bg-rose-50 text-rose-700',
}

export default async function StaffBookmarksPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900">My Bookmarks</h1>
          <p className="text-[15px] text-slate-500 mt-1">Books and resources you&apos;ve saved for quick access.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Saved Items">
            <p className="text-[32px] font-bold text-[#2563EB]">{bookmarks.length}</p>
            <p className="text-[13px] text-slate-400 mt-1">Books in your collection</p>
          </SectionCard>
          <SectionCard title="Categories">
            <p className="text-[32px] font-bold text-[#8B5CF6]">{new Set(bookmarks.map((b) => b.category)).size}</p>
            <p className="text-[13px] text-slate-400 mt-1">Distinct subjects</p>
          </SectionCard>
          <SectionCard title="Recently Added">
            <p className="text-[32px] font-bold text-[#0D9488]">2</p>
            <p className="text-[13px] text-slate-400 mt-1">Added this week</p>
          </SectionCard>
        </div>

        <SectionCard title="Saved Books" icon={Bookmark}>
          <div className="space-y-0">
            {bookmarks.map((bm) => (
              <div key={bm.id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-lg px-2 transition-colors group">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-slate-800 truncate">{bm.title}</p>
                  <p className="text-[12px] text-slate-400 mt-0.5">{bm.author}</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${category_colors[bm.category] ?? 'bg-slate-100 text-slate-600'}`}>
                  {bm.category}
                </span>
                <span className="text-[11px] text-slate-400 shrink-0">{bm.addedDate}</span>
                <button className="h-7 w-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all">
                  <Trash2 className="h-3.5 w-3.5 text-slate-400 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
