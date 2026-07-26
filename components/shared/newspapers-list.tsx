import { Newspaper, Search, Globe, BookOpen, Clock } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { get_newspapers } from '@/lib/actions/newspapers'

export async function NewspapersList() {
  const newspapers = await get_newspapers()

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Newspaper className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Newspapers & Periodicals</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{newspapers.length} publication{newspapers.length !== 1 ? 's' : ''} available</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {newspapers.map((n) => (
            <div key={n.id} className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <Newspaper className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-semibold text-slate-800 dark:text-[#E2E8F0] truncate">{n.title}</h3>
                  <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{n.publisher}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <BookOpen className="h-2.5 w-2.5" /> {n.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#B9C2D8]">
                  <Clock className="h-2.5 w-2.5" /> {n.frequency}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                  {n.language}
                </span>
              </div>
              {n.description && (
                <p className="mt-2 text-[12px] text-slate-400 dark:text-[#6B7A99] line-clamp-2">{n.description}</p>
              )}
              {n.url && (
                <a href={n.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#5B9BD5] hover:text-[#4A8AC4] dark:text-[#5B9BD5] dark:hover:text-[#7DB5EA] transition-colors">
                  <Globe className="h-3 w-3" /> Visit Website
                </a>
              )}
            </div>
          ))}
        </div>

        {newspapers.length === 0 && (
          <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-12 text-center">
            <Newspaper className="h-12 w-12 text-slate-200 dark:text-white/10 mx-auto mb-3" />
            <p className="text-[15px] font-medium text-slate-500 dark:text-[#6B7A99]">No newspapers available yet</p>
            <p className="text-[13px] text-slate-400 dark:text-[#4B5775] mt-1">Publications will appear here once added by the library head.</p>
          </div>
        )}
      </div>
    </div>
  )
}
