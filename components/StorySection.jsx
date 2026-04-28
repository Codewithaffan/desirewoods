'use client'
import Link from 'next/link'

export default function StorySection() {
  return (
    <section
      className="w-full text-center"
      style={{ backgroundColor: '#ffffff', padding: 'clamp(48px, 8vw, 90px) 24px' }}
    >
      <div style={{ maxWidth: '740px', margin: '0 auto' }}>
        <h2
          className="text-[#1a1a1a] uppercase mb-4"
          style={{
            fontFamily: 'var(--font-jost)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            lineHeight: 1.3,
          }}
        >
          A Story Made of Passion &amp; People
        </h2>
        <p
          className="text-[#444]"
          style={{
            fontFamily: 'var(--font-jost)',
            fontSize: 'clamp(16px, 1.5vw, 19px)',
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: '620px',
            margin: '0 auto 40px',
          }}
        >
          Desire Woods is a luxury furniture brand that synergizes rare craftsmanship
          and material innovation with comprehensive savoir-faire to deliver high-quality
          and unmatched designs for bespoke interiors
        </p>
        <Link
          href="/projects"
          style={{
            display: 'inline-block',
            border: '1px solid #1a1a1a',
            padding: '14px 42px',
            fontFamily: 'var(--font-jost)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#1a1a1a',
            textDecoration: 'none',
            transition: 'background 0.25s ease, color 0.25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a1a1a' }}
        >
          Discover Projects
        </Link>
      </div>
    </section>
  )
}