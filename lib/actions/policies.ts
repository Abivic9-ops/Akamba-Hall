'use server'

import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'

export async function get_policies(options?: { category?: string }) {
  const where: Record<string, unknown> = { isActive: true }
  if (options?.category) where.category = options.category.toUpperCase()

  const policies = await prisma.policy.findMany({
    where,
    orderBy: { title: 'asc' },
  })

  return policies.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category.toLowerCase(),
    documentUrl: p.documentUrl,
    createdAt: p.createdAt.toISOString(),
  }))
}

export async function create_policy(data: { title: string; description: string; category: string; documentUrl?: string }) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const policy = await prisma.policy.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category.toUpperCase() as any,
      documentUrl: data.documentUrl,
    },
  })
  revalidatePath('/library-head/policies')
  revalidatePath('/super-admin/policies')
  return { success: true, id: policy.id }
}

export async function update_policy(id: string, data: { title?: string; description?: string; category?: string; documentUrl?: string; isActive?: boolean }) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.policy.update({
    where: { id },
    data: {
      ...data,
      category: data.category?.toUpperCase() as any,
    },
  })
  revalidatePath('/library-head/policies')
  revalidatePath('/super-admin/policies')
  return { success: true }
}

export async function delete_policy(id: string) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.policy.update({
    where: { id },
    data: { isActive: false },
  })
  revalidatePath('/library-head/policies')
  revalidatePath('/super-admin/policies')
  return { success: true }
}
