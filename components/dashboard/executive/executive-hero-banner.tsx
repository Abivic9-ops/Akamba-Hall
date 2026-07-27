'use client'

import { ArrowRight } from 'lucide-react'

export function ExecutiveHeroBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A2D5A] via-[#1A2D5A]/90 to-[#1A2D5A]/60 p-5 sm:p-7">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A2D5A]/90 via-[#1A2D5A]/70 to-transparent" />
      <div className="relative">
        <h2 className="text-[18px] sm:text-[22px] font-bold text-white leading-tight">
          Leading Academic Excellence
          <br />
          Through Library Governance
        </h2>
        <p className="text-[13px] text-white/70 mt-3 leading-relaxed max-w-md">
          Oversee operations, approve requests, review policies and ensure our library
          serves every Starehean well.
        </p>
        <div className="flex items-left gap-3 mt-5">
          <button className="h-10 px-4 sm:px-6 rounded-lg bg-[#D97706] text-white text-[13px] font-semibold hover:bg-[#B45309] hover:shadow-md hover:shadow-amber-500/20 transition-all duration-200">
            View Reports
          </button>
          <a
            href="#approval-queue"
            className="h-10 px-4 sm:px-6 rounded-lg border border-white/40 text-white text-[13px] font-semibold hover:bg-white dark:bg-[#0E1F3F]/10 hover:border-white/60 transition-all duration-200 inline-flex items-center gap-2"
          >
            Review Approvals
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
