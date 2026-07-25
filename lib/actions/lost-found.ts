'use server'

import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'

export async function get_lost_found_items(options?: { status?: string }) {
  const where: Record<string, unknown> = {}
  if (options?.status) where.status = options.status.toUpperCase()

  const items = await prisma.lostFoundItem.findMany({
    where,
    orderBy: { reportedAt: 'desc' },
  })

  return items.map((i) => ({
    id: i.id,
    title: i.title,
    description: i.description,
    category: i.category,
    imageUrl: i.imageUrl,
    status: i.status.toLowerCase(),
    reportedAt: i.reportedAt.toISOString(),
    resolvedAt: i.resolvedAt?.toISOString() ?? null,
  }))
}

export async function create_lost_found_item(data: { title: string; description?: string; category?: string; imageUrl?: string; status?: string }) {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'LIBRARY_HEAD', 'SUPER_ADMIN'])
  const item = await prisma.lostFoundItem.create({
    data: { ...data, status: (data.status?.toUpperCase() ?? 'FOUND') as 'LOST' | 'FOUND' | 'CLAIMED' },
  })
  revalidatePath('/desk/lost-found')
  return { success: true, id: item.id }
}

export async function update_lost_found_status(itemId: string, status: 'LOST' | 'FOUND' | 'CLAIMED') {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.lostFoundItem.update({
    where: { id: itemId },
    data: { status, resolvedAt: status === 'CLAIMED' ? new Date() : null },
  })
  revalidatePath('/desk/lost-found')
  return { success: true }
}
