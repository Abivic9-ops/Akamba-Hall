import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { FeatureFlagsClient } from '@/components/super-admin/feature-flags-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminFeatureFlagsPage() {
  await requireRole(['SUPER_ADMIN'])

  const [qrCardCount, eResourceCount, holdCount, equipmentCount] = await Promise.all([
    prisma.qRCard.count(),
    prisma.eResource.count(),
    prisma.hold.count(),
    prisma.equipment.count(),
  ])

  return (
    <FeatureFlagsClient
      flags={{
        qrCardSystem: qrCardCount > 0,
        eResources: eResourceCount > 0,
        bookReservations: holdCount > 0,
        equipmentLending: equipmentCount > 0,
        darkMode: true,
        pwaSupport: true,
      }}
      counts={{
        qrCards: qrCardCount,
        eResources: eResourceCount,
        holds: holdCount,
        equipment: equipmentCount,
      }}
    />
  )
}
