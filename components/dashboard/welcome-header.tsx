'use client'

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

interface WelcomeHeaderProps {
  firstName: string
}

export function WelcomeHeader({ firstName }: WelcomeHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-[24px] sm:text-[32px] font-medium text-slate-900 dark:text-[#E2E8F0] font-[var(--font-poppins)]">
          {greeting()}, {firstName}
        </h1>
        <p className="text-[14px] sm:text-[16px] text-slate-500 dark:text-[#6B7A99] mt-1">
          Welcome back to <span className="font-medium text-[#2563EB]">Akamba Hall Library</span>
        </p>
      </div>

      <div className="hidden lg:block max-w-sm border-l-4 border-amber-400 bg-amber-50 rounded-r-xl p-4">
        <p className="text-[15px] italic text-amber-800 leading-relaxed">
          &ldquo;Knowledge is the key that opens every door.&rdquo;
        </p>
        <p className="text-[13px] text-amber-600 mt-1.5 font-medium">
          — SBC Motto
        </p>
      </div>
    </div>
  )
}
