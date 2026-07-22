export const desk_profile = {
  fullName: 'Mary Wanjiku',
  role: 'Library Assistant' as const,
  studentId: 'SBC-AST-012',
  avatarUrl: '/images/avatar.png',
}

export const desk_kpi = {
  loansIssued: 24,
  returnsProcessed: 17,
  renewals: 3,
  newMembers: 5,
  overdueItems: 2,
}

export type TransactionType = 'issue' | 'return' | 'renewal'

export interface RecentTransaction {
  id: string
  type: TransactionType
  itemTitle: string
  memberName: string
  memberId: string
  category: string
  timestamp: string
  status: 'Issued' | 'Returned' | 'Renewed'
}

export const recent_transactions: RecentTransaction[] = [
  { id: 'tx1', type: 'issue', itemTitle: 'Advanced Physics: Principles and Applications', memberName: 'James Ochieng', memberId: 'STU-24011076', category: 'General Books', timestamp: new Date(Date.now() - 15 * 60000).toISOString(), status: 'Issued' },
  { id: 'tx2', type: 'return', itemTitle: 'Chemistry: The Central Science', memberName: 'Peter Kamau', memberId: 'STU-24011089', category: 'General Books', timestamp: new Date(Date.now() - 32 * 60000).toISOString(), status: 'Returned' },
  { id: 'tx3', type: 'renewal', itemTitle: 'Teaching Mathematics in East Africa', memberName: 'Sarah Njeri', memberId: 'STF-047', category: 'Reference', timestamp: new Date(Date.now() - 48 * 60000).toISOString(), status: 'Renewed' },
  { id: 'tx4', type: 'issue', itemTitle: 'Introduction to Computer Science', memberName: 'David Mutua', memberId: 'STU-24011102', category: 'General Books', timestamp: new Date(Date.now() - 65 * 60000).toISOString(), status: 'Issued' },
  { id: 'tx5', type: 'return', itemTitle: 'Biology: Concepts and Applications', memberName: 'Grace Wambui', memberId: 'STU-24011115', category: 'General Books', timestamp: new Date(Date.now() - 90 * 60000).toISOString(), status: 'Returned' },
  { id: 'tx6', type: 'issue', itemTitle: 'Kenya History and Geography', memberName: 'Brian Kipchoge', memberId: 'STU-24011128', category: 'General Books', timestamp: new Date(Date.now() - 120 * 60000).toISOString(), status: 'Issued' },
  { id: 'tx7', type: 'return', itemTitle: 'Economics: A Modern Introduction', memberName: 'Alice Akinyi', memberId: 'STU-24011134', category: 'General Books', timestamp: new Date(Date.now() - 150 * 60000).toISOString(), status: 'Returned' },
  { id: 'tx8', type: 'issue', itemTitle: 'Literature in English Anthology', memberName: 'Michael Wairimu', memberId: 'STU-24011141', category: 'General Books', timestamp: new Date(Date.now() - 180 * 60000).toISOString(), status: 'Issued' },
]

export interface HoldItem {
  id: string
  title: string
  author: string
  requestedBy: string
  memberId: string
  queuePosition: number
  totalInQueue: number
  status: 'Ready' | 'Waiting' | 'Overdue for pickup'
}

export const holds_queue: HoldItem[] = [
  { id: 'h1', title: 'Curriculum Design for Secondary Science', author: 'Njeru & Kibua', requestedBy: 'James Ochieng', memberId: 'STU-24011076', queuePosition: 1, totalInQueue: 3, status: 'Ready' },
  { id: 'h2', title: 'Data Structures and Algorithms', author: 'Thomas Cormen', requestedBy: 'Peter Kamau', memberId: 'STU-24011089', queuePosition: 1, totalInQueue: 2, status: 'Waiting' },
  { id: 'h3', title: 'Physics Laboratory Manual', author: 'Kenya Institute', requestedBy: 'David Mutua', memberId: 'STU-24011102', queuePosition: 2, totalInQueue: 4, status: 'Waiting' },
  { id: 'h4', title: 'Business Studies Form 4', author: 'KLB', requestedBy: 'Grace Wambui', memberId: 'STU-24011115', queuePosition: 1, totalInQueue: 1, status: 'Overdue for pickup' },
  { id: 'h5', title: 'English Grammar and Composition', author: 'Longhorn', requestedBy: 'Brian Kipchoge', memberId: 'STU-24011128', queuePosition: 3, totalInQueue: 5, status: 'Waiting' },
]

