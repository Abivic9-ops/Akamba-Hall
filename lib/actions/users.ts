'use server'

import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/roleGuard'
import { getAdminClient } from '@/lib/supabase/admin'
import type { Role } from '@/lib/types/role'
import { all_roles } from '@/lib/types/role'

export interface UserListItem {
  id: string
  email: string | null
  fullName: string | null
  studentId: string | null
  role: Role
  memberType: string
  status: string
  createdAt: Date
  lastActiveAt: Date | null
}

export interface user_management_result {
  success: boolean
  error?: string
}

export async function get_all_users(): Promise<UserListItem[]> {
  await requireRole(['SUPER_ADMIN'])

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      fullName: true,
      studentId: true,
      role: true,
      memberType: true,
      status: true,
      createdAt: true,
      lastActiveAt: true,
    },
  })

  return users
}

export async function update_user_role(
  userId: string,
  newRole: string
): Promise<user_management_result> {
  const admin = await requireRole(['SUPER_ADMIN'])

  if (userId === admin.id) {
    return { success: false, error: 'You cannot change your own role.' }
  }

  if (!all_roles.includes(newRole as Role)) {
    return { success: false, error: 'Invalid role.' }
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole as Role },
    })

    // sync role in Supabase app_metadata so middleware reads it from JWT
    const admin = getAdminClient()
    if (admin) {
      await admin.auth.admin.updateUserById(userId, {
        app_metadata: { role: newRole },
      }).catch(() => {})
    }

    return { success: true }
  } catch {
    return { success: false, error: 'Failed to update user role.' }
  }
}

export async function update_user_status(
  userId: string,
  newStatus: string
): Promise<user_management_result> {
  const admin = await requireRole(['SUPER_ADMIN'])

  if (userId === admin.id) {
    return { success: false, error: 'You cannot change your own status.' }
  }

  const validStatuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED']
  if (!validStatuses.includes(newStatus)) {
    return { success: false, error: 'Invalid status.' }
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: newStatus as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' },
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Failed to update user status.' }
  }
}
