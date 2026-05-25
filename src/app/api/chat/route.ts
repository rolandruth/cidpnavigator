import { NextRequest, NextResponse } from 'next/server';
import { streamAnswer, ChatMessage } from '@/lib/rag';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let message: string;
  let history: ChatMessage[];

  try {
    const body = await req.json();
    message = body.message;
    history = body.history ?? [];
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 });
  }

  if (message.length > 2000) {
    return NextResponse.json({ error: 'message too long (max 2000 chars)' }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of streamAnswer(message.trim(), history)) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (err) {
        console.error('[chat route] RAG error:', err);
        const msg = err instanceof Error ? err.message : 'Internal error';
        controller.enqueue(encoder.encode(`\n\n[Error: ${msg}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
