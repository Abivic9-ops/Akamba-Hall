export const student_profile = {
  id: 'stu-001',
  fullName: 'Victor Otieno',
  email: 'victor.otieno@starehe.ac.ke',
  studentId: 'SBC-2024-0142',
  memberType: 'STUDENT',
  membership: {
    tier: 'Gold Reader',
    points: 1240,
    nextTier: 'Platinum Scholar',
    nextTierPoints: 2000,
  },
  qrCard: {
    label: 'My QR Access Card',
    memberId: 'SBC-2024-0142',
    status: 'Active' as const,
  },
}

export const active_loans = [
  {
    id: 'loan-1',
    title: 'Introduction to Physics',
    author: 'J.K. Kariuki',
    coverUrl: '',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    renewable: true,
  },
  {
    id: 'loan-2',
    title: 'Secondary School Mathematics',
    author: 'A.O. Awino',
    coverUrl: '',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    renewable: true,
  },
  {
    id: 'loan-3',
    title: 'The Secret Runner',
    author: 'Tim Kennemar',
    coverUrl: '',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    renewable: false,
  },
]

export const holds = [
  {
    id: 'hold-1',
    title: 'Chemistry Practical Guide',
    author: 'P.O. Owuor',
    coverUrl: '',
    status: 'ready' as const,
    queuePosition: null,
    pickupLocation: 'Main Desk — Akamba Hall',
    pickupDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'hold-2',
    title: 'Kenyan History: Pre-Colonial to Modern',
    author: 'M.W. Odhiambo',
    coverUrl: '',
    status: 'pending' as const,
    queuePosition: 3,
    pickupLocation: null,
    pickupDeadline: null,
  },
]

export const bookings = [
  {
    id: 'bk-1',
    type: 'Reading Seat' as const,
    title: 'Morning Study Session',
    location: 'Reading Hall — Seat 14',
    startAt: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    endAt: new Date(new Date().setHours(15, 30, 0, 0)).toISOString(),
    status: 'Approved' as const,
  },
  {
    id: 'bk-2',
    type: 'AVR' as const,
    title: 'AVR Session Booking',
    location: 'Audio Visual Room',
    startAt: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(),
    endAt: new Date(new Date().setHours(17, 30, 0, 0)).toISOString(),
    status: 'Pending' as const,
  },
]

export const announcements = [
  {
    id: 'ann-1',
    type: 'event' as const,
    title: 'AI Literacy Week — Register Now',
    subtitle: 'Join workshops on AI tools for academic research',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ann-2',
    type: 'reminder' as const,
    title: 'End-of-Term Returns Due',
    subtitle: 'All books must be returned by 28 Jun 2026',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ann-3',
    type: 'eresource' as const,
    title: 'New E-Resource: JSTOR Access',
    subtitle: 'Full access to JSTOR academic journals now available',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ann-4',
    type: 'closure' as const,
    title: 'Library Closed — Public Holiday',
    subtitle: 'Akamba Hall will be closed on Monday, 30 Jun',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const library_hours = {
  isOpen: true,
  closesAt: '6:00 PM',
  opensTomorrow: '7:30 AM',
  schedule: [
    { day: 'Mon – Fri', hours: '7:30 AM – 6:00 PM', isToday: true },
    { day: 'Saturday', hours: '8:00 AM – 1:00 PM', isToday: false },
    { day: 'Sunday', hours: 'Closed', isToday: false },
  ],
}

export const overdue_count = 0

export const upcoming_events = [
  {
    id: 'evt-1',
    title: 'AI Literacy Workshop',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    venue: 'Audio Visual Room',
  },
  {
    id: 'evt-2',
    title: 'Book Club: African Literature',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    venue: 'Reading Hall',
  },
]
