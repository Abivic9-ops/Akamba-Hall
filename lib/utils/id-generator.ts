import prisma from '@/lib/db/prisma'

/**
 * Generates the next staff ID in the format SBC-Staff-001.
 * Finds the highest existing number and increments, avoiding collisions.
 */
export async function generateStaffId(): Promise<string> {
  const last = await prisma.user.findFirst({
    where: {
      role: { in: ['STAFF', 'EXECUTIVE', 'LIBRARY_HEAD'] },
      studentId: { startsWith: 'SBC-Staff-' },
    },
    orderBy: { studentId: 'desc' },
    select: { studentId: true },
  })

  let next = 1
  if (last?.studentId) {
    const match = last.studentId.match(/SBC-Staff-(\d+)/)
    if (match) next = parseInt(match[1], 10) + 1
  }

  return `SBC-Staff-${String(next).padStart(3, '0')}`
}

/**
 * Generates a QR card short reference for staff.
 * Staff: SBC-01, SBC-02 ...
 *
 * Students do NOT use this — their admission number IS the card reference.
 */
export async function generateCardRef(): Promise<string> {
  const prefix = 'SBC-'

  const last = await prisma.qRCard.findFirst({
    where: { cardRef: { startsWith: prefix } },
    orderBy: { cardRef: 'desc' },
    select: { cardRef: true },
  })

  let next = 1
  if (last?.cardRef) {
    const match = last.cardRef.match(/(\d+)$/)
    if (match) next = parseInt(match[1], 10) + 1
  }

  // Ensure no collision (belt + suspenders)
  let candidate = `${prefix}${String(next).padStart(2, '0')}`
  let attempts = 0
  while (attempts < 100) {
    const exists = await prisma.qRCard.findUnique({
      where: { cardRef: candidate },
      select: { id: true },
    })
    if (!exists) break
    next++
    candidate = `${prefix}${String(next).padStart(2, '0')}`
    attempts++
  }

  return candidate
}
