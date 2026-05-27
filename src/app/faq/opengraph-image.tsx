import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CIDP FAQ — 17 Questions About Symptoms, Treatments, Insurance & Trials';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TOPICS = [
  'What is CIDP?',
  'IVIG vs Vyvgart Hytrulo',
  'Wearing off & dosing',
  'CIDP vs MS',
  'Insurance appeals',
  'Clinical trials 2025',
];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f2744 0%, #1e40af 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 64px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 8,
              padding: '4px 14px',
              fontSize: 18,
              color: '#93c5fd',
              fontWeight: 600,
            }}
          >
            cidpnavigator.com
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 62,
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          CIDP FAQ
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#93c5fd',
            marginBottom: 40,
          }}
        >
          17 Questions Answered — Based on 2021 EAN/PNS Guidelines
        </div>

        {/* Topic pills grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          {TOPICS.map((topic) => (
            <div
              key={topic}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 999,
                padding: '8px 20px',
                fontSize: 20,
                color: '#bfdbfe',
              }}
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
