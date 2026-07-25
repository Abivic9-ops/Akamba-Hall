'use client'

import { Users, Search } from 'lucide-react'
import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'

interface Member {
  id: string
  fullName: string | null
  studentId: string | null
  email: string | null
  role: string
  createdAt: string
}

const role_colors: Record<string, string> = {
  STUDENT: 'bg-blue-50 text-blue-600',
  STAFF: 'bg-emerald-50 text-emerald-600',
  EXECUTIVE: 'bg-amber-50 text-amber-600',
  ASSISTANT: 'bg-[#5B9BD5]/10 text-[#5B9BD5]',
  CAPTAIN: 'bg-purple-50 text-purple-600',
  PREFECT: 'bg-orange-50 text-orange-600',
  LIBRARY_HEAD: 'bg-red-50 text-red-500',
  SUPER_ADMIN: 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#6B7A99]',
}

function format_date(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function MembersClient({ members }: { members: Member[] }) {
  const [search, set_search] = useState('')
  const [roleFilter, set_roleFilter] = useState('ALL')

  const roles = ['ALL', ...Array.from(new Set(members.map((m) => m.role)))]

  const filtered = members.filter((m) => {
    if (roleFilter !== 'ALL' && m.role !== roleFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const name = m.fullName?.toLowerCase() ?? ''
      const sid = m.studentId?.toLowerCase() ?? ''
      const email = m.email?.toLowerCase() ?? ''
      if (!name.includes(q) && !sid.includes(q) && !email.includes(q)) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Members</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Manage all library members</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => set_roleFilter(r)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                roleFilter === r
                  ? 'bg-[#5B9BD5] text-white'
                  : 'bg-white dark:bg-[#0E1F3F] text-slate-600 dark:text-[#6B7A99] border border-slate-200 dark:border-white/[0.08]'
              }`}
            >
              {r === 'ALL' ? 'All' : r.replace('_', ' ')}
            </button>
          ))}
        </div>

        <SectionCard title="All Members" icon={Users}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or email..."
              value={search}
              onChange={(e) => set_search(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
            />
          </div>

          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No members found</p>
            ) : (
              filtered.map((m) => (
                <div key={m.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                    <Users className="h-4 w-4 text-sky-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{m.fullName ?? 'Unknown'}</p>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">
                      {m.studentId ?? 'N/A'} · {m.email ?? 'No email'} · Joined {format_date(m.createdAt)}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${role_colors[m.role] ?? ''}`}>
                    {m.role.replace('_', ' ')}
                  </span>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
