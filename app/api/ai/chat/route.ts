import { NextRequest, NextResponse } from 'next/server'

const LIBRARY_KB: Record<string, string> = {
  'hours': 'The Akamba Hall Library is open Monday–Friday, 7:30 AM – 9:00 PM, and Saturday 8:00 AM – 5:00 PM. It is closed on Sundays and public holidays.',
  'book': 'You can search for books in the Catalogue Search section of your portal. Use the search bar to find books by title, author, ISBN, or category. You can also filter by availability.',
  'loan': 'Active loans can be viewed under "Holds & Returns" in your portal. You can renew a loan up to 2 times if no one else has placed a hold on the item.',
  'hold': 'To place a hold on an unavailable book, open the book detail page and click "Place Hold." You will be notified when it becomes available for pickup.',
  'fine': 'Fines are charged at KES 10 per day for overdue items. You can view and pay your fines under "Fines & Charges" in your portal.',
  'room': 'Study rooms and the boardroom can be booked through "AV & Boardroom" or "Equipment Booking" in your portal. Bookings are subject to availability.',
  'return': 'Books can be returned at the circulation desk during opening hours. Please bring your access card or show your digital card in the portal.',
  'renew': 'To renew a loan, go to "Holds & Returns" and click the renew button next to the item. You can renew up to 2 times if no holds exist.',
  'card': 'Your digital access card is available in your portal under "Digital Card." You can show the QR code at the circulation desk for check-in.',
  'events': 'Library events are listed in the "Events" section of your portal. You can RSVP to upcoming events directly.',
  'help': 'For help, visit the "Help Centre" in your portal, or ask me anything about the library system!',
  'ai': 'I am an AI assistant for the Akamba Hall Library. I can help with book searches, loan management, citations, study plans, and general library questions.',
  'citation': 'You can generate citations in APA, MLA, Chicago, Harvard, or Vancouver formats. Go to the Resources section and look for the Citation Generator.',
  'recommendation': 'I can suggest books based on your interests! Tell me what subjects or topics you are interested in, and I will recommend books from our collection.',
}

function find_answer(query: string): string {
  const lower = query.toLowerCase()
  for (const [keyword, answer] of Object.entries(LIBRARY_KB)) {
    if (lower.includes(keyword)) return answer
  }
  return 'I can help with library hours, book searches, loans, holds, fines, room bookings, citations, and more. Could you rephrase your question or ask about a specific topic?'
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }
    const reply = find_answer(message)
    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
