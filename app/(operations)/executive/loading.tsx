export default function executive_loading() {
  return (
    <div className="space-y-5 sm:space-y-6 animate-pulse">
      {/* welcome header skeleton */}
      <div>
        <div className="h-6 sm:h-7 w-56 sm:w-72 bg-slate-200 dark:bg-white/[0.06] rounded-lg" />
        <div className="h-3 sm:h-4 w-40 sm:w-56 bg-slate-100 dark:bg-white/[0.04] rounded-md mt-2" />
      </div>

      {/* overview cards skeleton — responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#0E1F3F] rounded-xl p-3 sm:p-5 border border-slate-100 dark:border-white/[0.08] space-y-3">
            <div className="h-4 sm:h-5 w-5 bg-slate-200 dark:bg-white/[0.06] rounded" />
            <div className="h-6 sm:h-7 w-12 sm:w-16 bg-slate-200 dark:bg-white/[0.06] rounded" />
            <div className="h-2.5 sm:h-3 w-16 sm:w-24 bg-slate-100 dark:bg-white/[0.04] rounded" />
          </div>
        ))}
      </div>

      {/* hero banner skeleton */}
      <div className="h-44 sm:h-[220px] bg-[#1A2D5A]/20 dark:bg-white/[0.04] rounded-xl" />

      {/* approval queue skeleton */}
      <div className="bg-white dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] p-4 sm:p-5 space-y-4">
        <div className="h-5 w-36 sm:w-40 bg-slate-200 dark:bg-white/[0.06] rounded" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-3 border-b border-slate-50 dark:border-white/[0.04] last:border-0">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-amber-100 dark:bg-amber-500/20 shrink-0" />
            <div className="flex-1 space-y-2 min-w-0">
              <div className="h-4 w-36 sm:w-48 bg-slate-200 dark:bg-white/[0.06] rounded" />
              <div className="h-3 w-48 sm:w-64 bg-slate-100 dark:bg-white/[0.04] rounded" />
            </div>
            <div className="flex gap-2 shrink-0">
              <div className="h-7 sm:h-8 w-14 sm:w-16 bg-[#1A2D5A]/20 dark:bg-white/[0.06] rounded-lg" />
              <div className="h-7 sm:h-8 w-14 sm:w-16 bg-slate-100 dark:bg-white/[0.04] rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* 3-col panel skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] p-4 sm:p-5 space-y-4">
            <div className="h-5 w-28 sm:w-36 bg-slate-200 dark:bg-white/[0.06] rounded" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-7 sm:h-8 bg-slate-100 dark:bg-white/[0.04] rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 6-panel bottom skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] p-4 sm:p-5 space-y-4">
            <div className="h-5 w-32 sm:w-40 bg-slate-200 dark:bg-white/[0.06] rounded" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-9 sm:h-10 bg-slate-100 dark:bg-white/[0.04] rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
