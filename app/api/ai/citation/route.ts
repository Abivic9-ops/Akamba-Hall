import { NextResponse } from 'next/server'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GROQ_KEY = process.env.GROQ_API_KEY
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent'
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM = `You are an academic citation assistant for Akamba Hall Library.
Format references in the requested citation style (APA, MLA, Chicago, Harvard, Vancouver).
Return ONLY the formatted citation text, no markdown fences, no explanation.
If multiple sources are provided, number each citation.
Be precise with punctuation, italics notation, and formatting conventions.`

export async function POST(request: Request) {
  try {
    const { title, author, year, style, type, source } = await request.json() as {
      title: string
      author: string
      year: string
      style: string
      type: string
      source: string
    }

    const prompt = `Format this ${type} in ${style} style:
Title: ${title}
Author: ${author}
Year: ${year}
Source/Publisher: ${source}
${type === 'journal' ? 'Include volume, issue, and page numbers if standard format.' : ''}
${type === 'website' ? 'Include URL access date if standard format.' : ''}`

    let response = ''

    if (GEMINI_KEY) {
      try {
        const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM }] },
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 256 },
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
            temperature: 0.3,
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
            temperature: 0.3,
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
      return NextResponse.json({ citation: 'Unable to generate citation. Please try again.', style })
    }

    return NextResponse.json({ citation: response.trim(), style })
  } catch {
    return NextResponse.json({ citation: 'An error occurred. Please try again.', style: '' })
  }
}
