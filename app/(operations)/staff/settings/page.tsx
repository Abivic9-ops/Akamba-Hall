import { requireRole } from '@/lib/auth/roleGuard'
import { SettingsPageClient } from '@/components/dashboard/settings-page-client'

export const dynamic = 'force-dynamic'

const staff_sections = [
  { title: 'Notifications', items: ['Email Notifications', 'Push Notifications', 'SMS Alerts', 'Digest Frequency'] },
  { title: 'Department', items: ['Department Selection', 'Book Allocation', 'Reservation Rules', 'Teaching Schedule'] },
  { title: 'Display', items: ['Theme (Light/Dark)', 'Language', 'Font Size', 'Compact Mode'] },
  { title: 'Account', items: ['Change Password', 'Two-Factor Auth', 'Connected Accounts', 'Delete Account'] },
]

export default async function staff_settings_page() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])
  return <SettingsPageClient role="staff" sections={staff_sections} />
}
