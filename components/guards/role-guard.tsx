'use client'

import { useAuth } from '@/lib/contexts/auth-context'
import type { Role } from '@/lib/types/role'
import type { ReactNode } from 'react'

interface role_guard_props {
  allowed_roles: Role[]
  children: ReactNode
  fallback?: ReactNode
}

export function role_guard({ allowed_roles, children, fallback = null }: role_guard_props) {
  const { role, loading } = useAuth()

  if (loading) return null
  if (!role || !allowed_roles.includes(role)) return <>{fallback}</>

  return <>{children}</>
}
