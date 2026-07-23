export default function StudentDashboardLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5 animate-pulse">
        {/* welcome header skeleton */}
        <div className="h-24 rounded-2xl bg-slate-200" />

        {/* overview cards skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-200" />
          ))}
        </div>

        {/* hero banner skeleton */}
        <div className="h-36 rounded-2xl bg-slate-200" />

        {/* 3-col section skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="h-64 rounded-2xl bg-slate-200" />
          <div className="h-64 rounded-2xl bg-slate-200" />
          <div className="h-64 rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  )
}
