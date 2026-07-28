import { NextResponse } from 'next/server'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GROQ_KEY = process.env.GROQ_API_KEY
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent'
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM = `You are a book summary assistant for a university library.
Generate a concise, helpful book summary. Return JSON only, no markdown.
Shape: { "title" (string), "author" (string), "summary" (string, 3-5 sentences),
"key_takeaways" (array of 3-5 strings), "reading_level" (string: "Beginner"|"Intermediate"|"Advanced"),
"who_should_read" (string, 1-2 sentences), "similar_books" (array of 2-3 strings) }`

export async function POST(request: Request) {
  try {
    const { title, author } = await request.json() as { title: string; author?: string }

    const prompt = `Summarize this book:
Title: ${title}
${author ? `Author: ${author}` : 'Author: unknown'}
Include a brief summary, key takeaways, reading level, who should read it, and similar book recommendations.`

    let response = ''

    if (GEMINI_KEY) {
      try {
        const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM }] },
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.6, maxOutputTokens: 1024 },
          }),
          signal: AbortSignal.timeout(12000),
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
            temperature: 0.6,
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
            temperature: 0.6,
            max_tokens: 1024,
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
      return NextResponse.json({ summary: null })
    }

    const match = response.match(/\{[\s\S]*\}/)
    const summary = match ? JSON.parse(match[0]) : null

    return NextResponse.json({ summary })
  } catch {
    return NextResponse.json({ summary: null })
  }
}
