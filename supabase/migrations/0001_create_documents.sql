-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Documents table: stores chunked knowledge base content with embeddings
CREATE TABLE IF NOT EXISTS documents (
  id          BIGSERIAL PRIMARY KEY,
  doc_id      TEXT        NOT NULL,   -- e.g. "ean-pns-2021-diagnostic-criteria"
  chunk_index INT         NOT NULL DEFAULT 0,
  content     TEXT        NOT NULL,
  embedding   VECTOR(1536),           -- OpenAI text-embedding-3-small dimensions
  metadata    JSONB       NOT NULL DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (doc_id, chunk_index)
);

-- IVFFlat index for approximate nearest-neighbor search
-- Lists = sqrt(row count) is a good starting point; retune after ingestion
CREATE INDEX IF NOT EXISTS documents_embedding_idx
  ON documents
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- GIN index for metadata queries (e.g. filter by category)
CREATE INDEX IF NOT EXISTS documents_metadata_idx
  ON documents USING gin (metadata);

-- Match function used by the RAG pipeline
-- Returns the top match_count chunks by cosine similarity to query_embedding
-- Optionally filter by metadata field (e.g. '{"category": "04-ivig"}')
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(1536),
  match_count     INT     DEFAULT 5,
  filter          JSONB   DEFAULT '{}'::jsonb
)
RETURNS TABLE (
  id          BIGINT,
  doc_id      TEXT,
  chunk_index INT,
  content     TEXT,
  metadata    JSONB,
  similarity  FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.doc_id,
    d.chunk_index,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) AS similarity
  FROM documents d
  WHERE
    d.embedding IS NOT NULL
    AND (filter = '{}'::jsonb OR d.metadata @> filter)
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
