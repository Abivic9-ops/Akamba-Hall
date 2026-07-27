import { NextResponse } from 'next/server'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GROQ_KEY = process.env.GROQ_API_KEY

const SYSTEM = `You are a reading list curator for Akamba Hall Library at Starehe Boys' Centre.
Generate a personalized reading list. Return JSON only, no markdown.
Shape: { "title" (string), "books" (array of objects with "title", "author", "genre", "why_read" fields, exactly 6 books) }`

export async function POST(request: Request) {
  try {
    const { interests, course, mood } = await request.json() as {
      interests: string
      course?: string
      mood?: string
    }

    const prompt = `Create a reading list:
Interests: ${interests}
${course ? `Course: ${course}` : ''}
${mood ? `Current mood/feeling: ${mood}` : ''}
Recommend 6 books that would be available in a school library. Include fiction and non-fiction. Each book needs a short reason why the student should read it.`

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
              generationConfig: { temperature: 0.8, maxOutputTokens: 1024 },
            }),
            signal: AbortSignal.timeout(12000),
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
            temperature: 0.8,
            max_tokens: 1024,
          }),
          signal: AbortSignal.timeout(10000),
        })
        if (res.ok) {
          const data = await res.json()
          response = data.choices?.[0]?.message?.content ?? ''
        }
      } catch { /* try next */ }
    }

    if (!response) {
      return NextResponse.json({ reading_list: null })
    }

    const match = response.match(/\{[\s\S]*\}/)
    const reading_list = match ? JSON.parse(match[0]) : null

    return NextResponse.json({ reading_list })
  } catch {
    return NextResponse.json({ reading_list: null })
  }
}
