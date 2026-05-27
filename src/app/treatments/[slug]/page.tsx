// src/app/treatments/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TREATMENTS, TREATMENT_SLUGS } from '@/lib/treatments-data';

export async function generateStaticParams() {
  return TREATMENT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = TREATMENTS[slug];
  if (!t) return {};
  return {
    title: t.seoTitle,
    description: t.seoDescription,
    alternates: { canonical: `/treatments/${slug}` },
  };
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = TREATMENTS[slug];
  if (!t) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cidpnavigator.com' },
      { '@type': 'ListItem', position: 2, name: 'Treatments', item: 'https://cidpnavigator.com/treatments' },
      { '@type': 'ListItem', position: 3, name: t.shortName, item: `https://cidpnavigator.com/treatments/${slug}` },
    ],
  };

  const therapySchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: t.name,
    description: t.seoDescription,
    relevantSpecialty: { '@type': 'MedicalSpecialty', name: 'Neurology' },
    recognizingAuthority: { '@type': 'MedicalOrganization', name: 'U.S. Food and Drug Administration' },
    guideline: {
      '@type': 'MedicalGuideline',
      guidelineDate: '2021',
      guidelineOrigin: 'European Academy of Neurology / Peripheral Nerve Society',
    },
  };

  const relatedTreatments = t.relatedSlugs.map((s) => TREATMENTS[s]).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(therapySchema) }} />

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
          <Link href="/treatments" className="hover:text-slate-600">Treatments</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">{t.shortName}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-green-100 text-green-800 border border-green-200 rounded-full px-3 py-1 font-medium">
              {t.fdaStatus}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.name}</h1>
          <p className="text-slate-600 text-base leading-relaxed">{t.tagline}</p>
        </div>

        {/* At a Glance */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: 'Route', value: t.adminRoute },
            { label: 'Frequency', value: t.frequency },
            { label: 'Setting', value: t.setting },
            { label: 'FDA Status', value: t.fdaStatus.split('(')[0].trim() },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className="text-sm font-medium text-slate-800 leading-snug">{value}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8">
          <p className="text-xs text-amber-800">
            <strong>Educational use only.</strong> This page explains how {t.shortName} works based on clinical guidelines and trial data. It cannot replace your neurologist. All treatment decisions must be made with your medical team.
          </p>
        </div>

        {/* How It Works */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-3">How {t.shortName} Works</h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">{t.mechanism.summary}</p>
          <ul className="space-y-2">
            {t.mechanism.points.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Clinical Evidence */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Clinical Evidence</h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">{t.efficacy.summary}</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left px-3 py-2 text-slate-700 font-semibold rounded-tl-lg">Metric</th>
                  <th className="text-left px-3 py-2 text-slate-700 font-semibold">Value</th>
                  <th className="text-left px-3 py-2 text-slate-700 font-semibold rounded-tr-lg">Source</th>
                </tr>
              </thead>
              <tbody>
                {t.efficacy.stats.map((stat, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-3 py-2 text-slate-700">{stat.metric}</td>
                    <td className="px-3 py-2 font-medium text-slate-900">{stat.value}</td>
                    <td className="px-3 py-2 text-slate-500 text-xs">{stat.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {t.efficacy.notes.map((note, i) => (
            <p key={i} className="text-sm text-slate-600 leading-relaxed mb-2">{note}</p>
          ))}
        </section>

        {/* Side Effects */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Side Effects</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 mb-2">Common</p>
              <ul className="space-y-1.5">
                {t.sideEffects.common.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-yellow-500 flex-shrink-0 mt-0.5">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
              <p className="text-sm font-semibold text-red-700 mb-2">Serious (less common)</p>
              <ul className="space-y-1.5">
                {t.sideEffects.serious.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-red-400 flex-shrink-0 mt-0.5">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {t.sideEffects.note && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
              <p className="text-sm text-blue-800 leading-relaxed">{t.sideEffects.note}</p>
            </div>
          )}
        </section>

        {/* Pros & Cons */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Pros &amp; Cons</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl border border-green-200 p-4">
              <p className="text-sm font-semibold text-green-800 mb-2">Advantages</p>
              <ul className="space-y-1.5">
                {t.pros.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">Drawbacks</p>
              <ul className="space-y-1.5">
                {t.cons.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-slate-400 flex-shrink-0">–</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Insurance & Access */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Insurance &amp; Access</h2>
          <ul className="space-y-2">
            {t.insurance.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700 bg-white rounded-lg border border-slate-200 px-4 py-3 shadow-sm">
                <span className="text-blue-500 flex-shrink-0 mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ask the AI CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-10 flex items-start gap-3">
          <div className="text-2xl">🧠</div>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Have a question about {t.shortName}?</p>
            <p className="text-xs text-blue-700 mb-2">
              Ask the AI assistant for more detail — dosing questions, wearing-off, insurance appeals, how {t.shortName} compares to other options, and more.
            </p>
            <Link
              href={`/?q=${encodeURIComponent(`Tell me about ${t.shortName} for CIDP`)}`}
              className="inline-block text-xs bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ask the AI →
            </Link>
          </div>
        </div>

        {/* Related Treatments */}
        {relatedTreatments.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Other CIDP Treatments</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedTreatments.map((rt) => (
                <Link
                  key={rt.slug}
                  href={`/treatments/${rt.slug}`}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 mb-1">{rt.shortName}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{rt.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sources */}
        <div className="mt-8 p-4 bg-slate-100 rounded-xl text-xs text-slate-500">
          <p className="font-semibold text-slate-700 mb-2">Sources</p>
          <ul className="space-y-1">
            {t.sources.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12 py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CIDP Treatment Navigator. Educational use only — not medical advice.</p>
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-slate-600">Home</Link>
            <Link href="/treatments" className="hover:text-slate-600">Treatments</Link>
            <Link href="/faq" className="hover:text-slate-600">FAQ</Link>
            <Link href="/about" className="hover:text-slate-600">About</Link>
            <Link href="/privacy" className="hover:text-slate-600">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
