'use client'

import { Star, Shield, FileText, Eye, CheckCircle } from 'lucide-react'

export function ExecutivePrivilegesCard() {
  return (
    <div className="mx-3 mb-3 p-4 rounded-xl bg-white/5 border border-amber-500/20">
      <div className="flex items-center gap-2 mb-3">
        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
        <span className="text-xs font-semibold text-amber-400">Executive Privileges</span>
      </div>
      <div className="space-y-1">
        {[
          { icon: Shield, label: 'Governance Access' },
          { icon: FileText, label: 'Policy Oversight' },
          { icon: Eye, label: 'Audit Visibility' },
          { icon: CheckCircle, label: 'Special Approvals' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 py-1">
            <item.icon className="h-3 w-3 text-amber-400/60" />
            <span className="text-xs text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
