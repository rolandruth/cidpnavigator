# Treatment Pages — Design Spec
**Date:** 2026-05-27
**Status:** Approved

---

## Goal

Build 5 comprehensive, statically-rendered individual treatment pages plus an index page, targeting high-value low-competition keywords ("IVIG for CIDP", "Vyvgart Hytrulo CIDP", etc.) and driving organic traffic back to the AI chat tool.

---

## Architecture

**Pattern:** Dynamic route with central data file (`Option B`).

```
src/
  lib/
    treatments-data.ts          ← all treatment content; one typed object per treatment
  app/
    treatments/
      page.tsx                  ← /treatments index page (5 treatment cards)
      [slug]/
        page.tsx                ← individual treatment page (static via generateStaticParams)
        opengraph-image.tsx     ← dynamic 1200×630 OG image per treatment
    sitemap.ts                  ← updated with 6 new URLs
```

`generateStaticParams` exports the 5 slugs. Next.js pre-renders all pages as static HTML at build time — no client-side JS needed for Google to read content. `generateMetadata` reads `seoTitle`, `seoDescription`, and `slug` from the data file to produce per-treatment metadata.

---

## URLs & SEO Targets

| URL | Title (with layout template) | Meta Description target | Sitemap Priority |
|---|---|---|---|
| `/treatments` | CIDP Treatment Options \| CIDP Treatment Navigator | Overview of all FDA-approved and guideline-recommended treatments for CIDP | 0.8 |
| `/treatments/ivig` | IVIG for CIDP — How It Works, Dosing & Side Effects \| … | ~155 chars targeting "IVIG for CIDP", "IVIG dosing CIDP", "IVIG side effects CIDP" | 0.85 |
| `/treatments/vyvgart-hytrulo` | Vyvgart Hytrulo for CIDP — FDA-Approved 2024 \| … | ~155 chars targeting "Vyvgart Hytrulo CIDP", "efgartigimod CIDP", "FcRn inhibitor CIDP" | 0.85 |
| `/treatments/scig` | SCIg for CIDP — Home Subcutaneous Immunoglobulin \| … | ~155 chars targeting "SCIg CIDP", "Hizentra CIDP", "home infusion CIDP" | 0.85 |
| `/treatments/plasma-exchange` | Plasma Exchange for CIDP — Plasmapheresis Guide \| … | ~155 chars targeting "plasma exchange CIDP", "plasmapheresis CIDP" | 0.8 |
| `/treatments/corticosteroids` | Corticosteroids for CIDP — Prednisone & Steroids \| … | ~155 chars targeting "steroids CIDP", "prednisone CIDP", "pure motor CIDP steroids" | 0.8 |

All pages set `alternates: { canonical: '/treatments/[slug]' }`.

---

## Data File: `src/lib/treatments-data.ts`

One exported `TREATMENTS` record keyed by slug. Each value satisfies the `Treatment` interface:

```typescript
export interface Treatment {
  slug: string;
  name: string;          // "Intravenous Immunoglobulin (IVIG)"
  shortName: string;     // "IVIG"
  tagline: string;       // one-line description for hero
  fdaStatus: string;     // "FDA-approved (multiple products)"
  adminRoute: string;    // "IV infusion"
  frequency: string;     // "Every 3–4 weeks"
  setting: string;       // "Infusion center"
  color: string;         // Tailwind color name for OG accent: 'blue'|'purple'|'teal'|'amber'|'slate'
  seoTitle: string;      // page <title> value (layout template appends brand)
  seoDescription: string;

  mechanism: {
    summary: string;     // opening paragraph
    points: string[];    // bullet points
  };
  efficacy: {
    summary: string;
    stats: { metric: string; value: string; source: string }[];
    notes: string[];     // additional paragraphs
  };
  sideEffects: {
    common: string[];
    serious: string[];
    note: string;        // extra context (e.g. IgA warning for IVIG)
  };
  pros: string[];
  cons: string[];
  insurance: string[];   // bullet points
  relatedSlugs: string[];
  sources: string[];
}

export const TREATMENTS: Record<string, Treatment> = { ... }
```

**Treatments in scope** (5 total):
- `ivig` — Intravenous Immunoglobulin
- `vyvgart-hytrulo` — Efgartigimod alfa + hyaluronidase (Vyvgart Hytrulo)
- `scig` — Subcutaneous Immunoglobulin (Hizentra, Cuvitru)
- `plasma-exchange` — Plasma Exchange (Plasmapheresis)
- `corticosteroids` — Corticosteroids (Prednisone, IV Methylprednisolone)

---

## Individual Treatment Page — Section Order

1. **Breadcrumb** — `Home › Treatments › [Name]` (also in BreadcrumbList schema)
2. **Hero** — `<h1>` with full treatment name, tagline, FDA approval badge pill
3. **At a Glance card** — 4-cell grid: Administration Route / Frequency / Care Setting / Who It's For
4. **How It Works** — `<h2>`, mechanism summary paragraph + bullet points
5. **Clinical Evidence** — `<h2>`, summary paragraph + stats table (Metric / Value / Source) + notes
6. **Side Effects** — `<h2>`, two columns: Common (left) / Serious (right)
7. **Pros & Cons** — `<h2>`, two-column list
8. **Insurance & Access** — `<h2>`, bullet points covering prior auth, step therapy, patient assistance
9. **Ask the AI CTA** — blue callout box: "Have a question about [shortName]? Ask the AI →" (links to `/?q=Tell+me+about+[shortName]+for+CIDP`)
10. **Related Treatments** — `<h2>`, grid of cards (name + tagline + link) for the other 4 treatments
11. **Medical Disclaimer** — amber box (same pattern as rest of site)
12. **Sources** — `<ul>` of citation strings

