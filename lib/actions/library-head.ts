'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/roleGuard'
import type { BookingStatus, CopyStatus, UserStatus, Role } from '@prisma/client'

const allowed_roles: Role[] = ['LIBRARY_HEAD', 'SUPER_ADMIN']

/* ─── BOOKING ACTIONS ────────────────────────── */

export async function approve_booking(bookingId: string) {
  await requireRole(allowed_roles)

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
  if (!booking) return { success: false, error: 'Booking not found.' }
  if (booking.status !== 'PENDING') return { success: false, error: 'Booking is not pending.' }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'APPROVED' },
  })

  revalidatePath('/library-head/bookings')
  return { success: true }
}

export async function reject_booking(bookingId: string) {
  await requireRole(allowed_roles)

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
  if (!booking) return { success: false, error: 'Booking not found.' }
  if (booking.status !== 'PENDING') return { success: false, error: 'Booking is not pending.' }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'REJECTED' },
  })

  revalidatePath('/library-head/bookings')
  return { success: true }
}

export async function cancel_booking(bookingId: string) {
  await requireRole(allowed_roles)

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
  if (!booking) return { success: false, error: 'Booking not found.' }
  if (booking.status === 'CANCELLED' || booking.status === 'REJECTED') {
    return { success: false, error: 'Booking is already cancelled or rejected.' }
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'CANCELLED' },
  })

  revalidatePath('/library-head/bookings')
  return { success: true }
}

export async function update_booking_status(bookingId: string, status: BookingStatus) {
  await requireRole(allowed_roles)

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
  if (!booking) return { success: false, error: 'Booking not found.' }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  })

  revalidatePath('/library-head/bookings')
  return { success: true }
}

/* ─── MEMBER ACTIONS ─────────────────────────── */

export async function suspend_member(userId: string) {
  await requireRole(allowed_roles)

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return { success: false, error: 'User not found.' }
  if (user.role === 'SUPER_ADMIN' || user.role === 'LIBRARY_HEAD') {
    return { success: false, error: 'Cannot suspend an admin or library head.' }
  }

  await prisma.user.update({
    where: { id: userId },
    data: { status: 'SUSPENDED' },
  })

  revalidatePath('/library-head/members')
  revalidatePath('/library-head/staff')
  return { success: true }
}

export async function activate_member(userId: string) {
  await requireRole(allowed_roles)

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return { success: false, error: 'User not found.' }

  await prisma.user.update({
    where: { id: userId },
    data: { status: 'ACTIVE' },
  })

  revalidatePath('/library-head/members')
  revalidatePath('/library-head/staff')
  return { success: true }
}

/* ─── STAFF ACTIONS ──────────────────────────── */

export async function update_staff_role(userId: string, newRole: Role) {
  await requireRole(allowed_roles)

  const allowed_staff_roles: Role[] = ['STAFF', 'ASSISTANT', 'CAPTAIN', 'PREFECT']
  if (!allowed_staff_roles.includes(newRole)) {
    return { success: false, error: 'Invalid staff role.' }
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return { success: false, error: 'User not found.' }
  if (user.role === 'SUPER_ADMIN' || user.role === 'LIBRARY_HEAD') {
    return { success: false, error: 'Cannot change role of an admin or library head.' }
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  })

  revalidatePath('/library-head/staff')
  return { success: true }
}

/* ─── INVENTORY ACTIONS ──────────────────────── */

export async function update_copy_status(copyId: string, newStatus: CopyStatus) {
  await requireRole(allowed_roles)

  const copy = await prisma.copy.findUnique({ where: { id: copyId } })
  if (!copy) return { success: false, error: 'Copy not found.' }

  await prisma.copy.update({
    where: { id: copyId },
    data: { status: newStatus },
  })

  revalidatePath('/library-head/inventory')
  return { success: true }
}

export async function bulk_update_copy_status(copyIds: string[], newStatus: CopyStatus) {
  await requireRole(allowed_roles)

  await prisma.copy.updateMany({
    where: { id: { in: copyIds } },
    data: { status: newStatus },
  })

  revalidatePath('/library-head/inventory')
  return { success: true }
}
