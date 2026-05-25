import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — CIDP Treatment Navigator',
  description: 'Privacy policy for CIDP Treatment Navigator, including how we use cookies and Google AdSense.',
};

const LAST_UPDATED = 'May 25, 2025';

export default function PrivacyPage() {
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
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/privacy" className="hover:text-blue-600 font-medium text-blue-600">Privacy</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 text-slate-700 leading-relaxed">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-sm">

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">1. Overview</h2>
            <p>
              CIDP Treatment Navigator (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the site&rdquo;) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your choices. By using this site, you agree to the practices described here.
            </p>
            <p className="mt-2">
              <strong>This site does not collect, store, or transmit any personally identifiable health information you share in the chat.</strong> Chat conversations are processed in real time to generate a response and are not saved to any database on our end.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">2. Information We Collect</h2>
            <h3 className="font-medium mt-3 mb-1">Automatically collected</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Browser type and version</li>
              <li>Pages visited and time spent (via server logs and analytics)</li>
              <li>Referring URL</li>
              <li>IP address (not stored long-term)</li>
            </ul>
            <h3 className="font-medium mt-3 mb-1">Cookies and local storage</h3>
            <p>
              We use browser local storage to remember your cookie consent preference. Third-party services (see Section 4) may also set cookies.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">3. How We Use Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To deliver and improve the AI assistant service</li>
              <li>To serve relevant advertisements via Google AdSense</li>
              <li>To analyze site traffic and usage patterns to improve the experience</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="mt-2">
              We do not sell your personal information to third parties. We do not use your chat content for advertising targeting.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">4. Third-Party Services</h2>

            <h3 className="font-medium mt-3 mb-1">Google AdSense</h3>
            <p>
              This site uses Google AdSense to display advertisements. Google AdSense uses cookies and web beacons to serve ads based on prior visits to this site and other sites on the internet. Google&rsquo;s use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the internet.
            </p>
            <p className="mt-2">
              You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Google Ads Settings
              </a>{' '}
              or{' '}
              <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                aboutads.info
              </a>.
            </p>
            <p className="mt-2">
              Google&rsquo;s privacy policy is available at{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                policies.google.com/privacy
              </a>.
            </p>

            <h3 className="font-medium mt-3 mb-1">Anthropic Claude API</h3>
            <p>
              Chat messages are sent to Anthropic&rsquo;s Claude API to generate responses. Anthropic&rsquo;s data usage policy applies. We do not include any persistent user identifiers in API requests. Anthropic&rsquo;s privacy policy is at{' '}
              <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                anthropic.com/privacy
              </a>.
            </p>

            <h3 className="font-medium mt-3 mb-1">OpenAI (Embeddings)</h3>
            <p>
              Search queries are sent to OpenAI&rsquo;s API to generate vector embeddings used to find relevant content. OpenAI&rsquo;s privacy policy is at{' '}
              <a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                openai.com/privacy
              </a>.
            </p>

            <h3 className="font-medium mt-3 mb-1">Supabase</h3>
            <p>
              Document content and embeddings are stored in Supabase. User queries are not stored. Supabase&rsquo;s privacy policy is at{' '}
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                supabase.com/privacy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">5. Your Rights</h2>
            <h3 className="font-medium mt-3 mb-1">California residents (CCPA)</h3>
            <p>
              California residents have the right to know what personal information is collected, to request deletion of personal information, and to opt out of the sale of personal information. We do not sell personal information. To exercise your rights, contact us at the email below.
            </p>
            <h3 className="font-medium mt-3 mb-1">EU/UK residents (GDPR)</h3>
            <p>
              EU and UK residents have the right to access, correct, or delete personal data we hold about them, and to object to or restrict certain processing. Since we do not store personally identifiable health information, there is limited personal data associated with your use of this site. For questions, contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">6. Children</h2>
            <p>
              This site is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided personal information, please contact us so we can delete it.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">7. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. We will post the updated policy on this page with a revised &ldquo;last updated&rdquo; date. Continued use of the site after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">8. Contact</h2>
            <p>
              For privacy questions or requests, contact us at:{' '}
              <a href="mailto:roland.ruth@gmail.com" className="text-blue-600 hover:underline">
                roland.ruth@gmail.com
              </a>
            </p>
          </section>

        </div>
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
