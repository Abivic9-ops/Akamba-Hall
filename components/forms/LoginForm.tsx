'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AlertTriangle, ArrowRight, Eye } from 'lucide-react'

export function LoginForm({ initialIdentifier = '' }: { initialIdentifier?: string }) {
  const [identifier, setIdentifier] = useState(initialIdentifier)
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Check if Supabase is configured — null means UI preview mode
  const supabase = createClient()
  const isPreviewMode = supabase === null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // --- UI PREVIEW MODE: skip auth, go straight to dashboard ---
    if (isPreviewMode) {
      router.push('/dashboard')
      return
    }

    setLoading(true)
    setError(null)

    // Convert short codes to emails since Supabase auth primarily uses emails
    const email = identifier.includes('@') ? identifier : `${identifier}@akambahall.local`

    const { error: authError } = await supabase!.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">

      {/* Preview Mode Banner */}
      {isPreviewMode && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-amber-800">UI Preview Mode</span>
            <span className="text-[11px] text-amber-700 mt-0.5 leading-snug">
              Supabase is not configured yet. Click Sign In to skip authentication and preview the dashboard.
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="identifier" className="text-sm font-semibold text-[#0B1B3D]">
          Email or Admission Number
        </Label>
        <Input
          id="identifier"
          placeholder="e.g. 11876 or john@starehe.org"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="h-12 bg-white"
          required={!isPreviewMode}
          disabled={isPreviewMode}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-sm font-semibold text-[#0B1B3D]">
            Password
          </Label>
          <Link href="#" className="text-xs text-primary font-medium hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 bg-white"
          required={!isPreviewMode}
          disabled={isPreviewMode}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <p className="text-[12px] font-medium">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-12 font-bold bg-primary text-primary-foreground hover:bg-primary/90 text-[15px] mt-2 gap-2"
        disabled={loading}
      >
        {loading ? (
          'Signing In...'
        ) : isPreviewMode ? (
          <>
            <Eye className="h-4 w-4" /> Preview Dashboard
          </>
        ) : (
          <>
            Sign In <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
