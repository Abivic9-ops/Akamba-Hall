'use client'

import { useState, useTransition } from 'react'
import { Package, CheckCircle2, AlertTriangle, XCircle, Search, ChevronDown } from 'lucide-react'
import { update_copy_status } from '@/lib/actions/library-head'

interface CopyItem {
  id: string
  barcode: string | null
  shelfLocation: string | null
  status: string
}

interface BookWithCopies {
  id: string
  title: string
  author: string
  isbn: string | null
  category: string | null
  copies: CopyItem[]
}

const copy_status_config: Record<string, { label: string; color: string }> = {
  AVAILABLE: { label: 'Available', color: 'bg-emerald-50 text-emerald-600' },
  LOANED: { label: 'On Loan', color: 'bg-blue-50 text-blue-600' },
  LOST: { label: 'Lost', color: 'bg-red-50 text-red-500' },
  DAMAGED: { label: 'Damaged', color: 'bg-orange-50 text-orange-500' },
  RESERVED: { label: 'Reserved', color: 'bg-amber-50 text-amber-600' },
}

export function InventoryClient({
  books,
  stats,
}: {
  books: BookWithCopies[]
  stats: { totalTitles: number; totalCopies: number; availableCopies: number; loanedCopies: number; lostCopies: number; damagedCopies: number }
}) {
  const [search, set_search] = useState('')
  const [statusFilter, set_statusFilter] = useState('ALL')
  const [isPending, startTransition] = useTransition()
  const [optimistic, set_optimistic] = useState<Record<string, string>>({})
  const [expandedBook, set_expandedBook] = useState<string | null>(null)

  const filtered = books.filter(b => {
    if (search) {
      const q = search.toLowerCase()
      if (!b.title.toLowerCase().includes(q) && !b.author.toLowerCase().includes(q) && !(b.isbn?.toLowerCase().includes(q))) return false
    }
    if (statusFilter !== 'ALL') {
      if (!b.copies.some(c => (optimistic[c.id] ?? c.status) === statusFilter)) return false
    }
    return true
  })

  function handle_status_change(copyId: string, newStatus: string) {
    set_optimistic(prev => ({ ...prev, [copyId]: newStatus }))
    startTransition(async () => {
      const result = await update_copy_status(copyId, newStatus as any)
      if (!result.success) {
        set_optimistic(prev => {
          const next = { ...prev }
          delete next[copyId]
          return next
        })
        alert(result.error)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Inventory</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Manage books, copies, and stock status</p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Titles', value: stats.totalTitles, color: 'text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]' },
          { label: 'Total Copies', value: stats.totalCopies, color: 'text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]' },
          { label: 'Available', value: stats.availableCopies, color: 'text-emerald-600' },
          { label: 'On Loan', value: stats.loanedCopies, color: 'text-blue-600' },
          { label: 'Lost / Damaged', value: stats.lostCopies + stats.damagedCopies, color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] p-4">
            <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">{s.label}</p>
            <p className={`text-[24px] font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* search + filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={search}
            onChange={e => set_search(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-white/10 dark:border-white/10 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] text-[13px] text-slate-700 dark:text-[#E2E8F0] placeholder:text-slate-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]/20 outline-none transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => set_statusFilter(e.target.value)}
          className="h-10 px-3 rounded-xl border border-slate-200 dark:border-white/10 dark:border-white/10 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] text-[13px] text-slate-700 dark:text-[#E2E8F0] focus:border-[#D4A017] outline-none cursor-pointer"
        >
          <option value="ALL">All Status</option>
          {Object.entries(copy_status_config).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>

      {/* book list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] p-12 text-center">
            <Package className="h-10 w-10 text-slate-200 mx-auto mb-3" />
            <p className="text-[14px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">No books found</p>
          </div>
        ) : (
          filtered.map(book => {
            const isExpanded = expandedBook === book.id
            return (
              <div key={book.id} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
                <button
                  onClick={() => set_expandedBook(isExpanded ? null : book.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors text-left cursor-pointer"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#0B1A3B]/5 flex items-center justify-center shrink-0">
                    <Package className="h-5 w-5 text-[#0B1A3B] dark:text-white dark:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{book.title}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{book.author} {book.isbn ? `· ISBN ${book.isbn}` : ''}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {book.category && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{book.category}</span>
                    )}
                    <span className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{book.copies.length} cop{book.copies.length !== 1 ? 'ies' : 'y'}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-50">
                          <th className="text-left px-5 py-2 text-[10px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase">Barcode</th>
                          <th className="text-left px-5 py-2 text-[10px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase">Shelf</th>
                          <th className="text-left px-5 py-2 text-[10px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase">Status</th>
                          <th className="text-right px-5 py-2 text-[10px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {book.copies.map(copy => {
                          const currentStatus = optimistic[copy.id] ?? copy.status
                          const cfg = copy_status_config[currentStatus] ?? copy_status_config.AVAILABLE
                          return (
                            <tr key={copy.id} className="hover:bg-slate-50/50">
                              <td className="px-5 py-2.5 text-[12px] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] font-mono">{copy.barcode ?? '—'}</td>
                              <td className="px-5 py-2.5 text-[12px] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8]">{copy.shelfLocation ?? '—'}</td>
                              <td className="px-5 py-2.5">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.color}`}>{cfg.label}</span>
                              </td>
                              <td className="px-5 py-2.5 text-right">
                                <select
                                  value={currentStatus}
                                  onChange={e => handle_status_change(copy.id, e.target.value)}
                                  disabled={isPending}
                                  className="h-7 px-2 rounded-lg border border-slate-200 dark:border-white/10 dark:border-white/10 text-[11px] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] cursor-pointer focus:border-[#D4A017] outline-none disabled:opacity-50"
                                >
                                  {Object.entries(copy_status_config).map(([key, val]) => (
                                    <option key={key} value={key}>{val.label}</option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
