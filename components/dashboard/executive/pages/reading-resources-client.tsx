'use client'

import { BookOpen, ArrowRight } from 'lucide-react'

interface Book {
  id: string
  title: string
  author: string
  category: string | null
  status: string
  totalCopies: number
  availableCopies: number
}

const status_colors: Record<string, string> = {
  available: 'bg-emerald-50 text-emerald-600',
  unavailable: 'bg-amber-50 text-amber-600',
  reserved: 'bg-blue-50 text-blue-600',
}

export function ReadingResourcesClient({ books }: { books: Book[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Reading Resources</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Browse the physical book collection</p>
      </div>
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Collection Overview</h3>
          <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 inline-flex items-center gap-1.5 transition-all duration-200">
            Browse catalogue <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {books.map((r) => (
            <div key={r.id} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{r.title}</p>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{r.author} · {r.category ?? 'Uncategorised'}</p>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{r.totalCopies} copies</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status_colors[r.status] ?? 'bg-slate-100 text-slate-600'}`}>{r.status === 'available' ? 'Available' : 'On Loan'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
