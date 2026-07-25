import { requireRole } from '@/lib/auth/roleGuard'
import { get_courses } from '@/lib/actions/resources'
import { SectionCard } from '@/components/ui/section-card'
import { Briefcase, FileText } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StaffCoursesPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const courses = await get_courses()

  const totalMaterials = courses.reduce((sum, c) => sum + c.materialCount, 0)

  const deptColors: Record<string, string> = {
    Science: 'bg-blue-50 text-blue-700',
    Mathematics: 'bg-emerald-50 text-emerald-700',
    Languages: 'bg-[#5B9BD5]/10 text-[#2563EB]',
    Humanities: 'bg-amber-50 text-amber-700',
  }

  const departments = new Set(courses.map((c) => c.department))

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0]">Courses & Materials</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">Browse curriculum courses and their library resources.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Total Courses">
            <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0]">{courses.length}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Across all departments</p>
          </SectionCard>
          <SectionCard title="Total Materials">
            <p className="text-[32px] font-bold text-[#2563EB]">{totalMaterials}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Books and resources linked</p>
          </SectionCard>
          <SectionCard title="Departments">
            <p className="text-[32px] font-bold text-[#8B5CF6]">{departments.size}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Academic departments</p>
          </SectionCard>
        </div>

        <SectionCard title="Course Directory" icon={Briefcase}>
          <div className="space-y-0">
            {courses.length === 0 ? (
              <p className="text-[13px] text-slate-400 text-center py-8">No courses yet.</p>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="flex items-center gap-4 py-3.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-lg px-2 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-[#2563EB]/5 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-[#2563EB]">{course.code.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{course.name}</p>
                      <span className="text-[11px] text-slate-400 dark:text-[#6B7A99] font-mono">{course.code}</span>
                    </div>
                    <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-0.5">{course.instructor} · Form {course.formLevel}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <FileText className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99]" />
                    <span className="text-[12px] text-slate-600 dark:text-[#94A3B8]">{course.materialCount}</span>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${deptColors[course.department] ?? 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#94A3B8]'}`}>
                    {course.department}
                  </span>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
