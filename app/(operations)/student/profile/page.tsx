import { requireRole } from '@/lib/auth/roleGuard'
import prisma from '@/lib/db/prisma'
import { ProfilePageClient } from '@/components/dashboard/profile-page-client'

export const dynamic = 'force-dynamic'

export default async function student_profile_page() {
  const profile = await requireRole(['STUDENT', 'SUPER_ADMIN'])

  const [loansCount, activeLoansCount, bookmarksCount, eventsAttended] = await Promise.all([
    prisma.loan.count({ where: { userId: profile.id } }),
    prisma.loan.count({ where: { userId: profile.id, returnedAt: null } }),
    prisma.bookmark.count({ where: { userId: profile.id } }),
    prisma.event.count({ where: { authorId: profile.id } }),
  ])

  const joinDate = profile.createdAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  const membershipPoints = loansCount * 10 + eventsAttended * 15
  const nextTierPoints = 2000
  const tier = membershipPoints >= 1500 ? 'Platinum Scholar' : membershipPoints >= 800 ? 'Gold Reader' : 'Silver Reader'

  return (
    <ProfilePageClient
      userId={profile.id}
      profile={{
        fullName: profile.fullName ?? '',
        email: profile.email ?? '',
        studentId: profile.studentId ?? '',
        memberType: profile.memberType,
        joinDate,
        membership: {
          tier,
          points: membershipPoints,
          nextTier: 'Platinum Scholar',
          nextTierPoints,
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
