'use client'

import { Users, GraduationCap, Briefcase, Star, UserX, ArrowRight } from 'lucide-react'

const roles = [
  { role: 'Students', icon: GraduationCap, count: 1780, active: 1654, suspended: 6, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  { role: 'Librarians & Staff', icon: Users, count: 24, active: 24, suspended: 0, color: 'text-[#0D9488]', bg: 'bg-teal-50' },
  { role: 'Department Staff', icon: Briefcase, count: 98, active: 95, suspended: 0, color: 'text-[#5B9BD5]', bg: 'bg-[#5B9BD5]/10' },
  { role: 'Executives', icon: Star, count: 12, active: 12, suspended: 0, color: 'text-[#D97706]', bg: 'bg-amber-50' },
  { role: 'Suspended Users', icon: UserX, count: 6, active: 0, suspended: 6, color: 'text-red-500', bg: 'bg-red-50' },
]

export function RolesClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Role Overview</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">User distribution across roles</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((r) => {
          const Icon = r.icon
          return (
            <div key={r.role} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className={`h-10 w-10 rounded-xl ${r.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${r.color}`} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{r.role}</p>
                  <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{r.count} total</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[20px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">{r.active}</p>
                  <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">Active</p>
                </div>
                {r.suspended > 0 && (
                  <div>
                    <p className="text-[20px] font-bold text-red-500">{r.suspended}</p>
                    <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">Suspended</p>
                  </div>
                )}
              </div>
              <button className="mt-3 h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 inline-flex items-center gap-1.5 transition-all duration-200">
                Manage <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
