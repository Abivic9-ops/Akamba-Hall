'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search, Users, BookOpen, Mail, Phone, Calendar, CreditCard,
  ChevronDown, ChevronUp,
} from 'lucide-react'

interface Member {
  id: string
  name: string
  studentId: string
  role: 'Student' | 'Staff'
  status: 'Active' | 'Suspended' | 'Alumni'
  loansCount: number
  lastVisit: string
  email: string
  phone: string
  joinDate: string
  outstandingFines: number
}

const mockMembers: Member[] = [
  { id: 'M-001', name: 'James Ochieng', studentId: 'STU-24011076', role: 'Student', status: 'Active', loansCount: 3, lastVisit: '2026-06-22', email: 'james.ochieng@akambahall.ac.ke', phone: '+254 712 345 678', joinDate: '2024-09-01', outstandingFines: 0 },
  { id: 'M-002', name: 'Peter Kamau', studentId: 'STU-24011089', role: 'Student', status: 'Active', loansCount: 2, lastVisit: '2026-06-21', email: 'peter.kamau@akambahall.ac.ke', phone: '+254 723 456 789', joinDate: '2024-09-01', outstandingFines: 150 },
  { id: 'M-003', name: 'Grace Wambui', studentId: 'STU-24011115', role: 'Student', status: 'Active', loansCount: 1, lastVisit: '2026-06-20', email: 'grace.wambui@akambahall.ac.ke', phone: '+254 734 567 890', joinDate: '2024-09-01', outstandingFines: 0 },
  { id: 'M-004', name: 'Sarah Njeri', studentId: 'STF-047', role: 'Staff', status: 'Active', loansCount: 4, lastVisit: '2026-06-22', email: 'sarah.njeri@akambahall.ac.ke', phone: '+254 745 678 901', joinDate: '2022-01-15', outstandingFines: 0 },
  { id: 'M-005', name: 'David Mutua', studentId: 'STU-24011102', role: 'Student', status: 'Suspended', loansCount: 0, lastVisit: '2026-06-10', email: 'david.mutua@akambahall.ac.ke', phone: '+254 756 789 012', joinDate: '2024-09-01', outstandingFines: 500 },
  { id: 'M-006', name: 'Alice Akinyi', studentId: 'STU-24011134', role: 'Student', status: 'Active', loansCount: 2, lastVisit: '2026-06-19', email: 'alice.akinyi@akambahall.ac.ke', phone: '+254 767 890 123', joinDate: '2024-09-01', outstandingFines: 0 },
]

function roleBadge(role: Member['role']) {
  return role === 'Staff' ? <Badge variant="info">{role}</Badge> : <Badge variant="neutral">{role}</Badge>
}

function statusBadge(status: Member['status']) {
  switch (status) {
    case 'Active':
      return <Badge variant="success" dot>Active</Badge>
    case 'Suspended':
      return <Badge variant="danger" dot>Suspended</Badge>
    case 'Alumni':
      return <Badge variant="warning" dot>Alumni</Badge>
  }
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase()
}

export function MemberLookupPageClient() {
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredMembers = mockMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.studentId.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1B3D] tracking-tight">Member Lookup</h1>
          <p className="text-sm text-slate-500 mt-1">Search and view member profiles and loan details.</p>
        </div>

        <SectionCard title="Member Lookup" icon={Users}>
          <div className="relative mb-5 max-w-md">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, student ID, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-slate-50 rounded-xl border border-slate-100 p-4 hover:border-slate-200 transition-colors cursor-pointer"
                onClick={() => setExpandedId(expandedId === member.id ? null : member.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center shrink-0 font-bold text-[13px]">
                    {getInitials(member.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[14px] font-bold text-slate-800 truncate">{member.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{member.studentId}</p>
                      </div>
                      {expandedId === member.id ? (
                        <ChevronUp className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      {roleBadge(member.role)}
                      {statusBadge(member.status)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <BookOpen className="h-3 w-3" /> {member.loansCount} loan(s)
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Calendar className="h-3 w-3" /> {new Date(member.lastVisit).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                  </div>
                </div>

                {expandedId === member.id && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-2.5">
                    <div className="flex items-center gap-2 text-[12px]">
                      <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="text-slate-700">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px]">
                      <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="text-slate-700">{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px]">
                      <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="text-slate-700">Joined {new Date(member.joinDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px]">
                      <BookOpen className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="text-slate-700">Current loans: <strong>{member.loansCount}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px]">
                      <CreditCard className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="text-slate-700">
                        Outstanding fines:{' '}
                        {member.outstandingFines > 0 ? (
                          <span className="font-bold text-red-600">KES {member.outstandingFines.toLocaleString()}</span>
                        ) : (
                          <span className="text-emerald-600 font-bold">None</span>
                        )}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button size="xs" variant="outline" className="gap-1 text-[11px]">View Loans</Button>
                      <Button size="xs" variant="outline" className="gap-1 text-[11px]">View History</Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {filteredMembers.length === 0 && (
              <div className="col-span-full text-center py-8 text-sm text-slate-400">No members match your search.</div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
