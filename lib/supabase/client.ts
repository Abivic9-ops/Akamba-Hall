import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase browser client.
 * Returns null when NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
 * are not configured so the app can run in UI-preview mode without crashing.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // UI-preview mode — Supabase not yet configured
    return null
  }

  return createBrowserClient(url, key)
}
