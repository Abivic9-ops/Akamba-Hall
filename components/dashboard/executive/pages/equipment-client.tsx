'use client'

import { Monitor, ArrowRight } from 'lucide-react'

interface Equipment {
  id: string
  name: string
  description: string | null
  category: string | null
  status: string
  location: string | null
}

const status_colors: Record<string, string> = {
  available: 'bg-emerald-50 text-emerald-600',
  in_use: 'bg-amber-50 text-amber-600',
  'in use': 'bg-amber-50 text-amber-600',
  maintenance: 'bg-red-50 text-red-500',
}

const status_labels: Record<string, string> = {
  available: 'Available',
  in_use: 'In Use',
  'in use': 'In Use',
  maintenance: 'Maintenance',
}

export function EquipmentClient({ equipment }: { equipment: Equipment[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Equipment</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Library equipment inventory and status</p>
      </div>
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="divide-y divide-slate-50">
          {equipment.map((e) => (
            <div key={e.id} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] flex items-center justify-center shrink-0">
                <Monitor className="h-5 w-5 text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{e.name}</p>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{e.location ?? 'Unassigned'} · {e.category ?? 'General'}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status_colors[e.status] ?? 'bg-slate-100 text-slate-600'}`}>{status_labels[e.status] ?? e.status}</span>
              <button className="h-8 px-4 rounded-full bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] text-[12px] font-semibold text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] hover:bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] dark:bg-white/[0.06] inline-flex items-center gap-1.5 transition-all duration-200">
                Details <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
