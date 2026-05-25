import type { Metadata } from 'next';
import Script from 'next/script';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';

export const metadata: Metadata = {
  title: 'CIDP Treatment Navigator — Free AI Assistant for CIDP Patients',
  description:
    'Free educational AI assistant for CIDP patients. Understand treatments (IVIG, SCIg, Vyvgart Hytrulo), prepare for neurology appointments, and navigate insurance — based on 2021 EAN/PNS guidelines.',
  keywords: [
    'CIDP', 'Chronic Inflammatory Demyelinating Polyneuropathy', 'IVIG', 'Vyvgart Hytrulo',
    'efgartigimod', 'CIDP treatment', 'CIDP symptoms', 'neurology', 'GBS CIDP',
  ],
  openGraph: {
    title: 'CIDP Treatment Navigator',
    description: 'Free AI educational assistant for CIDP patients and caregivers.',
    type: 'website',
  },
};

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense — only injected when the publisher ID is configured */}
        {ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
