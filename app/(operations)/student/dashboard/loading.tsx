export default function StudentDashboardLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 space-y-5 animate-pulse">
        {/* welcome header skeleton */}
        <div className="h-20 sm:h-24 rounded-2xl bg-slate-200 dark:bg-white/[0.06]" />

        {/* overview cards skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 sm:h-28 rounded-2xl bg-slate-200 dark:bg-white/[0.06]" />
          ))}
        </div>

        {/* hero banner skeleton */}
        <div className="h-28 sm:h-36 rounded-2xl bg-slate-200 dark:bg-white/[0.06]" />

        {/* 3-col section skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="h-48 sm:h-64 rounded-2xl bg-slate-200 dark:bg-white/[0.06]" />
          <div className="h-48 sm:h-64 rounded-2xl bg-slate-200 dark:bg-white/[0.06]" />
          <div className="h-48 sm:h-64 rounded-2xl bg-slate-200 dark:bg-white/[0.06]" />
        </div>
      </div>
    </div>
  )
}
