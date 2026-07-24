'use client'

import { AlertTriangle, RefreshCcw } from 'lucide-react'

interface DashboardErrorProps {
  error: string
  reset?: () => void
}

export function DashboardError({ error, reset }: DashboardErrorProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224] flex items-center justify-center p-6">
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-10 max-w-md w-full text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-[18px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0] font-[var(--font-poppins)]">Something went wrong</h2>
        <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] leading-relaxed">{error}</p>
        {reset && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1A3B] text-white text-[12px] font-bold rounded-xl hover:bg-[#132B5E] transition-colors cursor-pointer"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
