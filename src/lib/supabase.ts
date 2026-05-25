import { createClient } from '@supabase/supabase-js';

// Client for server-side use only (service role key — never expose to browser)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface DocumentChunk {
  id: number;
  doc_id: string;
  chunk_index: number;
  content: string;
  metadata: {
    title: string;
    source: string;
    source_type: string;
    date: string;
    url: string;
    category: string;
    tags: string[];
    verified: boolean;
  };
  similarity: number;
}

export async function matchDocuments(
  queryEmbedding: number[],
  matchCount = 5
): Promise<DocumentChunk[]> {
  const { data, error } = await supabaseAdmin.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_count: matchCount,
  });

  if (error) throw new Error(`Vector search failed: ${error.message}`);
  return (data as DocumentChunk[]) ?? [];
}
