'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Users, Search, Filter, GraduationCap, Briefcase, Shield } from 'lucide-react'

interface MemberItem {
  id: string
  fullName: string | null
  email: string | null
  studentId: string | null
  role: string
  status: string
  memberType: string
  createdAt: string
}

interface RoleCount {
  role: string
  count: number
}

interface StaffMembersClientProps {
  members: MemberItem[]
  totalCount: number
  roleCounts: RoleCount[]
}

const roleColors: Record<string, string> = {
  STUDENT: 'info',
  STAFF: 'warning',
  EXECUTIVE: 'success',
  ASSISTANT: 'success',
  CAPTAIN: 'success',
  PREFECT: 'success',
  LIBRARY_HEAD: 'success',
  SUPER_ADMIN: 'danger',
}

const statusColors: Record<string, string> = {
  ACTIVE: 'success',
  INACTIVE: 'neutral',
  SUSPENDED: 'danger',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function StaffMembersClient({ members, totalCount, roleCounts }: StaffMembersClientProps) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')

  const filtered = members.filter((m) => {
    const q = search.toLowerCase()
    const matchSearch =
      (m.fullName ?? '').toLowerCase().includes(q) ||
      (m.email ?? '').toLowerCase().includes(q) ||
      (m.studentId ?? '').toLowerCase().includes(q)
    const matchRole = roleFilter === 'ALL' || m.role === roleFilter
    return matchSearch && matchRole
  })

  const studentCount = roleCounts.find((r) => r.role === 'STUDENT')?.count ?? 0
  const staffCount = roleCounts.find((r) => r.role === 'STAFF')?.count ?? 0
  const executiveCount = roleCounts.filter((r) =>
    ['EXECUTIVE', 'ASSISTANT', 'CAPTAIN', 'PREFECT', 'LIBRARY_HEAD'].includes(r.role)
  ).reduce((sum, r) => sum + r.count, 0)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SectionCard title="Total Members">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center">
              <Users className="h-5 w-5 text-slate-500 dark:text-[#6B7A99]" />
            </div>
            <div>
              <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0] leading-none">{totalCount.toLocaleString()}</p>
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Active accounts</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Students">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-[#2563EB]" />
            </div>
            <div>
              <p className="text-[32px] font-bold text-[#2563EB] leading-none">{studentCount.toLocaleString()}</p>
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Student members</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Staff">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-[#8B5CF6]" />
            </div>
            <div>
              <p className="text-[32px] font-bold text-[#8B5CF6] leading-none">{staffCount.toLocaleString()}</p>
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Teaching & non-teaching</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Leadership">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#18A957]/10 dark:bg-[#18A957]/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-[#18A957]" />
            </div>
            <div>
              <p className="text-[32px] font-bold text-[#18A957] leading-none">{executiveCount.toLocaleString()}</p>
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Executives & leaders</p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Member Directory" icon={Users}>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-[#6B7A99]" />
            <input
              type="text"
              placeholder="Search by name, email, or student ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[14px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99]" />
            <div className="flex gap-1.5 overflow-x-auto">
              {['ALL', 'STUDENT', 'STAFF', 'EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'].map((f) => (
                <button
                  key={f}
                  onClick={() => setRoleFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all ${
                    roleFilter === f
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#F8F9FB] dark:bg-[#071224] text-slate-600 dark:text-[#94A3B8] border border-slate-200 dark:border-white/10 hover:bg-slate-100'
                  }`}
                >
                  {f === 'ALL' ? 'All Roles' : f.charAt(0) + f.slice(1).toLowerCase().replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                <th className="pb-3 text-[12px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider">Name</th>
                <th className="pb-3 text-[12px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="pb-3 text-[12px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider hidden lg:table-cell">Student ID</th>
                <th className="pb-3 text-[12px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider">Role</th>
                <th className="pb-3 text-[12px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="pb-3 text-[12px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider hidden lg:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-[13px] text-slate-400 dark:text-[#6B7A99]">
                    No members found.
                  </td>
                </tr>
              ) : (
                filtered.map((member) => (
                  <tr key={member.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                          {(member.fullName ?? 'U').charAt(0).toUpperCase()}
                        </div>
                        <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{member.fullName ?? 'Unnamed'}</p>
                      </div>
                    </td>
                    <td className="py-3 pr-4 hidden md:table-cell">
                      <span className="text-[13px] text-slate-500 dark:text-[#6B7A99]">{member.email ?? '—'}</span>
                    </td>
                    <td className="py-3 pr-4 hidden lg:table-cell">
                      <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] font-mono">{member.studentId ?? '—'}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={(roleColors[member.role] as 'info' | 'warning' | 'success' | 'danger' | 'neutral') ?? 'neutral'} className="text-[10px]">
                        {member.role.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 hidden md:table-cell">
                      <Badge variant={(statusColors[member.status] as 'success' | 'neutral' | 'danger') ?? 'neutral'} dot className="text-[10px]">
                        {member.status.charAt(0) + member.status.slice(1).toLowerCase()}
                      </Badge>
                    </td>
                    <td className="py-3 hidden lg:table-cell">
                      <span className="text-[13px] text-slate-400 dark:text-[#6B7A99]">{formatDate(member.createdAt)}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-3 text-right">
            Showing {filtered.length} of {totalCount.toLocaleString()} members
          </p>
        )}
      </SectionCard>
    </>
  )
}
