'use server'

import prisma from '@/lib/db/prisma'
import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth/roleGuard'
import { generateCardRef } from '@/lib/utils/id-generator'
import { generateQRCodeDataURL } from '@/lib/utils/qr-code'

/* ─── Types ─────────────────────────────────────── */

export interface QRCardData {
  cardRef: string
  qrCodeUrl: string
  status: string
  issuedAt: string
}

export interface QRCardResult {
  success: boolean
  error?: string
  data?: QRCardData
}

/* ─── Get or Create QR Card for Current User ────── */

export async function get_or_create_qr_card(): Promise<QRCardResult> {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return { success: false, error: 'Authentication service is not configured.' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated.' }
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, role: true, memberType: true },
    })

    if (!profile) {
      return { success: false, error: 'User profile not found.' }
    }

    // Check for existing active card
    const existingCard = await prisma.qRCard.findFirst({
      where: {
        userId: user.id,
        status: 'ACTIVE',
      },
      orderBy: { issuedAt: 'desc' },
    })

    if (existingCard) {
      const qrCodeUrl = await generateQRCodeDataURL(existingCard.cardRef)
      return {
        success: true,
        data: {
          cardRef: existingCard.cardRef,
          qrCodeUrl,
          status: existingCard.status,
          issuedAt: existingCard.issuedAt.toISOString(),
        },
      }
    }

    // For students, cardRef = admission number. For staff, auto-generate.
    const isStudent = profile.role === 'STUDENT' || profile.memberType === 'STUDENT'

    let cardRef: string
    if (isStudent) {
      // Use the student's admission number as the card reference
      const fullProfile = await prisma.user.findUnique({
        where: { id: user.id },
        select: { studentId: true },
      })
      cardRef = fullProfile?.studentId ?? await generateCardRef()
    } else {
      cardRef = await generateCardRef()
    }

    // Create card in transaction with race-condition guard
    const card = await prisma.$transaction(async (tx) => {
      const raceCheck = await tx.qRCard.findFirst({
        where: { userId: user.id, status: 'ACTIVE' },
      })
      if (raceCheck) return raceCheck

      return tx.qRCard.create({
        data: {
          userId: user.id,
          cardRef,
          status: 'ACTIVE',
        },
      })
    })

    const qrCodeUrl = await generateQRCodeDataURL(card.cardRef)

    return {
      success: true,
      data: {
        cardRef: card.cardRef,
        qrCodeUrl,
        status: card.status,
        issuedAt: card.issuedAt.toISOString(),
      },
    }
  } catch (error) {
    console.error('QR card error:', error)
    return { success: false, error: 'Failed to generate QR card.' }
  }
}

/* ─── Get QR Card by Card Reference (for QR login) ── */

export async function get_user_by_card_ref(cardRef: string): Promise<{ userId: string; fullName: string; studentId: string | null; role: string } | null> {
  try {
    const card = await prisma.qRCard.findUnique({
      where: { cardRef, status: 'ACTIVE' },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            studentId: true,
            role: true,
            status: true,
          },
        },
      },
    })

    if (!card || card.user.status !== 'ACTIVE') return null

    return {
      userId: card.user.id,
      fullName: card.user.fullName ?? 'Unknown',
      studentId: card.user.studentId,
      role: card.user.role,
    }
  } catch {
    return null
  }
}

/* ─── Generate QR Code Data URL for a Card ──────── */

export async function get_qr_code_url(cardRef: string): Promise<string | null> {
  try {
    return await generateQRCodeDataURL(cardRef)
  } catch {
    return null
  }
}

/* ─── Admin: Get All Users Without QR Cards ──────── */

export async function get_users_without_qr_cards() {
  await requireRole(['SUPER_ADMIN'])
  const users = await prisma.user.findMany({
    where: {
      qrCards: { none: { status: 'ACTIVE' } },
      status: 'ACTIVE',
    },
    select: { id: true, fullName: true, email: true, studentId: true, role: true },
    orderBy: { fullName: 'asc' },
  })
  return users
}

/* ─── Admin: Issue QR Card to a User ─────────────── */

