'use client'

import { Video, Clock, ArrowRight } from 'lucide-react'

const rooms = [
  { name: 'AV Room A', capacity: 30, equipment: 'Projector, Whiteboard, Speakers', status: 'Available', nextBooking: '2:00 PM today' },
  { name: 'AV Room B', capacity: 20, equipment: 'TV Screen, Whiteboard', status: 'Occupied', nextBooking: '4:00 PM today' },
  { name: 'Boardroom', capacity: 15, equipment: 'Projector, Video Conf, Whiteboard', status: 'Available', nextBooking: 'Tomorrow 9:00 AM' },
]

const status_colors: Record<string, string> = {
  Available: 'bg-emerald-50 text-emerald-600',
  Occupied: 'bg-red-50 text-red-500',
  Maintenance: 'bg-amber-50 text-amber-600',
}

export function AvRoomsClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900">AV Rooms</h1>
        <p className="text-[15px] text-slate-500 mt-1">Audio-visual room bookings and availability</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((r) => (
          <div key={r.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Video className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-800">{r.name}</p>
                <p className="text-[11px] text-slate-400">Capacity: {r.capacity}</p>
              </div>
            </div>
            <p className="text-[12px] text-slate-500 mb-2">{r.equipment}</p>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[11px] text-slate-500">Next: {r.nextBooking}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status_colors[r.status]}`}>{r.status}</span>
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
