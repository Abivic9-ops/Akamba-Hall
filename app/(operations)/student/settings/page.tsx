import { requireRole } from '@/lib/auth/roleGuard'
import { SettingsPageClient } from '@/components/dashboard/settings-page-client'

export const dynamic = 'force-dynamic'

const student_sections = [
  { title: 'Notifications', items: ['Email Notifications', 'Push Notifications', 'SMS Alerts', 'Digest Frequency'] },
  { title: 'Privacy', items: ['Profile Visibility', 'Reading History', 'Bookmarks Privacy', 'Data Sharing'] },
  { title: 'Display', items: ['Theme (Light/Dark)', 'Language', 'Font Size', 'Compact Mode'] },
  { title: 'Account', items: ['Change Password', 'Two-Factor Auth', 'Connected Accounts', 'Delete Account'] },
]

export default async function student_settings_page() {
  await requireRole(['STUDENT', 'SUPER_ADMIN'])
  return <SettingsPageClient role="student" sections={student_sections} />
}
