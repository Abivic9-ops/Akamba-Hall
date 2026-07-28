import { requireRole } from '@/lib/auth/roleGuard'
import { SettingsPageClient } from '@/components/dashboard/settings-page-client'

export const dynamic = 'force-dynamic'

const executive_sections = [
  { title: 'Notifications', items: ['Email Notifications', 'Push Notifications', 'SMS Alerts', 'Digest Frequency'] },
  { title: 'Security', items: ['Two-Factor Authentication', 'Session Timeout'] },
  { title: 'Display', items: ['Theme (Light/Dark)', 'Language', 'Font Size', 'Compact Mode'] },
  { title: 'Account', items: ['Change Password', 'Connected Accounts'] },
]

export default async function SettingsPage() {
  await requireRole(['EXECUTIVE', 'SUPER_ADMIN'])
  return <SettingsPageClient role="executive" sections={executive_sections} />
}
