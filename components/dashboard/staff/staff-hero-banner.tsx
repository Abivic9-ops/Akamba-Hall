'use client'

export function StaffHeroBanner() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-navy shadow-lg" style={{ minHeight: 200 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A2D5A] via-[#243769] to-[#2D4A8A]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D14]/90 via-[#0B0D14]/60 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-10 lg:py-12" style={{ minHeight: 200 }}>
        <div className="max-w-lg">
          <span className="inline-block text-[13px] font-medium uppercase tracking-widest text-[#EAB308] mb-3">
            Faculty Resource Spotlight
          </span>

          <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] mb-4 font-serif">
            Enhance Your Teaching,<br />Inspire Your Students
          </h2>

          <p className="text-[15px] lg:text-[17px] text-white/70 leading-relaxed mb-6 max-w-md">
            Explore curated academic resources, teaching kits, and past papers for your classroom.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-[14px] font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Explore Resources
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-white/30 text-white text-[14px] font-medium hover:bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]/10 transition-all"
            >
              View Past Papers
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
