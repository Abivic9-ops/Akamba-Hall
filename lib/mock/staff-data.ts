export const staff_profile = {
  fullName: 'James Mwangi',
  title: 'Mr.',
  studentId: 'SBC-STF-047',
  memberType: 'Silver Scholar',
  membership: { tier: 'Silver Scholar', points: 2340, nextTier: 'Gold Scholar', nextTierPoints: 3000 },
  qrCard: { label: 'My Digital Access Card', memberId: 'SBC-STF-047', status: 'Active' as const },
  department: 'Science Department',
  position: 'Senior Physics Teacher',
}

export const staff_loans = [
  { id: 'sl1', title: 'Advanced Physics: Principles and Applications', author: 'Serway & Jewett', coverUrl: '', dueDate: new Date(Date.now() + 12 * 86400000).toISOString(), renewable: true },
  { id: 'sl2', title: 'Teaching Mathematics in East Africa', author: 'Omenko & Gathemo', coverUrl: '', dueDate: new Date(Date.now() + 3 * 86400000).toISOString(), renewable: true },
  { id: 'sl3', title: 'Laboratory Safety Manual', author: 'Kenya Institute of Education', coverUrl: '', dueDate: new Date(Date.now() + 18 * 86400000).toISOString(), renewable: false },
]

export const staff_holds = [
  { id: 'sh1', title: 'Curriculum Design for Secondary Science', author: 'Njeru & Kibua', coverUrl: '', status: 'ready' as const, queuePosition: null, pickupLocation: 'Main Desk — Level 2', pickupDeadline: new Date(Date.now() + 2 * 86400000).toISOString() },
  { id: 'sh2', title: 'Educational Psychology: A Modern Approach', author: 'Schunk', coverUrl: '', status: 'pending' as const, queuePosition: 3, pickupLocation: null, pickupDeadline: null },
]

export const staff_bookings = [
  { id: 'sb1', type: 'Boardroom' as const, title: 'Physics Department Review', location: 'Boardroom A', startAt: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(), endAt: new Date(new Date().setHours(15, 30, 0, 0)).toISOString(), status: 'Confirmed' as const },
  { id: 'sb2', type: 'AVR' as const, title: 'Form 4 Revision Session Recording', location: 'Audio Visual Room', startAt: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(), endAt: new Date(new Date().setHours(17, 0, 0, 0)).toISOString(), status: 'Approved' as const },
  { id: 'sb3', type: 'Reading Seat' as const, title: 'Evening Reading Supervision', location: 'Reading Hall — Zone C', startAt: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(), endAt: new Date(new Date().setHours(19, 30, 0, 0)).toISOString(), status: 'Confirmed' as const },
]

export const staff_announcements = [
  { id: 'sa1', type: 'workshop' as const, title: 'ICT Integration Workshop for Teachers', subtitle: 'Hands-on session on using e-resources in lesson planning. Mandatory for all HODs.', createdAt: new Date(Date.now() - 4 * 3600000).toISOString() },
  { id: 'sa2', type: 'acquisition' as const, title: 'New STEM Textbooks Available', subtitle: '45 new titles in Physics, Chemistry, and Mathematics have been added to the collection.', createdAt: new Date(Date.now() - 48 * 3600000).toISOString() },
  { id: 'sa3', type: 'closure' as const, title: 'Library Closed — Teachers\' Day', subtitle: 'Akamba Hall Library will be closed on Friday for the official Teachers\' Day celebration.', createdAt: new Date(Date.now() - 72 * 3600000).toISOString() },
  { id: 'sa4', type: 'policy' as const, title: 'Extended Loan Period for Staff', subtitle: 'Staff loan period has been extended from 3 weeks to 4 weeks effective immediately.', createdAt: new Date(Date.now() - 120 * 3600000).toISOString() },
]

export const staff_library_hours = {
  isOpen: true,
  closesAt: '6:00 PM',
  opensTomorrow: '7:30 AM',
  schedule: [
    { day: 'Monday', hours: '7:30 AM – 6:00 PM', isToday: new Date().getDay() === 1 },
    { day: 'Tuesday', hours: '7:30 AM – 6:00 PM', isToday: new Date().getDay() === 2 },
    { day: 'Wednesday', hours: '7:30 AM – 6:00 PM', isToday: new Date().getDay() === 3 },
    { day: 'Thursday', hours: '7:30 AM – 6:00 PM', isToday: new Date().getDay() === 4 },
    { day: 'Friday', hours: '7:30 AM – 5:00 PM', isToday: new Date().getDay() === 5 },
    { day: 'Saturday', hours: '8:00 AM – 1:00 PM', isToday: new Date().getDay() === 6 },
    { day: 'Sunday', hours: 'Closed', isToday: new Date().getDay() === 0 },
  ],
}

export const staff_recent_activity = [
  { id: 'ra1', type: 'renewal' as const, description: 'Renewed "Advanced Physics: Principles and Applications"', detail: 'New due date: 2 Aug 2026', timestamp: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 'ra2', type: 'seat_booking' as const, description: 'Booked Reading Seat — Zone C', detail: 'Evening supervision slot', timestamp: new Date(Date.now() - 6 * 3600000).toISOString() },
  { id: 'ra3', type: 'hold_pickup' as const, description: 'Picked up "Curriculum Design for Secondary Science"', detail: 'From Main Desk — Level 2', timestamp: new Date(Date.now() - 24 * 3600000).toISOString() },
  { id: 'ra4', type: 'avr_booking' as const, description: 'Booked AVR for Form 4 revision session', detail: 'Tomorrow, 4:00 PM – 5:00 PM', timestamp: new Date(Date.now() - 30 * 3600000).toISOString() },
  { id: 'ra5', type: 'book_suggestion' as const, description: 'Suggested "Data Science for Educators" for purchase', detail: 'Pending review', timestamp: new Date(Date.now() - 72 * 3600000).toISOString() },
]

export const staff_upcoming_events = [
  { id: 'ue1', title: 'STEM Teachers\' Resource Fair', date: new Date(Date.now() + 3 * 86400000).toISOString(), time: '2:00 PM – 4:30 PM', venue: 'Akamba Hall — Main Hall' },
  { id: 'ue2', title: 'E-Resource Training: JSTOR & EBSCO', date: new Date(Date.now() + 7 * 86400000).toISOString(), time: '10:00 AM – 12:00 PM', venue: 'Audio Visual Room' },
  { id: 'ue3', title: 'Library Committee Monthly Meeting', date: new Date(Date.now() + 12 * 86400000).toISOString(), time: '3:00 PM – 4:00 PM', venue: 'Boardroom A' },
]

export const staff_overdue = {
  overdueCount: 0,
  dueThisWeek: 1,
  totalActive: 3,
}
