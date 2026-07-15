'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

export function LoginForm({ initialIdentifier = '' }: { initialIdentifier?: string }) {
  const [identifier, setIdentifier] = useState(initialIdentifier)
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // Convert short codes to emails since Supabase auth primarily uses emails by default.
    const email = identifier.includes('@') ? identifier : `${identifier}@akambahall.local`

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Next.js middleware and our dashboard route will handle the role redirection
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <Card className="w-full max-w-md border-[#E2E8F0] bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#0B1829]">Welcome back to Akamba Hall</CardTitle>
        <CardDescription>Enter your Member ID, File Number, or scan your QR card.</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Member ID or File Number</Label>
            <Input 
              id="identifier" 
              placeholder="e.g. 12345 or staff@starehe.edu" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">PIN / Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-[#EF4444] font-medium text-sm">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-[#F5A623] hover:bg-[#E8931A] text-[#0B1829] font-bold" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          <div className="text-sm text-center text-[#A8B4C4]">
            <a href="/forgot-pin" className="hover:underline">Forgot PIN?</a>
          </div>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#E2E8F0]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#A8B4C4]">Or</span>
            </div>
          </div>
          <p className="text-sm text-center text-[#A8B4C4]">
            Scan your QR card to reach this page directly.
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
