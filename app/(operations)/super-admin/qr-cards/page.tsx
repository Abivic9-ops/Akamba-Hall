import { requireRole } from '@/lib/auth/roleGuard'
import { QrCardsClient } from '@/components/super-admin/qr-cards-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminQrCardsPage() {
  await requireRole(['SUPER_ADMIN'])

  return <QrCardsClient />
}
