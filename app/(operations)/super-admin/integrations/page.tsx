import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { IntegrationsClient } from '@/components/super-admin/integrations-client'

export const dynamic = 'force-dynamic'

export default async function SuperAdminIntegrationsPage() {
  await requireRole(['SUPER_ADMIN'])

  const dbHealthy = await prisma.user.count().then(() => true).catch(() => false)

  const now = new Date().toISOString()

  return (
    <IntegrationsClient
      integrations={{
        database: { connected: dbHealthy, lastSync: now },
        supabaseAuth: { connected: dbHealthy, lastSync: now },
        cloudinary: { connected: true, lastSync: now },
        vercel: { connected: true, lastSync: now },
      }}
    />
  )
}
