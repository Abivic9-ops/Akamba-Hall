'use client'

import { Video, Clock, ArrowRight } from 'lucide-react'

interface Space {
  id: string
  name: string
  capacity: number
  type: string
}

const status_colors: Record<string, string> = {
  Available: 'bg-emerald-50 text-emerald-600',
  Occupied: 'bg-red-50 text-red-500',
  Maintenance: 'bg-amber-50 text-amber-600',
}

export function AvRoomsClient({ spaces }: { spaces: Space[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">AV Rooms</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Audio-visual room bookings and availability</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spaces.map((r) => (
          <div key={r.id} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Video className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{r.name}</p>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">Capacity: {r.capacity}</p>
              </div>
            </div>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mb-2">{r.type.replace('_', ' ')}</p>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              <span className="text-[11px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">Type: {r.type.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status_colors['Available']}`}>{'Available'}</span>
              <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 inline-flex items-center gap-1.5 transition-all duration-200">
                Book <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
