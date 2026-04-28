'use client'
import { useState } from 'react'
import Link from 'next/link'

function Instagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4" fill="#E1306C" stroke="none"/>
      <circle cx="17.5" cy="6.5" r="1" fill="#E1306C" stroke="none"/>
    </svg>
  )
}
function LinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2" stroke="none">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
function Facebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" stroke="none">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}
function Pinterest() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#E60023" stroke="none">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
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
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>
    </svg>
  )
}
function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'PRODUCTS', href: '/#products' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'CONTACT US', href: '/contact' },
]

const PRODUCT_CATEGORIES = [
  'Modular Kitchen','Wardrobes','Beds','High Counter Chairs','Sofas',
  'Dining Table','Glass Partition','Office furniture','Swing',
  'Dining Chair','Center Table','Arm Chair',
]

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .header-logo-mobile {
            height: clamp(160px, 20vw, 200px) !important;
            margin-left: -12px !important;
          }
        }
      `}</style>
      <header className="absolute top-0 left-0 right-0 z-50 w-full" style={{ backgroundColor: 'transparent', fontFamily: 'var(--font-jost)' }}>
        <div className="flex items-center justify-between h-[70px] px-6 lg:px-10">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-10" style={{ marginLeft: '-32px' }}>
  <img
    src="/logo.png"
    alt="Desire Woods"
    className="header-logo-mobile"
    style={{
  height: 'clamp(100px, 10vw, 500px)',   // 🔥 realistic size (abhi tera bahut bada hai)
  width: 'auto',
  objectFit: 'contain',

  // ❌ REMOVE this (problem yahi hai)
  // filter: 'invert(1) brightness(1.15) sepia(0.18) saturate(1.2)',

  // ✅ Better approach
  filter: 'brightness(0) invert(1)',  // pure white conversion

  transition: 'all 0.3s ease',
}}
    onMouseEnter={e => {
      e.currentTarget.style.filter = 'invert(1) brightness(1.35) sepia(0.45) saturate(1.8) hue-rotate(-5deg)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.filter = 'invert(1) brightness(1.15) sepia(0.18) saturate(1.2)'
    }}
  />
</Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(link => {
              if (link.label === 'PRODUCTS') {
                return (
                  <div key={link.label} className="relative group">
                    <span className="text-white/85 hover:text-white cursor-pointer text-[11px] tracking-[2.5px]">
                      PRODUCTS
                    </span>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
                      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-4 min-w-[320px]">
                        {PRODUCT_CATEGORIES.map((item, i) => {
                          const slug = item.toLowerCase().replace(/\s/g, '-')
                          return (
                            <Link
                              key={i}
                              href={`/products/${slug}`}
                              className="text-white/80 hover:text-white text-sm transition-all duration-200 hover:translate-x-1"
                            >
                              {item}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link key={link.label} href={link.href}
                  className="text-white/85 hover:text-white transition-colors duration-200 text-[11px] tracking-[2.5px]">
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Side - Social Icons + Search + Hamburger */}
          <div className="flex items-center gap-4 text-white z-10">
            {/* Desktop Social Icons with brand colors */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity"><LinkedIn /></Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity"><Instagram /></Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity"><Facebook /></Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity"><Pinterest /></Link>
            </div>
            
            {/* Separator line for desktop */}
            <div className="hidden lg:block w-px h-5 bg-white/30"></div>
            
            <button onClick={() => setSearchOpen(s => !s)}><SearchIcon /></button>
            <button className="lg:hidden" onClick={() => setMobileOpen(true)}><MenuIcon /></button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t px-6 py-3 flex items-center gap-3 bg-black/60 backdrop-blur-md">
            <SearchIcon />
            <input autoFocus type="text" placeholder="Search..."
              className="flex-1 bg-transparent text-white outline-none" />
            <button onClick={() => setSearchOpen(false)}><CloseIcon /></button>
          </div>
        )}

        {/* MOBILE MENU OVERLAY */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Menu Panel */}
            <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-black/90 backdrop-blur-xl border-l border-white/20 flex flex-col">
              
              {/* Header with Close Button */}
              <div className="p-6 pb-4">
                <div className="flex justify-end">
                  <button onClick={() => setMobileOpen(false)} className="text-white">
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto px-6">
                <nav className="flex flex-col gap-4 pb-6">
                  {/* Products Accordion */}
                  <div className="border-b border-white/20 pb-3">
                    <button 
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="flex items-center justify-between w-full text-white/85 hover:text-white text-base tracking-[2.5px] py-2"
                    >
                      <span>PRODUCTS</span>
                      <span className={`transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown />
                      </span>
                    </button>
                    
                    {/* Mobile Products Dropdown */}
                    <div className={`mt-4 space-y-3 ${mobileProductsOpen ? 'block' : 'hidden'}`}>
                      {PRODUCT_CATEGORIES.map((item, i) => {
                        const slug = item.toLowerCase().replace(/\s/g, '-')
                        return (
                          <Link
                            key={i}
                            href={`/products/${slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block text-white/70 hover:text-white text-sm py-2 transition-all duration-200 hover:translate-x-2"
                          >
                            {item}
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  {/* Other Nav Links */}
                  <Link 
                    href="/projects" 
                    onClick={() => setMobileOpen(false)}
                    className="text-white/85 hover:text-white text-base tracking-[2.5px] py-3 border-b border-white/20"
                  >
                    PROJECTS
                  </Link>
                  <Link 
                    href="/about" 
                    onClick={() => setMobileOpen(false)}
                    className="text-white/85 hover:text-white text-base tracking-[2.5px] py-3 border-b border-white/20"
                  >
                    ABOUT US
                  </Link>
                  <Link 
                    href="/contact" 
                    onClick={() => setMobileOpen(false)}
                    className="text-white/85 hover:text-white text-base tracking-[2.5px] py-3 border-b border-white/20"
                  >
                    CONTACT US
                  </Link>
                </nav>
              </div>

              {/* Social Links with brand colors - Always at bottom */}
              <div className="p-6 pt-4 border-t border-white/10">
                <div className="flex gap-5">
                  <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity"><LinkedIn /></Link>
                  <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity"><Instagram /></Link>
                  <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity"><Facebook /></Link>
                  <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity"><Pinterest /></Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}