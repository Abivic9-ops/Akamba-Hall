'use server'

import prisma from '@/lib/db/prisma'
import { createClient } from '@/lib/supabase/server'
import { getAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { getPromotableRoles } from '@/lib/config/role-requests'
import type { Role, RequestStatus } from '@prisma/client'

/* ─── Helper: get authenticated user ──────────────── */
async function getAuthUserId() {
  const supabase = await createClient()
  if (!supabase) return null
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id ?? null
}

/* ─── Submit a role request (student / staff) ─────── */
export async function submit_role_request(payload: {
  requestedRole: string
  reason?: string
}) {
  const userId = await getAuthUserId()
  if (!userId) return { success: false, error: 'Not authenticated.' }

  const profile = await prisma.user.findUnique({ where: { id: userId } })
  if (!profile) return { success: false, error: 'User profile not found.' }

  const validTarget = getPromotableRoles(
    profile.memberType === 'STUDENT' ? 'STUDENT' : 'STAFF'
  ).some(r => r.role === payload.requestedRole)
  if (!validTarget) return { success: false, error: 'Invalid target role.' }

  const existingPending = await prisma.roleRequest.findFirst({
    where: { userId, status: 'PENDING' },
  })
  if (existingPending) return { success: false, error: 'You already have a pending request.' }

  await prisma.roleRequest.create({
    data: {
      userId,
      requestedRole: payload.requestedRole as Role,
      reason: payload.reason,
    },
  })

  revalidatePath('/student/requests')
  revalidatePath('/staff/requests')
  return { success: true }
}

/* ─── Get current user's request history ──────────── */
export async function get_my_role_requests() {
  const userId = await getAuthUserId()
  if (!userId) return []

  return prisma.roleRequest.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      requestedRole: true,
      reason: true,
      status: true,
      reviewNote: true,
      createdAt: true,
      reviewedAt: true,
      reviewedBy: { select: { id: true, fullName: true } },
    },
  })
}

/* ─── Get all role requests (Library Head view) ───── */
export async function get_role_requests(statusFilter?: RequestStatus) {
  const viewerId = await getAuthUserId()
  if (!viewerId) return []

  const viewer = await prisma.user.findUnique({ where: { id: viewerId } })
  if (!viewer || viewer.role !== 'LIBRARY_HEAD') return []

  return prisma.roleRequest.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, fullName: true, studentId: true, role: true, memberType: true } },
      reviewedBy: { select: { id: true, fullName: true } },
    },
  })
}

/* ─── Approve a role request (Library Head) ───────── */
export async function approve_role_request(requestId: string, reviewNote?: string) {
  const reviewerId = await getAuthUserId()
  if (!reviewerId) return { success: false, error: 'Not authenticated.' }

  const reviewer = await prisma.user.findUnique({ where: { id: reviewerId } })
  if (!reviewer || reviewer.role !== 'LIBRARY_HEAD')
    return { success: false, error: 'Only the Library Head can approve requests.' }

  const request = await prisma.roleRequest.findUnique({ where: { id: requestId } })
  if (!request) return { success: false, error: 'Request not found.' }
  if (request.status !== 'PENDING')
    return { success: false, error: 'This request has already been reviewed.' }

  // Store originalRole if user hasn't been promoted before
  const user = await prisma.user.findUnique({ where: { id: request.userId } })
  if (!user) return { success: false, error: 'User not found.' }

  const originalRole = user.originalRole ?? user.role

  await prisma.$transaction([
    prisma.roleRequest.update({
      where: { id: requestId },
      data: { status: 'APPROVED', reviewedById: reviewerId, reviewNote, reviewedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: request.userId },
      data: { role: request.requestedRole, originalRole },
    }),
  ])

  // Sync role to Supabase app_metadata so proxy middleware picks it up
  const admin = getAdminClient()
  if (admin) {
    await admin.auth.admin.updateUserById(request.userId, {
      app_metadata: { role: request.requestedRole },
    })
  }

  revalidatePath('/library-head/requests')
  return { success: true }
}

