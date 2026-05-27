import type { Metadata } from 'next';
import Script from 'next/script';
import CookieConsent from '@/components/CookieConsent';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cidpnavigator.com';
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'CIDP Treatment Navigator — Free AI Assistant for CIDP Patients',
    template: '%s | CIDP Treatment Navigator',
  },
  description:
    'Free AI assistant for CIDP patients. Understand IVIG, Vyvgart Hytrulo, SCIg, and plasma exchange. Prepare neurologist questions, navigate insurance appeals, and find clinical trials.',
  keywords: [
    'CIDP', 'Chronic Inflammatory Demyelinating Polyneuropathy',
    'CIDP treatment', 'CIDP symptoms', 'CIDP diagnosis',
    'IVIG for CIDP', 'Vyvgart Hytrulo', 'efgartigimod CIDP',
    'SCIg CIDP', 'subcutaneous immunoglobulin CIDP',
    'plasma exchange CIDP', 'CIDP vs GBS',
    'CIDP insurance appeal', 'CIDP prior authorization',
    'CIDP clinical trials 2025',
    'questions to ask neurologist CIDP',
    'CIDP flare', 'CIDP prognosis',
    'riliprubart CIDP', 'empasiprubart CIDP',
    'CIDP patient resources',
  ],
  authors: [{ name: 'CIDP Treatment Navigator' }],
  creator: 'CIDP Treatment Navigator',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'CIDP Treatment Navigator',
    title: 'CIDP Treatment Navigator — Free AI Assistant for CIDP Patients',
    description:
      'Free AI educational assistant for CIDP patients. Understand treatments, prepare for appointments, and navigate insurance — grounded in clinical guidelines.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CIDP Treatment Navigator',
    description: 'Free AI educational assistant for CIDP patients and caregivers.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
