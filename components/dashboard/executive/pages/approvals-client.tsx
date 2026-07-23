'use client'

import { ClipboardCheck, MessageSquare, ArrowRight } from 'lucide-react'

const requests = [
  { id: 'AQ001', type: 'Room Booking', request: 'Boardroom Booking — Mon, 23 Jun', requestor: 'Brian Mutuku', context: 'History Dept.', date: '20 Jun, 10:30 AM', priority: 'normal', status: 'Pending' },
  { id: 'AQ002', type: 'Special Access', request: 'Special Access Request', requestor: 'Daniel Njuguna', context: 'Form 4A', date: '20 Jun, 09:15 AM', priority: 'normal', status: 'Pending' },
  { id: 'AQ003', type: 'Policy Exception', request: 'Policy Exception Request', requestor: 'Grace Wanjiru', context: 'Staff', date: '19 Jun, 04:45 PM', priority: 'normal', status: 'Pending' },
  { id: 'AQ004', type: 'Incident', request: 'Escalated Late Return', requestor: 'Kevin Otieno', context: 'Library Asst.', date: '19 Jun, 02:20 PM', priority: 'high', status: 'Pending' },
  { id: 'AQ005', type: 'Room Booking', request: 'AVR Session — Wed, 25 Jun', requestor: 'Alice Akinyi', context: 'Science Dept.', date: '18 Jun, 11:00 AM', priority: 'normal', status: 'Approved' },
  { id: 'AQ006', type: 'Special Access', request: 'Extended Hours Request', requestor: 'Peter Ngesa', context: 'Form 4B', date: '18 Jun, 09:30 AM', priority: 'normal', status: 'Declined' },
]

const type_badges: Record<string, string> = {
  'Room Booking': 'bg-blue-100 text-blue-700',
  'Special Access': 'bg-[#5B9BD5]/10 text-[#2563EB]',
  'Policy Exception': 'bg-amber-100 text-amber-700',
  Incident: 'bg-red-100 text-red-600',
}

const status_badges: Record<string, string> = {
  Pending: 'bg-amber-50 text-amber-600',
  Approved: 'bg-emerald-50 text-emerald-600',
  Declined: 'bg-red-50 text-red-500',
}

export function ApprovalsClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900">Approval Queue</h1>
        <p className="text-[15px] text-slate-500 mt-1">Review and manage pending requests</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {requests.map((r) => (
            <div key={r.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <MessageSquare className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-slate-800 truncate">{r.request}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${type_badges[r.type]}`}>{r.type}</span>
                  {r.priority === 'high' && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">Urgent</span>}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{r.requestor} · {r.context} · {r.date}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status_badges[r.status]}`}>{r.status}</span>
              {r.status === 'Pending' && (
                <div className="flex items-center gap-2 shrink-0">
                  <button className="h-8 px-3 rounded-full bg-[#1A2D5A] text-white text-[12px] font-semibold hover:bg-[#1A2D5A]/90 transition-colors">Approve</button>
                  <button className="h-8 px-3 rounded-full border border-slate-200 text-slate-600 text-[12px] font-semibold hover:bg-slate-50 transition-colors">Decline</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
