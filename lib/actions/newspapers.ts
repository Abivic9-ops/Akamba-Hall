'use server'

import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'

export async function get_newspapers() {
  const newspapers = await prisma.newspaper.findMany({
    where: { isActive: true },
    orderBy: { title: 'asc' },
  })
  return newspapers.map((n) => ({
    id: n.id,
    title: n.title,
    publisher: n.publisher,
    category: n.category,
    frequency: n.frequency,
    language: n.language,
    url: n.url,
    coverUrl: n.coverUrl,
    description: n.description,
  }))
}

export async function get_all_newspapers() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const newspapers = await prisma.newspaper.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return newspapers.map((n) => ({
    id: n.id,
    title: n.title,
    publisher: n.publisher,
    category: n.category,
    frequency: n.frequency,
    language: n.language,
    url: n.url,
    coverUrl: n.coverUrl,
    description: n.description,
    isActive: n.isActive,
    createdAt: n.createdAt.toISOString(),
  }))
}

export async function create_newspaper(data: { title: string; publisher: string; category: string; frequency: string; language?: string; url?: string; description?: string }) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const newspaper = await prisma.newspaper.create({ data })
  revalidatePath('/library-head/newspapers')
  revalidatePath('/super-admin/newspapers')
  return { success: true, id: newspaper.id }
}

export async function update_newspaper(id: string, data: { title?: string; publisher?: string; category?: string; frequency?: string; language?: string; url?: string; description?: string; isActive?: boolean }) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.newspaper.update({ where: { id }, data })
  revalidatePath('/library-head/newspapers')
  revalidatePath('/super-admin/newspapers')
  return { success: true }
}

export async function delete_newspaper(id: string) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.newspaper.delete({ where: { id } })
  revalidatePath('/library-head/newspapers')
  revalidatePath('/super-admin/newspapers')
  return { success: true }
}
