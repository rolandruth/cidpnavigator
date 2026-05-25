import Anthropic from '@anthropic-ai/sdk';
import { embedText } from './embeddings';
import { matchDocuments, DocumentChunk } from './supabase';
import { SYSTEM_PROMPT } from './claude';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function buildContextBlock(chunks: DocumentChunk[]): string {
  if (chunks.length === 0) {
    return 'No relevant documents found in the knowledge base.';
  }

  return chunks
    .map((chunk, i) => {
      const m = chunk.metadata;
      return [
        `[Document ${i + 1}]`,
        `Title: ${m.title}`,
        `Source: ${m.source}`,
        `Date: ${m.date}`,
        `URL: ${m.url || 'N/A'}`,
        `Category: ${m.category}`,
        `Similarity: ${(chunk.similarity * 100).toFixed(1)}%`,
        '',
        chunk.content,
      ].join('\n');
    })
    .join('\n\n---\n\n');
}

// Streams the Claude response token by token.
// conversationHistory contains previous clean turns (no context injected).
// Context is injected fresh into the current user message on every call.
export async function* streamAnswer(
  question: string,
  conversationHistory: ChatMessage[] = []
): AsyncGenerator<string> {
  // 1. Embed the question
  const queryEmbedding = await embedText(question);

  // 2. Retrieve the most relevant document chunks
  const chunks = await matchDocuments(queryEmbedding, 5);

  // 3. Build the user message with injected context
  const contextBlock = buildContextBlock(chunks);
  const userMessageWithContext = `Here is relevant information from the CIDP knowledge base:

<context>
${contextBlock}
</context>

Question: ${question}`;

  // 4. Build the full messages array: clean history + current turn with context
  const messages: Anthropic.MessageParam[] = [
    ...conversationHistory.map((m) => ({
      role: m.role,
      content: m.content,
    })),
    { role: 'user', content: userMessageWithContext },
  ];

  // 5. Stream from Claude
  const stream = anthropic.messages.stream({
    model: 'claude-opus-4-7',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages,
  });

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      yield event.delta.text;
    }
  }
}
