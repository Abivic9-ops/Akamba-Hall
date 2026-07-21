import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('\x1b[31m✗ Missing DATABASE_URL in .env\x1b[0m')
  process.exit(1)
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = process.env.SUPER_ADMIN_EMAIL
  const password = process.env.SUPER_ADMIN_PASSWORD
  const fullName = process.env.SUPER_ADMIN_NAME || 'System Administrator'

  if (!email || !password) {
    console.error(
      '\x1b[31m✗ Missing SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD in .env\x1b[0m'
    )
    process.exit(1)
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error(
      '\x1b[31m✗ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env\x1b[0m'
    )
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  console.log('\x1b[36m→ Seeding super admin...\x1b[0m')

  // create or get supabase auth user
  let authUserId: string

  const { data: existingAuth } = await supabase.auth.admin.listUsers()
  const found = existingAuth.users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  )

  if (found) {
    authUserId = found.id
    // ensure app_metadata has the role (update if missing)
    const currentRole = found.app_metadata?.role
    if (currentRole !== 'SUPER_ADMIN') {
      await supabase.auth.admin.updateUserById(authUserId, {
        app_metadata: { role: 'SUPER_ADMIN' },
      })
    }
    console.log(`\x1b[33m✓ Auth user already exists (${email}). Reusing.\x1b[0m`)
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email: email.toLowerCase(),
      password,
      email_confirm: true,
      app_metadata: {
        role: 'SUPER_ADMIN',
      },
      user_metadata: {
        full_name: fullName,
      },
    })

    if (error) {
      console.error('\x1b[31m✗ Failed to create auth user:', error.message, '\x1b[0m')
      process.exit(1)
    }

    authUserId = data.user.id
    console.log(`\x1b[32m✓ Auth user created (${email})\x1b[0m`)
  }

  // create or update prisma user profile
  const prismaUser = await prisma.user.upsert({
    where: { id: authUserId },
    update: {
      role: 'SUPER_ADMIN',
      memberType: 'STAFF',
      status: 'ACTIVE',
      email: email.toLowerCase(),
      fullName,
    },
    create: {
      id: authUserId,
      email: email.toLowerCase(),
      fullName,
      role: 'SUPER_ADMIN',
      memberType: 'STAFF',
      status: 'ACTIVE',
    },
  })

  console.log(
    `\x1b[32m✓ Super admin profile created/updated in database\x1b[0m`
  )
  console.log(
    `\x1b[36m  Email: ${prismaUser.email}\x1b[0m`
  )
  console.log(
    `\x1b[36m  Role:  ${prismaUser.role}\x1b[0m`
  )
  console.log(
    `\x1b[32m✓ Seeding complete! You can now log in.\x1b[0m\n`
  )
}

main()
  .catch((e) => {
    console.error('\x1b[31m✗ Seed failed:', e, '\x1b[0m')
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
