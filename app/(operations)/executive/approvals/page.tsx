import { requireRole } from '@/lib/auth/roleGuard'
import { ApprovalsClient } from '@/components/dashboard/executive/pages/approvals-client'
import prisma from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export default async function ApprovalsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])

  const roleRequests = await prisma.roleRequest.findMany({
    include: { user: { select: { fullName: true, studentId: true, role: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const typeMap: Record<string, string> = {
    STUDENT: 'Special Access',
    STAFF: 'Policy Exception',
    EXECUTIVE: 'Special Access',
    ASSISTANT: 'Special Access',
    CAPTAIN: 'Special Access',
    PREFECT: 'Special Access',
    LIBRARY_HEAD: 'Policy Exception',
    SUPER_ADMIN: 'Policy Exception',
  }

  const requests = roleRequests.map((r) => ({
    id: r.id,
    type: typeMap[r.requestedRole] ?? 'Special Access',
    request: `${r.requestedRole} Role Request`,
    requestor: r.user?.fullName ?? 'Unknown',
    context: r.user?.studentId ?? r.user?.role ?? '',
    date: new Date(r.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    priority: r.status === 'PENDING' ? 'normal' : 'low',
    status: r.status.charAt(0) + r.status.slice(1).toLowerCase(),
  }))

  return <ApprovalsClient requests={requests} />
}
