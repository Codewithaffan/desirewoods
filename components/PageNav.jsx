'use client'
import Link from 'next/link'
import { useState } from 'react'

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'PRODUCTS', href: '/#products' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'CONTACT US', href: '/contact' },
]

// Solid navbar used on inner pages (About, Contact, Category, etc.)
export default function PageNav({ activePage }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav style={{
        background: '#1a1a1a', color: 'white',
        padding: '0 clamp(20px,4vw,48px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 68,
        fontFamily: 'var(--font-jost)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, letterSpacing: '-0.01em', color: 'white' }}>
            <span style={{ fontWeight: 700 }}>D</span><span style={{ fontWeight: 300 }}>esire Woods</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link key={link.label} href={link.href}
              style={{
                fontFamily: 'var(--font-jost)', fontSize: 11, fontWeight: 500,
                letterSpacing: '2.5px', textDecoration: 'none',
                color: activePage === link.label ? '#c9a96e' : 'rgba(255,255,255,0.65)',
                borderBottom: activePage === link.label ? '1px solid #c9a96e' : '1px solid transparent',
                paddingBottom: 2,
                transition: 'color 0.2s',
              }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setMobileOpen(true)}>
          <MenuIcon />
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[260px] flex flex-col" style={{ backgroundColor: '#1a1a1a', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: 'white' }}>
                <span style={{ fontWeight: 700 }}>D</span><span style={{ fontWeight: 300 }}>esire Woods</span>
              </span>
              <button onClick={() => setMobileOpen(false)} className="text-white/50 hover:text-white"><CloseIcon /></button>
            </div>
            <nav className="flex flex-col">
              {NAV_LINKS.map(link => (
                <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block', padding: '16px 24px',
                    fontFamily: 'var(--font-jost)', fontSize: 11, fontWeight: 500,
                    letterSpacing: '2.5px', textDecoration: 'none',
                    color: activePage === link.label ? '#c9a96e' : 'rgba(255,255,255,0.6)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
