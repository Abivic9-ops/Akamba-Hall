export default function operations_loading() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      <div className="max-w-[1440px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-32 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-4 w-20 bg-slate-100 rounded-md animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-slate-200 rounded-xl animate-pulse" />
            <div className="h-9 w-9 bg-slate-200 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 bg-slate-200 rounded-md animate-pulse" />
                <div className="h-9 w-9 bg-slate-100 rounded-xl animate-pulse" />
              </div>
              <div className="h-8 w-16 bg-slate-200 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
