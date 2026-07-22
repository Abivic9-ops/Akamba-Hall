'use client'

import { useState, useMemo } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { FileText, Search, ChevronLeft, ChevronRight, BookOpen, Archive, RefreshCw } from 'lucide-react'
import { recent_transactions, type TransactionType } from '@/lib/mock/desk-data'

const ITEMS_PER_PAGE = 5

export function IssueLogPageClient() {
  const [activeFilter, setActiveFilter] = useState<TransactionType | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    return recent_transactions.filter((tx) => {
      if (activeFilter !== 'all' && tx.type !== activeFilter) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (
          !tx.itemTitle.toLowerCase().includes(q) &&
          !tx.memberName.toLowerCase().includes(q) &&
          !tx.memberId.toLowerCase().includes(q)
        ) return false
      }
      if (dateFrom && new Date(tx.timestamp) < new Date(dateFrom)) return false
      if (dateTo && new Date(tx.timestamp) > new Date(dateTo + 'T23:59:59')) return false
      return true
    })
  }, [activeFilter, searchQuery, dateFrom, dateTo])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const typeIcon = (type: TransactionType) => {
    switch (type) {
      case 'issue': return <BookOpen className="h-3.5 w-3.5" />
      case 'return': return <Archive className="h-3.5 w-3.5" />
      case 'renewal': return <RefreshCw className="h-3.5 w-3.5" />
    }
  }

  const typeBadge = (type: TransactionType) => {
    switch (type) {
      case 'issue': return <Badge variant="success" dot>Issue</Badge>
      case 'return': return <Badge variant="info" dot>Return</Badge>
      case 'renewal': return <Badge variant="warning" dot>Renewal</Badge>
    }
  }

  return (
    <div className="bg-[#F8F9FB] min-h-screen">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] tracking-tight">Issue Log</h1>
            <p className="text-[12px] text-slate-500">Complete history of all circulation transactions</p>
          </div>
        </div>

        <SectionCard title="Transaction History" icon={FileText}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title, member name, or ID..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                  className="w-full h-10 pl-9 pr-4 rounded-lg border border-slate-200 bg-white text-[13px] text-[#0B1B3D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1) }}
                  className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-[12px] text-[#0B1B3D] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                />
                <span className="flex items-center text-[12px] text-slate-400">to</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1) }}
                  className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-[12px] text-[#0B1B3D] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {(['all', 'issue', 'return', 'renewal'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => { setActiveFilter(f); setCurrentPage(1) }}
                  className={`h-8 px-4 rounded-full text-[12px] font-bold transition ${
                    activeFilter === f
                      ? 'bg-[#0B1B3D] text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'issue' ? 'Issues' : f === 'return' ? 'Returns' : 'Renewals'}
                </button>
              ))}
              <span className="ml-auto flex items-center text-[12px] text-slate-400 font-medium">
                {filtered.length} transaction{filtered.length !== 1 ? 's' : ''} found
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Time</th>
                    <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Item</th>
                    <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Member</th>
                    <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((tx) => (
                    <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                      <td className="py-3 px-3">
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-[#0B1B3D]">
                            {new Date(tx.timestamp).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(tx.timestamp).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className={`h-7 w-7 rounded-full flex items-center justify-center ${
                            tx.type === 'issue' ? 'bg-emerald-50 text-emerald-600' :
                            tx.type === 'return' ? 'bg-blue-50 text-blue-600' :
                            'bg-amber-50 text-amber-500'
                          }`}>
                            {typeIcon(tx.type)}
                          </div>
                          {typeBadge(tx.type)}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[13px] font-bold text-[#0B1B3D]">{tx.itemTitle}</span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-col">
                          <span className="text-[12px] font-medium text-slate-700">{tx.memberName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{tx.memberId}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[12px] text-slate-500">{tx.category}</span>
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant={tx.status === 'Issued' ? 'success' : tx.status === 'Returned' ? 'info' : 'warning'}>
                          {tx.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[13px] text-slate-400">No transactions match your filters</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[12px] text-slate-400">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 rounded-lg text-[12px] font-bold flex items-center justify-center transition ${
                      currentPage === page
                        ? 'bg-[#0B1B3D] text-white'
                        : 'border border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
