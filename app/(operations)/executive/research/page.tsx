import { requireRole } from '@/lib/auth/roleGuard'
import { ResearchSupportClient } from '@/components/dashboard/executive/pages/research-support-client'
import { get_courses, get_eresources } from '@/lib/actions/resources'

export const dynamic = 'force-dynamic'

export default async function ResearchSupportPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  const [courses, eresources] = await Promise.all([get_courses(), get_eresources()])
  return <ResearchSupportClient courses={courses} eresources={eresources} />
}
