import { requireRole } from '@/lib/auth/roleGuard'
import { FeatureFlagsClient } from '@/components/super-admin/feature-flags-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminFeatureFlagsPage() {
  await requireRole(['SUPER_ADMIN'])

  return <FeatureFlagsClient />
}