/* ─── Reject a role request (Library Head) ────────── */
export async function reject_role_request(requestId: string, reviewNote?: string) {
  const reviewerId = await getAuthUserId()
  if (!reviewerId) return { success: false, error: 'Not authenticated.' }

  const reviewer = await prisma.user.findUnique({ where: { id: reviewerId } })
  if (!reviewer || reviewer.role !== 'LIBRARY_HEAD')
    return { success: false, error: 'Only the Library Head can reject requests.' }

  const request = await prisma.roleRequest.findUnique({ where: { id: requestId } })
  if (!request) return { success: false, error: 'Request not found.' }
  if (request.status !== 'PENDING')
    return { success: false, error: 'This request has already been reviewed.' }

  await prisma.roleRequest.update({
    where: { id: requestId },
    data: { status: 'REJECTED', reviewedById: reviewerId, reviewNote, reviewedAt: new Date() },
  })

  revalidatePath('/library-head/requests')
  return { success: true }
}

/* ─── Revoke a previous promotion (Library Head) ──── */
export async function revoke_role_promotion(requestId: string) {
  const reviewerId = await getAuthUserId()
  if (!reviewerId) return { success: false, error: 'Not authenticated.' }

  const reviewer = await prisma.user.findUnique({ where: { id: reviewerId } })
  if (!reviewer || reviewer.role !== 'LIBRARY_HEAD')
    return { success: false, error: 'Only the Library Head can revoke promotions.' }

  const request = await prisma.roleRequest.findUnique({ where: { id: requestId } })
  if (!request) return { success: false, error: 'Request not found.' }
  if (request.status !== 'APPROVED')
    return { success: false, error: 'Only approved requests can be revoked.' }

  const user = await prisma.user.findUnique({ where: { id: request.userId } })
  if (!user) return { success: false, error: 'User not found.' }

  const revertTo = user.originalRole ?? (user.memberType === 'STUDENT' ? 'STUDENT' : 'STAFF')

  await prisma.$transaction([
    prisma.roleRequest.update({
      where: { id: requestId },
      data: { status: 'REVOKED', reviewedById: reviewerId, reviewedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: request.userId },
      data: { role: revertTo, originalRole: null },
    }),
  ])

  // Sync role to Supabase
  const admin = getAdminClient()
  if (admin) {
    await admin.auth.admin.updateUserById(request.userId, {
      app_metadata: { role: revertTo },
    })
  }

  revalidatePath('/library-head/requests')
  return { success: true }
}

/* ─── Super Admin: appoint Library Head ───────────── */
export async function appoint_library_head(targetUserId: string) {
  const callerId = await getAuthUserId()
  if (!callerId) return { success: false, error: 'Not authenticated.' }

  const caller = await prisma.user.findUnique({ where: { id: callerId } })
  if (!caller || caller.role !== 'SUPER_ADMIN')
    return { success: false, error: 'Only the Super Admin can appoint the Library Head.' }

  const target = await prisma.user.findUnique({ where: { id: targetUserId } })
  if (!target) return { success: false, error: 'Target user not found.' }

  // Only STAFF can be appointed as Library Head
  if (target.role !== 'STAFF' && target.memberType !== 'STAFF')
    return { success: false, error: 'Only Staff members can be appointed as Library Head.' }

  const originalRole = target.originalRole ?? target.role

  await prisma.user.update({
    where: { id: targetUserId },
    data: { role: 'LIBRARY_HEAD', originalRole },
  })

  const admin = getAdminClient()
  if (admin) {
    await admin.auth.admin.updateUserById(targetUserId, {
      app_metadata: { role: 'LIBRARY_HEAD' },
    })
  }

  revalidatePath('/super-admin/users')
  return { success: true }
}

/* ─── Super Admin: revoke Library Head ────────────── */
export async function revoke_library_head(targetUserId: string) {
  const callerId = await getAuthUserId()
  if (!callerId) return { success: false, error: 'Not authenticated.' }

  const caller = await prisma.user.findUnique({ where: { id: callerId } })
  if (!caller || caller.role !== 'SUPER_ADMIN')
    return { success: false, error: 'Only the Super Admin can revoke the Library Head.' }

  const target = await prisma.user.findUnique({ where: { id: targetUserId } })
  if (!target) return { success: false, error: 'Target user not found.' }
  if (target.role !== 'LIBRARY_HEAD')
    return { success: false, error: 'This user is not a Library Head.' }

  const revertTo = target.originalRole ?? 'STAFF'

  await prisma.user.update({
    where: { id: targetUserId },
    data: { role: revertTo, originalRole: null },
  })

  const admin = getAdminClient()
  if (admin) {
    await admin.auth.admin.updateUserById(targetUserId, {
      app_metadata: { role: revertTo },
    })
  }

  revalidatePath('/super-admin/users')
  return { success: true }
}
