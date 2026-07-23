'use client'

import { Calendar, FileText, Download, Search, ArrowUpRight } from 'lucide-react'

const actions = [
  { icon: Calendar, label: 'Book Boardroom', color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10', border: 'border-[#2563EB]/20', hoverBg: 'hover:bg-[#2563EB]/5' },
  { icon: FileText, label: 'Generate Report', color: 'text-[#0D9488]', bg: 'bg-[#0D9488]/10', border: 'border-[#0D9488]/20', hoverBg: 'hover:bg-[#0D9488]/5' },
  { icon: Download, label: 'Export Data', color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10', border: 'border-[#8B5CF6]/20', hoverBg: 'hover:bg-[#8B5CF6]/5' },
  { icon: Search, label: 'System Audit Log', color: 'text-[#D97706]', bg: 'bg-[#D97706]/10', border: 'border-[#D97706]/20', hoverBg: 'hover:bg-[#D97706]/5' },
]

export function QuickExecutiveActions() {
  return (
    <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-6">
      <h3 className="text-[16px] font-semibold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0] mb-5">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className={`flex items-center gap-3 p-4 rounded-xl border ${action.border} ${action.hoverBg} bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] transition-all duration-200 text-left group hover:shadow-sm dark:shadow-none dark:shadow-none hover:-translate-y-0.5`}
          >
            <div className={`h-10 w-10 rounded-xl ${action.bg} flex items-center justify-center shrink-0`}>
              <action.icon className={`h-5 w-5 ${action.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[13px] font-semibold text-slate-700 dark:text-[#E2E8F0] block truncate">{action.label}</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] transition-colors shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}
