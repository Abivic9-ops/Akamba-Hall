import { NextResponse } from 'next/server'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GROQ_KEY = process.env.GROQ_API_KEY
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

function build_system_prompt(mode: string, user_data: unknown): string {
  const base = `You are Akamba AI, the official AI assistant of the Akamba Hall Library at the University of Nairobi.
You are helpful, concise, and professional. You help users with library services, books, research, study spaces, and more.
Always respond in a friendly but professional tone. Keep responses concise (2-4 sentences) unless the user asks for detail.
If you don't know the answer, say so honestly and direct them to library staff or the contact number +254 727 531 001.
You can help with: book recommendations, citation formatting (APA, MLA, Chicago), library policies, study tips, and general academic support.`

  if (mode === 'authenticated' && user_data) {
    const u = user_data as { name?: string; studentId?: string; role?: string }
    return `${base}

The current user is ${u.name ?? 'a member'} (${u.studentId ?? 'N/A'}), role: ${u.role ?? 'member'}.
You have access to their library account and can help with renewing books, viewing borrow history, booking spaces, and managing their account.
When they ask about their account, use their details to personalize your response.`
  }

  return `${base}

You are in PUBLIC mode. You can only answer general library questions.
You cannot access any personal account data. If the user asks about their account, ask them to log in first.
Do not make up book titles, authors, or information that you are not sure about.`
}

async function call_gemini(system_prompt: string, messages: ChatMessage[]): Promise<string> {
  if (!GEMINI_KEY) throw new Error('Gemini API key not configured')

  const contents = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system_prompt }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }),
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) throw new Error(`Gemini error: ${res.status}`)
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
}

async function call_groq(system_prompt: string, messages: ChatMessage[]): Promise<string> {
  if (!GROQ_KEY) throw new Error('Groq API key not configured')

  const all_msgs = [
    { role: 'system', content: system_prompt },
    ...messages.filter((m) => m.role !== 'system'),
  ]

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: all_msgs,
      temperature: 0.7,
      max_tokens: 1024,
    }),
    signal: AbortSignal.timeout(10000),
  })

  if (!res.ok) throw new Error(`Groq error: ${res.status}`)
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}

async function call_openrouter(system_prompt: string, messages: ChatMessage[]): Promise<string> {
  if (!OPENROUTER_KEY) throw new Error('OpenRouter API key not configured')

  const all_msgs = [
    { role: 'system', content: system_prompt },
    ...messages.filter((m) => m.role !== 'system'),
  ]

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      'HTTP-Referer': 'https://akambahall.vercel.app',
      'X-Title': 'Akamba AI',
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      messages: all_msgs,
      temperature: 0.7,
      max_tokens: 1024,
    }),
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) throw new Error(`OpenRouter error: ${res.status}`)
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messages, mode, user } = body as {
      messages: ChatMessage[]
      mode: string
      user: unknown
    }

    if (!messages?.length) {
      return NextResponse.json({ error: 'Messages required' }, { status: 400 })
    }

    const system_prompt = build_system_prompt(mode, user)

    // Try providers in order: Gemini → Groq → OpenRouter
    let response = ''
    const errors: string[] = []

    try {
      response = await call_gemini(system_prompt, messages)
    } catch (e) {
      errors.push(`Gemini: ${(e as Error).message}`)
    }

    if (!response) {
      try {
        response = await call_groq(system_prompt, messages)
      } catch (e) {
        errors.push(`Groq: ${(e as Error).message}`)
      }
    }

    if (!response) {
      try {
        response = await call_openrouter(system_prompt, messages)
      } catch (e) {
        errors.push(`OpenRouter: ${(e as Error).message}`)
      }
    }

    if (!response) {
      console.error('All AI providers failed:', errors)
      return NextResponse.json(
        { response: 'I am temporarily unavailable. Please try again later or call +254 727 531 001 for assistance.' },
        { status: 200 }
      )
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { response: 'Something went wrong. Please try again later.' },
      { status: 200 }
    )
  }
}
