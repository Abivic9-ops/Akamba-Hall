'use server'

import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'

export async function get_user_loans(userId: string) {
  const loans = await prisma.loan.findMany({
    where: { userId },
    include: { copy: { include: { book: true } } },
    orderBy: { checkoutAt: 'desc' },
  })

  return loans.map((loan) => ({
    id: loan.id,
    title: loan.copy.book.title,
    author: loan.copy.book.author,
    coverUrl: loan.copy.book.coverUrl,
    dueDate: loan.dueAt.toISOString(),
    checkoutAt: loan.checkoutAt.toISOString(),
    returnedAt: loan.returnedAt?.toISOString() ?? null,
    renewable: loan.renewCount < 2 && loan.status === 'ACTIVE',
    status: loan.returnedAt ? 'returned' : loan.dueAt < new Date() ? 'overdue' : 'active',
  }))
}

export async function get_all_loans(options?: { status?: string; limit?: number }) {
  const where: Record<string, unknown> = {}
  if (options?.status === 'active') {
    where.returnedAt = null
  } else if (options?.status === 'overdue') {
    where.returnedAt = null
    where.dueAt = { lt: new Date() }
  } else if (options?.status === 'returned') {
    where.returnedAt = { not: null }
  }

  const loans = await prisma.loan.findMany({
    where,
    include: {
      user: { select: { fullName: true, studentId: true } },
      copy: { include: { book: { select: { title: true, author: true } } } },
    },
    orderBy: { checkoutAt: 'desc' },
    take: options?.limit,
  })

  return loans.map((loan) => ({
    id: loan.id,
    memberName: loan.user.fullName ?? 'Unknown',
    memberId: loan.user.studentId ?? 'N/A',
    bookTitle: loan.copy.book.title,
    author: loan.copy.book.author,
    checkoutAt: loan.checkoutAt.toISOString(),
    dueAt: loan.dueAt.toISOString(),
    returnedAt: loan.returnedAt?.toISOString() ?? null,
    status: loan.returnedAt ? 'returned' : loan.dueAt < new Date() ? 'overdue' : 'active',
    renewCount: loan.renewCount,
  }))
}

export async function get_overdue_loans() {
  const loans = await prisma.loan.findMany({
    where: { returnedAt: null, dueAt: { lt: new Date() } },
    include: {
      user: { select: { fullName: true, studentId: true } },
      copy: { include: { book: { select: { title: true, author: true } } } },
    },
    orderBy: { dueAt: 'asc' },
  })

  return loans.map((loan) => ({
    id: loan.id,
    memberName: loan.user.fullName ?? 'Unknown',
    memberId: loan.user.studentId ?? 'N/A',
    bookTitle: loan.copy.book.title,
    author: loan.copy.book.author,
    dueAt: loan.dueAt.toISOString(),
    daysOverdue: Math.floor((Date.now() - loan.dueAt.getTime()) / 86400000),
  }))
}

export async function checkout_book(userId: string, copyId: string) {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  const copy = await prisma.copy.findUnique({ where: { id: copyId } })
  if (!copy) return { success: false, error: 'Copy not found.' }
  if (copy.status !== 'AVAILABLE') return { success: false, error: 'Copy is not available.' }

  const activeLoans = await prisma.loan.count({ where: { userId, returnedAt: null } })
  if (activeLoans >= 3) return { success: false, error: 'User has reached the maximum loan limit (3).' }

  const dueAt = new Date()
  dueAt.setDate(dueAt.getDate() + 14)

  const loan = await prisma.loan.create({
    data: { userId, copyId, dueAt, status: 'ACTIVE' },
  })
  await prisma.copy.update({ where: { id: copyId }, data: { status: 'LOANED' } })

  revalidatePath('/desk/loans')
  revalidatePath('/desk/dashboard')
  revalidatePath('/student/loans')
  return { success: true, loanId: loan.id }
}

export async function return_book(loanId: string) {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  const loan = await prisma.loan.findUnique({ where: { id: loanId } })
  if (!loan) return { success: false, error: 'Loan not found.' }
  if (loan.returnedAt) return { success: false, error: 'Book already returned.' }

  await prisma.loan.update({
    where: { id: loanId },
    data: { returnedAt: new Date(), status: 'RETURNED' },
  })
  await prisma.copy.update({ where: { id: loan.copyId }, data: { status: 'AVAILABLE' } })

  revalidatePath('/desk/returns')
  revalidatePath('/desk/dashboard')
  revalidatePath('/student/loans')
  return { success: true }
}

export async function renew_loan(loanId: string) {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'LIBRARY_HEAD', 'SUPER_ADMIN'])

  const loan = await prisma.loan.findUnique({ where: { id: loanId } })
  if (!loan) return { success: false, error: 'Loan not found.' }
  if (loan.returnedAt) return { success: false, error: 'Loan already returned.' }
  if (loan.renewCount >= 2) return { success: false, error: 'Maximum renewals reached.' }

  const newDueAt = new Date(loan.dueAt)
  newDueAt.setDate(newDueAt.getDate() + 14)

  await prisma.loan.update({
    where: { id: loanId },
    data: { dueAt: newDueAt, renewCount: { increment: 1 } },
  })

  revalidatePath('/desk/loans')
  revalidatePath('/student/loans')
  return { success: true }
}

export async function get_loan_stats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [totalActive, totalOverdue, totalReturned, todayCheckouts, todayReturns] = await Promise.all([
    prisma.loan.count({ where: { returnedAt: null } }),
    prisma.loan.count({ where: { returnedAt: null, dueAt: { lt: new Date() } } }),
    prisma.loan.count({ where: { returnedAt: { not: null } } }),
    prisma.loan.count({ where: { checkoutAt: { gte: today } } }),
    prisma.loan.count({ where: { returnedAt: { gte: today } } }),
  ])

  return { totalActive, totalOverdue, totalReturned, todayCheckouts, todayReturns }
}

export async function get_due_soon_loans(days: number = 7) {
  const now = new Date()
  const future = new Date(now.getTime() + days * 86400000)

  const loans = await prisma.loan.findMany({
    where: { returnedAt: null, dueAt: { gte: now, lte: future } },
    include: {
      user: { select: { fullName: true } },
      copy: { include: { book: { select: { title: true } } } },
    },
    orderBy: { dueAt: 'asc' },
  })

  return loans.map((l) => ({
    id: l.id,
    title: l.copy.book.title,
    memberName: l.user.fullName ?? 'Unknown',
    dueAt: l.dueAt.toISOString(),
    daysUntilDue: Math.ceil((l.dueAt.getTime() - now.getTime()) / 86400000),
  }))
}
