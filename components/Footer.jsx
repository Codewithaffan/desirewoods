'use client'
import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

const CATEGORY_LINKS = [
  { label: 'Modular Kitchen', href: '/products/modular-kitchen' },
  { label: 'Wardrobes', href: '/products/wardrobes' },
  { label: 'Beds', href: '/products/beds' },
  { label: 'Sofas', href: '/products/sofas' },
  { label: 'Dining Table', href: '/products/dining-table' },
  { label: 'Office Furniture', href: '/products/office-furniture' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (email.trim()) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer style={{ backgroundColor: '#111', color: '#fff', fontFamily: 'var(--font-jost)' }}>

      {/* Top accent line */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)' }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '56px 24px 48px',
      }}>

        {/* Brand column */}
        <div>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, fontWeight: 300, color: '#fff', letterSpacing: '-0.01em' }}>
              <span style={{ fontWeight: 700 }}>D</span>esire Woods
            </span>
          </Link>
          <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, marginBottom: 24 }}>
            Luxury furniture brand crafting bespoke interiors with rare craftsmanship and material innovation.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Write to us at:</p>
          <a href="mailto:info@desirewoods.in" style={{ fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>
            info@desirewoods.in
          </a>
        </div>

        {/* Collections */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 22, color: '#fff' }}>
            Collections
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {CATEGORY_LINKS.map(link => (
              <li key={link.label}>
                <Link href={link.href} style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 22, color: '#fff' }}>
            Company
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <Link href={link.href} style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#" style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16, color: '#fff' }}>
            Stay Updated
          </h4>

          {!subscribed ? (
            <>
              <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 20 }}>
                New collections, project reveals, and design insights.
              </p>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                placeholder="Your email address"
                style={{
                  width: '100%', padding: '10px 12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'transparent', color: '#fff',
                  fontSize: 13, fontFamily: 'var(--font-jost)',
                  outline: 'none', marginBottom: 10, boxSizing: 'border-box',
                }}
              />
              <button onClick={handleSubscribe} style={{
                padding: '11px 24px',
                border: '1px solid rgba(255,255,255,0.3)',
                backgroundColor: 'transparent', color: '#fff',
                fontSize: 10, fontWeight: 600, letterSpacing: 2.5,
                textTransform: 'uppercase', cursor: 'pointer',
                fontFamily: 'var(--font-jost)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#111' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff' }}>
                Subscribe
              </button>
            </>
          ) : (
            <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
              ✓ You're subscribed.<br />We'll be in touch.
            </p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.3)' }}>
          © 2025 Desire Woods. All rights reserved.
        </p>
        <p style={{ fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.3)' }}>
          Designed & Crafted in India
        </p>
      </div>
    </footer>
  )
}