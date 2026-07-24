import { getAuthUser } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { redirect } from 'next/navigation'
import { OperationsShell } from '@/components/layout/operations-shell'

export const dynamic = 'force-dynamic'

export default async function operations_layout({ children }: { children: React.ReactNode }) {
  const user = await getAuthUser()
  if (!user) redirect('/login')

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      fullName: true,
      avatarUrl: true,
      role: true,
      studentId: true,
      memberType: true,
      status: true,
      createdAt: true,
    },
  })

  if (!profile) redirect('/login')

  return (
    <OperationsShell
      profile={{
        ...profile,
        createdAt: profile.createdAt.toISOString(),
      }}
    >
      {children}
    </OperationsShell>
  )
}
