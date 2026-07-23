'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function executive_error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Executive portal error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-10 max-w-md w-full text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8 text-amber-500" />
        </div>
        <h2 className="text-[18px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Executive Portal Error</h2>
        <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] leading-relaxed">
          Something went wrong while loading the executive dashboard. Please try again.
        </p>
        {error.digest && (
          <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] font-mono">Error ID: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A2D5A] text-white text-[12px] font-semibold rounded-xl hover:bg-[#1A2D5A]/90 transition-colors cursor-pointer"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          Try Again
        </button>
      </div>
    </div>
  )
}
