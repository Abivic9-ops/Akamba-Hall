'use server'

import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'

export async function get_events(options?: { upcoming?: boolean; limit?: number }) {
  const where: Record<string, unknown> = {}
  if (options?.upcoming) where.startTime = { gte: new Date() }

  const events = await prisma.event.findMany({
    where,
    orderBy: { startTime: 'asc' },
    take: options?.limit,
  })

  return events.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    venue: e.venue,
    imageUrl: e.imageUrl,
    startTime: e.startTime.toISOString(),
    endTime: e.endTime.toISOString(),
    category: e.category.toLowerCase(),
    maxAttendees: e.maxAttendees,
  }))
}

export async function create_event(data: { title: string; description?: string; venue?: string; startTime: Date; endTime: Date; imageUrl?: string; maxAttendees?: number }) {
  await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])
  const event = await prisma.event.create({ data })
  revalidatePath('/executive/events')
  revalidatePath('/library-head/events')
  revalidatePath('/super-admin/events')
  return { success: true, id: event.id }
}

export async function delete_event(id: string) {
  await requireRole(['EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.event.delete({ where: { id } })
  revalidatePath('/executive/events')
  revalidatePath('/library-head/events')
  revalidatePath('/super-admin/events')
  return { success: true }
}
