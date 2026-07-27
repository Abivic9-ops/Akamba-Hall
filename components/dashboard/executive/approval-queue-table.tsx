'use client'

import { ArrowRight, MessageSquare } from 'lucide-react'

interface ApprovalItem {
  id: string
  type: 'room_booking' | 'special_access' | 'policy_exception' | 'incident' | 'general'
  request: string
  requestor: string
  context: string
  date: string
  priority: 'normal' | 'high'
}

const type_badges: Record<string, { label: string; color: string }> = {
  room_booking: { label: 'Room', color: 'bg-blue-100 text-blue-700' },
  special_access: { label: 'Access', color: 'bg-[#5B9BD5]/10 text-[#2563EB]' },
  policy_exception: { label: 'Policy', color: 'bg-amber-100 text-amber-700' },
  incident: { label: 'Incident', color: 'bg-red-100 text-red-600' },
  general: { label: 'General', color: 'bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8]' },
}

export function ApprovalQueueTable({ items }: { items: ApprovalItem[] }) {
  return (
    <div id="approval-queue" className="bg-white dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-sm dark:shadow-none overflow-hidden">
      <div className="px-4 sm:px-5 py-4 border-b border-slate-100 dark:border-white/[0.08]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Approval Queue</h3>
            <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{items.length} requests awaiting your review</p>
          </div>
          <button className="h-8 px-4 rounded-full bg-amber-50 text-[12px] font-semibold text-amber-600 hover:bg-amber-100 hover:text-amber-700 inline-flex items-center gap-1.5 transition-all duration-200">
            View all <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-slate-50">
        {items.map((item) => {
          const badge = type_badges[item.type] ?? type_badges.general
          return (
            <div key={item.id} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 hover:bg-slate-50/50 transition-colors overflow-hidden">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-4 w-4 text-amber-600" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{item.request}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${badge.color}`}>
                      {badge.label}
                    </span>
                    {item.priority === 'high' && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">
                    {item.requestor} · {item.context} · {item.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="h-8 px-3 rounded-lg bg-[#1A2D5A] text-white text-[12px] font-semibold hover:bg-[#1A2D5A]/90 transition-colors">
                  Approve
                </button>
                <button className="h-8 px-3 rounded-lg border border-slate-200 dark:border-white/10 dark:border-white/10 text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] text-[12px] font-semibold hover:bg-slate-50 dark:hover:bg-white/[0.04] dark:bg-white/[0.04] dark:hover:bg-white dark:bg-[#0E1F3F]/[0.04] dark:bg-white/[0.04] transition-colors">
                  Decline
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
