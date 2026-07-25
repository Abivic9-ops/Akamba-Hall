'use client'

import { BookOpen, Globe } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface Course {
  id: string
  code: string
  name: string
  department: string
  formLevel: number | null
  materialCount: number
  instructor: string | null
}

interface EResource {
  id: string
  title: string
  provider: string
  description: string | null
  url: string
  category: string | null
}

export function LearningResourcesClient({ courses, eresources }: { courses: Course[]; eresources: EResource[] }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Learning Resources</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Courses and digital resources</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Courses" icon={BookOpen}>
            <div className="space-y-2">
              {courses.length === 0 ? (
                <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No courses</p>
              ) : (
                courses.slice(0, 30).map((c) => (
                  <div key={c.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{c.name}</p>
                      <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{c.code} · {c.department}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </SectionCard>

          <SectionCard title="E-Resources" icon={Globe}>
            <div className="space-y-2">
              {eresources.length === 0 ? (
                <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No e-resources</p>
              ) : (
                eresources.slice(0, 30).map((r) => (
                  <div key={r.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <Globe className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{r.title}</p>
                      <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{r.provider} · {r.category}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
