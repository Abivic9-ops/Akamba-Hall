import { requireRole } from '@/lib/auth/roleGuard'
import { get_courses, get_eresources } from '@/lib/actions/resources'
import { LearningResourcesClient } from '@/components/super-admin/learning-resources-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminLearningResourcesPage() {
  await requireRole(['SUPER_ADMIN'])

  const [courses, eresources] = await Promise.all([get_courses(), get_eresources()])

  return <LearningResourcesClient courses={courses} eresources={eresources} />
}
