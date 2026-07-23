'use client'

import { useEffect } from 'react'

export default function StudentDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Student Dashboard] Rendering error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-bold text-[#0B1829] mb-2">Something went wrong</h2>
      <p className="text-[#A8B4C4] mb-6 max-w-md">
        {error.message || 'An unexpected error occurred while loading your dashboard.'}
      </p>
      <button
        onClick={reset}
        className="bg-[#F5A623] text-[#0B1829] font-bold py-2 px-6 rounded-lg hover:bg-[#E8931A] transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
