import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db/prisma'
import { getRouteForRole } from '@/lib/auth/roleGuard'

// This is the smart /dashboard route — after login, middleware sends users here.
// It reads their role from the DB and redirects them to the correct portal.
export default async function DashboardRedirectPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
  })

  if (!profile) {
    // User authenticated but not yet provisioned in our DB
    redirect('/onboarding')
  }

  const destination = getRouteForRole(profile.role)
  redirect(destination)
}
