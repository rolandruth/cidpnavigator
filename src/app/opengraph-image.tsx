import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CIDP Treatment Navigator — Free AI Assistant for CIDP Patients';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Logo circle */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 32,
          }}
        >
          CN
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          CIDP Treatment Navigator
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: 28,
            color: '#93c5fd',
            textAlign: 'center',
            marginBottom: 36,
          }}
        >
          Free AI Assistant for CIDP Patients
        </div>

        {/* Treatment tags */}
        <div
          style={{
            fontSize: 22,
            color: '#bfdbfe',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          IVIG · Vyvgart Hytrulo · SCIg · Plasma Exchange
        </div>

        {/* URL badge */}
        <div
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 24,
            padding: '8px 28px',
            fontSize: 22,
            color: '#60a5fa',
          }}
        >
          cidpnavigator.com
        </div>
      </div>
    ),
    { ...size }
  );
}
