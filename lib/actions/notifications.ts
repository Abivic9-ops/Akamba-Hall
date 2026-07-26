'use server'

import prisma from '@/lib/db/prisma'
import { getAuthUser, getUserProfile } from '@/lib/auth/roleGuard'

export interface Notification {
  id: string
  type: 'announcement' | 'event' | 'loan' | 'hold' | 'booking' | 'system'
  title: string
  body: string
  icon: string
  color: string
  href: string
  createdAt: string
  read: boolean
}

const role_portal_prefix: Record<string, string> = {
  STUDENT: '/student',
  STAFF: '/staff',
  ASSISTANT: '/desk',
  CAPTAIN: '/desk',
  PREFECT: '/desk',
  EXECUTIVE: '/executive',
  LIBRARY_HEAD: '/library-head',
  SUPER_ADMIN: '/super-admin',
}

function portal_prefix(role: string | null): string {
  if (!role) return '/student'
  return role_portal_prefix[role] ?? '/student'
}

export async function get_notifications(): Promise<Notification[]> {
  const authUser = await getAuthUser()
  if (!authUser) return []

  const profile = await getUserProfile()
  if (!profile) return []

  const prefix = portal_prefix(profile.role)
  const now = new Date()
  const three_days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

  const [announcements, events, due_loans, ready_holds, pending_bookings] = await Promise.all([
    prisma.announcement.findMany({
      where: {
        publishedAt: { lte: now },
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: now } },
        ],
      },
      orderBy: { publishedAt: 'desc' },
      take: 5,
    }),
    prisma.event.findMany({
      where: {
        startTime: { gte: now },
      },
      orderBy: { startTime: 'asc' },
      take: 3,
    }),
    prisma.loan.findMany({
      where: {
        userId: profile.id,
        status: { in: ['ACTIVE', 'OVERDUE'] },
        returnedAt: null,
        dueAt: { lte: three_days },
      },
      orderBy: { dueAt: 'asc' },
      take: 5,
      include: { copy: { include: { book: true } } },
    }),
    prisma.hold.findMany({
      where: {
        userId: profile.id,
        status: 'READY',
      },
      orderBy: { requestedAt: 'desc' },
      take: 5,
      include: { book: true },
    }),
    prisma.booking.findMany({
      where: {
        userId: profile.id,
        status: 'PENDING',
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { space: true },
    }),
  ])

  const notifications: Notification[] = []

  for (const a of announcements) {
    notifications.push({
      id: `ann-${a.id}`,
      type: 'announcement',
      title: a.title,
      body: a.body.slice(0, 120),
      icon: 'Megaphone',
      color: 'text-amber-500',
      href: `${prefix}/announcements`,
      createdAt: a.publishedAt.toISOString(),
      read: false,
    })
  }

  for (const e of events) {
    notifications.push({
      id: `evt-${e.id}`,
      type: 'event',
      title: e.title,
      body: e.description
        ? e.description.slice(0, 120)
        : `Starts ${e.startTime.toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short' })}`,
      icon: 'CalendarCheck',
      color: 'text-blue-500',
      href: `${prefix}/events`,
      createdAt: e.createdAt.toISOString(),
      read: false,
    })
  }

  for (const l of due_loans) {
    const days_left = Math.ceil((l.dueAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const overdue = l.dueAt < now
    notifications.push({
      id: `loan-${l.id}`,
      type: 'loan',
      title: overdue ? `"${l.copy.book.title}" is overdue` : `"${l.copy.book.title}" due in ${days_left}d`,
      body: overdue
        ? `This book is past its due date. Please return it as soon as possible.`
        : `This book is due in ${days_left} day${days_left === 1 ? '' : 's'}.`,
      icon: 'Clock',
      color: 'text-red-500',
      href: `${prefix}/holds`,
      createdAt: l.checkoutAt.toISOString(),
      read: false,
    })
  }

  for (const h of ready_holds) {
    notifications.push({
      id: `hold-${h.id}`,
      type: 'hold',
      title: `"${h.book.title}" is ready for pickup`,
      body: 'Your hold is ready. Please collect it at the desk.',
      icon: 'PackageCheck',
      color: 'text-emerald-500',
      href: `${prefix}/holds`,
      createdAt: h.requestedAt.toISOString(),
      read: false,
    })
  }

  for (const b of pending_bookings) {
    notifications.push({
      id: `book-${b.id}`,
      type: 'booking',
      title: `Booking: ${b.title ?? b.space.name}`,
      body: `Your booking for ${b.space.name} is pending approval.`,
      icon: 'CalendarCheck',
      color: 'text-sky-500',
      href: `${prefix}/bookings`,
      createdAt: b.createdAt.toISOString(),
      read: false,
    })
  }

  notifications.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return notifications.slice(0, 15)
}

export async function get_unread_notification_count(): Promise<number> {
  const authUser = await getAuthUser()
  if (!authUser) return 0

  const profile = await getUserProfile()
  if (!profile) return 0

  const now = new Date()
  const three_days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

  const [announcement_count, event_count, overdue_loan_count, ready_hold_count] = await Promise.all([
    prisma.announcement.count({
      where: {
        publishedAt: { lte: now },
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: now } },
        ],
      },
    }),
    prisma.event.count({
      where: {
        startTime: { gte: now },
      },
    }),
    prisma.loan.count({
      where: {
        userId: profile.id,
        status: { in: ['ACTIVE', 'OVERDUE'] },
        returnedAt: null,
        dueAt: { lte: three_days },
      },
    }),
    prisma.hold.count({
      where: {
        userId: profile.id,
        status: 'READY',
      },
    }),
  ])

  return announcement_count + event_count + overdue_loan_count + ready_hold_count
}
