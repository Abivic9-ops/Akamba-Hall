'use client'

import { ClipboardCheck, MessageSquare, ArrowRight } from 'lucide-react'

interface ApprovalRequest {
  id: string
  type: string
  request: string
  requestor: string
  context: string
  date: string
  priority: string
  status: string
}

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

export function ApprovalsClient({ requests }: { requests: ApprovalRequest[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Approval Queue</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Review and manage pending requests</p>
      </div>
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none overflow-hidden">
        <div className="divide-y divide-slate-50">
          {requests.map((r) => (
            <div key={r.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <MessageSquare className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{r.request}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${type_badges[r.type] ?? 'bg-slate-100 text-slate-600'}`}>{r.type}</span>
                  {r.priority === 'high' && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">Urgent</span>}
                </div>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{r.requestor} · {r.context} · {r.date}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status_badges[r.status] ?? 'bg-slate-100 text-slate-600'}`}>{r.status}</span>
              {r.status === 'Pending' && (
                <div className="flex items-center gap-2 shrink-0">
                  <button className="h-8 px-3 rounded-full bg-[#1A2D5A] text-white text-[12px] font-semibold hover:bg-[#1A2D5A]/90 transition-colors">Approve</button>
                  <button className="h-8 px-3 rounded-full border border-slate-200 dark:border-white/10 dark:border-white/10 text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] text-[12px] font-semibold hover:bg-slate-50 dark:hover:bg-white/[0.04] dark:bg-white/[0.04] dark:hover:bg-white dark:bg-[#0E1F3F]/[0.04] dark:bg-white/[0.04] transition-colors">Decline</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
