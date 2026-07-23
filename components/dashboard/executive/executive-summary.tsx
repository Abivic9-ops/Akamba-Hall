'use client'

import { Users, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react'
import { TrendingUp, Minus } from 'lucide-react'

interface Props {
  totalMembers: number
  totalMembersTrend: { direction: 'up' | 'stable'; value: string }
  activeStaff: number
  activeStaffTrend: { direction: 'up' | 'stable'; value: string }
  systemUptime: string
  uptimeStatus: string
  auditHighlights: number
  sensitiveActions: number
}

export function ExecutiveSummary({
  totalMembers, totalMembersTrend, activeStaff, activeStaffTrend,
  systemUptime, uptimeStatus, auditHighlights, sensitiveActions,
}: Props) {
  return (
    <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Executive Summary</h3>
          <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">Key institutional numbers</p>
        </div>
        <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 hover:text-blue-700 inline-flex items-center gap-1.5 transition-all duration-200">
          View report <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-[#2563EB]" />
            <p className="text-[11px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">Total Members</p>
          </div>
          <p className="text-[20px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">{totalMembers.toLocaleString()}</p>
          <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" /> {totalMembersTrend.value}
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-[#0D9488]" />
            <p className="text-[11px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">Active Staff</p>
          </div>
          <p className="text-[20px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">{activeStaff}</p>
          <span className="inline-flex items-center gap-0.5 text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">
            <Minus className="h-3 w-3" /> Stable
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <p className="text-[11px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">System Uptime</p>
          </div>
          <p className="text-[20px] font-bold text-emerald-600">{systemUptime}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">{uptimeStatus}</p>
        </div>

        <div className="bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-4 w-4 text-[#D97706]" />
            <p className="text-[11px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">Audit Highlights</p>
          </div>
          <p className="text-[20px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">{auditHighlights}</p>
          <p className="text-[11px] text-amber-600">{sensitiveActions} sensitive actions logged</p>
        </div>
      </div>
    </div>
  )
}
