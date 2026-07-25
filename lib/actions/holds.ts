'use server'

import prisma from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'

export async function get_user_holds(userId: string) {
  const holds = await prisma.hold.findMany({
    where: { userId },
    include: { book: true },
    orderBy: { requestedAt: 'desc' },
  })

  return holds.map((hold) => ({
    id: hold.id,
    title: hold.book.title,
    author: hold.book.author,
    coverUrl: hold.book.coverUrl,
    status: hold.status.toLowerCase() as 'pending' | 'ready' | 'expired' | 'fulfilled' | 'cancelled',
    queuePosition: hold.status === 'PENDING' ? hold.queuePosition : null,
    pickupLocation: hold.status === 'READY' ? 'Main Desk — Akamba Hall' : null,
    pickupDeadline: hold.status === 'READY' && hold.expiryAt ? hold.expiryAt.toISOString() : null,
    requestedAt: hold.requestedAt.toISOString(),
  }))
}

export async function get_all_holds(options?: { status?: string }) {
  const where: Record<string, unknown> = {}
  if (options?.status) {
    where.status = options.status.toUpperCase()
  }

  const holds = await prisma.hold.findMany({
    where,
    include: {
      user: { select: { fullName: true, studentId: true } },
      book: { select: { title: true, author: true } },
    },
    orderBy: { requestedAt: 'desc' },
  })

  return holds.map((hold) => ({
    id: hold.id,
    title: hold.book.title,
    author: hold.book.author,
    requestedBy: hold.user.fullName ?? 'Unknown',
    memberId: hold.user.studentId ?? 'N/A',
    queuePosition: hold.queuePosition,
    status: hold.status.toLowerCase() as string,
    requestedAt: hold.requestedAt.toISOString(),
  }))
}

export async function request_hold(bookId: string) {
  const user = await requireAuth()

  const existingHold = await prisma.hold.findFirst({
    where: { userId: user.id, bookId, status: { in: ['PENDING', 'READY'] } },
  })
  if (existingHold) return { success: false, error: 'You already have an active hold on this book.' }

  const maxQueue = await prisma.hold.aggregate({
    where: { bookId, status: 'PENDING' },
    _max: { queuePosition: true },
  })

  const hold = await prisma.hold.create({
    data: {
      userId: user.id,
      bookId,
      queuePosition: (maxQueue._max.queuePosition ?? 0) + 1,
    },
  })

  revalidatePath('/student/reservations')
  revalidatePath('/desk/reservations')
  return { success: true, holdId: hold.id }
}

export async function cancel_hold(holdId: string) {
  const user = await requireAuth()

  const hold = await prisma.hold.findUnique({ where: { id: holdId } })
  if (!hold) return { success: false, error: 'Hold not found.' }
  if (hold.userId !== user.id) return { success: false, error: 'Not authorized.' }
  if (hold.status !== 'PENDING') return { success: false, error: 'Can only cancel pending holds.' }

  await prisma.hold.update({ where: { id: holdId }, data: { status: 'CANCELLED' } })

  revalidatePath('/student/reservations')
  revalidatePath('/desk/reservations')
  return { success: true }
}

export async function fulfill_hold(holdId: string) {
  const hold = await prisma.hold.findUnique({ where: { id: holdId } })
  if (!hold) return { success: false, error: 'Hold not found.' }
  if (hold.status !== 'READY' && hold.status !== 'PENDING') return { success: false, error: 'Hold cannot be fulfilled.' }

  await prisma.hold.update({ where: { id: holdId }, data: { status: 'FULFILLED' } })

  revalidatePath('/desk/reservations')
  revalidatePath('/student/reservations')
  return { success: true }
}

export async function mark_hold_ready(holdId: string) {
  const hold = await prisma.hold.findUnique({ where: { id: holdId } })
  if (!hold) return { success: false, error: 'Hold not found.' }

  const expiryAt = new Date()
  expiryAt.setDate(expiryAt.getDate() + 3)

  await prisma.hold.update({
    where: { id: holdId },
    data: { status: 'READY', expiryAt },
  })

  revalidatePath('/desk/reservations')
  return { success: true }
}

export async function get_hold_stats() {
  const [pending, ready, fulfilled, total] = await Promise.all([
    prisma.hold.count({ where: { status: 'PENDING' } }),
    prisma.hold.count({ where: { status: 'READY' } }),
    prisma.hold.count({ where: { status: 'FULFILLED' } }),
    prisma.hold.count(),
  ])
  return { pending, ready, fulfilled, total }
}
