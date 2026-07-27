import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { ProfilePageClient } from '@/components/dashboard/profile-page-client'

export const dynamic = 'force-dynamic'

export default async function library_head_profile_page() {
  const profile = await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  const [loansCount, activeLoansCount, bookmarksCount, eventsAttended] = await Promise.all([
    prisma.loan.count({ where: { userId: profile.id } }),
    prisma.loan.count({ where: { userId: profile.id, returnedAt: null } }),
    prisma.bookmark.count({ where: { userId: profile.id } }),
    prisma.event.count({ where: { authorId: profile.id } }),
  ])

  const joinDate = profile.createdAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <ProfilePageClient
      userId={profile.id}
      profile={{
        fullName: profile.fullName ?? '',
        email: profile.email ?? '',
        studentId: profile.studentId ?? profile.email ?? '',
        memberType: profile.memberType,
        joinDate,
        membership: {
          tier: 'Library Head',
          points: 0,
          nextTier: 'Library Head',
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
