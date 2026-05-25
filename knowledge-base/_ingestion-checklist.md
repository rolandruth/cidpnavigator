# Document Ingestion Checklist

Use this checklist each time you add a new document to the knowledge base.

## Before you start

- [ ] Is this source on the trusted sources list? (see `README.md`)
- [ ] Does a document for this source already exist? (avoid duplicates)
- [ ] Is this the most current version? (check for newer guidelines or updates)

## Creating the document

- [ ] Copy `_template.md` to the correct category folder
- [ ] Name the file: `[source-abbreviation]-[topic]-[year].md`
  - Good: `ean-pns-treatment-guidelines-2021.md`
  - Good: `fda-vyvgart-hytrulo-approval-2024.md`
  - Bad: `document1.md`, `new file.md`
- [ ] Fill in all frontmatter fields:
  - [ ] `title` — exact title of the source document
  - [ ] `source` — organization/publisher name
  - [ ] `source_type` — one of: guideline, fda, peer-reviewed, foundation, clinical-trial, drug-label
  - [ ] `date` — publication date (YYYY-MM-DD or YYYY)
  - [ ] `url` — direct link to the source
  - [ ] `category` — folder name (e.g. `04-ivig`)
  - [ ] `tags` — 3–8 relevant keywords
  - [ ] `verified` — leave `false` until a second review is done

## Content quality checks

- [ ] Summary is 2–4 sentences, describes the source and its relevance
- [ ] Main content uses the original wording — no paraphrasing of medical facts
- [ ] Section headings are preserved from the original where possible
- [ ] Page numbers, navigation menus, and formatting artifacts are removed
- [ ] Key Points bullet list captures the 3–7 most important facts
- [ ] Warnings section includes any contraindications or safety flags (or is blank if none)
- [ ] Citation is complete and accurate

## After adding the document

- [ ] Run a quick read-through: would a patient understand this? Does it make sense in isolation?
- [ ] Check: does any content make a direct treatment recommendation without a disclaimer?
  - If yes, add a note: *"Note: discuss with your neurologist before making any treatment changes."*
- [ ] Update `verified: true` after a second person has reviewed for accuracy
- [ ] Run ingestion script to chunk, embed, and upsert into vector DB

## Chunking guidance (for the ingestion script)

Recommended chunk size: **500–800 tokens** with **100-token overlap**

Each chunk should inherit the document's frontmatter metadata so citations work correctly:
```
{
  "source": "EAN/PNS 2021 Guideline",
  "url": "https://...",
  "date": "2021",
  "category": "03-treatments",
  "chunk_index": 3
}
```
