'use client'

import { useState, useTransition } from 'react'
import { CreditCard, CheckCircle, PauseCircle, XCircle, User, Search, Plus, Eye, EyeOff, RotateCcw, Loader2 } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { issue_qr_card_to_user, suspend_qr_card, revoke_qr_card, reactivate_qr_card, get_card_qr_image } from '@/lib/actions/qr-cards'

interface Card {
  id: string
  cardRef: string
  status: string
  issuedAt: string
  suspendedAt: string | null
  revokedAt: string | null
  user: { fullName: string | null; email: string | null; studentId: string | null }
}

interface UserWithoutCard {
  id: string
  fullName: string | null
  email: string | null
  studentId: string | null
  role: string
}

interface QrCardsClientProps {
  cards: Card[]
  usersWithoutCards: UserWithoutCard[]
  stats: { total: number; active: number; suspended: number; revoked: number }
}

const statusConfig: Record<string, { label: string; color: string; bg: string; Icon: typeof CheckCircle }> = {
  ACTIVE: { label: 'Active', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10', Icon: CheckCircle },
  SUSPENDED: { label: 'Suspended', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10', Icon: PauseCircle },
  REVOKED: { label: 'Revoked', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-500/10', Icon: XCircle },
}

export function QrCardsClient({ cards, usersWithoutCards, stats }: QrCardsClientProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [showIssuePanel, setShowIssuePanel] = useState(false)
  const [qrModal, setQrModal] = useState<{ cardRef: string; userName: string; qrUrl: string } | null>(null)
  const [pending, startTransition] = useTransition()
  const [actionTarget, setActionTarget] = useState<string | null>(null)

  const filtered = cards.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const name = c.user.fullName?.toLowerCase() ?? ''
      const ref = c.cardRef.toLowerCase()
      const sid = c.user.studentId?.toLowerCase() ?? ''
      if (!name.includes(q) && !ref.includes(q) && !sid.includes(q)) return false
    }
    return true
  })

  const filteredUsers = usersWithoutCards.filter((u) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (u.fullName?.toLowerCase() ?? '').includes(q) || (u.studentId?.toLowerCase() ?? '').includes(q) || (u.email?.toLowerCase() ?? '').includes(q)
  })

  function handleIssue(userId: string) {
    setActionTarget(userId)
    startTransition(async () => {
      await issue_qr_card_to_user(userId)
      setActionTarget(null)
      window.location.reload()
    })
  }

  function handleSuspend(cardId: string) {
    setActionTarget(cardId)
    startTransition(async () => {
      await suspend_qr_card(cardId)
      setActionTarget(null)
      window.location.reload()
    })
  }

  function handleRevoke(cardId: string) {
    setActionTarget(cardId)
    startTransition(async () => {
      await revoke_qr_card(cardId)
      setActionTarget(null)
      window.location.reload()
    })
  }

  function handleReactivate(cardId: string) {
    setActionTarget(cardId)
    startTransition(async () => {
      await reactivate_qr_card(cardId)
      setActionTarget(null)
      window.location.reload()
    })
  }

  async function handleViewQr(cardId: string, cardRef: string, userName: string) {
    const qrUrl = await get_card_qr_image(cardId)
    if (qrUrl) setQrModal({ cardRef, userName, qrUrl })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">QR Cards</h1>
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Generate and manage QR access cards</p>
            </div>
          </div>
          <button
            onClick={() => setShowIssuePanel(!showIssuePanel)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Issue QR Card ({usersWithoutCards.length})
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Cards', value: stats.total, color: 'text-[#5B9BD5]' },
            { label: 'Active', value: stats.active, color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Suspended', value: stats.suspended, color: 'text-amber-600 dark:text-amber-400' },
            { label: 'Revoked', value: stats.revoked, color: 'text-red-600 dark:text-red-400' },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-4">
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{s.label}</p>
              <p className={`text-2xl font-extrabold ${s.color} mt-1`}>{s.value}</p>
            </div>
          ))}
        </div>

        {showIssuePanel && (
          <SectionCard title="Users Without QR Cards" icon={Plus}>
            {filteredUsers.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">All users have QR cards.</p>
            ) : (
              <div className="space-y-2">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{u.fullName ?? 'Unknown'}</p>
                      <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{u.studentId ?? u.email} &middot; {u.role.replace('_', ' ')}</p>
                    </div>
                    <button
                      onClick={() => handleIssue(u.id)}
                      disabled={pending && actionTarget === u.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-[12px] font-medium hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
                    >
                      {pending && actionTarget === u.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
                      Issue
                    </button>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, card ref, or student ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
            />
          </div>
          {['ALL', 'ACTIVE', 'SUSPENDED', 'REVOKED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                statusFilter === s
                  ? 'bg-[#5B9BD5] text-white'
                  : 'bg-white dark:bg-[#0E1F3F] text-slate-600 dark:text-[#6B7A99] border border-slate-200 dark:border-white/[0.08]'
              }`}
            >
              {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <SectionCard title="All QR Cards" icon={CreditCard}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CreditCard className="h-10 w-10 text-slate-300 dark:text-[#6B7A99] mb-3" />
              <p className="text-[14px] text-slate-500 dark:text-[#6B7A99]">No QR cards found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                    <th className="text-left py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] font-medium">User</th>
                    <th className="text-left py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] font-medium">Card Ref</th>
                    <th className="text-left py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] font-medium">Status</th>
                    <th className="text-left py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] font-medium">Issued</th>
                    <th className="text-left py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] font-medium">QR</th>
                    <th className="text-left py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((card) => {
                    const sc = statusConfig[card.status] ?? statusConfig.ACTIVE
                    const SIcon = sc.Icon
                    return (
                      <tr key={card.id} className="border-b border-slate-50 dark:border-white/[0.04] last:border-0">
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center">
                              <User className="h-3.5 w-3.5 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-slate-800 dark:text-[#E2E8F0] font-medium">{card.user.fullName ?? 'Unknown'}</p>
                              <p className="text-[11px] text-slate-400 dark:text-[#6B7A99]">{card.user.studentId ?? card.user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-[#E2E8F0]">{card.cardRef}</td>
                        <td className="py-2.5 px-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${sc.bg} ${sc.color}`}>
                            <SIcon className="h-3 w-3" />
                            {sc.label}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 dark:text-[#6B7A99]">{new Date(card.issuedAt).toLocaleDateString()}</td>
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => handleViewQr(card.id, card.cardRef, card.user.fullName ?? 'Unknown')}
                            className="flex items-center gap-1 text-[12px] text-[#5B9BD5] hover:text-[#4A8AC4] transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" /> View
                          </button>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            {card.status === 'ACTIVE' && (
                              <>
                                <button
                                  onClick={() => handleSuspend(card.id)}
                                  disabled={pending && actionTarget === card.id}
                                  className="text-[11px] px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors disabled:opacity-50"
                                >
                                  Suspend
                                </button>
                                <button
                                  onClick={() => handleRevoke(card.id)}
                                  disabled={pending && actionTarget === card.id}
                                  className="text-[11px] px-2 py-1 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors disabled:opacity-50"
                                >
                                  Revoke
                                </button>
                              </>
                            )}
                            {(card.status === 'SUSPENDED' || card.status === 'REVOKED') && (
                              <button
                                onClick={() => handleReactivate(card.id)}
                                disabled={pending && actionTarget === card.id}
                                className="text-[11px] px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                              >
                                <RotateCcw className="h-3 w-3 inline mr-1" />
                                Reactivate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>

      {qrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setQrModal(null)}>
          <div className="bg-white dark:bg-[#13285A] rounded-2xl border border-slate-200 dark:border-white/[0.1] shadow-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <h3 className="text-[16px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{qrModal.userName}</h3>
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] font-mono">{qrModal.cardRef}</p>
            </div>
            <div className="flex justify-center mb-4">
              <img src={qrModal.qrUrl} alt={`QR for ${qrModal.cardRef}`} className="w-64 h-64 rounded-xl border border-slate-100 dark:border-white/[0.08]" />
            </div>
            <div className="flex gap-2">
              <a
                href={qrModal.qrUrl}
                download={`qr-${qrModal.cardRef}.png`}
                className="flex-1 text-center px-4 py-2 rounded-xl bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors"
              >
                Download
              </a>
              <button
                onClick={() => setQrModal(null)}
                className="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#E2E8F0] text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
