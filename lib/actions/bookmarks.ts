'use server'

import prisma from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'

export async function get_user_bookmarks(userId: string) {
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return bookmarks.map((b) => ({
    id: b.id,
    bookTitle: b.bookTitle,
    author: b.author,
    category: b.category,
    coverUrl: b.coverUrl,
    notes: b.notes,
    createdAt: b.createdAt.toISOString(),
  }))
}

export async function add_bookmark(data: { bookTitle: string; author: string; category?: string; coverUrl?: string; notes?: string }) {
  const user = await requireAuth()

  const existing = await prisma.bookmark.findFirst({
    where: { userId: user.id, bookTitle: data.bookTitle },
  })
  if (existing) return { success: false, error: 'Already bookmarked.' }

  const bookmark = await prisma.bookmark.create({
    data: { ...data, userId: user.id },
  })
  revalidatePath('/staff/bookmarks')
  return { success: true, id: bookmark.id }
}

export async function remove_bookmark(bookmarkId: string) {
  const user = await requireAuth()
  const bookmark = await prisma.bookmark.findUnique({ where: { id: bookmarkId } })
  if (!bookmark || bookmark.userId !== user.id) return { success: false, error: 'Not found.' }

  await prisma.bookmark.delete({ where: { id: bookmarkId } })
  revalidatePath('/staff/bookmarks')
  return { success: true }
}
