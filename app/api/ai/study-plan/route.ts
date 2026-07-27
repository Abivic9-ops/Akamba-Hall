import { NextResponse } from 'next/server'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GROQ_KEY = process.env.GROQ_API_KEY

const SYSTEM = `You are an academic study planner for Akamba Hall Library.
Create a structured weekly study plan based on the student's courses, exam timeline, and study preferences.
Return the plan as a JSON object with: "title" (string), "duration" (string), "schedule" (array of objects with "day", "time", "subject", "activity", "duration_min" fields), and "tips" (array of 3 strings).
No markdown, no explanation. Just the JSON.`

export async function POST(request: Request) {
  try {
    const { courses, exam_date, study_hours, preferences } = await request.json() as {
      courses: string
      exam_date: string
      study_hours: string
      preferences: string
    }

    const prompt = `Create a study plan:
Courses: ${courses}
${exam_date ? `Exam date: ${exam_date}` : 'No specific exam deadline'}
Available study hours per day: ${study_hours || '3-4'}
${preferences ? `Preferences: ${preferences}` : 'No specific preferences'}
Focus on balanced coverage, active recall, and breaks. Include library study sessions.`

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
      return NextResponse.json({ plan: null })
    }

    const match = response.match(/\{[\s\S]*\}/)
    const plan = match ? JSON.parse(match[0]) : null

    return NextResponse.json({ plan })
  } catch {
    return NextResponse.json({ plan: null })
  }
}