---

## /treatments Index Page

- `<h1>` "CIDP Treatment Options"
- Intro paragraph: overview of guideline-recommended treatments
- 5 treatment cards in a grid: name, tagline, FDA status badge, "Learn more →" link
- CTA block pointing to AI chat for treatment comparison questions
- Medical disclaimer

---

## Schema Markup

**Per treatment page — two JSON-LD blocks:**

```json
// Block 1: MedicalTherapy
{
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  "name": "[treatment name]",
  "description": "[seoDescription]",
  "relevantSpecialty": {
    "@type": "MedicalSpecialty",
    "name": "Neurology"
  },
  "recognizingAuthority": {
    "@type": "MedicalOrganization",
    "name": "U.S. Food and Drug Administration"
  },
  "guideline": {
    "@type": "MedicalGuideline",
    "guidelineDate": "2021",
    "guidelineOrigin": "European Academy of Neurology / Peripheral Nerve Society"
  }
}

// Block 2: BreadcrumbList
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cidpnavigator.com" },
    { "@type": "ListItem", "position": 2, "name": "Treatments", "item": "https://cidpnavigator.com/treatments" },
    { "@type": "ListItem", "position": 3, "name": "[Treatment Name]", "item": "https://cidpnavigator.com/treatments/[slug]" }
  ]
}
```

---

## OG Image (`src/app/treatments/[slug]/opengraph-image.tsx`)

- Runtime: `edge`
- Size: 1200×630
- Reads `name`, `tagline`, `fdaStatus`, `frequency`, `color` from `TREATMENTS[slug]`
- Layout: gradient background using treatment color, treatment name as large headline, tagline below, FDA status + frequency as pills at bottom, site URL badge top-left
- Color accents per treatment:
  - IVIG → blue (`#1d4ed8` / `#1e3a5f`)
  - Vyvgart Hytrulo → purple (`#7c3aed` / `#2e1065`)
  - SCIg → teal (`#0d9488` / `#042f2e`)
  - Plasma Exchange → amber (`#d97706` / `#451a03`)
  - Corticosteroids → slate (`#475569` / `#0f172a`)

---

## Navigation & Internal Linking

**Three files updated:**

1. **`src/app/layout.tsx`** — add `<Link href="/treatments">Treatments</Link>` to the global nav metadata is not in layout; nav links are in each page's header. Update all page headers.

   Actually: each page (`page.tsx`, `faq/page.tsx`, `about/page.tsx`, `privacy/page.tsx`) has its own `<header>` with nav. Add "Treatments" link to each. The treatment pages' shared template will also include it.

2. **`src/app/page.tsx` sidebar** — add "Treatments" section in the sidebar `<aside>` beneath "Resources":
   ```
   Treatments
   • IVIG for CIDP
   • Vyvgart Hytrulo
   • SCIg
   • Plasma Exchange
   • Corticosteroids
   ```

3. **`src/app/faq/page.tsx`** — add inline `<a>` links in 6 FAQ answers where treatments are named:
   - "IVIG" → `/treatments/ivig`
   - "Vyvgart Hytrulo" → `/treatments/vyvgart-hytrulo`
   - "SCIg" → `/treatments/scig`
   - "plasma exchange" → `/treatments/plasma-exchange`
   - "corticosteroids" → `/treatments/corticosteroids`

---

## Sitemap Update

Add 6 entries to `src/app/sitemap.ts`:

```typescript
{ url: `${BASE_URL}/treatments`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: `${BASE_URL}/treatments/ivig`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
{ url: `${BASE_URL}/treatments/vyvgart-hytrulo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
{ url: `${BASE_URL}/treatments/scig`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
{ url: `${BASE_URL}/treatments/plasma-exchange`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: `${BASE_URL}/treatments/corticosteroids`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
```

---

## Implementation Order

1. `src/lib/treatments-data.ts` — data first, everything else imports from it
2. `src/app/treatments/[slug]/page.tsx` — individual treatment page template
3. `src/app/treatments/[slug]/opengraph-image.tsx` — OG image
4. `src/app/treatments/page.tsx` — index page
5. `src/app/sitemap.ts` — add 6 URLs
6. Nav updates — add "Treatments" to headers in all existing pages
7. Homepage sidebar — add treatments section
8. FAQ inline links — wire treatment names to treatment pages
9. Build + deploy

---

## Medical Accuracy Notes

All content must be grounded in:
- EAN/PNS 2021 CIDP guideline (van den Bergh et al., *Eur J Neurol* 2021)
- FDA prescribing information for each drug
- ADHERE trial data for Vyvgart Hytrulo (PATH study for SCIg, etc.)

Key accuracy flags:
- **Pure motor CIDP**: corticosteroids may worsen — must be noted on corticosteroids page
- **IgA deficiency**: IVIG contraindicated — must be noted on IVIG page
- **Vyvgart Hytrulo**: reduces ALL IgG (protective + pathogenic) — infection risk note required
- Every page must carry the site's standard medical disclaimer

---

## Out of Scope (this spec)

- Blog/news section
- Glossary page
- Treatment comparison table page (`/compare`)
- Dynamic content from the RAG knowledge base (pages are static)
- User-contributed content
