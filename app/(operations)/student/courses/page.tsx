import { requireRole } from '@/lib/auth/roleGuard'
import { get_courses } from '@/lib/actions/resources'
import { CoursesList } from '@/components/shared/courses-list'

export const dynamic = 'force-dynamic'

export default async function StudentCoursesPage() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  const courses = await get_courses()
  return <CoursesList courses={courses} />
}
