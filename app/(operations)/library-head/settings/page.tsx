import { requireRole } from '@/lib/auth/roleGuard'
import { SettingsPageClient } from '@/components/dashboard/settings-page-client'

export const dynamic = 'force-dynamic'

const library_head_sections = [
  { title: 'Notifications', items: ['Email Notifications', 'Push Notifications', 'Approval Alerts', 'Weekly Reports'] },
  { title: 'Management', items: ['Staff Permissions', 'Borrowing Policies', 'Fine Structures', 'Access Levels'] },
  { title: 'Display', items: ['Theme (Light/Dark)', 'Language', 'Font Size', 'Compact Mode'] },
  { title: 'Account', items: ['Change Password', 'Two-Factor Auth', 'Connected Accounts', 'Delete Account'] },
]

export default async function library_head_settings_page() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])
  return <SettingsPageClient role="library head" sections={library_head_sections} />
}
