import { requireRole } from '@/lib/auth/roleGuard'
import { SettingsPageClient } from '@/components/dashboard/settings-page-client'

export const dynamic = 'force-dynamic'

const desk_sections = [
  { title: 'Notifications', items: ['Email Notifications', 'Push Notifications', 'Overdue Alerts', 'Daily Digest'] },
  { title: 'Circulation', items: ['Default Loan Period', 'Fine Rates', 'Reservation Limits', 'Auto-Renewal Rules'] },
  { title: 'Display', items: ['Theme (Light/Dark)', 'Language', 'Font Size', 'Compact Mode'] },
  { title: 'Account', items: ['Change Password', 'Two-Factor Auth', 'Connected Accounts', 'Delete Account'] },
]

export default async function desk_settings_page() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT', 'SUPER_ADMIN'])
  return <SettingsPageClient role="desk" sections={desk_sections} />
}
