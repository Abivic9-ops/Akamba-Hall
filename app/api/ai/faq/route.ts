import { NextResponse } from 'next/server'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GROQ_KEY = process.env.GROQ_API_KEY
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent'
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM = `You are the Akamba Hall Library FAQ assistant at Starehe Boys' Centre.
Answer questions about library hours, policies, borrowing, returns, fines, study spaces, equipment, digital resources, events, and membership.
Be concise, friendly, and specific. If you don't know the exact answer, say so honestly.
Always answer in 2-4 sentences max. Use bullet points only when listing multiple items.`

const LIBRARY_CONTEXT = `Library facts:
- Hours: Mon-Fri 7:30 AM - 6:00 PM, Sat 8:00 AM - 1:00 PM, closed Sundays
- Borrowing: Students can borrow up to 3 books for 14 days. Staff up to 5 for 21 days.
- Fines: KES 10 per day per overdue book
- Study spaces: 4 group study rooms (bookable via portal), quiet study zone, computer lab with 20 terminals
- Equipment lending: Laptops, projectors, headphones available for in-library use
- Digital resources: E-books, journals, past papers accessible via the portal
- QR cards: Required for all borrowing and space access. Get yours from the front desk.
- Membership: All registered Starehe students and staff are automatic members
- Events: Monthly reading challenges, research workshops, author visits
- Holds: Place holds via the portal, notified when available
- Renewals: Extend loans via the portal up to 2 times if no one else has placed a hold`

export async function POST(request: Request) {
  try {
    const { question } = await request.json() as { question: string }

    const prompt = `${LIBRARY_CONTEXT}\n\nUser question: ${question}`

    let response = ''

    if (GEMINI_KEY) {
      try {
        const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM }] },
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.4, maxOutputTokens: 256 },
          }),
          signal: AbortSignal.timeout(8000),
        })
        if (res.ok) {
          const data = await res.json()
          response = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
        }
      } catch { /* try next */ }
    }

    if (GROQ_KEY && !response) {
      try {
        const res = await fetch(GROQ_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GROQ_KEY}` },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: SYSTEM },
              { role: 'user', content: prompt },
            ],
            temperature: 0.4,
            max_tokens: 256,
          }),
          signal: AbortSignal.timeout(8000),
        })
        if (res.ok) {
          const data = await res.json()
          response = data.choices?.[0]?.message?.content ?? ''
        }
      } catch { /* try next */ }
    }

    if (OPENROUTER_KEY && !response) {
      try {
        const res = await fetch(OPENROUTER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENROUTER_KEY}`,
            'HTTP-Referer': 'https://akamba-hall-stareheboyscentre.vercel.app',
            'X-Title': 'Akamba AI',
          },
          body: JSON.stringify({
            model: 'google/gemma-4-31b-it:free',
            messages: [
              { role: 'system', content: SYSTEM },
              { role: 'user', content: prompt },
            ],
            temperature: 0.4,
            max_tokens: 256,
          }),
          signal: AbortSignal.timeout(15000),
        })
        if (res.ok) {
          const data = await res.json()
          response = data.choices?.[0]?.message?.content ?? ''
        }
      } catch { /* try next */ }
    }

    if (!response) {
      return NextResponse.json({ answer: 'I couldn\'t find an answer right now. Please try again or visit the front desk for assistance.' })
    }

    return NextResponse.json({ answer: response.trim() })
  } catch {
    return NextResponse.json({ answer: 'Something went wrong. Please try again.' })
  }
}
