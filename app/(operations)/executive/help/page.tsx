import { requireRole } from '@/lib/auth/roleGuard'
import { HelpPage } from '@/components/shared/help-page'

export const dynamic = 'force-dynamic'

export default async function ExecutiveHelpPage() {
  await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  return <HelpPage />
}
