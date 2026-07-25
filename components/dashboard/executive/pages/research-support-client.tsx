'use client'

import { GraduationCap, ArrowRight } from 'lucide-react'

interface Course {
  id: string
  code: string
  name: string
  department: string
  materialCount: number
}

interface EResource {
  id: string
  title: string
  provider: string
  description: string | null
}

export function ResearchSupportClient({ courses, eresources }: { courses: Course[]; eresources: EResource[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Research Support</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Academic research assistance programs</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((c) => (
          <div key={c.id} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-[#5B9BD5]" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{c.name}</p>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{c.code} · {c.department}</p>
              </div>
            </div>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mb-3">{c.materialCount} materials available</p>
            <button className="h-8 px-4 rounded-full bg-[#5B9BD5]/10 text-[12px] font-semibold text-[#5B9BD5] hover:bg-[#5B9BD5]/20 inline-flex items-center gap-1.5 transition-all duration-200">
              Learn more <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        ))}
        {eresources.map((er) => (
          <div key={er.id} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-[#5B9BD5]" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{er.title}</p>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{er.provider}</p>
              </div>
            </div>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mb-3">{er.description ?? 'E-Resource database'}</p>
            <button className="h-8 px-4 rounded-full bg-[#5B9BD5]/10 text-[12px] font-semibold text-[#5B9BD5] hover:bg-[#5B9BD5]/20 inline-flex items-center gap-1.5 transition-all duration-200">
              Learn more <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
