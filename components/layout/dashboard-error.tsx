'use client'

import { AlertTriangle, RefreshCcw } from 'lucide-react'

interface dashboard_error_props {
  error: string
  reset?: () => void
}

export function dashboard_error({ error, reset }: dashboard_error_props) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 max-w-md w-full text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-[18px] font-bold text-slate-900 font-[var(--font-poppins)]">Something went wrong</h2>
        <p className="text-[13px] text-slate-500 leading-relaxed">{error}</p>
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
