import { requireRole } from '@/lib/auth/roleGuard'
import { DigitalLibraryClient } from '@/components/dashboard/executive/pages/digital-library-client'

export const dynamic = 'force-dynamic'

export default async function DigitalLibraryPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <DigitalLibraryClient />
}
