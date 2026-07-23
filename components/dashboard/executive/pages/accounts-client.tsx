'use client'

import { UserSearch, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const accounts = [
  { name: 'Brian Mutuku', role: 'Student', id: 'SBC-2024-0142', email: 'brian.m@starehe.ac.ke', status: 'Active', lastLogin: '20 Jun 2026' },
  { name: 'Grace Wanjiru', role: 'Staff', id: 'SBC-STF-0018', email: 'grace.w@starehe.ac.ke', status: 'Active', lastLogin: '20 Jun 2026' },
  { name: 'Daniel Njuguna', role: 'Student', id: 'SBC-2023-0087', email: 'daniel.n@starehe.ac.ke', status: 'Active', lastLogin: '19 Jun 2026' },
  { name: 'Kevin Otieno', role: 'Library Asst.', id: 'SBC-STF-0031', email: 'kevin.o@starehe.ac.ke', status: 'Active', lastLogin: '19 Jun 2026' },
  { name: 'Alice Akinyi', role: 'Staff', id: 'SBC-STF-0045', email: 'alice.a@starehe.ac.ke', status: 'Active', lastLogin: '18 Jun 2026' },
  { name: 'Peter Ngesa', role: 'Student', id: 'SBC-2024-0203', email: 'peter.n@starehe.ac.ke', status: 'Suspended', lastLogin: '15 Jun 2026' },
]

const status_colors: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-600',
  Suspended: 'bg-red-50 text-red-500',
}

export function AccountsClient() {
  const [query, setQuery] = useState('')
  const filtered = accounts.filter(a => a.name.toLowerCase().includes(query.toLowerCase()) || a.email.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Account Lookup</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Search and manage user accounts</p>
      </div>
      <div className="relative">
        <UserSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full h-12 pl-12 pr-4 rounded-full border border-slate-200 dark:border-white/10 dark:border-white/10 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] text-[14px] text-slate-700 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
        />
      </div>
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filtered.map((a, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50/50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0]">{a.name}</p>
                  <span className="text-[10px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{a.role}</span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{a.id} · {a.email} · Last login: {a.lastLogin}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status_colors[a.status]}`}>{a.status}</span>
              <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 inline-flex items-center gap-1.5 transition-all duration-200">
                View <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
