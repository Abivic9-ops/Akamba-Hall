import { requireRole } from '@/lib/auth/roleGuard'
import { AvRoomsClient } from '@/components/dashboard/executive/pages/av-rooms-client'
import prisma from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export default async function AvRoomsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])

  const spaces = await prisma.space.findMany({
    select: {
      id: true,
      name: true,
      capacity: true,
      type: true,
    },
    orderBy: { name: 'asc' },
  })

  const serialized = spaces.map((s) => ({
    ...s,
    type: s.type.toString(),
  }))

  return <AvRoomsClient spaces={serialized} />
}
