'use server'

import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'
import type { AnnouncementCategory } from '@prisma/client'

export async function get_announcements(options?: { category?: string; limit?: number; pinnedOnly?: boolean }) {
  const where: Record<string, unknown> = {}
  if (options?.category) where.category = options.category.toUpperCase()
  if (options?.pinnedOnly) where.isPinned = true

  const announcements = await prisma.announcement.findMany({
    where,
    orderBy: [{ isPinned: 'desc' }, { publishedAt: 'desc' }],
    take: options?.limit,
  })

  return announcements.map((a) => ({
    id: a.id,
    title: a.title,
    body: a.body,
    category: a.category.toLowerCase(),
    attachmentUrl: a.attachmentUrl,
    isPinned: a.isPinned,
    publishedAt: a.publishedAt.toISOString(),
    createdAt: a.createdAt.toISOString(),
  }))
}

export async function create_announcement(data: { title: string; body: string; category: AnnouncementCategory; attachmentUrl?: string }) {
  await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  const announcement = await prisma.announcement.create({ data })
  revalidatePath('/executive/announcements')
  revalidatePath('/executive/dashboard')
  revalidatePath('/library-head/announcements')
  revalidatePath('/super-admin/announcements')
  return { success: true, id: announcement.id }
}

export async function delete_announcement(id: string) {
  await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.announcement.delete({ where: { id } })
  revalidatePath('/executive/announcements')
  revalidatePath('/library-head/announcements')
  revalidatePath('/super-admin/announcements')
  return { success: true }
}
