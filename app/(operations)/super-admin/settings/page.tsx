import { requireRole } from '@/lib/auth/roleGuard'
import { SettingsPageClient } from '@/components/dashboard/settings-page-client'

export const dynamic = 'force-dynamic'

const super_admin_sections = [
  { title: 'General', items: ['Portal Name', 'Logo & Branding', 'Default Language', 'Timezone'] },
  { title: 'Notifications', items: ['Email Notifications', 'SMS Alerts', 'Push Notifications', 'Digest Frequency'] },
  { title: 'Security', items: ['Two-Factor Authentication', 'Session Timeout', 'Password Policy', 'IP Whitelist'] },
  { title: 'Integrations', items: ['Supabase Configuration', 'Payment Gateway', 'Email Service (SMTP)', 'SMS Provider'] },
]

export default async function super_admin_settings_page() {
  await requireRole(['SUPER_ADMIN'])
  return <SettingsPageClient role="system" sections={super_admin_sections} />
}
