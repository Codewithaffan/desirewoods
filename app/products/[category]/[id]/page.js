'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import EnquiryForm from '@/components/EnquiryForm'

const CATEGORY_LABELS = {
  'modular-kitchen':     'Modular Kitchen',
  'wardrobes':           'Wardrobes',
  'beds':                'Beds',
  'sofas':               'Sofas',
  'dining-table':        'Dining Table',
  'glass-partition':     'Glass Partition',
  'office-furniture':    'Office Furniture',
  'swing':               'Swing',
  'dining-chair':        'Dining Chair',
  'center-table':        'Center Table',
  'arm-chair':           'Arm Chair',
  'high-counter-chairs': 'High Counter Chairs',
}

function CompactNav() {
  return (
    <nav style={{
      background: '#1a1a1a',
      height: 52,
      display: 'flex',
      alignItems: 'center',
      padding: '0 clamp(20px,4vw,48px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      fontFamily: 'var(--font-jost)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <Link href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          textDecoration: 'none',
          color: 'rgba(255,255,255,0.7)',
          fontSize: 11,
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontWeight: 500,
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#c9a96e'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back to Home
      </Link>
    </nav>
  )
}

export default function ProductDetailPage() {
  const params = useParams()
  const { category, id } = params

  const [product, setProduct]     = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [showEnquiry, setShowEnquiry] = useState(false)
  const [zoomed, setZoomed]       = useState(false)
  const touchStartX = useRef(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`/api/products?id=${encodeURIComponent(id)}`)
      .then(r => r.json())
      .then(d => { if (d.error) throw new Error(d.error); setProduct(d) })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  const images = product
    ? (product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl])
    : []

  const goNext = () => setActiveImage(i => (i + 1) % images.length)
  const goPrev = () => setActiveImage(i => (i - 1 + images.length) % images.length)

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev()
    touchStartX.current = null
  }

  useEffect(() => {
    const fn = (e) => { if (e.key === 'ArrowRight') goNext(); if (e.key === 'ArrowLeft') goPrev() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [images.length])

  const catLabel = CATEGORY_LABELS[category] || category?.replace(/-/g, ' ')

  return (
    <div style={{ background: '#faf9f6', minHeight: '100vh', fontFamily: 'var(--font-jost)' }}>
      <CompactNav />

      {showEnquiry && product && (
        <EnquiryForm close={() => setShowEnquiry(false)} productName={product.title} />
      )}

      {/* Breadcrumb */}
      <div style={{ background: '#1a1a1a', padding: 'clamp(12px,2vw,18px) clamp(24px,4vw,60px)', borderBottom: '1px solid #2a2a2a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
          <Link href={`/products/${category}`} style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase' }}>{catLabel}</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
          {product && <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>{product.title}</span>}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(28px,4vw,56px) clamp(20px,4vw,60px)' }}>

        {loading && (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ width: 40, height: 40, border: '2px solid #e0dbd4', borderTopColor: '#c9a96e', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 0.9s linear infinite' }} />
            <p style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: '#bbb' }}>Loading product</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <p style={{ color: '#dc2626', marginBottom: 16 }}>Could not load product: {error}</p>
            <Link href={`/products/${category}`} style={{ color: '#c9a96e', textDecoration: 'none', fontSize: 12, letterSpacing: 2 }}>← Back to {catLabel}</Link>
          </div>
        )}

        {!loading && !error && product && (
          <>
            {/* Responsive CSS */}
            <style>{`
              .product-detail-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 32px;
              }
              @media (min-width: 768px) {
                .product-detail-grid {
                  grid-template-columns: minmax(300px, 55%) 1fr;
                  gap: clamp(32px, 4vw, 64px);
                  align-items: start;
                }
              }
              .product-info-panel {
                padding-top: 0;
              }
              @media (min-width: 768px) {
                .product-info-panel {
                  padding-top: 8px;
                }
              }
            `}</style>

            <div className="product-detail-grid">

              {/* ── LEFT / TOP: Image Gallery ── */}
              <div>
                {/* Main image */}
                <div
                  style={{
                    position: 'relative',
                    background: '#f0ede8',
                    borderRadius: 4,
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    cursor: zoomed ? 'zoom-out' : 'zoom-in',
                    marginBottom: 16,
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onClick={() => setZoomed(z => !z)}
                >
                  <img
                    src={images[activeImage]}
                    alt={product.title}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: zoomed ? 'contain' : 'cover',
                      display: 'block',
                    }}
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); goPrev() }}
                        style={{
                          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                          background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                          width: 40, height: 40, cursor: 'pointer', fontSize: 18,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                        }}
                      >‹</button>
                      <button
                        onClick={(e) => { e.stopPropagation(); goNext() }}
                        style={{
                          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                          background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                          width: 40, height: 40, cursor: 'pointer', fontSize: 18,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                        }}
                      >›</button>
                    </>
                  )}

                  {images.length > 1 && (
                    <div style={{ position: 'absolute', bottom: 14, right: 14, background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: 11, padding: '4px 10px', letterSpacing: 1.5, fontFamily: 'var(--font-jost)' }}>
                      {activeImage + 1} / {images.length}
                    </div>
                  )}

                  <div style={{ position: 'absolute', bottom: 14, left: 14, background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.7)', fontSize: 10, padding: '3px 8px', letterSpacing: 1 }}>
                    {zoomed ? 'Click to fit' : 'Click to zoom'}
                  </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {images.map((src, i) => (
                      <button key={i} onClick={() => setActiveImage(i)} style={{
                        width: 72, height: 72, padding: 0, border: 'none',
                        borderRadius: 4, overflow: 'hidden', cursor: 'pointer',
                        outline: activeImage === i ? '2px solid #c9a96e' : '2px solid transparent',
                        outlineOffset: 2, background: '#f0ede8', flexShrink: 0,
                      }}>
                        <img src={src} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── RIGHT / BOTTOM: Product Info ── */}
              <div className="product-info-panel">
                <p style={{ fontSize: 10, letterSpacing: 4, color: '#c9a96e', textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>
                  {catLabel}
                </p>

                <h1 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(28px,4vw,50px)',
                  fontWeight: 400, lineHeight: 1.1,
                  color: '#1a1a1a', marginBottom: 20,
                  letterSpacing: '-0.02em',
                }}>
                  {product.title}
                </h1>

                <div style={{ width: 48, height: 1, background: '#c9a96e', marginBottom: 24 }} />

                {product.description ? (
                  <p style={{ fontSize: 15, color: '#555', lineHeight: 1.9, fontWeight: 300, marginBottom: 32, maxWidth: 440 }}>
                    {product.description}
                  </p>
                ) : (
                  <p style={{ fontSize: 15, color: '#aaa', lineHeight: 1.9, marginBottom: 32, fontStyle: 'italic' }}>
                    Handcrafted with precision. Contact us for full specifications.
                  </p>
                )}

                {images.length > 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, padding: '12px 16px', background: '#f5f2ee', borderRadius: 6 }}>
                    <span style={{ fontSize: 16 }}>🖼</span>
                    <span style={{ fontSize: 12, color: '#888', letterSpacing: 0.5 }}>
                      {images.length} images available — use arrows or thumbnails to browse
                    </span>
                  </div>
                )}

                {/* Enquiry Button */}
                <button
                  onClick={() => setShowEnquiry(true)}
                  style={{
                    display: 'block', width: '100%',
                    padding: '16px 32px',
                    background: '#1a1a1a', color: 'white',
                    border: 'none', cursor: 'pointer',
                    fontSize: 11, letterSpacing: 3,
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-jost)', fontWeight: 700,
                    marginBottom: 12,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#333'}
                  onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
                >
                  Enquire Now
                </button>

                <Link
                  href={`/products/${category}`}
                  style={{
                    display: 'block', width: '100%',
                    padding: '15px 32px',
                    background: 'transparent', color: '#1a1a1a',
                    border: '1.5px solid #ddd', cursor: 'pointer',
                    fontSize: 11, letterSpacing: 3,
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-jost)', fontWeight: 600,
                    textAlign: 'center', textDecoration: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#ddd'}
                >
                  ← View Full Collection
                </Link>

                <div style={{ marginTop: 36, borderTop: '1px solid #e8e4df', paddingTop: 24 }}>
                  {[
                    { icon: '✦', text: 'Premium solid wood & engineered materials' },
                    { icon: '✦', text: 'Custom sizing available on request' },
                    { icon: '✦', text: 'Professional installation included' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                      <span style={{ color: '#c9a96e', fontSize: 10, marginTop: 4, flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ fontSize: 12, color: '#777', lineHeight: 1.6 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
