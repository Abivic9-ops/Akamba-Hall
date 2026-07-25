'use server'

import prisma from '@/lib/db/prisma'
import { requireAuth, requireRole } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'

export async function get_issue_logs(options?: { status?: string }) {
  const where: Record<string, unknown> = {}
  if (options?.status) where.status = options.status.toUpperCase()

  const issues = await prisma.issueLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return issues.map((i) => ({
    id: i.id,
    title: i.title,
    description: i.description,
    category: i.category.toLowerCase(),
    severity: i.severity.toLowerCase(),
    status: i.status.toLowerCase(),
    attachmentUrl: i.attachmentUrl,
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.updatedAt.toISOString(),
  }))
}

export async function create_issue_log(data: { title: string; description: string; category?: string; severity?: string; attachmentUrl?: string }) {
  const user = await requireAuth()
  const issue = await prisma.issueLog.create({
    data: {
      ...data,
      category: (data.category?.toUpperCase() ?? 'GENERAL') as 'GENERAL' | 'BOOK_DAMAGE' | 'LATE_RETURN' | 'FACILITY' | 'EQUIPMENT' | 'MEMBER_CONDUCT',
      severity: (data.severity?.toUpperCase() ?? 'LOW') as 'LOW' | 'MEDIUM' | 'HIGH',
      reportedById: user.id,
    },
  })
  revalidatePath('/desk/issue-log')
  return { success: true, id: issue.id }
}

export async function update_issue_status(issueId: string, status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED') {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.issueLog.update({ where: { id: issueId }, data: { status } })
  revalidatePath('/desk/issue-log')
  return { success: true }
}
