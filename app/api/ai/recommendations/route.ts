import { NextResponse } from 'next/server'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GROQ_KEY = process.env.GROQ_API_KEY

const SYSTEM = `You are a book recommendation engine for Akamba Hall Library at the University of Nairobi.
Based on the user's interests, course, or preferences, recommend 5 books available in a typical academic library.
For each book, provide: title, author, a one-sentence reason why it is recommended.
Return ONLY a JSON array of objects with "title", "author", and "reason" fields. No markdown, no explanation.
Example: [{"title": "Book Title", "author": "Author Name", "reason": "Why this book"}]`

export async function POST(request: Request) {
  try {
    const { interests, course, level } = await request.json() as {
      interests: string
      course: string
      level: string
    }

    const prompt = `Recommend books for a ${level || 'university'} student.
${course ? `Course: ${course}` : ''}
${interests ? `Interests: ${interests}` : 'General academic reading'}
Focus on books that would be available in a university library. Include a mix of classic and contemporary titles.`

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
              generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
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
            temperature: 0.7,
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
      return NextResponse.json({ recommendations: [] })
    }

    const match = response.match(/\[[\s\S]*\]/)
    const recommendations = match ? JSON.parse(match[0]) : []

    return NextResponse.json({ recommendations: recommendations.slice(0, 5) })
  } catch {
    return NextResponse.json({ recommendations: [] })
  }
}
