'use client'

export function dashboard_loading() {
  return (
    <div className="flex h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      {/* sidebar skeleton */}
      <div className="hidden lg:flex flex-col w-[264px] bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] border-r border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08] shrink-0">
        {/* logo area */}
        <div className="px-5 h-[72px] flex items-center gap-3 border-b border-[#F3F4F6]">
          <div className="h-10 w-8 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-lg animate-pulse" />
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-24 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
            <div className="h-3 w-16 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
          </div>
        </div>

        {/* nav sections */}
        <div className="flex-1 px-3 py-4 space-y-5">
          {/* section 1 */}
          <div>
            <div className="h-2.5 w-14 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse mx-3 mb-2.5" />
            <div className="space-y-1">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className={`h-10 ${i === 0 ? 'bg-[#EEF4FF] dark:bg-[#1747D6]/20 dark:bg-[#1747D6]/20 rounded-[18px]' : 'bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-xl'} animate-pulse mx-1`} />
              ))}
            </div>
          </div>
          {/* section 2 */}
          <div>
            <div className="h-2.5 w-16 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse mx-3 mb-2.5" />
            <div className="space-y-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-xl animate-pulse mx-1" />
              ))}
            </div>
          </div>
          {/* section 3 */}
          <div>
            <div className="h-2.5 w-20 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse mx-3 mb-2.5" />
            <div className="space-y-1">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-10 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-xl animate-pulse mx-1" />
              ))}
            </div>
          </div>
        </div>

        {/* sign out skeleton */}
        <div className="p-3 border-t border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08]">
          <div className="h-10 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-xl animate-pulse" />
        </div>
      </div>

      {/* main content area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* header skeleton */}
        <header className="h-[72px] bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] border-b border-[#EEF1F6] dark:border-white/[0.08] dark:border-white/[0.08] px-6 lg:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="hidden lg:flex h-[42px] w-[42px] rounded-full bg-[#F6F8FC] dark:bg-[#13285A] dark:bg-[#13285A] animate-pulse shrink-0" />
            <div className="hidden md:flex items-center gap-3 w-[400px] h-[40px] rounded-full border border-[#DDE2EB] dark:border-white/10 dark:border-white/10 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] px-4">
              <div className="h-[18px] w-[18px] bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse shrink-0" />
              <div className="h-3.5 w-48 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
              <div className="hidden lg:block h-6 w-8 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse ml-auto shrink-0" />
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative h-[40px] w-[40px] rounded-full bg-[#F6F8FC] dark:bg-[#13285A] dark:bg-[#13285A] animate-pulse" />
            <div className="h-[40px] w-[40px] rounded-full bg-[#F6F8FC] dark:bg-[#13285A] dark:bg-[#13285A] animate-pulse" />
            <div className="h-6 w-px bg-[#E7EBF2] mx-1" />
            <div className="flex items-center gap-3 py-1.5 pl-2 pr-3 rounded-full border border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08]">
              <div className="h-[38px] w-[38px] rounded-full bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] animate-pulse shrink-0" />
              <div className="hidden sm:flex flex-col gap-1.5">
                <div className="h-3.5 w-16 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
                <div className="h-2.5 w-20 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        </header>

        {/* page content skeleton */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1440px] mx-auto p-6 space-y-6">
            {/* greeting */}
            <div>
              <div className="h-7 w-64 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-lg animate-pulse" />
              <div className="h-4 w-48 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse mt-2" />
            </div>

            {/* hero banner skeleton (student) */}
            <div className="h-[200px] bg-[#0B1A3B] rounded-2xl animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A3B] via-[#0B1A3B]/80 to-transparent" />
              <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-3">
                <div className="h-3 w-32 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]/20 rounded-md animate-pulse" />
                <div className="h-8 w-72 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]/20 rounded-lg animate-pulse" />
                <div className="h-4 w-56 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]/10 rounded-md animate-pulse" />
                <div className="flex gap-3 mt-4">
                  <div className="h-10 w-32 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]/20 rounded-xl animate-pulse" />
                  <div className="h-10 w-36 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]/10 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>

            {/* metric cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl p-5 border border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
                    <div className="h-10 w-10 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-xl animate-pulse" />
                  </div>
                  <div className="h-8 w-16 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-lg animate-pulse" />
                  <div className="h-3 w-28 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
                </div>
              ))}
            </div>

            {/* content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* left column */}
              <div className="lg:col-span-2 space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl p-6 border border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-5 w-32 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
                      <div className="h-8 w-20 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-lg animate-pulse" />
                    </div>
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="flex items-center gap-3 p-3 bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224] rounded-xl">
                        <div className="h-10 w-10 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-lg animate-pulse shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-40 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
                          <div className="h-3 w-24 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
                        </div>
                        <div className="h-6 w-16 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-full animate-pulse" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* right column */}
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl p-6 border border-[#E7EBF2] dark:border-white/[0.08] dark:border-white/[0.08] space-y-4">
                    <div className="h-5 w-28 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="h-3 w-3 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-full animate-pulse shrink-0" />
                        <div className="h-4 flex-1 bg-[#F3F4F6] dark:bg-white/[0.05] dark:bg-white/[0.05] rounded-md animate-pulse" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
