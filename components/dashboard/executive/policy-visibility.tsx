'use client'

import { FileText, ArrowRight } from 'lucide-react'

export function PolicyVisibility() {
  const policies = [
    { name: 'Borrowing Policy', status: 'Active', updated: '15 May 2026' },
    { name: 'Late Return Policy', status: 'Active', updated: '10 Apr 2026' },
    { name: 'Room Booking Policy', status: 'Active', updated: '1 Mar 2026' },
    { name: 'E-Resource Acceptable Use', status: 'Under Review', updated: '20 Jun 2026' },
    { name: 'Incident Reporting Protocol', status: 'Active', updated: '5 Feb 2026' },
  ]

  const status_colors: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-600',
    'Under Review': 'bg-amber-50 text-amber-600',
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">Policy Visibility</h3>
          <p className="text-[12px] text-slate-400 mt-0.5">Active library policies</p>
        </div>
        <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 hover:text-blue-700 inline-flex items-center gap-1.5 transition-all duration-200">
          Manage policies <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="space-y-2">
        {policies.map((policy) => (
          <div key={policy.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
            <FileText className="h-4 w-4 text-slate-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-700 truncate">{policy.name}</p>
              <p className="text-[11px] text-slate-400">Updated {policy.updated}</p>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status_colors[policy.status] ?? 'bg-slate-100 text-slate-500'}`}>
              {policy.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
