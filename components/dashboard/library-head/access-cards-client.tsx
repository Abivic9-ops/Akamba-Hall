'use client'

import { CreditCard, Search, User } from 'lucide-react'
import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'

interface UserWithCard {
  id: string
  fullName: string | null
  studentId: string | null
  role: string
  qrCards: { id: string; cardRef: string; status: string }[]
}

export function AccessCardsClient({ users }: { users: UserWithCard[] }) {
  const [search, set_search] = useState('')

  const filtered = users.filter((u) => {
    if (!search) return true
    const q = search.toLowerCase()
    const name = u.fullName?.toLowerCase() ?? ''
    const sid = u.studentId?.toLowerCase() ?? ''
    return name.includes(q) || sid.includes(q)
  })

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Access Cards</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Manage member access cards</p>
          </div>
        </div>

        <SectionCard title="Members & Cards" icon={CreditCard}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => set_search(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
            />
          </div>

          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No members found</p>
            ) : (
              filtered.map((u) => (
                <div key={u.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-sky-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{u.fullName ?? 'Unknown'}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{u.studentId ?? 'N/A'} · {u.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {u.qrCards.length > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-600">Active</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99]">No Card</span>
                    )}
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
