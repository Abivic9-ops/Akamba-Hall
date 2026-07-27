import { NextResponse } from 'next/server'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GROQ_KEY = process.env.GROQ_API_KEY

const SYSTEM = `You are a library renewal and booking assistant for Akamba Hall Library.
Help students with loan renewals, space bookings, and related questions.
Return JSON only, no markdown.
Shape: { "action" (string: "renewal"|"booking"|"general"), "message" (string, helpful response),
"steps" (array of 2-4 strings), "tips" (array of 1-2 strings) }`

const LIBRARY_CONTEXT = `Library rules:
- Loan period: 14 days for students, 21 days for staff
- Max renewals: 2 times per loan, only if no one has placed a hold
- Fines: KES 10 per day per overdue book
- Renewals: Done via the portal under "My Loans" → click "Renew"
- Study rooms: 4 rooms available, bookable in 1-hour slots via the portal
- Equipment: Laptops, projecters, headphones available for in-library use
- Bookings: Max 2 hours per session, can book up to 7 days in advance
- Cancellations: Must cancel at least 1 hour before the booking time`

export async function POST(request: Request) {
  try {
    const { question, context } = await request.json() as {
      question: string
      context?: string
    }

    const prompt = `${LIBRARY_CONTEXT}\n\n${context ? `User context: ${context}\n\n` : ''}User question: ${question}`

    let response = ''

    if (GEMINI_KEY) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM }] },
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.5, maxOutputTokens: 512 },
            }),
            signal: AbortSignal.timeout(10000),
          }
        )
        if (res.ok) {
          const data = await res.json()
          response = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
        }
      } catch { /* try next */ }
    }

    if (GROQ_KEY && !response) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GROQ_KEY}` },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
              { role: 'system', content: SYSTEM },
              { role: 'user', content: prompt },
            ],
            temperature: 0.5,
            max_tokens: 512,
          }),
          signal: AbortSignal.timeout(8000),
        })
        if (res.ok) {
          const data = await res.json()
          response = data.choices?.[0]?.message?.content ?? ''
        }
      } catch { /* try next */ }
    }

    if (!response) {
      return NextResponse.json({ result: null })
    }

    const match = response.match(/\{[\s\S]*\}/)
    const result = match ? JSON.parse(match[0]) : null

    return NextResponse.json({ result })
  } catch {
    return NextResponse.json({ result: null })
  }
}
