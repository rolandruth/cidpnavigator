// src/app/treatments/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { TREATMENTS } from '@/lib/treatments-data';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const COLOR_MAP: Record<string, { bg: string; accent: string; text: string }> = {
  blue:   { bg: '#1e3a5f', accent: '#2563eb', text: '#93c5fd' },
  purple: { bg: '#2e1065', accent: '#7c3aed', text: '#c4b5fd' },
  teal:   { bg: '#042f2e', accent: '#0d9488', text: '#99f6e4' },
  amber:  { bg: '#451a03', accent: '#d97706', text: '#fcd34d' },
  slate:  { bg: '#0f172a', accent: '#475569', text: '#cbd5e1' },
};

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = TREATMENTS[slug];
  return [{ id: slug, alt: t ? `${t.name} for CIDP` : 'CIDP Treatment' }];
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = TREATMENTS[slug];
  if (!t) {
    return new ImageResponse(<div style={{ background: '#1e293b', width: '100%', height: '100%' }} />, { ...size });
  }

  const colors = COLOR_MAP[t.color] ?? COLOR_MAP.blue;

  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.accent} 100%)`,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 64px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Site badge */}
        <div
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            padding: '4px 14px',
            fontSize: 18,
            color: colors.text,
            fontWeight: 600,
            marginBottom: 32,
            display: 'flex',
            width: 'fit-content',
          }}
        >
          cidpnavigator.com › Treatments
        </div>

        {/* Treatment name */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          {t.name}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: colors.text,
            lineHeight: 1.4,
            marginBottom: 40,
            maxWidth: 800,
          }}
        >
          {t.tagline}
        </div>

        {/* Stats pills */}
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            t.fdaStatus.split('(')[0].trim(),
            t.adminRoute,
            t.frequency,
          ].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 999,
                padding: '6px 18px',
                fontSize: 18,
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
