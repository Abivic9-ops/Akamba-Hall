'use client'

import { ShieldCheck, ArrowRight } from 'lucide-react'

const policies = [
  { name: 'Borrowing Policy', description: 'Loan limits, durations, and renewal rules', status: 'Active', updated: '15 May 2026', version: '3.1' },
  { name: 'Late Return Policy', description: 'Penalties and escalation procedures for overdue items', status: 'Active', updated: '10 Apr 2026', version: '2.4' },
  { name: 'Room Booking Policy', description: 'Reservation rules, cancellation, and usage guidelines', status: 'Active', updated: '1 Mar 2026', version: '2.0' },
  { name: 'E-Resource Acceptable Use', description: 'Terms for accessing digital databases and journals', status: 'Under Review', updated: '20 Jun 2026', version: '1.9' },
  { name: 'Incident Reporting Protocol', description: 'Procedures for reporting and resolving library incidents', status: 'Active', updated: '5 Feb 2026', version: '1.5' },
  { name: 'Member Conduct Policy', description: 'Expected behavior and disciplinary procedures', status: 'Active', updated: '12 Jan 2026', version: '2.2' },
]

const status_colors: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-600',
  'Under Review': 'bg-amber-50 text-amber-600',
}

export function PoliciesClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900">Policy Rules</h1>
        <p className="text-[15px] text-slate-500 mt-1">Manage and review institutional library policies</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {policies.map((p, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-slate-800">{p.name}</p>
                  <span className="text-[10px] text-slate-400">v{p.version}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{p.description}</p>
              </div>
              <span className="text-[11px] text-slate-400">Updated {p.updated}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status_colors[p.status]}`}>{p.status}</span>
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