export interface TodayReturn {
  id: string
  title: string
  author: string
  dueDate: string
  returnedAt: string
}

export const today_returns: TodayReturn[] = [
  { id: 'tr1', title: 'Chemistry: The Central Science', author: 'Brown & LeMay', dueDate: new Date(Date.now() - 1 * 86400000).toISOString(), returnedAt: new Date(Date.now() - 32 * 60000).toISOString() },
  { id: 'tr2', title: 'Biology: Concepts and Applications', author: 'Starr & Taggart', dueDate: new Date().toISOString(), returnedAt: new Date(Date.now() - 90 * 60000).toISOString() },
  { id: 'tr3', title: 'Economics: A Modern Introduction', author: 'Mankiw', dueDate: new Date(Date.now() - 2 * 86400000).toISOString(), returnedAt: new Date(Date.now() - 150 * 60000).toISOString() },
  { id: 'tr4', title: 'Mathematics for Kenya', author: 'Omenko', dueDate: new Date().toISOString(), returnedAt: new Date(Date.now() - 200 * 60000).toISOString() },
]

export interface OverdueAlert {
  id: string
  title: string
  author: string
  dueDate: string
  daysOverdue: number
  memberId: string
}

export const overdue_alerts: OverdueAlert[] = [
  { id: 'od1', title: 'Introduction to Computer Science', author: 'Brookshear', dueDate: new Date(Date.now() - 4 * 86400000).toISOString(), daysOverdue: 4, memberId: 'STU-24011102' },
  { id: 'od2', title: 'Geography of Kenya', author: 'Sindu', dueDate: new Date(Date.now() - 2 * 86400000).toISOString(), daysOverdue: 2, memberId: 'STU-24011128' },
]

export const inventory_snapshot = {
  totalItems: 12847,
  available: 7837,
  onLoan: 5010,
  percentAvailable: 61,
}

export interface LibraryNotice {
  id: string
  category: 'digital' | 'event' | 'general'
  title: string
  body: string
  timeAgo: string
}

export const library_notices: LibraryNotice[] = [
  { id: 'n1', category: 'digital', title: 'New E-Resource: JSTOR Access', body: 'Full access to JSTOR database now available for all registered members.', timeAgo: '2d ago' },
  { id: 'n2', category: 'event', title: 'STEM Resource Fair Next Week', body: 'Annual STEM resource fair featuring new acquisitions and vendor demos.', timeAgo: '3d ago' },
  { id: 'n3', category: 'general', title: 'Holiday Hours Updated', body: 'Library will operate on reduced hours during the upcoming holiday break.', timeAgo: '5d ago' },
  { id: 'n4', category: 'digital', title: 'EBSCO Training Session', body: 'Training session on using EBSCO research databases for academic staff.', timeAgo: '1w ago' },
]

export interface UpcomingEvent {
  id: string
  month: string
  day: string
  title: string
  time: string
  venue: string
}

export const upcoming_events: UpcomingEvent[] = [
  { id: 'ue1', month: 'JUN', day: '25', title: 'STEM Teachers\' Resource Fair', time: '2:00 PM – 4:30 PM', venue: 'Main Hall' },
  { id: 'ue2', month: 'JUN', day: '28', title: 'E-Resource Training: JSTOR', time: '10:00 AM – 12:00 PM', venue: 'AVR' },
  { id: 'ue3', month: 'JUL', day: '02', title: 'Library Committee Meeting', time: '3:00 PM – 4:00 PM', venue: 'Boardroom A' },
]

export const today_summary = {
  date: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }),
  loansIssued: 24,
  returnsProcessed: 17,
  newMembers: 5,
  overdueItems: 2,
}
