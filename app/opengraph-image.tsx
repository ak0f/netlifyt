import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SLIDE Agentur – Wir machen digital einfach'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          background: '#000000',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Ghost S */}
        <div
          style={{
            position: 'absolute',
            right: '-60px',
            top: '50%',
            transform: 'translateY(-52%)',
            fontSize: '740px',
            fontWeight: 400,
            color: 'transparent',
            lineHeight: 0.85,
            letterSpacing: '-0.06em',
            opacity: 0.06,
            display: 'flex',
          }}
        >
          S
        </div>

        {/* Label */}
        <div
          style={{
            fontSize: '13px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '28px',
            display: 'flex',
          }}
        >
          DIGITALAGENTUR · BERN · SCHWEIZ
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '36px',
          }}
        >
          <span style={{ fontSize: '82px', fontWeight: 400, color: '#ffffff', lineHeight: 1.08, display: 'flex' }}>
            Wir machen
          </span>
          <span style={{ fontSize: '82px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', lineHeight: 1.08, display: 'flex' }}>
            digital einfach.
          </span>
        </div>

        {/* Domain */}
        <div
          style={{
            fontSize: '17px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.04em',
            display: 'flex',
          }}
        >
          slideagentur.ch
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
