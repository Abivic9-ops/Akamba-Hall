'use client'

import { useState } from 'react'
import { ScanLine, User, BookOpen, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

type MemberState = 'idle' | 'scanning' | 'found' | 'error'
type ItemState = 'idle' | 'disabled' | 'active' | 'scanning' | 'found' | 'error'

interface ScannedMember {
  name: string
  id: string
  role: string
  status: 'Eligible' | 'Suspended'
}

interface ScannedItem {
  title: string
  author: string
  type: string
  availability: 'Available' | 'On Loan' | 'Damaged'
}

export function QuickIssueWorkspace() {
  const [memberState, setMemberState] = useState<MemberState>('idle')
  const [itemState, setItemState] = useState<ItemState>('disabled')
  const [member, setMember] = useState<ScannedMember | null>(null)
  const [item, setItem] = useState<ScannedItem | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [dueDateLabel, setDueDateLabel] = useState('')

  const handleMemberScan = () => {
    setMemberState('scanning')
    setTimeout(() => {
      setMember({
        name: 'James Ochieng',
        id: 'STU-24011076',
        role: 'Student — Year 3',
        status: 'Eligible',
      })
      setMemberState('found')
      setItemState('active')
    }, 1200)
  }

  const handleItemScan = () => {
    setItemState('scanning')
    setTimeout(() => {
      setItem({
        title: 'Advanced Physics: Principles and Applications',
        author: 'Serway & Jewett',
        type: 'General Books',
        availability: 'Available',
      })
      setItemState('found')
    }, 1000)
  }

  const handleIssue = () => {
    const due = new Date(Date.now() + 14 * 86400000)
    setDueDateLabel(due.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }))
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setMemberState('idle')
      setItemState('disabled')
      setMember(null)
      setItem(null)
      setDueDateLabel('')
    }, 2500)
  }

  const handleClearMember = () => {
    setMemberState('idle')
    setItemState('disabled')
    setMember(null)
    setItem(null)
  }

  const canIssue = memberState === 'found' && itemState === 'found' && member?.status === 'Eligible' && item?.availability === 'Available'

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${showSuccess ? 'ring-2 ring-emerald-400' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #0B1A3B 0%, #132859 50%, #1E3A6E 100%)',
        boxShadow: '0 12px 35px rgba(11,26,59,0.18)',
      }}
    >
      {showSuccess && (
        <div className="absolute inset-x-0 top-0 bg-emerald-600 text-white px-7 py-3 flex items-center gap-3 z-10">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-[14px] font-semibold">
            {item?.title} issued to {member?.name} — Due {dueDateLabel}
          </span>
        </div>
      )}

      <div className="relative z-[1] px-7 py-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[20px] font-bold text-white">Quick Issue</h3>
            <p className="text-[13px] text-white/50 mt-0.5">Scan member card first</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10">
            <ScanLine className="h-4 w-4 text-[#E8A63C]" />
            <span className="text-[12px] text-white/60 font-medium">Scan-Ready</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_40px_1fr_40px_1fr] gap-0 items-stretch">
          {/* Zone 1: Member Scan */}
          <div className="bg-white/[0.06] rounded-2xl p-5 border border-white/[0.08]">
            <p className="text-[11px] text-white/40 uppercase tracking-[0.12em] font-semibold mb-4">Member Scan</p>
            <div className="flex flex-col items-center text-center">
              <div
                className={`relative h-[64px] w-[64px] rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                  memberState === 'found'
                    ? 'bg-emerald-500/20 border-2 border-emerald-500'
                    : memberState === 'error'
                      ? 'bg-red-500/20 border-2 border-red-500'
                      : 'bg-white/[0.08] border-2 border-white/20'
                } ${memberState === 'idle' ? 'desk-scan-pulse' : ''}`}
              >
                {memberState === 'found' && member ? (
                  <span className="text-[20px] font-bold text-emerald-400">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                ) : memberState === 'error' ? (
                  <XCircle className="h-6 w-6 text-red-400" />
                ) : (
                  <User className="h-6 w-6 text-white/40" />
                )}
                {memberState === 'scanning' && (
                  <div className="absolute inset-0 rounded-full border-2 border-[#E8A63C] desk-scan-ring" />
                )}
              </div>

              {memberState === 'idle' && (
                <>
                  <p className="text-[14px] font-semibold text-white">No member scanned</p>
                  <p className="text-[12px] text-white/40 mt-1">Scan member QR card to begin</p>
                </>
              )}
              {memberState === 'scanning' && (
                <p className="text-[14px] font-semibold text-[#E8A63C]">Scanning…</p>
              )}
              {memberState === 'found' && member && (
                <>
                  <p className="text-[14px] font-bold text-white">{member.name}</p>
                  <p className="text-[11px] text-white/40 mt-0.5 font-mono">{member.id}</p>
                  <p className="text-[12px] text-white/50 mt-0.5">{member.role}</p>
                  <span className={`mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    member.status === 'Eligible'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {member.status === 'Eligible' ? '✓ Eligible' : '✕ Suspended'}
                  </span>
                </>
              )}
              {memberState === 'error' && (
                <p className="text-[12px] text-red-400">Member not found — try again</p>
              )}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleClearMember}
                className="flex-1 h-9 rounded-xl border border-white/20 text-[12px] font-semibold text-white/70 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={handleMemberScan}
                disabled={memberState === 'scanning' || memberState === 'found'}
                className="flex-1 h-9 rounded-xl bg-[#E8A63C] text-[12px] font-bold text-[#0B1A3B] hover:bg-[#D4952E] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {memberState === 'found' ? 'Scanned ✓' : 'Use Member ID'}
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="h-9 w-9 rounded-full bg-white/[0.08] flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-white/30" />
            </div>
          </div>

          {/* Zone 2: Item Scan */}
          <div className={`bg-white/[0.06] rounded-2xl p-5 border border-white/[0.08] transition-opacity ${itemState === 'disabled' ? 'opacity-30' : ''}`}>
            <p className="text-[11px] text-white/40 uppercase tracking-[0.12em] font-semibold mb-4">Item Scan</p>
            <div className="flex flex-col items-center text-center">
              <div
                className={`relative h-[64px] w-[64px] rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                  itemState === 'found'
                    ? 'bg-emerald-500/20 border-2 border-emerald-500'
                    : itemState === 'error'
                      ? 'bg-red-500/20 border-2 border-red-500'
                      : 'bg-white/[0.08] border-2 border-white/20'
                } ${itemState === 'active' ? 'desk-scan-pulse' : ''}`}
              >
                {itemState === 'found' && item ? (
                  <BookOpen className="h-6 w-6 text-emerald-400" />
                ) : itemState === 'error' ? (
                  <XCircle className="h-6 w-6 text-red-400" />
                ) : (
                  <ScanLine className="h-6 w-6 text-white/40" />
                )}
                {itemState === 'scanning' && (
                  <div className="absolute inset-0 rounded-full border-2 border-[#E8A63C] desk-scan-ring" />
                )}
              </div>

              {itemState === 'disabled' && (
                <>
                  <p className="text-[14px] font-semibold text-white">Scan item barcode</p>
                  <p className="text-[12px] text-white/40 mt-1">Scan book or item barcode</p>
                </>
              )}
              {itemState === 'active' && (
                <>
                  <p className="text-[14px] font-semibold text-white">Ready to scan</p>
                  <p className="text-[12px] text-white/40 mt-1">Scan book or item barcode</p>
                </>
              )}
              {itemState === 'scanning' && (
                <p className="text-[14px] font-semibold text-[#E8A63C]">Scanning item…</p>
              )}
              {itemState === 'found' && item && (
                <>
                  <p className="text-[13px] font-bold text-white leading-tight">{item.title}</p>
                  <p className="text-[11px] text-white/40 mt-1">{item.author}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-medium text-white/60">
                      {item.type}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      item.availability === 'Available'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {item.availability}
                    </span>
                  </div>
                </>
              )}
              {itemState === 'error' && (
                <p className="text-[12px] text-red-400">Item not found — try again</p>
              )}
            </div>
            {itemState === 'active' && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleItemScan}
                  className="h-9 px-5 rounded-xl bg-[#E8A63C] text-[12px] font-bold text-[#0B1A3B] hover:bg-[#D4952E] transition-colors cursor-pointer"
                >
                  Scan Barcode
                </button>
              </div>
            )}
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="h-9 w-9 rounded-full bg-white/[0.08] flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-white/30" />
            </div>
          </div>

          {/* Zone 3: Transaction Summary */}
          <div className="bg-white/[0.06] rounded-2xl p-5 border border-white/[0.08]">
            <p className="text-[11px] text-white/40 uppercase tracking-[0.12em] font-semibold mb-4">Transaction Summary</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
                <span className="text-[12px] text-white/40">Member</span>
                <span className="text-[12px] text-white font-semibold truncate ml-4 text-right max-w-[140px]">{member?.name ?? '—'}</span>
              </div>
              <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
                <span className="text-[12px] text-white/40">Item</span>
                <span className="text-[12px] text-white font-semibold truncate ml-4 text-right max-w-[140px]">{item?.title ?? '—'}</span>
              </div>
              <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
                <span className="text-[12px] text-white/40">Due Date</span>
                <span className="text-[12px] text-white font-semibold">
                  {canIssue ? dueDateLabel || '—' : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-white/40">Item Type</span>
                <span className="text-[12px] text-white font-semibold">{item?.type ?? '—'}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleIssue}
                  disabled={!canIssue}
                  className="w-full h-10 rounded-xl text-[13px] font-bold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                  style={{
                    background: canIssue ? '#E8A63C' : 'rgba(255,255,255,0.08)',
                    color: canIssue ? '#0B1A3B' : 'rgba(255,255,255,0.25)',
                  }}
                >
                  Issue Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
