import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_bookmarks } from '@/lib/actions/bookmarks'
import { SectionCard } from '@/components/ui/section-card'
import { Bookmark, Star, Trash2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StaffBookmarksPage() {
  const profile = await requireRole(['STAFF', 'SUPER_ADMIN'])

  const bookmarks = await get_user_bookmarks(profile.id)

  const categoryColors: Record<string, string> = {
    Science: 'bg-blue-50 text-blue-700',
    Education: 'bg-emerald-50 text-emerald-700',
    Reference: 'bg-[#5B9BD5]/10 text-[#2563EB]',
    'Computer Science': 'bg-amber-50 text-amber-700',
    History: 'bg-rose-50 text-rose-700',
  }

  const categories = new Set(bookmarks.map((b) => b.category).filter(Boolean))

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0]">My Bookmarks</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">Books and resources you&apos;ve saved for quick access.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Saved Items">
            <p className="text-[32px] font-bold text-[#2563EB]">{bookmarks.length}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Books in your collection</p>
          </SectionCard>
          <SectionCard title="Categories">
            <p className="text-[32px] font-bold text-[#8B5CF6]">{categories.size}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Distinct subjects</p>
          </SectionCard>
          <SectionCard title="Recently Added">
            <p className="text-[32px] font-bold text-[#0D9488]">
              {bookmarks.filter((b) => {
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return new Date(b.createdAt) > weekAgo
              }).length}
            </p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Added this week</p>
          </SectionCard>
        </div>

        <SectionCard title="Saved Books" icon={Bookmark}>
          <div className="space-y-0">
            {bookmarks.length === 0 ? (
              <p className="text-[13px] text-slate-400 text-center py-8">No bookmarks yet.</p>
            ) : (
              bookmarks.map((bm) => (
                <div key={bm.id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-lg px-2 transition-colors group">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center shrink-0 border border-slate-100 dark:border-white/[0.08]">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{bm.bookTitle}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-0.5">{bm.author}</p>
                  </div>
                  {bm.category && (
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColors[bm.category] ?? 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#94A3B8]'}`}>
                      {bm.category}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 dark:text-[#6B7A99] shrink-0">{new Date(bm.createdAt).toLocaleDateString()}</span>
                  <button className="h-7 w-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all">
                    <Trash2 className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] hover:text-red-500" />
                  </button>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