export async function issue_qr_card_to_user(userId: string): Promise<QRCardResult> {
  await requireRole(['SUPER_ADMIN'])

  const existingActive = await prisma.qRCard.findFirst({
    where: { userId, status: 'ACTIVE' },
  })
  if (existingActive) {
    return { success: false, error: 'User already has an active QR card.' }
  }

  const profile = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, memberType: true, studentId: true },
  })
  if (!profile) {
    return { success: false, error: 'User not found.' }
  }

  const isStudent = profile.role === 'STUDENT' || profile.memberType === 'STUDENT'
  let cardRef: string
  if (isStudent && profile.studentId) {
    cardRef = profile.studentId
  } else {
    cardRef = await generateCardRef()
  }

  const card = await prisma.$transaction(async (tx) => {
    const raceCheck = await tx.qRCard.findFirst({ where: { userId, status: 'ACTIVE' } })
    if (raceCheck) return raceCheck
    return tx.qRCard.create({ data: { userId, cardRef, status: 'ACTIVE' } })
  })

  const qrCodeUrl = await generateQRCodeDataURL(card.cardRef)
  return {
    success: true,
    data: { cardRef: card.cardRef, qrCodeUrl, status: card.status, issuedAt: card.issuedAt.toISOString() },
  }
}

/* ─── Admin: Suspend a QR Card ───────────────────── */

export async function suspend_qr_card(cardId: string): Promise<{ success: boolean; error?: string }> {
  await requireRole(['SUPER_ADMIN'])
  const card = await prisma.qRCard.findUnique({ where: { id: cardId } })
  if (!card) return { success: false, error: 'Card not found.' }
  if (card.status !== 'ACTIVE') return { success: false, error: 'Only active cards can be suspended.' }

  await prisma.qRCard.update({
    where: { id: cardId },
    data: { status: 'SUSPENDED', suspendedAt: new Date() },
  })
  return { success: true }
}

/* ─── Admin: Revoke a QR Card ────────────────────── */

export async function revoke_qr_card(cardId: string): Promise<{ success: boolean; error?: string }> {
  await requireRole(['SUPER_ADMIN'])
  const card = await prisma.qRCard.findUnique({ where: { id: cardId } })
  if (!card) return { success: false, error: 'Card not found.' }
  if (card.status === 'REVOKED') return { success: false, error: 'Card is already revoked.' }

  await prisma.qRCard.update({
    where: { id: cardId },
    data: { status: 'REVOKED', revokedAt: new Date() },
  })
  return { success: true }
}

/* ─── Admin: Reactivate a QR Card ────────────────── */

export async function reactivate_qr_card(cardId: string): Promise<{ success: boolean; error?: string }> {
  await requireRole(['SUPER_ADMIN'])
  const card = await prisma.qRCard.findUnique({ where: { id: cardId } })
  if (!card) return { success: false, error: 'Card not found.' }
  if (card.status === 'ACTIVE') return { success: false, error: 'Card is already active.' }

  await prisma.qRCard.update({
    where: { id: cardId },
    data: { status: 'ACTIVE', suspendedAt: null, revokedAt: null },
  })
  return { success: true }
}

/* ─── Admin: Get QR Code Image for Any Card ──────── */

export async function get_card_qr_image(cardId: string): Promise<string | null> {
  await requireRole(['SUPER_ADMIN'])
  const card = await prisma.qRCard.findUnique({ where: { id: cardId } })
  if (!card) return null
  return generateQRCodeDataURL(card.cardRef)
}

/* ─── Staff Card (uses StaffDigitalCard component) ── */

export async function get_or_create_staff_card(): Promise<QRCardResult> {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return { success: false, error: 'Authentication service is not configured.' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated.' }
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, role: true, memberType: true },
    })

    if (!profile) {
      return { success: false, error: 'User profile not found.' }
    }

    // Check for existing active card
    const existingCard = await prisma.qRCard.findFirst({
      where: {
        userId: user.id,
        status: 'ACTIVE',
      },
      orderBy: { issuedAt: 'desc' },
    })

    if (existingCard) {
      const qrCodeUrl = await generateQRCodeDataURL(existingCard.cardRef)
      return {
        success: true,
        data: {
          cardRef: existingCard.cardRef,
          qrCodeUrl,
          status: existingCard.status,
          issuedAt: existingCard.issuedAt.toISOString(),
        },
      }
    }

    // Generate unique card reference and create card in a transaction
    const card = await prisma.$transaction(async (tx) => {
      const cardRef = await generateCardRef()

      // Double-check no active card was created in the meantime
      const raceCheck = await tx.qRCard.findFirst({
        where: { userId: user.id, status: 'ACTIVE' },
      })
      if (raceCheck) return raceCheck

      return tx.qRCard.create({
        data: {
          userId: user.id,
          cardRef,
          status: 'ACTIVE',
        },
      })
    })

    const qrCodeUrl = await generateQRCodeDataURL(card.cardRef)

    return {
      success: true,
      data: {
        cardRef: card.cardRef,
        qrCodeUrl,
        status: card.status,
        issuedAt: card.issuedAt.toISOString(),
      },
    }
  } catch (error) {
    console.error('Staff QR card error:', error)
    return { success: false, error: 'Failed to generate staff QR card.' }
  }
}
