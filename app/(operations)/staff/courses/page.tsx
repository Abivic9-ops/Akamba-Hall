import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, BookOpen, Users, FileText } from 'lucide-react'

const courses = [
  { id: 'c1', code: 'PHY 401', name: 'Advanced Physics', department: 'Science', form: 'Form 4', materials: 12, instructor: 'Mr. James Mwangi' },
  { id: 'c2', code: 'MTH 302', name: 'Mathematics', department: 'Mathematics', form: 'Form 3', materials: 8, instructor: 'Ms. Sarah Ochieng' },
  { id: 'c3', code: 'CHM 401', name: 'Chemistry', department: 'Science', form: 'Form 4', materials: 15, instructor: 'Dr. Peter Ngesa' },
  { id: 'c4', code: 'ENG 201', name: 'English Language', department: 'Languages', form: 'Form 2', materials: 6, instructor: 'Ms. Grace Wanjiku' },
  { id: 'c5', code: 'HIS 301', name: 'History & Government', department: 'Humanities', form: 'Form 3', materials: 9, instructor: 'Mr. David Otieno' },
  { id: 'c6', code: 'BIO 401', name: 'Biology', department: 'Science', form: 'Form 4', materials: 11, instructor: 'Dr. Alice Akinyi' },
]

const dept_colors: Record<string, string> = {
  Science: 'bg-blue-50 text-blue-700',
  Mathematics: 'bg-emerald-50 text-emerald-700',
  Languages: 'bg-purple-50 text-purple-700',
  Humanities: 'bg-amber-50 text-amber-700',
}

export default async function StaffCoursesPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const totalMaterials = courses.reduce((sum, c) => sum + c.materials, 0)

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900">Courses & Materials</h1>
          <p className="text-[15px] text-slate-500 mt-1">Browse curriculum courses and their library resources.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Total Courses">
            <p className="text-[32px] font-bold text-slate-900">{courses.length}</p>
            <p className="text-[13px] text-slate-400 mt-1">Across all departments</p>
          </SectionCard>
          <SectionCard title="Total Materials">
            <p className="text-[32px] font-bold text-[#2563EB]">{totalMaterials}</p>
            <p className="text-[13px] text-slate-400 mt-1">Books and resources linked</p>
          </SectionCard>
          <SectionCard title="Departments">
            <p className="text-[32px] font-bold text-[#8B5CF6]">{new Set(courses.map((c) => c.department)).size}</p>
            <p className="text-[13px] text-slate-400 mt-1">Academic departments</p>
          </SectionCard>
        </div>

        <SectionCard title="Course Directory" icon={Briefcase}>
          <div className="space-y-0">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center gap-4 py-3.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-lg px-2 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-[#2563EB]/5 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-bold text-[#2563EB]">{course.code.split(' ')[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-medium text-slate-800">{course.name}</p>
                    <span className="text-[11px] text-slate-400 font-mono">{course.code}</span>
                  </div>
                  <p className="text-[12px] text-slate-400 mt-0.5">{course.instructor} · {course.form}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-[12px] text-slate-600">{course.materials}</span>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${dept_colors[course.department] ?? 'bg-slate-100 text-slate-600'}`}>
                  {course.department}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
