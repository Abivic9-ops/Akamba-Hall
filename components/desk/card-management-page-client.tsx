'use client'

import { useMemo, useState } from 'react'
import { CreditCard, Search, Ban, RotateCcw, Plus } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'

interface CardData {
  id: string
  cardRef: string
  memberName: string
  studentId: string
  status: string
  issuedDate: string
  cardType: string
}

const statusFilters = ['All', 'ACTIVE', 'SUSPENDED', 'REVOKED']

export function CardManagementPageClient({ cards }: { cards: CardData[] }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [memberId, setMemberId] = useState('')
  const [cardType, setCardType] = useState('Standard')
  const [issueSuccess, setIssueSuccess] = useState(false)
  const [issuedCardReference, setIssuedCardReference] = useState('')

  const filtered = useMemo(() => activeFilter === 'All' ? cards : cards.filter(c => c.status === activeFilter), [activeFilter, cards])

  const handleIssue = () => {
    if (!memberId.trim()) return
    const nextReference = `AKB-C-${String(Math.floor(427 + Math.random() * 100)).padStart(4, '0')}`
    setIssuedCardReference(nextReference)
    setIssueSuccess(true)
    setTimeout(() => { setIssueSuccess(false); setMemberId(''); setCardType('Standard'); setIssuedCardReference('') }, 3000)
  }

  const statusBadge = (status: string) => {
    if (status === 'ACTIVE') return <Badge variant="success" dot>Active</Badge>
    if (status === 'SUSPENDED') return <Badge variant="danger" dot>Suspended</Badge>
    return <Badge variant="neutral" dot>Revoked</Badge>
  }

  const filterLabel = (f: string) => {
    if (f === 'All') return 'All'
    if (f === 'ACTIVE') return 'Active'
    if (f === 'SUSPENDED') return 'Suspended'
    return 'Revoked'
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">

        <SectionCard title="QR Card Management" icon={CreditCard}>
          <div className="space-y-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
              {statusFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-md text-[12px] font-medium transition-colors ${
                    activeFilter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {filterLabel(f)} ({f === 'All' ? cards.length : cards.filter(c => c.status === f).length})
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Card Ref</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Member Name</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Student ID</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Status</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Issued Date</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(card => (
                    <tr key={card.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 pr-4">
                        <span className="text-[12px] font-mono font-medium text-slate-700">{card.cardRef}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="text-[13px] font-medium text-slate-800">{card.memberName}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-[12px] font-mono text-slate-500">{card.studentId}</span>
                      </td>
                      <td className="py-3 pr-4">{statusBadge(card.status)}</td>
                      <td className="py-3 pr-4">
                        <span className="text-[11px] text-slate-400">
                          {new Date(card.issuedDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          {card.status === 'ACTIVE' && (
                            <button title="Suspend Card" className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                              <Ban className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {(card.status === 'ACTIVE' || card.status === 'SUSPENDED') && (
                            <button title="Revoke Card" className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                              <Ban className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {(card.status === 'REVOKED' || card.status === 'SUSPENDED') && (
                            <button title="Reissue Card" className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                              <RotateCcw className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[13px] text-slate-400">No cards match this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Issue New Card" icon={Plus}>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[12px] font-medium text-slate-600 mb-1">Member ID</label>
              <input
                type="text"
                value={memberId}
                onChange={e => setMemberId(e.target.value)}
                placeholder="e.g. AKM-2026-0042"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors"
              />
            </div>
            <div className="min-w-[180px]">
              <label className="block text-[12px] font-medium text-slate-600 mb-1">Card Type</label>
              <select
                value={cardType}
                onChange={e => setCardType(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors"
              >
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
            <button
              onClick={handleIssue}
              className="h-10 px-6 rounded-lg bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors"
            >
              Issue Card
            </button>
          </div>
          {issueSuccess && (
            <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 text-[13px] text-emerald-700 font-medium">
              Card issued successfully to member {memberId}! New card reference: {issuedCardReference}
            </div>
          )}
        </SectionCard>

      </div>
    </div>
  )
}
