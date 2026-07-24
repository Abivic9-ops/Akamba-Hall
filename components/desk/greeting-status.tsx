'use client'

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

interface DeskWelcomeHeaderProps {
  firstName: string
}

export function DeskWelcomeHeader({ firstName }: DeskWelcomeHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-medium text-slate-900 dark:text-white">
          {greeting()}, {firstName}
        </h1>
        <p className="text-[14px] sm:text-[16px] text-slate-500 dark:text-white/50 mt-1">
          Welcome to the <span className="font-medium text-[#2563EB] dark:text-[#5B9BD5]">Circulation Desk</span>
        </p>
      </div>

      <div className="hidden lg:block max-w-sm border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-500/10 rounded-r-xl p-4">
        <p className="text-[15px] italic text-amber-800 dark:text-amber-300 leading-relaxed">
          &ldquo;Service is the rent we pay for the privilege of living.&rdquo;
        </p>
        <p className="text-[13px] text-amber-600 dark:text-amber-400 mt-1.5 font-medium">
          — Desk Motto
        </p>
      </div>
    </div>
  )
}
