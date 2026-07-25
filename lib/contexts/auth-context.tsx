'use client'

import { createContext, useContext, useEffect, useState, useRef, useCallback, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getUserProfile, type UserProfile } from '@/lib/actions/auth'
import type { Role } from '@/lib/types/role'

interface auth_context_value {
  user: UserProfile | null
  role: Role | null
  loading: boolean
  error: string | null
}

const auth_context = createContext<auth_context_value>({
  user: null,
  role: null,
  loading: true,
  error: null,
})

export function useAuth() {
  return useContext(auth_context)
}

interface AuthProviderProps {
  children: ReactNode
  initialProfile?: UserProfile | null
}

export function AuthProvider({ children, initialProfile }: AuthProviderProps) {
  const supabaseRef = useRef(createClient())
  const supabase = supabaseRef.current
  const hasInitial = initialProfile !== undefined && initialProfile !== null
  const [user, setUser] = useState<UserProfile | null>(initialProfile ?? null)
  const [loading, setLoading] = useState<boolean>(!hasInitial && supabase !== null)
  const [error, setError] = useState<string | null>(null)
  const fetchedRef = useRef(hasInitial)

  const fetch_user = useCallback(async () => {
    if (!supabase) return
    try {
      const { data: { user: auth_user } } = await supabase.auth.getUser()
      if (!auth_user) {
        setUser((prev) => {
          if (prev) return prev
          return null
        })
        setLoading(false)
        return
      }
      const profile = await getUserProfile(auth_user.id)
      if (!profile) {
        setError('Failed to load user profile')
        setLoading(false)
        return
      }
      setUser(profile)
      setError(null)
    } catch {
      setUser((prev) => {
        if (prev) return prev
        return null
      })
      setError('Authentication error')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    if (!supabase) return
    if (!fetchedRef.current) {
      fetchedRef.current = true
      fetch_user()
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null)
          setLoading(false)
        } else if (event === 'SIGNED_IN') {
          fetch_user()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase, fetch_user])

  return (
    <auth_context.Provider value={{ user, role: (user?.role as Role) ?? null, loading, error }}>
      {children}
    </auth_context.Provider>
  )
}
