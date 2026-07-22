export const executive_profile = {
  id: 'SBC-DIR-0001',
  fullName: 'Dr. John Kamau',
  title: 'Dr.',
  position: 'Library Director',
  department: 'Library Administration',
  email: 'john.kamau@starehe.ac.ke',
  memberType: 'Executive',
  membership: { tier: 'Executive Access', points: 0, nextTier: '', nextTierPoints: 0 },
  qrCard: { label: 'Executive Access Card', memberId: 'SBC-DIR-0001', status: 'Active' as const },
}

export const executive_overview = {
  activeLoans: 1248,
  activeLoansTrend: { direction: 'up' as const, value: '12%', label: 'from last month' },
  pendingApprovals: 7,
  upcomingBookings: 23,
  holdsAwaiting: 15,
  criticalAlerts: 4,
  systemHealth: 'Healthy' as const,
  uptime: 100,
}

export const approval_queue = [
  { id: 'AQ001', type: 'room_booking' as const, request: 'Boardroom Booking — Mon, 23 Jun', requestor: 'Brian Mutuku', context: 'History Dept.', date: '20 Jun, 10:30 AM', priority: 'normal' as const },
  { id: 'AQ002', type: 'special_access' as const, request: 'Special Access Request', requestor: 'Daniel Njuguna', context: 'Form 4A', date: '20 Jun, 09:15 AM', priority: 'normal' as const },
  { id: 'AQ003', type: 'policy_exception' as const, request: 'Policy Exception Request', requestor: 'Grace Wanjiru', context: 'Staff', date: '19 Jun, 04:45 PM', priority: 'normal' as const },
  { id: 'AQ004', type: 'incident' as const, request: 'Escalated Late Return', requestor: 'Kevin Otieno', context: 'Library Asst.', date: '19 Jun, 02:20 PM', priority: 'high' as const },
  { id: 'AQ005', type: 'room_booking' as const, request: 'AVR Session — Wed, 25 Jun', requestor: 'Alice Akinyi', context: 'Science Dept.', date: '18 Jun, 11:00 AM', priority: 'normal' as const },
  { id: 'AQ006', type: 'special_access' as const, request: 'Extended Hours Request', requestor: 'Peter Ngesa', context: 'Form 4B', date: '18 Jun, 09:30 AM', priority: 'normal' as const },
  { id: 'AQ007', type: 'general' as const, request: 'Book Purchase Proposal', requestor: 'Sarah Ochieng', context: 'Math Dept.', date: '17 Jun, 03:15 PM', priority: 'normal' as const },
]

export const oversight_reports = {
  borrowingTrend: { direction: 'up' as const, value: '8.5%' },
  overdueTrend: { direction: 'down' as const, value: '3.2%' },
  bookingUtilization: 76,
  equipmentUsage: 64,
  spaceUtilization: 82,
  sparklineData: [650, 700, 780, 840, 900, 980],
}

export const executive_summary = {
  totalMembers: 2145,
  totalMembersTrend: { direction: 'up' as const, value: '9%' },
  activeStaff: 128,
  activeStaffTrend: { direction: 'stable' as const, value: '—' },
  systemUptime: '99.9%',
  uptimeStatus: 'Excellent',
  auditHighlights: 12,
  sensitiveActions: 5,
}

export const user_role_visibility = [
  { role: 'Students', icon: 'GraduationCap', count: 1780, status: 'Active' as const, color: 'text-[#2563EB]' },
  { role: 'Librarians & Staff', icon: 'Users', count: 24, status: 'Active' as const, color: 'text-[#0D9488]' },
  { role: 'Department Staff', icon: 'Briefcase', count: 98, status: 'Active' as const, color: 'text-[#8B5CF6]' },
  { role: 'Executives', icon: 'Star', count: 12, status: 'Active' as const, color: 'text-[#D97706]' },
  { role: 'Suspended Users', icon: 'UserX', count: 6, status: 'Suspended' as const, color: 'text-[#DC2626]' },
]

export const executive_announcements = [
  { id: 'ea1', title: 'AI Literacy Week 2026', detail: 'Workshops all week', status: 'New' as const, icon: 'Megaphone' },
  { id: 'ea2', title: 'Library Closed on Public Holiday', detail: 'Thursday, 26 June 2026', status: 'Notice' as const, icon: 'AlertTriangle' },
  { id: 'ea3', title: 'New E-Resources Added', detail: 'Springer & IEEE now available!', status: 'Update' as const, icon: 'CheckCircle2' },
]

export const reading_resources = [
  { id: 'rr1', type: 'book' as const, title: 'The Leader in You', author: 'Robin Sharma', tag: 'Featured Book' },
  { id: 'rr2', type: 'database' as const, title: 'Research Database', subtitle: 'JSTOR Collection', detail: 'Art, Humanities, Sciences' },
  { id: 'rr3', type: 'journal' as const, title: 'Digital Journal', subtitle: 'IEEE Xplore', detail: 'Engineering & Tech' },
  { id: 'rr4', type: 'ebook' as const, title: 'E-Book Collection', subtitle: 'Pearson eLibrary', detail: 'Academic Textbooks' },
]

export const upcoming_events = [
  { id: 'ue1', day: 23, month: 'JUN', title: 'Debate Club: Library Edition', time: '4:00 PM', venue: 'Reading Hall' },
  { id: 'ue2', day: 25, month: 'JUN', title: 'Author Meet & Greet', time: '3:30 PM', venue: 'AV Room' },
  { id: 'ue3', day: 27, month: 'JUN', title: 'Research Skills Workshop', time: '2:00 PM', venue: 'Computer Lab' },
  { id: 'ue4', day: 30, month: 'JUN', title: 'Book Fair Opening', time: '10:00 AM', venue: 'Library Foyer' },
]

export const performance_snapshot = {
  collectionsUsage: 76,
  spaceUtilization: 82,
  equipmentUsage: 64,
  userSatisfaction: 92,
}

export const system_health = {
  status: 'Healthy' as const,
  uptime: '99.9%',
  services: [
    { name: 'API', status: 'Running' as const },
    { name: 'Database', status: 'Running' as const },
    { name: 'QR Service', status: 'Running' as const },
    { name: 'Notifications', status: 'Running' as const },
  ],
}
