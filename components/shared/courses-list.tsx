'use client'

import { BookOpen } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'

interface Course {
  id: string
  code: string
  name: string
  department: string
  formLevel: number | null
  materialCount: number
  instructor: string | null
}

export function CoursesList({ courses }: { courses: Course[] }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-[28px] font-medium text-[#0B1B3D] dark:text-[#E2E8F0]">Courses</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">
            Browse available courses and their library resources.
          </p>
        </div>

        <SectionCard title="All Courses" icon={BookOpen}>
          {courses.length === 0 ? (
            <EmptyState icon={BookOpen} message="No courses available yet." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                    <th className="pb-3 text-[13px] font-medium text-slate-500 dark:text-[#6B7A99]">Code</th>
                    <th className="pb-3 text-[13px] font-medium text-slate-500 dark:text-[#6B7A99]">Name</th>
                    <th className="pb-3 text-[13px] font-medium text-slate-500 dark:text-[#6B7A99]">Department</th>
                    <th className="pb-3 text-[13px] font-medium text-slate-500 dark:text-[#6B7A99]">Form</th>
                    <th className="pb-3 text-[13px] font-medium text-slate-500 dark:text-[#6B7A99]">Instructor</th>
                    <th className="pb-3 text-[13px] font-medium text-slate-500 dark:text-[#6B7A99]">Materials</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b border-slate-50 dark:border-white/[0.04] last:border-0 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 pr-4">
                        <Badge variant="info">{course.code}</Badge>
                      </td>
                      <td className="py-3 pr-4 text-[14px] font-medium text-[#0B1B3D] dark:text-[#E2E8F0]">{course.name}</td>
                      <td className="py-3 pr-4 text-[14px] text-slate-600 dark:text-[#94A3B8]">{course.department}</td>
                      <td className="py-3 pr-4 text-[14px] text-slate-600 dark:text-[#94A3B8]">Form {course.formLevel}</td>
                      <td className="py-3 pr-4 text-[14px] text-slate-600 dark:text-[#94A3B8]">{course.instructor ?? '—'}</td>
                      <td className="py-3 text-[14px] text-slate-600 dark:text-[#94A3B8]">{course.materialCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}
