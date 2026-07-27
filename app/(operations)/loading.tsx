export default function operations_loading() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] p-4 sm:p-6">
      <div className="max-w-[1440px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-5 sm:h-6 w-28 sm:w-32 bg-slate-200 dark:bg-white/[0.06] rounded-lg animate-pulse" />
            <div className="h-3 sm:h-4 w-16 sm:w-20 bg-slate-100 dark:bg-white/[0.04] rounded-md animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 sm:h-9 sm:w-9 bg-slate-200 dark:bg-white/[0.06] rounded-xl animate-pulse" />
            <div className="h-8 w-8 sm:h-9 sm:w-9 bg-slate-200 dark:bg-white/[0.06] rounded-full animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#0E1F3F] rounded-2xl p-3 sm:p-5 border border-slate-100 dark:border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 sm:w-24 bg-slate-200 dark:bg-white/[0.06] rounded-md animate-pulse" />
                <div className="h-8 w-8 sm:h-9 sm:w-9 bg-slate-100 dark:bg-white/[0.04] rounded-xl animate-pulse" />
              </div>
              <div className="h-7 sm:h-8 w-12 sm:w-16 bg-slate-200 dark:bg-white/[0.06] rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
