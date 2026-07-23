'use client'

import { useState, useTransition } from 'react'
import { Users, Search, UserCheck, UserX, AlertTriangle } from 'lucide-react'
import { suspend_member, activate_member } from '@/lib/actions/library-head'

interface MemberItem {
  id: string
  fullName: string | null
  email: string | null
  studentId: string | null
  role: string
  memberType: string
  status: string
  createdAt: Date
  lastActiveAt: Date | null
  _count: { loans: number; bookings: number }
}

const status_config: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: 'Active', color: 'bg-emerald-50 text-emerald-600' },
  INACTIVE: { label: 'Inactive', color: 'bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]' },
  SUSPENDED: { label: 'Suspended', color: 'bg-red-50 text-red-500' },
}

function format_date(d: Date | string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function MembersClient({
  members,
  stats,
}: {
  members: MemberItem[]
  stats: { totalStudents: number; activeStudents: number; suspendedStudents: number }
}) {
  const [search, set_search] = useState('')
  const [statusFilter, set_statusFilter] = useState('ALL')
  const [isPending, startTransition] = useTransition()
  const [optimistic, set_optimistic] = useState<Record<string, string>>({})

  const filtered = members.filter(m => {
    const currentStatus = optimistic[m.id] ?? m.status
    if (statusFilter !== 'ALL' && currentStatus !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const name = m.fullName?.toLowerCase() ?? ''
      const sid = m.studentId?.toLowerCase() ?? ''
      const email = m.email?.toLowerCase() ?? ''
      if (!name.includes(q) && !sid.includes(q) && !email.includes(q)) return false
    }
    return true
  })

  function handle_suspend(userId: string) {
    if (!confirm('Suspend this member? They will not be able to borrow or book spaces.')) return
    set_optimistic(prev => ({ ...prev, [userId]: 'SUSPENDED' }))
    startTransition(async () => {
      const result = await suspend_member(userId)
      if (!result.success) {
        set_optimistic(prev => {
          const next = { ...prev }
          delete next[userId]
          return next
        })
        alert(result.error)
      }
    })
  }

  function handle_activate(userId: string) {
    set_optimistic(prev => ({ ...prev, [userId]: 'ACTIVE' }))
    startTransition(async () => {
      const result = await activate_member(userId)
      if (!result.success) {
        set_optimistic(prev => {
          const next = { ...prev }
          delete next[userId]
          return next
        })
        alert(result.error)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Members</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Manage student library members</p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]' },
          { label: 'Active', value: stats.activeStudents, icon: UserCheck, color: 'text-emerald-600' },
          { label: 'Suspended', value: stats.suspendedStudents, icon: UserX, color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] flex items-center justify-center">
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-[22px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">{s.value}</p>
              <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* search + filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
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
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>

      {/* table */}
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]">
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Member</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Student ID</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Loans</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Joined</th>
                <th className="text-right px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">No members found</td>
                </tr>
              ) : (
                filtered.map(m => {
                  const currentStatus = optimistic[m.id] ?? m.status
                  const cfg = status_config[currentStatus] ?? status_config.ACTIVE
                  const isActive = currentStatus === 'ACTIVE'

                  return (
                    <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-[#0B1A3B] flex items-center justify-center text-[11px] font-medium text-white shrink-0">
                            {(m.fullName ?? 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0]">{m.fullName ?? 'Unknown'}</p>
                            <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{m.email ?? '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[13px] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] font-mono">{m.studentId ?? '—'}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.color}`}>{cfg.label}</span>
                      </td>
                      <td className="px-5 py-3.5 text-[13px] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8]">{m._count.loans}</td>
                      <td className="px-5 py-3.5 text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{format_date(m.createdAt)}</td>
                      <td className="px-5 py-3.5 text-right">
                        {isActive ? (
                          <button
                            onClick={() => handle_suspend(m.id)}
                            disabled={isPending}
                            className="h-7 px-3 rounded-lg border border-red-200 text-red-500 text-[11px] font-semibold hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handle_activate(m.id)}
                            disabled={isPending}
                            className="h-7 px-3 rounded-lg bg-emerald-500 text-white text-[11px] font-semibold hover:bg-emerald-600 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
