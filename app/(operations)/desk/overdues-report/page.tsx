import { requireRole } from '@/lib/auth/roleGuard'
import { OverduesReportPageClient } from '@/components/desk/overdues-report-page-client'

export const dynamic = 'force-dynamic'

export default async function OverduesReportPage() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <OverduesReportPageClient />
}
