'use server'

import prisma from '@/lib/db/prisma'
import { getAuthUser } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'

export async function submit_feedback(data: { title: string; description: string; category: string; portal: string }) {
  const authUser = await getAuthUser()
  if (!authUser) return { success: false, error: 'Not authenticated' }

  await prisma.issueLog.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category as any,
      severity: 'LOW',
      status: 'OPEN',
      reportedById: authUser.id,
    },
  })

  revalidatePath(`/${data.portal}/feedback`)
  return { success: true }
}

export async function get_feedback_items() {
  const authUser = await getAuthUser()
  if (!authUser) return []

  const items = await prisma.issueLog.findMany({
    where: { reportedById: authUser.id },
    orderBy: { createdAt: 'desc' },
  })

  return items.map((i) => ({
    id: i.id,
    title: i.title,
    description: i.description,
    category: i.category,
    severity: i.severity,
    status: i.status,
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.updatedAt.toISOString(),
  }))
}
