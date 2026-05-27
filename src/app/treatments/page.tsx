// src/app/treatments/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { TREATMENTS, TREATMENT_SLUGS } from '@/lib/treatments-data';

export const metadata: Metadata = {
  title: 'CIDP Treatment Options',
  description:
    'Overview of all guideline-recommended and FDA-approved CIDP treatments: IVIG, Vyvgart Hytrulo, SCIg, plasma exchange, and corticosteroids — with mechanisms, efficacy, and side effects.',
  alternates: { canonical: '/treatments' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cidpnavigator.com' },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: 'https://cidpnavigator.com/treatments' },
  ],
};

export default function TreatmentsIndexPage() {
  const treatments = TREATMENT_SLUGS.map((slug) => TREATMENTS[slug]);

  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Nav */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">CN</div>
            <span className="font-semibold text-slate-900">CIDP Treatment Navigator</span>
          </Link>
          <nav className="flex gap-4 text-sm text-slate-600">
            <Link href="/treatments" className="hover:text-blue-600 font-medium text-blue-600">Treatments</Link>
            <Link href="/faq" className="hover:text-blue-600">FAQ</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-4">
          <Link href="/" className="hover:text-slate-600">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">Treatments</span>
        </nav>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">CIDP Treatment Options</h1>
        <p className="text-slate-500 text-sm mb-2">
          Five treatments are recommended in the 2021 EAN/PNS clinical practice guideline for CIDP — three with Level A (strongest) evidence. Each works differently, is given differently, and suits different patients. Use the pages below to understand each option, then ask the AI for a personalised comparison.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-8">
          <p className="text-xs text-amber-800">
            <strong>Educational use only.</strong> These pages explain how treatments work — they cannot tell you which treatment is right for you. That decision belongs to your neurologist.
          </p>
        </div>

        {/* Treatment cards */}
        <div className="space-y-4 mb-10">
          {treatments.map((t) => (
            <Link
              key={t.slug}
              href={`/treatments/${t.slug}`}
              className="block bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all p-5 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-base font-semibold text-slate-900 group-hover:text-blue-700">{t.name}</h2>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{t.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t.adminRoute}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t.frequency}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{t.fdaStatus.split('(')[0].trim()}</span>
                  </div>
                </div>
                <span className="text-blue-400 group-hover:text-blue-600 text-lg mt-1 flex-shrink-0">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* AI CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-8 flex items-start gap-3">
          <div className="text-2xl">🧠</div>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Not sure which treatment fits your situation?</p>
            <p className="text-xs text-blue-700 mb-2">
              Ask the AI to compare treatments based on your specific concerns — wearing off, home administration, insurance coverage, pure motor symptoms, and more.
            </p>
            <Link
              href="/?q=Compare+CIDP+treatment+options+for+me"
              className="inline-block text-xs bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ask the AI →
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12 py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CIDP Treatment Navigator. Educational use only — not medical advice.</p>
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-slate-600">Home</Link>
            <Link href="/treatments" className="hover:text-slate-600">Treatments</Link>
            <Link href="/faq" className="hover:text-slate-600">FAQ</Link>
            <Link href="/privacy" className="hover:text-slate-600">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
