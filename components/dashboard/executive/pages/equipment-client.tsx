'use client'

import { Monitor, ArrowRight } from 'lucide-react'

const equipment = [
  { name: 'Projector — Epson EB-X51', status: 'Available', location: 'AV Room A', condition: 'Good' },
  { name: 'Laptop — Dell Latitude 5520', status: 'In Use', location: 'Boardroom', condition: 'Excellent' },
  { name: 'Printer — HP LaserJet Pro', status: 'Available', location: 'Staff Room', condition: 'Good' },
  { name: 'Scanner — Canon CanoScan', status: 'Available', location: 'Computer Lab', condition: 'Good' },
  { name: 'Whiteboard — Smart Board 6000', status: 'Available', location: 'AV Room B', condition: 'Excellent' },
  { name: 'Speaker System — JBL Professional', status: 'Maintenance', location: 'AV Room A', condition: 'Fair' },
]

const status_colors: Record<string, string> = {
  Available: 'bg-emerald-50 text-emerald-600',
  'In Use': 'bg-amber-50 text-amber-600',
  Maintenance: 'bg-red-50 text-red-500',
}

export function EquipmentClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900">Equipment</h1>
        <p className="text-[15px] text-slate-500 mt-1">Library equipment inventory and status</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {equipment.map((e, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Monitor className="h-5 w-5 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-800 truncate">{e.name}</p>
                <p className="text-[11px] text-slate-400">{e.location} · {e.condition}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status_colors[e.status]}`}>{e.status}</span>
              <button className="h-8 px-4 rounded-full bg-slate-50 text-[12px] font-semibold text-slate-600 hover:bg-slate-100 inline-flex items-center gap-1.5 transition-all duration-200">
                Details <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
