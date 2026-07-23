'use client'

import { Star, Quote } from 'lucide-react'

interface Props {
  fullName: string
}

export function ExecutiveWelcomeHeader({ fullName }: Props) {
  const firstName = fullName.split(' ').slice(1).join(' ')

  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">
          Executive Governance Dashboard
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">
            Welcome back, <span className="font-medium text-slate-700 dark:text-[#E2E8F0]">{fullName}</span>.
          </p>
          <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-semibold rounded-full px-2.5 py-0.5">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            Executive Access
          </span>
        </div>
      </div>
      <div className="hidden lg:block bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-4 py-3 max-w-sm shrink-0">
        <div className="flex items-start gap-2">
          <Quote className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-[13px] font-medium text-amber-800 italic leading-relaxed">
              &ldquo;Leadership is unlocking people&apos;s potential to become better.&rdquo;
            </p>
            <p className="text-[11px] text-amber-600 mt-1">&mdash; Bill Bradley</p>
          </div>
        </div>
      </div>
    </div>
  )
}
