'use client'

import { Wifi, WifiOff, RefreshCw } from 'lucide-react'

interface OfflineBannerProps {
  isOnline: boolean
  queuedCount: number
}

export function OfflineBanner({ isOnline, queuedCount }: OfflineBannerProps) {
  if (isOnline && queuedCount === 0) return null

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border ${
      isOnline
        ? 'bg-emerald-50 border-emerald-200'
        : 'bg-amber-50 border-amber-200'
    }`}>
      <span className={`relative flex h-2 w-2`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
          isOnline ? 'bg-emerald-400' : 'bg-amber-400'
        }`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${
          isOnline ? 'bg-emerald-500' : 'bg-amber-500'
        }`} />
      </span>

      {isOnline ? (
        <>
          <RefreshCw className="h-3.5 w-3.5 text-emerald-600 animate-spin" />
          <span className="text-[12px] font-medium text-emerald-700">
            Syncing {queuedCount} transactions…
          </span>
        </>
      ) : (
        <>
          <WifiOff className="h-3.5 w-3.5 text-amber-600" />
          <span className="text-[12px] font-medium text-amber-700">
            Offline — {queuedCount} queued — Reconnecting…
          </span>
        </>
      )}
    </div>
  )
}
