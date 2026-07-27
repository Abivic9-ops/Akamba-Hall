import { NextResponse } from 'next/server'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GROQ_KEY = process.env.GROQ_API_KEY

const SYSTEM = `You are a research assistant for Akamba Hall Library at Starehe Boys' Centre.
Help students with academic research by providing structured guidance.
Return JSON only, no markdown.
Shape: { "topic_refined" (string), "research_question" (string),
"keywords" (array of 5-8 strings), "search_strategies" (array of 3-4 objects with "strategy" and "description" fields),
"recommended_databases" (array of 3-4 objects with "name" and "what_for" fields),
"citation_tips" (string, 1-2 sentences),
"next_steps" (array of 3 strings) }`

export async function POST(request: Request) {
  try {
    const { topic, subject, level } = await request.json() as {
      topic: string
      subject?: string
      level?: string
    }

    const prompt = `Help me research this topic:
Topic: ${topic}
${subject ? `Subject/Course: ${subject}` : ''}
${level ? `Level: ${level}` : 'Level: High school'}
Provide a refined topic, research question, keywords, search strategies, recommended databases, citation tips, and next steps.`

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
              generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
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
            temperature: 0.7,
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
      return NextResponse.json({ result: null })
    }

    const match = response.match(/\{[\s\S]*\}/)
    const result = match ? JSON.parse(match[0]) : null

    return NextResponse.json({ result })
  } catch {
    return NextResponse.json({ result: null })
  }
}
