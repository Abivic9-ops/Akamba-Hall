'use client'

import { useState } from 'react'
import { Users, Search, Eye, Edit, Ban, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'

interface Member {
  id: string
  name: string
  studentId: string
  email: string
  role: string
  status: string
  loans: number
  lastActive: string | null
}

const ITEMS_PER_PAGE = 5

export function MemberManagementPageClient({ members }: { members: Member[] }) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.studentId.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'All' || m.role === roleFilter
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const statusBadge = (status: string) => {
    if (status === 'ACTIVE') return <Badge variant="success" dot>Active</Badge>
    if (status === 'SUSPENDED') return <Badge variant="danger" dot>Suspended</Badge>
    return <Badge variant="neutral" dot>Inactive</Badge>
  }

  const roleDisplay = (role: string) => {
    if (role === 'STAFF') return 'Staff'
    return 'Student'
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">

        <SectionCard title="Member Management" icon={Users}>
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1) }}
                  placeholder="Search by name, ID, or email..."
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-slate-50 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors"
                />
              </div>
              <select
                value={roleFilter}
                onChange={e => { setRoleFilter(e.target.value); setPage(1) }}
                className="h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 text-[13px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
              >
                <option value="All">All Roles</option>
                <option value="STUDENT">Student</option>
                <option value="STAFF">Staff</option>
              </select>
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
                className="h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 text-[13px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
              >
                <option value="All">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Name</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Student ID</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Email</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Role</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Status</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Loans</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">Last Active</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((m) => (
                    <tr key={m.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 pr-4">
                        <p className="text-[13px] font-medium text-slate-800">{m.name}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-[12px] font-mono text-slate-500">{m.studentId}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-[12px] text-slate-500">{m.email}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant="info">{roleDisplay(m.role)}</Badge>
                      </td>
                      <td className="py-3 pr-4">{statusBadge(m.status)}</td>
                      <td className="py-3 pr-4">
                        <span className="text-[13px] font-medium text-slate-700">{m.loans}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-[11px] text-slate-400">
                          {m.lastActive ? new Date(m.lastActive).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          <button title="View" className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-colors">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button title="Edit" className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          {m.status === 'ACTIVE' ? (
                            <button title="Suspend" className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                              <Ban className="h-3.5 w-3.5" />
                            </button>
                          ) : (
                            <button title="Reactivate" className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                              <RotateCcw className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-[13px] text-slate-400">No members match the current filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2">
              <p className="text-[12px] text-slate-400">
                Showing {filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} members
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="h-8 w-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-8 w-8 rounded-lg text-[12px] font-medium transition-colors ${
                      p === page ? 'bg-[#2563EB] text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="h-8 w-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
