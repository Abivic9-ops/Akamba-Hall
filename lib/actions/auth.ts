'use server'

import prisma from '@/lib/db/prisma'

export interface UserProfile {
  id: string
  email: string | null
  fullName: string | null
  avatarUrl: string | null
  role: string
  studentId: string | null
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        role: true,
        studentId: true,
      },
    })
    return profile
  } catch {
    return null
  }
}

export async function getUserRole(userId: string): Promise<string | null> {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    })
    return profile?.role ?? null
  } catch {
    return null
  }
}
