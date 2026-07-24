'use client'

import { useState, useTransition } from 'react'
import type { Role } from '@prisma/client'
import { BriefcaseBusiness, Search, UserCheck, UserX, Shield } from 'lucide-react'
import { suspend_member, activate_member, update_staff_role } from '@/lib/actions/library-head'

interface StaffItem {
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

const role_config: Record<string, { label: string; color: string }> = {
  STAFF: { label: 'Staff', color: 'bg-blue-50 text-blue-600' },
  ASSISTANT: { label: 'Assistant', color: 'bg-amber-50 text-amber-600' },
  CAPTAIN: { label: 'Captain', color: 'bg-amber-50 text-amber-700' },
  PREFECT: { label: 'Prefect', color: 'bg-orange-50 text-orange-600' },
}

const assignable_roles = ['STAFF', 'ASSISTANT', 'CAPTAIN', 'PREFECT'] as const

function format_date(d: Date | string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function StaffClient({
  staff,
  stats,
}: {
  staff: StaffItem[]
  stats: { totalStaff: number; activeStaff: number; suspendedStaff: number }
}) {
  const [search, set_search] = useState('')
  const [roleFilter, set_roleFilter] = useState('ALL')
  const [isPending, startTransition] = useTransition()
  const [optimistic_status, set_optimistic_status] = useState<Record<string, string>>({})
  const [optimistic_role, set_optimistic_role] = useState<Record<string, string>>({})

  const filtered = staff.filter(s => {
    const currentStatus = optimistic_status[s.id] ?? s.status
    const currentRole = optimistic_role[s.id] ?? s.role
    if (roleFilter !== 'ALL' && currentRole !== roleFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const name = s.fullName?.toLowerCase() ?? ''
      const sid = s.studentId?.toLowerCase() ?? ''
      const email = s.email?.toLowerCase() ?? ''
      if (!name.includes(q) && !sid.includes(q) && !email.includes(q)) return false
    }
    return true
  })

  function handle_suspend(userId: string) {
    if (!confirm('Suspend this staff member?')) return
    set_optimistic_status(prev => ({ ...prev, [userId]: 'SUSPENDED' }))
    startTransition(async () => {
      const result = await suspend_member(userId)
      if (!result.success) {
        set_optimistic_status(prev => { const n = { ...prev }; delete n[userId]; return n })
        alert(result.error)
      }
    })
  }

  function handle_activate(userId: string) {
    set_optimistic_status(prev => ({ ...prev, [userId]: 'ACTIVE' }))
    startTransition(async () => {
      const result = await activate_member(userId)
      if (!result.success) {
        set_optimistic_status(prev => { const n = { ...prev }; delete n[userId]; return n })
        alert(result.error)
      }
    })
  }

  function handle_role_change(userId: string, newRole: string) {
    set_optimistic_role(prev => ({ ...prev, [userId]: newRole }))
    startTransition(async () => {
      const result = await update_staff_role(userId, newRole as Role)
      if (!result.success) {
        set_optimistic_role(prev => { const n = { ...prev }; delete n[userId]; return n })
        alert(result.error)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Staff</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Manage library staff and desk personnel</p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Staff', value: stats.totalStaff, icon: BriefcaseBusiness, color: 'text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]' },
          { label: 'Active', value: stats.activeStaff, icon: UserCheck, color: 'text-emerald-600' },
          { label: 'Suspended', value: stats.suspendedStaff, icon: UserX, color: 'text-red-500' },
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
          value={roleFilter}
          onChange={e => set_roleFilter(e.target.value)}
          className="h-10 px-3 rounded-xl border border-slate-200 dark:border-white/10 dark:border-white/10 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] text-[13px] text-slate-700 dark:text-[#E2E8F0] focus:border-[#D4A017] outline-none cursor-pointer"
        >
          <option value="ALL">All Roles</option>
          {assignable_roles.map(r => (
            <option key={r} value={r}>{role_config[r]?.label ?? r}</option>
          ))}
        </select>
      </div>

      {/* table */}
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]">
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Staff Member</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Role</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Activity</th>
                <th className="text-right px-5 py-3 text-[11px] font-medium text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">No staff members found</td>
                </tr>
              ) : (
                filtered.map(s => {
                  const currentStatus = optimistic_status[s.id] ?? s.status
                  const currentRole = optimistic_role[s.id] ?? s.role
                  const sCfg = status_config[currentStatus] ?? status_config.ACTIVE
                  const rCfg = role_config[currentRole] ?? role_config.STAFF
                  const isActive = currentStatus === 'ACTIVE'

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-[#0B1A3B] flex items-center justify-center text-[11px] font-medium text-white shrink-0">
                            {(s.fullName ?? 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0]">{s.fullName ?? 'Unknown'}</p>
                            <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{s.email ?? '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <select
                          value={currentRole}
                          onChange={e => handle_role_change(s.id, e.target.value)}
                          disabled={isPending}
                          className={`h-7 px-2 rounded-lg border border-slate-200 dark:border-white/10 dark:border-white/10 text-[11px] font-semibold bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] cursor-pointer focus:border-[#D4A017] outline-none disabled:opacity-50 ${rCfg.color}`}
                        >
                          {assignable_roles.map(r => (
                            <option key={r} value={r}>{role_config[r]?.label ?? r}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${sCfg.color}`}>{sCfg.label}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">{s._count.loans} loans · {s._count.bookings} bookings</p>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {isActive ? (
                          <button
                            onClick={() => handle_suspend(s.id)}
                            disabled={isPending}
                            className="h-7 px-3 rounded-lg border border-red-200 text-red-500 text-[11px] font-semibold hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handle_activate(s.id)}
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
