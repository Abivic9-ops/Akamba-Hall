'use client'

import { useAuth } from '@/lib/contexts/auth-context'
import { getHomeRoute } from '@/lib/types/role'
import type { Role } from '@/lib/types/role'

export default function UnauthorizedPage() {
  const { role } = useAuth()
  const home = role ? getHomeRoute(role as Role) : '/login'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-center px-4">
      <h1 className="text-5xl font-bold text-[#0B1829] mb-4">403</h1>
      <p className="text-xl text-[#A8B4C4] mb-8">You do not have permission to access this page.</p>
      <a
        href={home}
        className="bg-[#F5A623] text-[#0B1829] font-bold py-2 px-6 rounded-lg hover:bg-[#E8931A] transition-colors"
      >
        Back to Dashboard
      </a>
    </div>
  )
}
