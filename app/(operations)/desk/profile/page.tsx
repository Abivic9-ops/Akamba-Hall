import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { ProfilePageClient } from '@/components/dashboard/profile-page-client'

export const dynamic = 'force-dynamic'

export default async function desk_profile_page() {
  const profile = await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])

  const [loansCount, activeLoansCount, bookmarksCount, eventsAttended] = await Promise.all([
    prisma.loan.count({ where: { userId: profile.id } }),
    prisma.loan.count({ where: { userId: profile.id, returnedAt: null } }),
    prisma.bookmark.count({ where: { userId: profile.id } }),
    prisma.event.count({ where: { authorId: profile.id } }),
  ])

  const joinDate = profile.createdAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <ProfilePageClient
      profile={{
        fullName: profile.fullName ?? '',
        email: profile.email ?? '',
        studentId: profile.studentId ?? profile.email ?? '',
        memberType: profile.memberType,
        joinDate,
        membership: {
          tier: 'Desk Staff',
          points: 0,
          nextTier: 'Desk Staff',
          nextTierPoints: 1,
        },
        stats: {
          totalLoans: loansCount,
          currentLoans: activeLoansCount,
          reservations: bookmarksCount,
          eventsAttended,
        },
      }}
    />
  )
}
