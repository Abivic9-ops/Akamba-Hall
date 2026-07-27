'use server'

import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/roleGuard'
import { revalidatePath } from 'next/cache'

export async function get_courses() {
  const courses = await prisma.course.findMany({ orderBy: { code: 'asc' } })
  return courses.map((c) => ({
    id: c.id,
    code: c.code,
    name: c.name,
    department: c.department,
    formLevel: c.formLevel,
    materialCount: c.materialCount,
    instructor: c.instructor,
  }))
}

export async function create_course(data: { code: string; name: string; department: string; formLevel: number; instructor?: string; materialCount?: number }) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const course = await prisma.course.create({ data })
  revalidatePath('/library-head/courses')
  revalidatePath('/super-admin/courses')
  return { success: true, id: course.id }
}

export async function update_course(id: string, data: { code?: string; name?: string; department?: string; formLevel?: number; instructor?: string; materialCount?: number }) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.course.update({ where: { id }, data })
  revalidatePath('/library-head/courses')
  revalidatePath('/super-admin/courses')
  return { success: true }
}

export async function delete_course(id: string) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.course.delete({ where: { id } })
  revalidatePath('/library-head/courses')
  revalidatePath('/super-admin/courses')
  return { success: true }
}

export async function get_eresources() {
  const resources = await prisma.eResource.findMany({
    where: { isActive: true },
    orderBy: { title: 'asc' },
  })
  return resources.map((r) => ({
    id: r.id,
    title: r.title,
    provider: r.provider,
    description: r.description,
    url: r.url,
    category: r.category,
    iconUrl: r.iconUrl,
  }))
}

export async function create_eresource(data: { title: string; provider: string; description: string; url: string; category: string }) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const resource = await prisma.eResource.create({ data })
  revalidatePath('/library-head/eresources')
  return { success: true, id: resource.id }
}

export async function update_eresource(id: string, data: { title?: string; provider?: string; description?: string; url?: string; category?: string }) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.eResource.update({ where: { id }, data })
  revalidatePath('/library-head/eresources')
  return { success: true }
}

export async function delete_eresource(id: string) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.eResource.update({ where: { id }, data: { isActive: false } })
  revalidatePath('/library-head/eresources')
  return { success: true }
}

export async function get_equipment() {
  const items = await prisma.equipment.findMany({ orderBy: { name: 'asc' } })
  return items.map((e) => ({
    id: e.id,
    name: e.name,
    description: e.description,
    category: e.category,
    imageUrl: e.imageUrl,
    status: e.status.toLowerCase(),
    location: e.location,
  }))
}

export async function get_digital_resources() {
  const resources = await prisma.digitalResource.findMany({
    where: { isActive: true },
    orderBy: { title: 'asc' },
  })
  return resources.map((r) => ({
    id: r.id,
    title: r.title,
    provider: r.provider,
    description: r.description,
    url: r.url,
    iconUrl: r.iconUrl,
    category: r.category,
  }))
}

export async function create_digital_resource(data: { title: string; provider: string; description: string; url: string; category: string; addedById: string }) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  const resource = await prisma.digitalResource.create({ data })
  revalidatePath('/library-head/digital-resources')
  revalidatePath('/super-admin/digital-resources')
  return { success: true, id: resource.id }
}

export async function update_digital_resource(id: string, data: { title?: string; provider?: string; description?: string; url?: string; category?: string }) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.digitalResource.update({ where: { id }, data })
  revalidatePath('/library-head/digital-resources')
  revalidatePath('/super-admin/digital-resources')
  return { success: true }
}

export async function delete_digital_resource(id: string) {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  await prisma.digitalResource.update({ where: { id }, data: { isActive: false } })
  revalidatePath('/library-head/digital-resources')
  revalidatePath('/super-admin/digital-resources')
  return { success: true }
}
