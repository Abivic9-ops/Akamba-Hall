'use server'

import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'
import { uploadImage, uploadDocument } from '@/lib/cloudinary'

export async function get_books(options?: { category?: string; search?: string; limit?: number }) {
  const where: Record<string, unknown> = {}
  if (options?.category && options.category !== 'All') {
    where.category = options.category
  }
  if (options?.search) {
    where.OR = [
      { title: { contains: options.search, mode: 'insensitive' } },
      { author: { contains: options.search, mode: 'insensitive' } },
      { isbn: { contains: options.search, mode: 'insensitive' } },
    ]
  }

  const books = await prisma.book.findMany({
    where,
    include: { copies: true },
    orderBy: { title: 'asc' },
    take: options?.limit,
  })

  return books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    category: book.category,
    coverUrl: book.coverUrl,
    description: book.description,
    contentText: book.contentText,
    contentUrl: book.contentUrl,
    year: book.year,
    totalCopies: book.copies.length,
    availableCopies: book.copies.filter((c) => c.status === 'AVAILABLE').length,
    loanedCopies: book.copies.filter((c) => c.status === 'LOANED').length,
    status: book.copies.some((c) => c.status === 'AVAILABLE') ? 'available' : 'unavailable',
  }))
}

export async function get_book_by_id(bookId: string) {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { copies: { include: { loans: { where: { returnedAt: null }, include: { user: { select: { fullName: true } } } } } } },
  })
  if (!book) return null
  return {
    ...book,
    totalCopies: book.copies.length,
    availableCopies: book.copies.filter((c) => c.status === 'AVAILABLE').length,
  }
}

export async function get_book_categories() {
  const result = await prisma.book.findMany({
    select: { category: true },
    distinct: ['category'],
    where: { category: { not: null } },
    orderBy: { category: 'asc' },
  })
  return result.map((r) => r.category).filter(Boolean) as string[]
}

export async function get_book_stats() {
  const [totalBooks, totalCopies, availableCopies, loanedCopies, lostCopies, damagedCopies] = await Promise.all([
    prisma.book.count(),
    prisma.copy.count(),
    prisma.copy.count({ where: { status: 'AVAILABLE' } }),
    prisma.copy.count({ where: { status: 'LOANED' } }),
    prisma.copy.count({ where: { status: 'LOST' } }),
    prisma.copy.count({ where: { status: 'DAMAGED' } }),
  ])
  return { totalBooks, totalCopies, availableCopies, loanedCopies, lostCopies, damagedCopies }
}

export async function create_book(data: {
  title: string; author: string; isbn?: string; category?: string;
  description?: string; year?: number; coverUrl?: string;
  contentText?: string; contentUrl?: string; copies?: number;
}) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const book = await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      category: data.category,
      description: data.description,
      year: data.year,
      coverUrl: data.coverUrl,
      contentText: data.contentText,
      contentUrl: data.contentUrl,
    },
  })

  const numCopies = data.copies ?? 1
  for (let i = 1; i <= numCopies; i++) {
    await prisma.copy.create({
      data: {
        bookId: book.id,
        barcode: `${book.id.slice(0, 8)}-${String(i).padStart(2, '0')}`,
        status: 'AVAILABLE',
      },
    })
  }

  revalidatePath('/library-head/inventory')
  revalidatePath('/desk/catalogue')
  revalidatePath('/catalogue')
  return { success: true, bookId: book.id }
}

export async function update_book(bookId: string, data: {
  title?: string; author?: string; isbn?: string; category?: string;
  description?: string; year?: number; coverUrl?: string;
  contentText?: string; contentUrl?: string;
}) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.book.update({ where: { id: bookId }, data })
  revalidatePath('/library-head/inventory')
  revalidatePath('/catalogue')
  revalidatePath(`/item/${bookId}`)
  return { success: true }
}

export async function delete_book(bookId: string) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.book.delete({ where: { id: bookId } })
  revalidatePath('/library-head/inventory')
  revalidatePath('/catalogue')
  return { success: true }
}

export async function upload_book_cover(bookId: string, fileBase64: string, filename: string) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const result = await uploadImage(fileBase64, 'akamba/covers', { width: 400, height: 600, crop: 'fill' })
  await prisma.book.update({ where: { id: bookId }, data: { coverUrl: result.url } })
  revalidatePath(`/item/${bookId}`)
  revalidatePath('/catalogue')
  return { success: true, url: result.url }
}

export async function upload_book_content(bookId: string, fileBase64: string, filename: string) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const result = await uploadDocument(fileBase64, 'akamba/documents', filename)
  await prisma.book.update({ where: { id: bookId }, data: { contentUrl: result.url } })
  revalidatePath(`/item/${bookId}`)
  return { success: true, url: result.url }
}

export async function search_books(query: string) {
  if (!query || query.trim().length < 2) return []
  const books = await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { author: { contains: query, mode: 'insensitive' } },
        { isbn: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: { copies: true },
    orderBy: { title: 'asc' },
    take: 20,
  })

  return books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    category: book.category,
    coverUrl: book.coverUrl,
    description: book.description,
    year: book.year,
    totalCopies: book.copies.length,
    availableCopies: book.copies.filter((c) => c.status === 'AVAILABLE').length,
    status: book.copies.some((c) => c.status === 'AVAILABLE') ? 'available' : 'unavailable',
  }))
}
