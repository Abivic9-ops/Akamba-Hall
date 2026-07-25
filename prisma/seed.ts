import 'dotenv/config'
import { PrismaClient, type AnnouncementCategory, type EventCategory, type PolicyCategory, type EquipmentStatus } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('\x1b[31m✗ Missing DATABASE_URL in .env\x1b[0m')
  process.exit(1)
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = process.env.SUPER_ADMIN_EMAIL
  const password = process.env.SUPER_ADMIN_PASSWORD
  const fullName = process.env.SUPER_ADMIN_NAME || 'System Administrator'

  if (!email || !password) {
    console.error('\x1b[31m✗ Missing SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD in .env\x1b[0m')
    process.exit(1)
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('\x1b[31m✗ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env\x1b[0m')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // ─── SUPER ADMIN ───────────────────────────────
  console.log('\x1b[36m→ Seeding super admin...\x1b[0m')

  let authUserId: string
  const { data: existingAuth } = await supabase.auth.admin.listUsers()
  const found = existingAuth.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())

  if (found) {
    authUserId = found.id
    const currentRole = found.app_metadata?.role
    if (currentRole !== 'SUPER_ADMIN') {
      await supabase.auth.admin.updateUserById(authUserId, {
        app_metadata: { role: 'SUPER_ADMIN' },
      })
    }
    console.log(`\x1b[33m✓ Auth user already exists (${email}). Reusing.\x1b[0m`)
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email: email.toLowerCase(),
      password,
      email_confirm: true,
      app_metadata: { role: 'SUPER_ADMIN' },
      user_metadata: { full_name: fullName },
    })
    if (error) {
      console.error('\x1b[31m✗ Failed to create auth user:', error.message, '\x1b[0m')
      process.exit(1)
    }
    authUserId = data.user.id
    console.log(`\x1b[32m✓ Auth user created (${email})\x1b[0m`)
  }

  await prisma.user.upsert({
    where: { id: authUserId },
    update: { role: 'SUPER_ADMIN', memberType: 'STAFF', status: 'ACTIVE', email: email.toLowerCase(), fullName },
    create: { id: authUserId, email: email.toLowerCase(), fullName, role: 'SUPER_ADMIN', memberType: 'STAFF', status: 'ACTIVE' },
  })

  console.log(`\x1b[32m✓ Super admin profile created/updated\x1b[0m`)

  // ─── SPACES ────────────────────────────────────
  console.log('\n\x1b[36m→ Seeding spaces...\x1b[0m')

  const spaces = [
    { name: 'Main Reading Hall', capacity: 120, type: 'READING_HALL' as const },
    { name: 'Study Room A', capacity: 8, type: 'STUDY_ROOM' as const },
    { name: 'Study Room B', capacity: 8, type: 'STUDY_ROOM' as const },
    { name: 'Audio Visual Room', capacity: 30, type: 'AVR' as const },
    { name: 'Boardroom', capacity: 16, type: 'BOARDROOM' as const },
    { name: 'Computer Lab', capacity: 25, type: 'COMPUTER_LAB' as const },
    { name: 'Innovation Corner', capacity: 12, type: 'INNOVATION_CORNER' as const },
  ]

  for (const space of spaces) {
    await prisma.space.upsert({
      where: { id: space.name },
      update: {},
      create: space,
    })
  }
  console.log(`\x1b[32m✓ ${spaces.length} spaces created\x1b[0m`)

  // ─── BOOKS ─────────────────────────────────────
  console.log('\n\x1b[36m→ Seeding books...\x1b[0m')

  const booksData = [
    { title: 'Advanced Physics: Principles and Applications', author: 'Serway & Jewett', isbn: '978-1-133-94727-1', category: 'Science', year: 2022, copies: 3 },
    { title: 'Teaching Mathematics in East Africa', author: 'Omenko & Gathemo', isbn: '978-9966-728-45-1', category: 'Education', year: 2021, copies: 2 },
    { title: 'Laboratory Safety Manual', author: 'Kenya Institute of Education', isbn: '978-9966-728-12-3', category: 'Reference', year: 2023, copies: 5 },
    { title: 'The Kenya Environment: A Reference Guide', author: 'Ochieng & Ngesa', isbn: '978-9966-728-56-7', category: 'Science', year: 2020, copies: 2 },
    { title: 'Data Structures and Algorithms in Java', author: 'Goodrich, Tamassia & Goldwasser', isbn: '978-1-118-77133-4', category: 'Computer Science', year: 2022, copies: 3 },
    { title: 'A History of East Africa', author: 'Bennett & Rosberg', isbn: '978-0-521-10384-4', category: 'History', year: 2019, copies: 4 },
    { title: 'Organic Chemistry', author: 'Clayden, Greeves & Warren', isbn: '978-0-19-927029-3', category: 'Science', year: 2021, copies: 3 },
    { title: 'Introduction to Business Studies', author: 'Kibet & Arasa', isbn: '978-9966-728-78-2', category: 'Business', year: 2022, copies: 4 },
    { title: 'Kiswahili Fasihi ya Moderi', author: "Ng'ang'a Mwangi", isbn: '978-9966-728-33-6', category: 'Languages', year: 2020, copies: 3 },
    { title: 'Geography of Kenya and the World', author: 'Kenya Institute of Education', isbn: '978-9966-728-21-4', category: 'Geography', year: 2021, copies: 4 },
    { title: 'English Grammar in Use', author: 'Raymond Murphy', isbn: '978-1-107-61038-5', category: 'Languages', year: 2019, copies: 6 },
    { title: 'Principles of Economics', author: 'Mankiw', isbn: '978-1-285-16587-5', category: 'Business', year: 2022, copies: 3 },
    { title: 'Computer Studies for Secondary Schools', author: 'Owino & Kibe', isbn: '978-9966-728-90-4', category: 'Computer Science', year: 2023, copies: 5 },
    { title: 'Biology: A Global Approach', author: 'Campbell & Reece', isbn: '978-0-321-55823-7', category: 'Science', year: 2021, copies: 3 },
    { title: 'Literature in English: An Anthology', author: 'Wanjala & Nandy', isbn: '978-9966-728-44-4', category: 'Literature', year: 2020, copies: 4 },
    { title: 'Mathematics for Form 3', author: 'J.K. Mwangi', isbn: '978-9966-728-67-6', category: 'Mathematics', year: 2022, copies: 5 },
    { title: 'Christian Religious Education Form 4', author: 'Kogo & Kiptoo', isbn: '978-9966-728-55-0', category: 'Religious Studies', year: 2021, copies: 3 },
    { title: 'Home Science: A Practical Approach', author: 'Wambua & Ndeti', isbn: '978-9966-728-34-3', category: 'Home Science', year: 2020, copies: 2 },
    { title: 'AI Literacy: Understanding Artificial Intelligence', author: 'Starehe AI Club', isbn: '978-9966-001-01-2', category: 'Computer Science', year: 2024, copies: 4 },
    { title: 'Financial Literacy for Young Adults', author: 'Central Bank of Kenya', isbn: '978-9966-001-02-9', category: 'Business', year: 2024, copies: 5 },
    { title: 'Creative Arts and Design', author: 'Ochieng Odongo', isbn: '978-9966-728-88-1', category: 'Arts', year: 2022, copies: 2 },
    { title: 'Physics Practical Manual', author: 'KIE Physics Panel', isbn: '978-9966-728-77-5', category: 'Science', year: 2023, copies: 4 },
    { title: 'The Making of Modern Kenya', author: 'Bethwell Allan Ogot', isbn: '978-9966-728-62-1', category: 'History', year: 2019, copies: 3 },
    { title: 'Chemistry: Structure and Bonding', author: 'Peter Yaffe & Alan Cooksey', isbn: '978-0-19-573082-1', category: 'Science', year: 2021, copies: 3 },
    { title: 'Entrepreneurship Education for Kenya', author: 'Njoroge & Gathogo', isbn: '978-9966-728-99-7', category: 'Business', year: 2023, copies: 3 },
    { title: 'Map Reading and Interpretation', author: 'Kamau & Wambugu', isbn: '978-9966-728-41-3', category: 'Geography', year: 2020, copies: 3 },
    { title: 'Set Book: The River Between', author: 'Ngugi wa Thiong\'o', isbn: '978-0-14-118702-1', category: 'Literature', year: 2018, copies: 8 },
    { title: 'Set Book: A Grain of Wheat', author: 'Ngugi wa Thiong\'o', isbn: '978-0-14-118703-8', category: 'Literature', year: 2018, copies: 8 },
    { title: 'Python Programming for Beginners', author: 'John Smith & Peter Kariuki', isbn: '978-9966-001-03-6', category: 'Computer Science', year: 2024, copies: 4 },
    { title: 'Mental Health and Wellness Guide', author: 'Dr. Amina Hassan', isbn: '978-9966-001-04-3', category: 'Health', year: 2024, copies: 3 },
  ]

  const createdBooks = []
  for (const book of booksData) {
    const created = await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category: book.category,
        year: book.year,
        description: `A comprehensive resource for ${book.category} studies at Starehe Boys' Centre.`,
      },
    })

    for (let i = 0; i < book.copies; i++) {
      await prisma.copy.create({
        data: {
          bookId: created.id,
          barcode: `BKL-${String(created.id.slice(0, 4)).toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
          shelfLocation: `${book.category.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(2, '0')}`,
          status: 'AVAILABLE',
        },
      })
    }
    createdBooks.push(created)
  }
  console.log(`\x1b[32m✓ ${createdBooks.length} books with copies created\x1b[0m`)

  // ─── COURSES ───────────────────────────────────
  console.log('\n\x1b[36m→ Seeding courses...\x1b[0m')

  const coursesData = [
    { code: 'PHY 401', name: 'Advanced Physics', department: 'Science', formLevel: 4, materialCount: 15, instructor: 'Mr. James Mwangi' },
    { code: 'MTH 302', name: 'Mathematics', department: 'Mathematics', formLevel: 3, materialCount: 12, instructor: 'Ms. Sarah Ochieng' },
    { code: 'CHM 401', name: 'Chemistry', department: 'Science', formLevel: 4, materialCount: 14, instructor: 'Dr. Peter Ngesa' },
    { code: 'ENG 201', name: 'English Language', department: 'Languages', formLevel: 2, materialCount: 10, instructor: 'Ms. Grace Wanjiku' },
    { code: 'HIS 301', name: 'History & Government', department: 'Humanities', formLevel: 3, materialCount: 8, instructor: 'Mr. David Otieno' },
    { code: 'BIO 401', name: 'Biology', department: 'Science', formLevel: 4, materialCount: 13, instructor: 'Dr. Alice Akinyi' },
    { code: 'GEO 201', name: 'Geography', department: 'Humanities', formLevel: 2, materialCount: 7, instructor: 'Mr. Peter Kamau' },
    { code: 'CSC 301', name: 'Computer Studies', department: 'Computer Science', formLevel: 3, materialCount: 11, instructor: 'Mr. Kevin Otieno' },
    { code: 'KIS 401', name: 'Kiswahili', department: 'Languages', formLevel: 4, materialCount: 9, instructor: 'Ms. Amina Hassan' },
    { code: 'BUS 201', name: 'Business Studies', department: 'Business', formLevel: 2, materialCount: 8, instructor: 'Mr. John Kariuki' },
    { code: 'AIL 101', name: 'AI Literacy', department: 'Computer Science', formLevel: 1, materialCount: 6, instructor: 'Mr. Kevin Otieno' },
    { code: 'FIN 101', name: 'Financial Literacy', department: 'Business', formLevel: 1, materialCount: 5, instructor: 'Mr. John Kariuki' },
  ]

  for (const course of coursesData) {
    await prisma.course.upsert({
      where: { code: course.code },
      update: {},
      create: course,
    })
  }
  console.log(`\x1b[32m✓ ${coursesData.length} courses created\x1b[0m`)

  // ─── E-RESOURCES ───────────────────────────────
  console.log('\n\x1b[36m→ Seeding e-resources...\x1b[0m')

  const eresourcesData = [
    { title: 'JSTOR', provider: 'ITHAKA', description: 'Academic journals, books, and primary sources across multiple disciplines.', url: 'https://www.jstor.org', category: 'Journals' },
    { title: 'EBSCOhost', provider: 'EBSCO Information Services', description: 'Research databases for academic, medical, and business information.', url: 'https://www.ebsco.com', category: 'Databases' },
    { title: 'Koha OPAC', provider: 'Starehe Library', description: 'Online public access catalogue for searching the local collection.', url: '#', category: 'Catalogue' },
    { title: 'Kenya Libraries Portal', provider: 'Kenya National Library Service', description: 'National library network digital resources and inter-library loans.', url: 'https://www.knls.ac.ke', category: 'National' },
    { title: 'Digital School Library', provider: 'Starehe Library', description: 'E-books and digital reading materials for curriculum support.', url: '#', category: 'E-Books' },
    { title: 'Google Scholar', provider: 'Google', description: 'Search for scholarly literature including theses, books, and articles.', url: 'https://scholar.google.com', category: 'Search Engines' },
    { title: 'Khan Academy', provider: 'Khan Academy', description: 'Free online courses and practice exercises for multiple subjects.', url: 'https://www.khanacademy.org', category: 'Learning Platforms' },
  ]

  for (const resource of eresourcesData) {
    await prisma.eResource.create({ data: resource })
  }
  console.log(`\x1b[32m✓ ${eresourcesData.length} e-resources created\x1b[0m`)

  // ─── ANNOUNCEMENTS ─────────────────────────────
  console.log('\n\x1b[36m→ Seeding announcements...\x1b[0m')

  const announcementsData: { title: string; body: string; category: AnnouncementCategory; isPinned: boolean }[] = [
    { title: 'Library Closure: Christmas Holiday', body: 'The library will be closed from December 20th to January 3rd for the Christmas and New Year holiday. All outstanding loans will have their due dates extended accordingly.', category: 'CLOSURE', isPinned: true },
    { title: 'New AI Literacy Books Available', body: 'We have received a new batch of AI Literacy and Financial Literacy books. Visit the catalogue to reserve your copy today!', category: 'ACQUISITION', isPinned: false },
    { title: 'Research Skills Workshop', body: 'Join us for a hands-on workshop on academic research skills, citation management, and using e-resources effectively. Limited to 30 participants.', category: 'WORKSHOP', isPinned: false },
    { title: 'Updated Borrowing Policy', body: 'Effective next term, the maximum loan period for staff members has been extended from 3 weeks to 4 weeks. Student loan periods remain at 2 weeks.', category: 'POLICY', isPinned: false },
    { title: 'E-Resource Access: JSTOR Now Available', body: 'We are pleased to announce that JSTOR is now accessible from all school computers. Remote access instructions will be shared with senior students.', category: 'ERESOURCE', isPinned: false },
    { title: 'Read-a-Thon Challenge', body: 'Complete 10 books this term and earn the Gold Reader badge! Track your progress on your student dashboard. Prizes will be awarded at the end of term assembly.', category: 'CAMPAIGN', isPinned: false },
    { title: 'Boardroom Maintenance Notice', body: 'The boardroom will undergo minor maintenance on Friday. Booking requests for Friday will be temporarily unavailable.', category: 'CLOSURE', isPinned: false },
  ]

  for (const announcement of announcementsData) {
    await prisma.announcement.create({
      data: {
        ...announcement,
        authorId: authUserId,
        targetRoles: ['STUDENT', 'STAFF', 'EXECUTIVE'],
        publishedAt: new Date(),
      },
    })
  }
  console.log(`\x1b[32m✓ ${announcementsData.length} announcements created\x1b[0m`)

  // ─── EVENTS ────────────────────────────────────
  console.log('\n\x1b[36m→ Seeding events...\x1b[0m')

  const now = new Date()
  const eventsData: { title: string; description: string; venue: string; startTime: Date; endTime: Date; category: EventCategory; maxAttendees: number }[] = [
    { title: 'AI Literacy Week', description: 'A week-long series of sessions on artificial intelligence, machine learning, and their applications in education.', venue: 'Audio Visual Room', startTime: new Date(now.getTime() + 3 * 86400000), endTime: new Date(now.getTime() + 3 * 86400000 + 7200000), category: 'WORKSHOP', maxAttendees: 30 },
    { title: 'Book Fair 2026', description: 'Annual book fair featuring local publishers and authors. Special discounts for students.', venue: 'Main Reading Hall', startTime: new Date(now.getTime() + 7 * 86400000), endTime: new Date(now.getTime() + 7 * 86400000 + 21600000), category: 'FAIR', maxAttendees: 200 },
    { title: 'Library Committee Meeting', description: 'Monthly meeting of the library committee to review operations and plan improvements.', venue: 'Boardroom', startTime: new Date(now.getTime() + 5 * 86400000 + 5400000), endTime: new Date(now.getTime() + 5 * 86400000 + 7200000), category: 'MEETING', maxAttendees: 16 },
    { title: 'Financial Literacy Workshop', description: 'Interactive workshop on personal finance, budgeting, and saving strategies for young adults.', venue: 'Audio Visual Room', startTime: new Date(now.getTime() + 10 * 86400000), endTime: new Date(now.getTime() + 10 * 86400000 + 5400000), category: 'WORKSHOP', maxAttendees: 40 },
    { title: 'Coding Club: Python Basics', description: 'Introduction to Python programming for beginners. Bring your laptop.', venue: 'Computer Lab', startTime: new Date(now.getTime() + 8 * 86400000 + 5400000), endTime: new Date(now.getTime() + 8 * 86400000 + 9000000), category: 'CLUB', maxAttendees: 25 },
  ]

  for (const event of eventsData) {
    await prisma.event.create({
      data: {
        ...event,
        authorId: authUserId,
        targetRoles: ['STUDENT', 'STAFF', 'EXECUTIVE'],
      },
    })
  }
  console.log(`\x1b[32m✓ ${eventsData.length} events created\x1b[0m`)

  // ─── POLICIES ──────────────────────────────────
  console.log('\n\x1b[36m→ Seeding policies...\x1b[0m')

  const policiesData: { title: string; description: string; category: PolicyCategory }[] = [
    { title: 'Borrowing Policy', description: 'Students may borrow up to 3 books at a time for a period of 2 weeks. Staff members may borrow up to 5 books for 4 weeks. Renewals are allowed twice, each extending the loan by 2 weeks. Books can be renewed online via the student/staff dashboard or in person at the circulation desk.', category: 'BORROWING' },
    { title: 'Late Return Policy', description: 'A fine of KES 50 per day is charged for each overdue book. Members with outstanding fines exceeding KES 500 will have their borrowing privileges suspended until the fine is settled. Fines can be paid at the school accounts office.', category: 'LATE_RETURN' },
    { title: 'Room Booking Policy', description: 'The Audio Visual Room and Boardroom can be booked for academic purposes. Bookings must be made at least 24 hours in advance. Each booking is limited to a maximum of 2 hours. Priority is given to library-organized events and academic activities.', category: 'ROOM_BOOKING' },
    { title: 'E-Resource Acceptable Use', description: 'E-resources are provided for academic use only. Users must not share login credentials, download entire journal issues, or use the resources for commercial purposes. Violations may result in suspension of access privileges.', category: 'ERESOURCE' },
    { title: 'Incident Reporting Protocol', description: 'All incidents involving library resources, facilities, or member conduct must be reported immediately to the library head or circulation desk. Reports can also be submitted through the issue log on the student/staff dashboard.', category: 'INCIDENT' },
    { title: 'Code of Conduct', description: 'All library users are expected to maintain a quiet and respectful environment. Mobile phones should be on silent mode. Food and drinks are not allowed in the reading areas. Misuse of library resources or facilities may result in disciplinary action.', category: 'CONDUCT' },
  ]

  for (const policy of policiesData) {
    await prisma.policy.create({ data: policy })
  }
  console.log(`\x1b[32m✓ ${policiesData.length} policies created\x1b[0m`)

  // ─── EQUIPMENT ─────────────────────────────────
  console.log('\n\x1b[36m→ Seeding equipment...\x1b[0m')

  const equipmentData: { name: string; description: string; category: string; status: EquipmentStatus; location: string }[] = [
    { name: 'Epson Projector', description: 'HD projector for presentations and video screenings', category: 'Audio Visual', status: 'AVAILABLE', location: 'AVR' },
    { name: 'Laptop - Dell Inspiron', description: 'Student laptop for research and assignments', category: 'Computing', status: 'AVAILABLE', location: 'Computer Lab' },
    { name: 'Portable Speaker', description: 'Bluetooth speaker for events and workshops', category: 'Audio Visual', status: 'AVAILABLE', location: 'AVR' },
    { name: 'Whiteboard (Mobile)', description: 'Portable whiteboard for group discussions', category: 'Furniture', status: 'AVAILABLE', location: 'Study Room A' },
    { name: 'Document Camera', description: 'Visualizer for displaying documents and books', category: 'Audio Visual', status: 'IN_USE', location: 'AVR' },
  ]

  for (const equipment of equipmentData) {
    await prisma.equipment.create({ data: equipment })
  }
  console.log(`\x1b[32m✓ ${equipmentData.length} equipment items created\x1b[0m`)

  // ─── DIGITAL RESOURCES ─────────────────────────
  console.log('\n\x1b[36m→ Seeding digital resources...\x1b[0m')

  const digitalResourcesData = [
    { title: 'AI Literacy Presentation Slides', provider: 'Starehe AI Club', description: 'Comprehensive slides covering introduction to AI, machine learning basics, and real-world applications.', url: '#', category: 'Presentations', addedById: authUserId },
    { title: 'Financial Literacy Workbook', provider: 'CBK Education Division', description: 'Interactive workbook with exercises on budgeting, saving, and understanding banking.', url: '#', category: 'Workbooks', addedById: authUserId },
    { title: 'Physics Lab Report Template', provider: 'Science Department', description: 'Standardized template for physics practical reports following KIE guidelines.', url: '#', category: 'Templates', addedById: authUserId },
    { title: 'Study Skills Guide', provider: 'Library Head', description: 'Guide covering effective study techniques, time management, and exam preparation strategies.', url: '#', category: 'Guides', addedById: authUserId },
  ]

  for (const resource of digitalResourcesData) {
    await prisma.digitalResource.create({ data: resource })
  }
  console.log(`\x1b[32m✓ ${digitalResourcesData.length} digital resources created\x1b[0m`)

  // ─── SUMMARY ───────────────────────────────────
  console.log('\n\x1b[36m══════════════════════════════════════════\x1b[0m')
  console.log('\x1b[32m✓ Seed complete!\x1b[0m')
  console.log('\x1b[36m  Created:\x1b[0m')
  console.log(`    • ${spaces.length} spaces`)
  console.log(`    • ${createdBooks.length} books (with copies)`)
  console.log(`    • ${coursesData.length} courses`)
  console.log(`    • ${eresourcesData.length} e-resources`)
  console.log(`    • ${announcementsData.length} announcements`)
  console.log(`    • ${eventsData.length} events`)
  console.log(`    • ${policiesData.length} policies`)
  console.log(`    • ${equipmentData.length} equipment items`)
  console.log(`    • ${digitalResourcesData.length} digital resources`)
  console.log('\x1b[36m  Login with your SUPER_ADMIN credentials to start.\x1b[0m\n')
}

main()
  .catch((e) => {
    console.error('\x1b[31m✗ Seed failed:', e, '\x1b[0m')
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
