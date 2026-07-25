'use client'

import { Package, Search } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface BookItem {
  id: string
  title: string
  author: string
  isbn: string | null
  category: string | null
  totalCopies: number
  availableCopies: number
  loanedCopies: number
  status: string
}

interface Stats {
  totalBooks: number
  totalCopies: number
  availableCopies: number
  loanedCopies: number
  lostCopies: number
  damagedCopies: number
}

export function InventoryClient({ books, stats }: { books: BookItem[]; stats: Stats }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Inventory</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Full library inventory overview</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Total Books', value: stats.totalBooks },
            { label: 'Total Copies', value: stats.totalCopies },
            { label: 'Available', value: stats.availableCopies },
            { label: 'On Loan', value: stats.loanedCopies },
            { label: 'Lost', value: stats.lostCopies },
            { label: 'Damaged', value: stats.damagedCopies },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-[#0E1F3F] rounded-2xl p-4 border border-slate-100 dark:border-white/[0.08] shadow-sm">
              <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{s.label}</p>
              <p className="text-[24px] font-bold text-slate-900 dark:text-[#E2E8F0]">{s.value}</p>
            </div>
          ))}
        </div>

        <SectionCard title="Book Inventory" icon={Package}>
          <div className="space-y-2">
            {books.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No books in inventory</p>
            ) : (
              books.slice(0, 50).map((b) => (
                <div key={b.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{b.title}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{b.author} · {b.category ?? 'N/A'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{b.availableCopies}/{b.totalCopies}</p>
                    <p className="text-[10px] text-slate-400 dark:text-[#6B7A99]">avail/total</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
