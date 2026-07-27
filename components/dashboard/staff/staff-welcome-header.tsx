'use client'

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

interface StaffWelcomeHeaderProps {
  title: string
  surname: string
}

export function StaffWelcomeHeader({ title, surname }: StaffWelcomeHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-[24px] sm:text-[32px] font-medium text-slate-900 dark:text-[#E2E8F0] font-[var(--font-poppins)]">
          {greeting()}, {title} {surname}
        </h1>
        <p className="text-[14px] sm:text-[16px] text-slate-500 dark:text-[#6B7A99] mt-1">
          Welcome back to <span className="font-medium text-[#2563EB]">Akamba Hall Library</span>
        </p>
      </div>

      <div className="hidden lg:block max-w-sm border-l-4 border-[#2563EB]/30 bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] rounded-r-xl p-4">
        <p className="text-[15px] italic text-slate-700 dark:text-[#E2E8F0] leading-relaxed">
          &ldquo;A good teacher inspires hope, ignites the imagination, and instills a love of learning.&rdquo;
        </p>
        <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1.5 font-medium">
          — Brad Henry
        </p>
      </div>
    </div>
  )
}
