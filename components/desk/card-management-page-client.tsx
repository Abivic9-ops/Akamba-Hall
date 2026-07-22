'use client'

import { useState } from 'react'
import { CreditCard, Search, Ban, RotateCcw, Plus } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'

const allCards = [
  { id: 1, cardRef: 'AKB-C-0421', memberName: 'Wanjiku Kamau', studentId: 'AKM-2026-0042', status: 'Active', issuedDate: '15 Jan 2026', cardType: 'Standard' },
  { id: 2, cardRef: 'AKB-C-0422', memberName: 'Otieno Ochieng', studentId: 'AKM-2026-0117', status: 'Active', issuedDate: '20 Feb 2026', cardType: 'Premium' },
  { id: 3, cardRef: 'AKB-C-0423', memberName: 'Amina Hassan', studentId: 'AKM-2026-0089', status: 'Suspended', issuedDate: '03 Mar 2026', cardType: 'Standard' },
  { id: 4, cardRef: 'AKB-C-0424', memberName: 'Kipchoge Korir', studentId: 'AKM-2025-0314', status: 'Revoked', issuedDate: '12 Nov 2025', cardType: 'Premium' },
  { id: 5, cardRef: 'AKB-C-0425', memberName: 'Faith Wambui', studentId: 'AKM-2026-0203', status: 'Active', issuedDate: '08 Apr 2026', cardType: 'Standard' },
  { id: 6, cardRef: 'AKB-C-0426', memberName: 'Nyerere Odhiambo', studentId: 'AKM-2026-0156', status: 'Active', issuedDate: '19 Jun 2026', cardType: 'Standard' },
]

const statusFilters = ['All', 'Active', 'Suspended', 'Revoked']

export function CardManagementPageClient() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [memberId, setMemberId] = useState('')
  const [cardType, setCardType] = useState('Standard')
  const [issueSuccess, setIssueSuccess] = useState(false)

  const filtered = activeFilter === 'All' ? allCards : allCards.filter(c => c.status === activeFilter)

  const handleIssue = () => {
    if (!memberId.trim()) return
    setIssueSuccess(true)
    setTimeout(() => { setIssueSuccess(false); setMemberId(''); setCardType('Standard') }, 3000)
  }

  const statusBadge = (status: string) => {
    if (status === 'Active') return <Badge variant="success" dot>Active</Badge>
    if (status === 'Suspended') return <Badge variant="danger" dot>Suspended</Badge>
    return <Badge variant="neutral" dot>Revoked</Badge>
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
                  {f} ({f === 'All' ? allCards.length : allCards.filter(c => c.status === f).length})
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
                        <span className="text-[11px] text-slate-400">{card.issuedDate}</span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          {card.status === 'Active' && (
                            <button title="Suspend Card" className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                              <Ban className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {(card.status === 'Active' || card.status === 'Suspended') && (
                            <button title="Revoke Card" className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                              <Ban className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {(card.status === 'Revoked' || card.status === 'Suspended') && (
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
              Card issued successfully to member {memberId}! New card reference: AKB-C-{String(Math.floor(427 + Math.random() * 100)).padStart(4, '0')}
            </div>
          )}
        </SectionCard>

      </div>
    </div>
  )
}
