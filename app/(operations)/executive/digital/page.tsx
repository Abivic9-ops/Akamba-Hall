import { requireRole } from '@/lib/auth/roleGuard'
import { DigitalLibraryClient } from '@/components/dashboard/executive/pages/digital-library-client'
import { get_eresources } from '@/lib/actions/resources'

export const dynamic = 'force-dynamic'

export default async function DigitalLibraryPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  const eresources = await get_eresources()
  return <DigitalLibraryClient eresources={eresources} />
}
