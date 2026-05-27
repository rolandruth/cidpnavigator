import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'CIDP Treatment Navigator is a free AI assistant for CIDP patients. Learn how it works, what sources it uses, and how it can help you prepare for neurologist appointments.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              CN
            </div>
            <span className="font-semibold text-slate-900">CIDP Treatment Navigator</span>
          </Link>
          <nav className="flex gap-4 text-sm text-slate-600">
            <Link href="/about" className="hover:text-blue-600 font-medium text-blue-600">About</Link>
            <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">About CIDP Treatment Navigator</h1>
        <p className="text-slate-500 text-sm mb-8">Helping CIDP patients become better-informed advocates for themselves</p>

        <section className="space-y-6 text-slate-700 leading-relaxed">

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              <strong>Medical disclaimer:</strong> CIDP Treatment Navigator is an educational tool only. It cannot diagnose you, interpret your test results, or tell you which treatment to take. All information should be discussed with your neurologist before acting on it.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">What is this tool?</h2>
            <p>
              CIDP Treatment Navigator is a free AI-powered educational assistant for people living with <strong>Chronic Inflammatory Demyelinating Polyneuropathy (CIDP)</strong> and their caregivers. It helps you understand your diagnosis, learn about treatment options, and walk into your next neurology appointment better prepared.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">What is CIDP?</h2>
            <p>
              CIDP is a rare autoimmune disorder in which the immune system attacks the myelin sheath protecting peripheral nerves, causing progressive weakness and sensory loss. It affects an estimated 1–9 people per 100,000. While CIDP has no cure, it is treatable — and with the right care, many patients achieve significant improvement or remission.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">What can I ask?</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>How CIDP is diagnosed and what the nerve conduction criteria mean</li>
              <li>How treatments work (IVIG, SCIg, Vyvgart Hytrulo, plasma exchange, corticosteroids)</li>
              <li>What questions to bring to your neurologist</li>
              <li>How to track your symptoms and document wearing-off</li>
              <li>How prior authorization works and how to appeal an insurance denial</li>
              <li>What clinical trials are currently enrolling</li>
              <li>Definitions of medical terms in plain language</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">How does the AI work?</h2>
            <p>
              The assistant uses a technique called <strong>Retrieval Augmented Generation (RAG)</strong>. When you ask a question, it searches a curated knowledge base of CIDP-specific documents — including the 2021 EAN/PNS clinical practice guidelines, FDA drug approvals, GBS/CIDP Foundation resources, and clinical trial data — and uses Claude (Anthropic's AI) to answer based only on those sources. Every answer cites the documents it drew from so you can trace the information back to its source.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Our knowledge sources</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>European Academy of Neurology / Peripheral Nerve Society — 2021 CIDP Guideline</li>
              <li>GBS|CIDP Foundation International — patient education resources</li>
              <li>US Food and Drug Administration — drug approval information</li>
              <li>Official drug prescribing information (IVIG products, Vyvgart Hytrulo, Hizentra, Cuvitru)</li>
              <li>ClinicalTrials.gov — active CIDP trial summaries</li>
              <li>Immune Deficiency Foundation — insurance and prior authorization guidance</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Who built this?</h2>
            <p>
              This tool was built by a developer passionate about making complex medical information accessible to patients. CIDP is a rare disease with a significant information gap between what clinicians know and what patients can readily find. This tool is an attempt to close some of that gap.
            </p>
            <p className="mt-2">
              If you have feedback, questions, or suggestions, you can reach us at{' '}
              <a href="mailto:roland.ruth@gmail.com" className="text-blue-600 hover:underline">
                roland.ruth@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Additional resources</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <a href="https://www.gbs-cidp.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  GBS|CIDP Foundation International
                </a>{' '}
                — free health navigator at 1-866-224-3301
              </li>
              <li>
                <a href="https://clinicaltrials.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  ClinicalTrials.gov
                </a>{' '}
                — search recruiting CIDP trials
              </li>
              <li>
                <a href="https://primaryimmune.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Immune Deficiency Foundation
                </a>{' '}
                — insurance and access resources
              </li>
            </ul>
          </div>

        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12 py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CIDP Treatment Navigator. Educational use only — not medical advice.</p>
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-slate-600">Home</Link>
            <Link href="/about" className="hover:text-slate-600">About</Link>
            <Link href="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
