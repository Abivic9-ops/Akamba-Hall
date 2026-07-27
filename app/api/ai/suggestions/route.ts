import { NextResponse } from 'next/server'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GROQ_KEY = process.env.GROQ_API_KEY

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

    // Try Gemini first
    if (GEMINI_KEY && !response) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM }] },
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.5, maxOutputTokens: 256 },
            }),
            signal: AbortSignal.timeout(5000),
          }
        )
        if (res.ok) {
          const data = await res.json()
          response = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
        }
      } catch { /* try next */ }
    }

    // Fallback to Groq
    if (GROQ_KEY && !response) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GROQ_KEY}`,
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
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
