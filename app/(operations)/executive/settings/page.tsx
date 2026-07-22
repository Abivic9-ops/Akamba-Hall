import { requireRole } from '@/lib/auth/roleGuard'
import { SettingsClient } from '@/components/dashboard/executive/pages/settings-client'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <SettingsClient />
}
