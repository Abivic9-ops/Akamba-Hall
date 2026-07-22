export default function executive_loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* welcome header skeleton */}
      <div>
        <div className="h-7 w-72 bg-slate-200 rounded-lg" />
        <div className="h-4 w-56 bg-slate-100 rounded-md mt-2" />
      </div>

      {/* overview cards skeleton — 6 cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 space-y-3">
            <div className="h-5 w-5 bg-slate-200 rounded" />
            <div className="h-7 w-16 bg-slate-200 rounded" />
            <div className="h-3 w-24 bg-slate-100 rounded" />
          </div>
        ))}
      </div>

      {/* hero banner skeleton */}
      <div className="h-[220px] bg-[#1A2D5A]/20 rounded-xl" />

      {/* approval queue skeleton */}
      <div className="bg-white rounded-xl border border-slate-100 p-5 space-y-4">
        <div className="h-5 w-40 bg-slate-200 rounded" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
            <div className="h-9 w-9 rounded-full bg-amber-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 bg-slate-200 rounded" />
              <div className="h-3 w-64 bg-slate-100 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-16 bg-[#1A2D5A]/20 rounded-lg" />
              <div className="h-8 w-16 bg-slate-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* 3-col panel skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-100 p-5 space-y-4">
            <div className="h-5 w-36 bg-slate-200 rounded" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-8 bg-slate-100 rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 6-panel bottom skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-100 p-5 space-y-4">
            <div className="h-5 w-40 bg-slate-200 rounded" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-10 bg-slate-100 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
