import { requireRole } from '@/lib/auth/roleGuard'
import { get_courses } from '@/lib/actions/resources'
import { LibraryHeadCoursesClient } from '@/components/admin/courses-admin'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadCoursesPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const courses = await get_courses()
  return <LibraryHeadCoursesClient courses={courses} />
}
