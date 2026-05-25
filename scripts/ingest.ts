/**
 * Ingests all knowledge-base markdown documents into Supabase (pgvector).
 *
 * Run with:
 *   npm run ingest
 *
 * What it does:
 *   1. Walks knowledge-base/ for *.md files (skips _ prefixed and README files)
 *   2. Parses YAML frontmatter to extract citation metadata
 *   3. Splits content into chunks by markdown heading (~3000 chars max)
 *   4. Embeds each chunk with OpenAI text-embedding-3-small
 *   5. Upserts chunks into Supabase documents table (idempotent on doc_id + chunk_index)
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import matter from 'gray-matter';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '..', '.env.local') });

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function walkDir(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkDir(full));
    } else if (full.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

// Split on h2/h3 headings; further split overly long sections by paragraph.
function chunkContent(content: string, maxChars = 3000): string[] {
  const sections = content.split(/(?=\n#{2,3} )/);
  const chunks: string[] = [];

  for (const section of sections) {
    const trimmed = section.trim();
    if (trimmed.length < 80) continue; // skip near-empty sections

    if (trimmed.length <= maxChars) {
      chunks.push(trimmed);
      continue;
    }

    // Long section — split by double newline
    const paragraphs = trimmed.split(/\n\n+/);
    let current = '';
    for (const para of paragraphs) {
      const candidate = current ? `${current}\n\n${para}` : para;
      if (candidate.length > maxChars && current) {
        chunks.push(current.trim());
        current = para;
      } else {
        current = candidate;
      }
    }
    if (current.trim()) chunks.push(current.trim());
  }

  return chunks;
}

async function embedText(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.replace(/\n/g, ' '),
  });
  return response.data[0].embedding;
}

// ---------------------------------------------------------------------------
// Ingest a single file
// ---------------------------------------------------------------------------

async function ingestFile(filePath: string): Promise<number> {
  const name = basename(filePath);

  // Skip meta files
  if (name.startsWith('_') || name === 'README.md') return 0;

  const raw = readFileSync(filePath, 'utf-8');
  const { data: fm, content } = matter(raw);

  const docId = name.replace('.md', '');
  const chunks = chunkContent(content);

  const metadata = {
    title: fm.title ?? docId,
    source: fm.source ?? '',
    source_type: fm.source_type ?? '',
    date: fm.date ?? '',
    url: fm.url ?? '',
    category: fm.category ?? '',
    tags: fm.tags ?? [],
    verified: fm.verified ?? false,
  };

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await embedText(chunks[i]);

    const { error } = await supabase.from('documents').upsert(
      {
        doc_id: docId,
        chunk_index: i,
        content: chunks[i],
        embedding,
        metadata,
      },
      { onConflict: 'doc_id,chunk_index' }
    );

    if (error) throw new Error(`Supabase upsert failed for ${docId}[${i}]: ${error.message}`);
    process.stdout.write('.');
  }

  return chunks.length;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const kbRoot = join(__dirname, '..', 'knowledge-base');
  const files = walkDir(kbRoot);

  console.log(`Found ${files.length} markdown files in knowledge-base/\n`);

  let totalChunks = 0;
  let filesIngested = 0;

  for (const file of files) {
    const rel = file.replace(kbRoot, '').replace(/^[/\\]/, '');
    process.stdout.write(`  ${rel} `);

    const count = await ingestFile(file);
    console.log(` → ${count} chunks`);
    totalChunks += count;
    if (count > 0) filesIngested++;
  }

  console.log(`\nDone. ${filesIngested} files, ${totalChunks} chunks ingested.`);
}

main().catch((err) => {
  console.error('\nIngestion failed:', err);
  process.exit(1);
});
