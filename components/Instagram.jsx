'use client'
import { useState, useRef } from 'react'

const INSTAGRAM_PROFILE = 'https://www.instagram.com/desirewoodsindia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='

const REELS = [
  {
    id: 1,
    src: '/video/video1.mp4',
    caption: 'Crafted for the extraordinary',
  },
  {
    id: 2,
    src: '/video/video2.mp4',
    caption: 'Where wood meets art',
  },
  {
    id: 3,
    src: '/video/video3.mp4',
    caption: 'Timeless luxury living',
  },
]

export default function Instagram() {
  const [hovered, setHovered] = useState(null)
  const videoRefs = useRef({})

  const handleMouseEnter = (index) => {
    setHovered(index)
  }

  const handleMouseLeave = (index) => {
    setHovered(null)
  }

  return (
    <section
      style={{
        backgroundColor: '#fafafa',
        padding: 'clamp(56px, 8vw, 96px) clamp(16px, 5vw, 24px)',
        fontFamily: 'var(--font-jost)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,110,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
          marginBottom: 'clamp(40px, 6vw, 64px)',
        }}
      />

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)', position: 'relative', zIndex: 1 }}>

        {/* Instagram logo */}
        <a
          href={INSTAGRAM_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', marginBottom: 20, textDecoration: 'none' }}
          aria-label="Visit DesireWoodsIndia on Instagram"
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)',
              boxShadow: '0 8px 32px rgba(238,42,123,0.25)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'
              e.currentTarget.style.boxShadow = '0 14px 44px rgba(238,42,123,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(238,42,123,0.25)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
            </svg>
          </div>
        </a>

        <p style={{
          fontSize: 11, fontWeight: 600, letterSpacing: 4,
          textTransform: 'uppercase', color: 'rgba(201,169,110,0.9)', marginBottom: 12,
        }}>
          Follow Our Story
        </p>

        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.02em',
          lineHeight: 1.1, margin: '0 0 16px',
        }}>
          <em>@desirewoodsindia</em>
        </h2>

        <p style={{
          fontSize: 14, fontWeight: 300, color: 'rgba(0,0,0,0.5)',
          maxWidth: 400, margin: '0 auto', lineHeight: 1.7,
        }}>
          Glimpses of craftsmanship, spaces, and the art of living beautifully.
        </p>
      </div>

      {/* ── Video Grid ── */}
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(10px, 2vw, 20px)',
          position: 'relative',
          zIndex: 1,
        }}
        className="reel-grid"
      >
        {REELS.map((reel, index) => (
          <a
            key={reel.id}
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch: ${reel.caption} on Instagram`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            style={{
              position: 'relative',
              borderRadius: 16,
              overflow: 'hidden',
              display: 'block',
              textDecoration: 'none',
              border: hovered === index
                ? '1px solid rgba(201,169,110,0.55)'
                : '1px solid rgba(0,0,0,0.08)',
              boxShadow: hovered === index
                ? '0 24px 64px rgba(0,0,0,0.15), 0 0 0 1px rgba(201,169,110,0.12)'
                : '0 4px 24px rgba(0,0,0,0.08)',
              transform: hovered === index
                ? 'translateY(-6px) scale(1.015)'
                : 'translateY(0) scale(1)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              backgroundColor: '#111',
              aspectRatio: '9/16',
            }}
          >
            {/* Video */}
            <video
              ref={(el) => { if (el) videoRefs.current[reel.id] = el }}
              src={reel.src}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                pointerEvents: 'none',
              }}
            />

            {/* Hover gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: hovered === index
                  ? 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)',
                transition: 'background 0.4s ease',
                pointerEvents: 'none',
              }}
            />

            {/* Instagram icon badge — top right */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 30,
                height: 30,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: hovered === index ? 1 : 0.7,
                transform: hovered === index ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s ease',
                pointerEvents: 'none',
                boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
              </svg>
            </div>

            {/* Caption slide-up on hover */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 'clamp(12px, 3vw, 20px) clamp(12px, 3vw, 18px)',
                pointerEvents: 'none',
                transform: hovered === index ? 'translateY(0)' : 'translateY(8px)',
                opacity: hovered === index ? 1 : 0,
                transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(14px, 2vw, 17px)',
                fontWeight: 400, color: '#fff',
                margin: '0 0 6px', lineHeight: 1.3,
              }}>
                {reel.caption}
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 10, fontWeight: 600, letterSpacing: 2.5,
                textTransform: 'uppercase', color: 'rgba(201,169,110,0.9)',
              }}>
                <span>View on Instagram</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* ── Follow CTA ── */}
      <div style={{ textAlign: 'center', marginTop: 'clamp(36px, 5vw, 52px)', position: 'relative', zIndex: 1 }}>
        <a
          href={INSTAGRAM_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '13px clamp(20px, 4vw, 32px)',
            border: '1px solid rgba(201,169,110,0.5)',
            color: '#c9a96e',
            textDecoration: 'none',
            fontSize: 11, fontWeight: 600, letterSpacing: 3,
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
            backgroundColor: 'transparent',
            fontFamily: 'var(--font-jost)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.08)'
            e.currentTarget.style.borderColor = '#c9a96e'
            e.currentTarget.style.color = '#b8944e'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'
            e.currentTarget.style.color = '#c9a96e'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          Follow @desirewoodsindia
        </a>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
          marginTop: 'clamp(40px, 6vw, 64px)',
        }}
      />

      {/* Responsive styles */}
      <style>{`
        /* Mobile: stack videos in a single scrollable row */
        @media (max-width: 640px) {
          .reel-grid {
            grid-template-columns: repeat(3, 72vw) !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            padding-bottom: 12px !important;
            gap: 12px !important;
            /* hide scrollbar */
            scrollbar-width: none !important;
          }
          .reel-grid::-webkit-scrollbar {
            display: none;
          }
          .reel-grid > a {
            scroll-snap-align: center !important;
            flex-shrink: 0 !important;
            /* always show caption on mobile */
            --caption-opacity: 1 !important;
          }
        }

        /* Tablet: 3 columns but tighter */
        @media (min-width: 641px) and (max-width: 900px) {
          .reel-grid {
            max-width: 100% !important;
            gap: 12px !important;
          }
        }

        /* Always show caption on touch devices */
        @media (hover: none) {
          .reel-grid > a > div:last-of-type {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </section>
  )
}