import { requireRole } from '@/lib/auth/roleGuard'
import { AvRoomsClient } from '@/components/dashboard/executive/pages/av-rooms-client'

export const dynamic = 'force-dynamic'

export default async function AvRoomsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <AvRoomsClient />
}
