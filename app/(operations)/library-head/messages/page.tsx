import { requireRole } from '@/lib/auth/roleGuard'
import { MessagesClient } from '@/components/dashboard/library-head/messages-client'

export const dynamic = 'force-dynamic'

export default async function LibraryHeadMessagesPage() {
  await requireRole(['LIBRARY_HEAD', 'SUPER_ADMIN'])

  return <MessagesClient />
}
