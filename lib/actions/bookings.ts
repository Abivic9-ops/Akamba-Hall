'use server'

import prisma from '@/lib/db/prisma'
import { requireAuth, requireRole } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'

export async function get_user_bookings(userId: string) {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: { space: true },
    orderBy: { startAt: 'asc' },
  })

  return bookings.map((b) => ({
    id: b.id,
    type: b.space.type as string,
    title: b.title ?? b.space.name,
    location: b.space.name,
    startAt: b.startAt.toISOString(),
    endAt: b.endAt.toISOString(),
    status: b.status as string,
  }))
}

export async function get_all_bookings(options?: { status?: string; limit?: number }) {
  const where: Record<string, unknown> = {}
  if (options?.status) {
    where.status = options.status.toUpperCase()
  }

  const bookings = await prisma.booking.findMany({
    where,
    include: {
      user: { select: { fullName: true, studentId: true } },
      space: { select: { name: true, type: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: options?.limit,
  })

  return bookings.map((b) => ({
    id: b.id,
    userName: b.user.fullName ?? 'Unknown',
    memberId: b.user.studentId ?? 'N/A',
    spaceName: b.space.name,
    spaceType: b.space.type,
    title: b.title ?? b.space.name,
    startAt: b.startAt.toISOString(),
    endAt: b.endAt.toISOString(),
    status: b.status,
    createdAt: b.createdAt.toISOString(),
  }))
}

export async function create_booking(spaceId: string, startAt: Date, endAt: Date, title?: string) {
  const user = await requireAuth()

  const conflict = await prisma.booking.findFirst({
    where: {
      spaceId,
      status: { in: ['PENDING', 'APPROVED'] },
      startAt: { lt: endAt },
      endAt: { gt: startAt },
    },
  })
  if (conflict) return { success: false, error: 'Time slot is already booked.' }

  const booking = await prisma.booking.create({
    data: { userId: user.id, spaceId, startAt, endAt, title, status: 'PENDING' },
  })

  revalidatePath('/student/bookings')
  revalidatePath('/staff/booking')
  revalidatePath('/library-head/bookings')
  return { success: true, bookingId: booking.id }
}

export async function cancel_booking(bookingId: string) {
  const user = await requireAuth()

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
  if (!booking) return { success: false, error: 'Booking not found.' }
  if (booking.userId !== user.id) return { success: false, error: 'Not authorized.' }

  await prisma.booking.update({ where: { id: bookingId }, data: { status: 'CANCELLED' } })

  revalidatePath('/student/bookings')
  revalidatePath('/staff/booking')
  revalidatePath('/library-head/bookings')
  return { success: true }
}

export async function get_booking_stats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [pending, todayCount, totalActive] = await Promise.all([
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { startAt: { gte: today, lt: tomorrow } } }),
    prisma.booking.count({ where: { status: { in: ['PENDING', 'APPROVED'] } } }),
  ])
  return { pending, todayCount, totalActive }
}

export async function get_spaces() {
  const spaces = await prisma.space.findMany({
    include: {
      bookings: {
        where: { status: { in: ['PENDING', 'APPROVED'] } },
        select: { startAt: true, endAt: true, status: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  return spaces.map((s) => ({
    id: s.id,
    name: s.name,
    capacity: s.capacity,
    type: s.type,
    activeBookings: s.bookings.length,
  }))
}
