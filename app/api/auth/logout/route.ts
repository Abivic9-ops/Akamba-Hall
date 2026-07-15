import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function POST() {
  const supabase = await createClient()

  // If Supabase is not configured, just redirect to login (preview mode)
  if (!supabase) {
    redirect('/login')
  }

  const { error } = await supabase.auth.signOut()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  redirect('/login')
}
