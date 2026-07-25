import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { LostFoundClient } from '@/components/dashboard/library-head/lost-found-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadLostFoundPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const items = await prisma.lostFoundItem.findMany({
    orderBy: { reportedAt: 'desc' },
  })

  const serialized = items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    status: item.status.toLowerCase(),
    reportedAt: item.reportedAt.toISOString(),
  }))

  return <LostFoundClient items={serialized} />
}
