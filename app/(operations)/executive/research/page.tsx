import { requireRole } from '@/lib/auth/roleGuard'
import { ResearchSupportClient } from '@/components/dashboard/executive/pages/research-support-client'

export const dynamic = 'force-dynamic'

export default async function ResearchSupportPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <ResearchSupportClient />
}
