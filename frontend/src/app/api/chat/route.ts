import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { checkRateLimit } from '@/lib/rateLimiter';

/**
 * POST /api/chat — Server-Side Anthropic Proxy
 *
 * This is the ONLY place the Anthropic API key is used.
 * The key is read from process.env.ANTHROPIC_API_KEY (server-only).
 *
 * Security layers:
 *   1. Auth guard (Supabase JWT from cookies)
 *   2. Input validation (Zod schema)
 *   3. Rate limiting (per user_id)
 *   4. Server-side Anthropic API call
 *   5. Sanitized response (only { reply } — never the key or raw errors)
 */

// ─── Input Validation Schema ───
const ChatRequestSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(4000, 'Message too long (max 4000 characters)')
    .transform((s) => s.trim()),
});

// ─── Anthropic Client (server-only, lazily initialized) ───
let anthropicClient: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

// ─── System Prompt ───
const SYSTEM_PROMPT = `You are BIT Library AI — an academic assistant for BIT Sathy (Bannari Amman Institute of Technology) students. You help with:
- Explaining academic concepts clearly
- Solving engineering problems step-by-step
- Providing study tips and exam strategies
- Answering questions about subjects like Mathematics, Physics, Chemistry, and Engineering topics

Be concise, accurate, and encouraging. Use LaTeX notation for math expressions when relevant.`;

export async function POST(request: Request) {
  try {
    // ─── 1. Auth Guard ───
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    // ─── 2. Input Validation ───
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400 }
      );
    }

    const parseResult = ChatRequestSchema.safeParse(body);
    if (!parseResult.success) {
      const errorMessage = parseResult.error.issues[0]?.message || 'Invalid input.';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { message } = parseResult.data;

    // ─── 3. Rate Limiting ───
    const rateLimitResult = await checkRateLimit(user.id);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rateLimitResult.reset - Date.now()) / 1000)) } }
      );
    }

    // ─── 4. Anthropic API Call (server-side only) ───
    const client = getAnthropicClient();

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message }],
    });

    // Extract text from response
    const replyText =
      response.content
        .filter((block) => block.type === 'text')
        .map((block) => {
          if (block.type === 'text') return block.text;
          return '';
        })
        .join('\n') || 'No response generated.';

    // ─── 5. Log (never log the raw prompt) ───
    console.log(
      JSON.stringify({
        event: 'chat_request',
        user_id: user.id,
        timestamp: new Date().toISOString(),
        model: response.model,
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      })
    );

    // ─── 6. Return sanitized response ───
    return NextResponse.json({ reply: replyText });
  } catch (error: unknown) {
    // Never expose internal errors or API details to the client
    console.error('Chat API error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
