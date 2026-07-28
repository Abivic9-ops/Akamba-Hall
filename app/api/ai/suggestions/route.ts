import { NextResponse } from 'next/server'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GROQ_KEY = process.env.GROQ_API_KEY
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent'
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM = `You are a search suggestion engine for Akamba Hall Library at the University of Nairobi.
Given a partial search query, generate 5 relevant search suggestions related to books, courses, or library topics.
Return ONLY a JSON array of strings, no markdown, no explanation. Example: ["suggestion 1", "suggestion 2"]
Suggestions should be concise (2-5 words each) and relevant to an academic library.`

export async function POST(request: Request) {
  try {
    const { query } = await request.json() as { query: string }
    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] })
    }

    const prompt = `Partial query: "${query}"`

    let response = ''

    if (GEMINI_KEY) {
      try {
        const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM }] },
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.5, maxOutputTokens: 256 },
          }),
          signal: AbortSignal.timeout(5000),
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
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GROQ_KEY}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: SYSTEM },
              { role: 'user', content: prompt },
            ],
            temperature: 0.5,
            max_tokens: 256,
          }),
          signal: AbortSignal.timeout(5000),
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
            temperature: 0.5,
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
      return NextResponse.json({ suggestions: [] })
    }

    const match = response.match(/\[[\s\S]*\]/)
    const suggestions = match ? JSON.parse(match[0]) : []

    return NextResponse.json({ suggestions: suggestions.slice(0, 5) })
  } catch {
    return NextResponse.json({ suggestions: [] })
  }
}
