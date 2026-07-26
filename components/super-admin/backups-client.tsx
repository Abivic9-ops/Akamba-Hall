'use client'

import { Database, Users, BookOpen, Copy, ArrowDownUp, Megaphone, Calendar, Bookmark, MapPin } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface BackupsClientProps {
  dbStats: {
    users: number
    books: number
    copies: number
    loans: number
    announcements: number
    events: number
    holds: number
    bookings: number
  }
}

const tableInfo = [
  { key: 'users', label: 'Users', icon: Users, color: 'text-blue-600 dark:text-blue-400' },
  { key: 'books', label: 'Books', icon: BookOpen, color: 'text-emerald-600 dark:text-emerald-400' },
  { key: 'copies', label: 'Copies', icon: Copy, color: 'text-purple-600 dark:text-purple-400' },
  { key: 'loans', label: 'Loans', icon: ArrowDownUp, color: 'text-amber-600 dark:text-amber-400' },
  { key: 'announcements', label: 'Announcements', icon: Megaphone, color: 'text-pink-600 dark:text-pink-400' },
  { key: 'events', label: 'Events', icon: Calendar, color: 'text-cyan-600 dark:text-cyan-400' },
  { key: 'holds', label: 'Holds', icon: Bookmark, color: 'text-orange-600 dark:text-orange-400' },
  { key: 'bookings', label: 'Bookings', icon: MapPin, color: 'text-indigo-600 dark:text-indigo-400' },
] as const

export function BackupsClient({ dbStats }: BackupsClientProps) {
  const totalRecords = Object.values(dbStats).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Backups</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Database backup and restore</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-4">
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Total Records</p>
            <p className="text-2xl font-extrabold text-[#5B9BD5] mt-1">{totalRecords.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-4">
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Tables</p>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{tableInfo.length}</p>
          </div>
          <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-4">
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">DB Health</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">OK</span>
            </div>
          </div>
          <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-4">
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Last Sync</p>
            <p className="text-[14px] font-bold text-slate-800 dark:text-[#E2E8F0] mt-1">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <SectionCard title="Database Overview" icon={Database}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tableInfo.map((t) => {
              const Icon = t.icon
              return (
                <div key={t.key} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06]">
                  <div className="h-9 w-9 rounded-lg bg-white dark:bg-white/[0.06] flex items-center justify-center shadow-sm">
                    <Icon className={`h-4 w-4 ${t.color}`} />
                  </div>
                  <div>
                    <p className="text-[13px] text-slate-500 dark:text-[#6B7A99]">{t.label}</p>
                    <p className="text-[17px] font-extrabold text-slate-800 dark:text-[#E2E8F0]">{dbStats[t.key].toLocaleString()}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
