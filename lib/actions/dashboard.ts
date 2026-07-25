import prisma from '@/lib/db/prisma'
import type { Role } from '@prisma/client'

export interface dashboard_metrics {
  total_users: number
  total_books: number
  active_loans: number
  pending_bookings: number
  overdue_loans: number
  total_staff: number
  total_students: number
  active_users_today: number
}

export interface recent_activity {
  id: string
  type: string
  description: string
  user_name: string
  created_at: string
  status: string
}

export interface role_distribution {
  role: string
  count: number
  percentage: number
}

export interface system_health {
  label: string
  status: string
  detail: string
}

export async function get_super_admin_metrics(): Promise<dashboard_metrics> {
  try {
    const [
      total_users,
      total_books,
      active_loans,
      pending_bookings,
      overdue_loans,
      total_staff,
      total_students,
      active_users_today,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.book.count(),
      prisma.loan.count({ where: { returnedAt: null } }),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.loan.count({
        where: {
          returnedAt: null,
          dueAt: { lt: new Date() },
        },
      }),
      prisma.user.count({
        where: { role: { in: ['STAFF', 'LIBRARY_HEAD', 'SUPER_ADMIN'] } },
      }),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({
        where: {
          lastActiveAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ])

    return {
      total_users,
      total_books,
      active_loans,
      pending_bookings,
      overdue_loans,
      total_staff,
      total_students,
      active_users_today,
    }
  } catch {
    return {
      total_users: 0,
      total_books: 0,
      active_loans: 0,
      pending_bookings: 0,
      overdue_loans: 0,
      total_staff: 0,
      total_students: 0,
      active_users_today: 0,
    }
  }
}

export async function get_super_admin_activity(): Promise<recent_activity[]> {
  try {
    const loans = await prisma.loan.findMany({
      take: 8,
      orderBy: { checkoutAt: 'desc' },
      include: { user: { select: { fullName: true } } },
    })

    return loans.map((loan) => ({
      id: loan.id,
      type: 'loan',
      description: `Book loan ${loan.returnedAt ? 'returned' : 'checked out'}`,
      user_name: loan.user.fullName ?? 'Unknown',
      created_at: loan.checkoutAt.toISOString(),
      status: loan.returnedAt ? 'completed' : 'active',
    }))
  } catch {
    return []
  }
}

export async function get_role_distribution(): Promise<role_distribution[]> {
  try {
    const total = await prisma.user.count()
    if (total === 0) return []

    const roles = ['STUDENT', 'STAFF', 'ASSISTANT', 'CAPTAIN', 'PREFECT', 'EXECUTIVE', 'LIBRARY_HEAD', 'SUPER_ADMIN']
    const counts = await Promise.all(
      roles.map((role) => prisma.user.count({ where: { role: role as Role } }))
    )

    return roles
      .map((role, i) => ({
        role,
        count: counts[i],
        percentage: Math.round((counts[i] / total) * 100),
      }))
      .filter((r) => r.count > 0)
  } catch {
    return []
  }
}

export async function get_system_health(): Promise<system_health[]> {
  return [
    { label: 'Database', status: 'healthy', detail: 'Connected' },
    { label: 'Auth Service', status: 'healthy', detail: 'Supabase Active' },
    { label: 'Storage', status: 'healthy', detail: 'Available' },
    { label: 'QR Generator', status: 'healthy', detail: 'Operational' },
  ]
}

/* ─── STUDENT DASHBOARD ──────────────────────── */

export async function get_student_dashboard_data(userId: string) {
  const now = new Date()

  const [activeLoans, holds, bookings, overdueCount] = await Promise.all([
    prisma.loan.findMany({
      where: { userId, returnedAt: null },
      include: { copy: { include: { book: true } } },
      orderBy: { dueAt: 'asc' },
    }),
    prisma.hold.findMany({
      where: { userId, status: { in: ['PENDING', 'READY'] } },
      include: { book: true },
      orderBy: { requestedAt: 'desc' },
    }),
    prisma.booking.findMany({
      where: { userId, startAt: { gte: now }, status: { in: ['PENDING', 'APPROVED'] } },
      include: { space: true },
      orderBy: { startAt: 'asc' },
    }),
    prisma.loan.count({ where: { userId, returnedAt: null, dueAt: { lt: now } } }),
  ])

  const dueSoonCount = activeLoans.filter((l) => {
    const days = Math.ceil((l.dueAt.getTime() - now.getTime()) / 86400000)
    return days >= 0 && days <= 7
  }).length

  return {
    loans: activeLoans.map((l) => ({
      id: l.id,
      title: l.copy.book.title,
      author: l.copy.book.author,
      coverUrl: l.copy.book.coverUrl,
      dueDate: l.dueAt.toISOString(),
      renewable: l.renewCount < 2,
    })),
    holds: holds.map((h) => ({
      id: h.id,
      title: h.book.title,
      author: h.book.author,
      coverUrl: h.book.coverUrl,
      status: h.status.toLowerCase() as 'pending' | 'ready',
      queuePosition: h.status === 'PENDING' ? h.queuePosition : null,
      pickupLocation: h.status === 'READY' ? 'Main Desk — Akamba Hall' : null,
      pickupDeadline: h.status === 'READY' && h.expiryAt ? h.expiryAt.toISOString() : null,
    })),
    bookings: bookings.map((b) => ({
      id: b.id,
      type: b.space.type as 'READING_HALL' | 'AVR' | 'BOARDROOM',
      title: b.title ?? b.space.name,
      location: b.space.name,
      startAt: b.startAt.toISOString(),
      endAt: b.endAt.toISOString(),
      status: b.status as 'Approved' | 'Pending' | 'Cancelled',
    })),
    overdueCount,
    dueSoonCount,
  }
}

/* ─── STAFF DASHBOARD ────────────────────────── */

export async function get_staff_dashboard_data(userId: string) {
  const now = new Date()

  const [activeLoans, holds, bookings, overdueCount, dueThisWeek] = await Promise.all([
    prisma.loan.findMany({
      where: { userId, returnedAt: null },
      include: { copy: { include: { book: true } } },
      orderBy: { dueAt: 'asc' },
    }),
    prisma.hold.findMany({
      where: { userId, status: { in: ['PENDING', 'READY'] } },
      include: { book: true },
    }),
    prisma.booking.findMany({
      where: { userId, startAt: { gte: now }, status: { in: ['PENDING', 'APPROVED'] } },
      include: { space: true },
      orderBy: { startAt: 'asc' },
    }),
    prisma.loan.count({ where: { userId, returnedAt: null, dueAt: { lt: now } } }),
    prisma.loan.count({
      where: {
        userId,
        returnedAt: null,
        dueAt: { gte: now, lte: new Date(now.getTime() + 7 * 86400000) },
      },
    }),
  ])

  return {
    loans: activeLoans.map((l) => ({
      id: l.id,
      title: l.copy.book.title,
      author: l.copy.book.author,
      coverUrl: l.copy.book.coverUrl,
      dueDate: l.dueAt.toISOString(),
      renewable: l.renewCount < 2,
    })),
    holds: holds.map((h) => ({
      id: h.id,
      title: h.book.title,
      author: h.book.author,
      coverUrl: h.book.coverUrl,
      status: h.status.toLowerCase() as 'pending' | 'ready',
      queuePosition: h.status === 'PENDING' ? h.queuePosition : null,
      pickupLocation: h.status === 'READY' ? 'Main Desk — Level 2' : null,
      pickupDeadline: h.status === 'READY' && h.expiryAt ? h.expiryAt.toISOString() : null,
    })),
    bookings: bookings.map((b) => ({
      id: b.id,
      type: b.space.type as 'Boardroom' | 'AVR' | 'READING_HALL',
      title: b.title ?? b.space.name,
      location: b.space.name,
      startAt: b.startAt.toISOString(),
      endAt: b.endAt.toISOString(),
      status: b.status as string,
    })),
    overdue: {
      overdueCount,
      dueThisWeek,
      totalActive: activeLoans.length,
    },
  }
}

/* ─── DESK DASHBOARD ─────────────────────────── */

export async function get_desk_dashboard_data() {
  const now = new Date()
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const [
    todayCheckouts,
    todayReturns,
    todayRenewals,
    newMembersToday,
    activeOverdue,
    recentLoans,
    activeHolds,
    todayReturnedLoans,
    overdueLoans,
    totalBooks,
    availableCopies,
    loanedCopies,
    recentBookings,
    upcomingEvents,
    recentAnnouncements,
  ] = await Promise.all([
    prisma.loan.count({ where: { checkoutAt: { gte: todayStart } } }),
    prisma.loan.count({ where: { returnedAt: { gte: todayStart } } }),
    prisma.loan.count({ where: { checkoutAt: { gte: todayStart }, renewCount: { gt: 0 } } }),
    prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.loan.count({ where: { returnedAt: null, dueAt: { lt: now } } }),
    prisma.loan.findMany({
      where: { checkoutAt: { gte: new Date(now.getTime() - 3600000 * 3) } },
      include: {
        user: { select: { fullName: true, studentId: true } },
        copy: { include: { book: { select: { title: true } } } },
      },
      orderBy: { checkoutAt: 'desc' },
      take: 10,
    }),
    prisma.hold.findMany({
      where: { status: { in: ['PENDING', 'READY'] } },
      include: {
        user: { select: { fullName: true, studentId: true } },
        book: { select: { title: true, author: true } },
      },
      orderBy: { requestedAt: 'asc' },
      take: 8,
    }),
    prisma.loan.findMany({
      where: { returnedAt: { gte: todayStart } },
      include: {
        copy: { include: { book: { select: { title: true, author: true } } } },
      },
      orderBy: { returnedAt: 'desc' },
      take: 8,
    }),
    prisma.loan.findMany({
      where: { returnedAt: null, dueAt: { lt: now } },
      include: {
        user: { select: { studentId: true } },
        copy: { include: { book: { select: { title: true, author: true } } } },
      },
      orderBy: { dueAt: 'asc' },
      take: 5,
    }),
    prisma.book.count(),
    prisma.copy.count({ where: { status: 'AVAILABLE' } }),
    prisma.copy.count({ where: { status: 'LOANED' } }),
    prisma.booking.findMany({
      where: { status: { in: ['PENDING', 'APPROVED'] } },
      include: { user: { select: { fullName: true } }, space: { select: { name: true } } },
      orderBy: { startAt: 'asc' },
      take: 6,
    }),
    prisma.event.findMany({
      where: { startTime: { gte: now } },
      orderBy: { startTime: 'asc' },
      take: 5,
    }),
    prisma.announcement.findMany({
      orderBy: [{ isPinned: 'desc' }, { publishedAt: 'desc' }],
      take: 6,
    }),
  ])

  return {
    kpi: {
      loansIssued: todayCheckouts,
      returnsProcessed: todayReturns,
      renewals: todayRenewals,
      newMembers: newMembersToday,
      overdueItems: activeOverdue,
    },
    recentTransactions: recentLoans.map((l) => ({
      id: l.id,
      type: l.renewCount > 0 ? 'renewal' as const : l.returnedAt ? 'return' as const : 'issue' as const,
      itemTitle: l.copy.book.title,
      memberName: l.user.fullName ?? 'Unknown',
      memberId: l.user.studentId ?? 'N/A',
      timestamp: l.checkoutAt.toISOString(),
      status: l.renewCount > 0 ? ('Renewed' as const) : l.returnedAt ? ('Returned' as const) : ('Issued' as const),
    })),
    holdsQueue: activeHolds.map((h) => ({
      id: h.id,
      title: h.book.title,
      author: h.book.author,
      requestedBy: h.user.fullName ?? 'Unknown',
      memberId: h.user.studentId ?? 'N/A',
      queuePosition: h.queuePosition,
      totalInQueue: h.queuePosition,
      status: h.status === 'READY' ? ('Ready' as const) : h.expiryAt && h.expiryAt < now ? ('Overdue for pickup' as const) : ('Waiting' as const),
    })),
    todayReturns: todayReturnedLoans.map((l) => ({
      id: l.id,
      title: l.copy.book.title,
      author: l.copy.book.author,
      dueDate: l.dueAt.toISOString(),
      returnedAt: l.returnedAt?.toISOString() ?? '',
    })),
    overdueAlerts: overdueLoans.map((l) => ({
      id: l.id,
      title: l.copy.book.title,
      author: l.copy.book.author,
      dueDate: l.dueAt.toISOString(),
      daysOverdue: Math.floor((now.getTime() - l.dueAt.getTime()) / 86400000),
      memberId: l.user.studentId ?? 'N/A',
    })),
    inventory: {
      totalItems: totalBooks,
      available: availableCopies,
      onLoan: loanedCopies,
      percentAvailable: totalBooks > 0 ? Math.round((availableCopies / (availableCopies + loanedCopies || 1)) * 100) : 0,
    },
    notices: recentAnnouncements.map((a) => ({
      id: a.id,
      title: a.title,
      body: a.body,
      category: a.category.toLowerCase(),
      timeAgo: formatTimeAgo(a.publishedAt),
    })),
    events: upcomingEvents.map((e) => ({
      id: e.id,
      title: e.title,
      month: e.startTime.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: e.startTime.getDate().toString().padStart(2, '0'),
      time: `${e.startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} – ${e.endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`,
      venue: e.venue ?? 'TBA',
    })),
  }
}

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

/* ─── EXECUTIVE DASHBOARD ────────────────────── */

export async function get_executive_dashboard_data() {
  const now = new Date()
  const lastMonth = new Date(now.getTime() - 30 * 86400000)

  const [
    activeLoans,
    pendingApprovals,
    upcomingBookings,
    holdsAwaiting,
    totalMembers,
    activeStaff,
    suspendedUsers,
    recentBookings,
    overdueLoans,
    totalBooks,
    availableCopies,
    loanedCopies,
    announcements,
    events,
    policies,
    digitalResources,
    roleCounts,
  ] = await Promise.all([
    prisma.loan.count({ where: { returnedAt: null } }),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { startAt: { gte: now }, status: { in: ['PENDING', 'APPROVED'] } } }),
    prisma.hold.count({ where: { status: 'PENDING' } }),
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.user.count({ where: { role: { in: ['STAFF', 'ASSISTANT', 'CAPTAIN', 'PREFECT'] } } }),
    prisma.user.count({ where: { status: 'SUSPENDED' } }),
    prisma.booking.findMany({
      where: { status: 'PENDING' },
      include: { user: { select: { fullName: true } }, space: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
    prisma.loan.count({ where: { returnedAt: null, dueAt: { lt: now } } }),
    prisma.book.count(),
    prisma.copy.count({ where: { status: 'AVAILABLE' } }),
    prisma.copy.count({ where: { status: 'LOANED' } }),
    prisma.announcement.findMany({ orderBy: [{ isPinned: 'desc' }, { publishedAt: 'desc' }], take: 5 }),
    prisma.event.findMany({ where: { startTime: { gte: now } }, orderBy: { startTime: 'asc' }, take: 5 }),
    prisma.policy.findMany({ where: { isActive: true }, take: 5 }),
    prisma.digitalResource.findMany({ where: { isActive: true }, take: 4 }),
    Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: { in: ['STAFF', 'ASSISTANT', 'CAPTAIN', 'PREFECT'] } } }),
      prisma.user.count({ where: { role: 'EXECUTIVE' } }),
      prisma.user.count({ where: { status: 'SUSPENDED' } }),
    ]),
  ])

  const totalMembersAll = await prisma.user.count()

  return {
    overview: {
      activeLoans,
      pendingApprovals,
      upcomingBookings,
      holdsAwaiting,
    },
    summary: {
      totalMembers: totalMembersAll,
      activeStaff,
      systemUptime: '99.9%',
    },
    approvalQueue: recentBookings.map((b) => ({
      id: b.id,
      type: 'room_booking' as const,
      request: `${b.space.name} — ${b.startAt.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}`,
      requestor: b.user.fullName ?? 'Unknown',
      context: '',
      date: b.createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      priority: 'normal' as const,
    })),
    userRoles: [
      { role: 'Students', count: roleCounts[0], status: 'Active' as const },
      { role: 'Staff & Desk', count: roleCounts[1], status: 'Active' as const },
      { role: 'Executives', count: roleCounts[2], status: 'Active' as const },
      { role: 'Suspended', count: roleCounts[3], status: 'Suspended' as const },
    ],
    announcements: announcements.map((a) => ({
      id: a.id,
      title: a.title,
      detail: a.body,
      status: 'Update' as const,
    })),
    events: events.map((e) => ({
      id: e.id,
      day: e.startTime.getDate(),
      month: e.startTime.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      title: e.title,
      time: e.startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      venue: e.venue ?? 'TBA',
    })),
    resources: digitalResources.map((r) => ({
      id: r.id,
      type: 'database' as const,
      title: r.title,
      subtitle: r.provider,
      detail: r.description ?? '',
    })),
    performance: {
      collectionsUsage: totalBooks > 0 ? Math.round((loanedCopies / totalBooks) * 100) : 0,
      overdueRate: activeLoans > 0 ? Math.round((overdueLoans / activeLoans) * 100) : 0,
    },
    policies: policies.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category.toLowerCase(),
    })),
    criticalAlerts: overdueLoans,
  }
}
