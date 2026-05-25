# CIDP Knowledge Base

Source documents for the CIDP Treatment Navigator RAG system.

## How this works

Each `.md` file in these folders is a document that gets chunked, embedded, and stored in the vector database. When a user asks a question, the most relevant chunks are retrieved and passed to the LLM with the user's question.

**Document quality directly determines answer quality.** Clean, well-structured documents with accurate metadata produce better citations and more accurate answers.

## Adding a new document

1. Copy `_template.md` to the correct category folder
2. Name the file descriptively: `ean-pns-2021-cidp-guidelines.md`, `fda-vyvgart-hytrulo-approval.md`
3. Fill in all frontmatter fields — `source`, `date`, and `url` are required for citations
4. Paste or transcribe the content, preserving section headings
5. Add any known warnings or contraindications to the `warnings` section
6. Run the ingestion script to embed and upsert into the vector DB

## Trusted source priority

| Priority | Source type | Examples |
|----------|-------------|---------|
| 1 | Clinical guidelines | EAN/PNS, AAN guidelines |
| 2 | FDA official pages | Drug approvals, labels, prescribing info |
| 3 | Peer-reviewed publications | PubMed, NEJM, Neurology journal |
| 4 | Patient foundations | GBS/CIDP Foundation International |
| 5 | Clinical trial registries | ClinicalTrials.gov |

Do not add: blog posts, forums, social media, supplement company content, or any source that cannot be independently verified.

## Folder map

| Folder | Contents |
|--------|----------|
| `01-diagnosis/` | Diagnostic criteria, nerve conduction studies, EMG, differential diagnosis |
| `02-symptoms/` | Symptom descriptions, progression patterns, relapse/remission info |
| `03-treatments/` | Treatment overview, comparison tables, decision frameworks |
| `04-ivig/` | IVIG mechanism, dosing, administration, side effects, brands |
| `05-scig/` | SCIg mechanism, home infusion, comparison to IVIG |
| `06-vyvgart-hytrulo/` | FDA approval (June 2024), mechanism, clinical trials, prescribing info |
| `07-plasma-exchange/` | Plasmapheresis procedure, indications, frequency, risks |
| `08-steroids/` | Prednisone/methylprednisolone protocols, tapering, side effects |
| `09-insurance-appeals/` | Appeal letter examples, medical necessity language, prior auth tips |
| `10-doctor-visit-prep/` | Question lists, symptom tracking templates, how to describe symptoms |
| `11-clinical-trials/` | Active trials, eligibility criteria, how to enroll |
| `12-glossary/` | Plain-language definitions of medical terms used across all documents |
