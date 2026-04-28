'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'

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

const CATEGORY_DESC = {
  'modular-kitchen':     'Precision-engineered kitchens that balance beauty with the demands of everyday cooking.',
  'wardrobes':           'Floor-to-ceiling wardrobe systems built around your wardrobe, your habits, your space.',
  'beds':                'Bed frames and headboards that anchor the bedroom with quiet confidence.',
  'sofas':               'Hand-upholstered sofas where comfort and form are treated as equals.',
  'dining-table':        'Dining tables crafted to become the centre of your home — and your conversations.',
  'glass-partition':     'Architectural glass partitions that define space without closing it off.',
  'office-furniture':    'Workspaces designed to perform as well as they look.',
  'swing':               'Artisanal swings that bring leisure back into the home.',
  'dining-chair':        'Seating that completes the table and elevates every meal.',
  'center-table':        'Statement centre tables that tie a living room together.',
  'arm-chair':           'Single-seat luxury — the armchair as a destination in itself.',
  'high-counter-chairs': 'Counter seating with the refinement your kitchen island deserves.',
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

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)
  const params = useParams()
  const category = params.category

  const mainImage = (product.imageUrls && product.imageUrls.length > 0)
    ? product.imageUrls[0]
    : product.imageUrl
  const imageCount = (product.imageUrls && product.imageUrls.length > 0)
    ? product.imageUrls.length
    : 1

  return (
    <Link href={`/products/${category}/${product._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer' }}
      >
        <div style={{ position: 'relative', overflow: 'hidden', background: '#f0ede8', aspectRatio: '3/4', borderRadius: 2 }}>
          <img src={mainImage} alt={product.title} loading="lazy" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
            display: 'block',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease',
          }} />
          <div style={{
            position: 'absolute', bottom: 16, left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}>
            <span style={{ background: 'rgba(255,255,255,0.95)', color: '#1a1a1a', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', padding: '8px 18px', fontFamily: 'var(--font-jost)', fontWeight: 600 }}>
              View Details
            </span>
          </div>
          <div style={{ position: 'absolute', top: 14, left: 14, fontFamily: 'var(--font-jost)', fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, opacity: hovered ? 0 : 1, transition: 'opacity 0.2s' }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          {imageCount > 1 && (
            <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: 9, padding: '3px 7px', letterSpacing: 1, fontFamily: 'var(--font-jost)', fontWeight: 600, opacity: hovered ? 0 : 0.85, transition: 'opacity 0.2s' }}>
              {imageCount} photos
            </div>
          )}
        </div>
        <div style={{ paddingTop: 16 }}>
          <div style={{ width: hovered ? 36 : 20, height: 1, background: '#c9a96e', marginBottom: 12, transition: 'width 0.35s ease' }} />
          <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(18px,2vw,22px)', fontWeight: 500, color: '#1a1a1a', marginBottom: 6, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            {product.title}
          </h3>
          {product.description && (
            <p style={{ fontSize: 12, color: '#888', lineHeight: 1.7, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {product.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.category
  const label = CATEGORY_LABELS[category] || category?.replace(/-/g, ' ')
  const desc  = CATEGORY_DESC[category] || 'Crafted with precision and designed for life.'

  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    if (!category) return
    setLoading(true); setError(null)
    fetch(`/api/products?category=${encodeURIComponent(category)}`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setProducts(d); else { setError(d.error || 'Failed to load'); setProducts([]) } })
      .catch(e => { setError(e.message); setProducts([]) })
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div style={{ background: '#faf9f6', minHeight: '100vh', fontFamily: 'var(--font-jost)' }}>
      <CompactNav />

      {/* Category Header */}
      <div style={{ background: '#1a1a1a', color: 'white', padding: 'clamp(32px,5vw,56px) clamp(24px,5vw,80px) clamp(28px,4vw,48px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: 5, color: '#c9a96e', textTransform: 'uppercase', marginBottom: 10, fontWeight: 500 }}>Our Collection</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(32px,5vw,60px)', fontWeight: 300, lineHeight: 0.95, margin: '0 0 16px', letterSpacing: '-0.03em', textTransform: 'capitalize' }}>
            {label}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: 440, lineHeight: 1.75 }}>{desc}</p>
          {!loading && !error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20 }}>
              <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 2 }}>
                {products.length} {products.length === 1 ? 'piece' : 'pieces'} in collection
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px,5vw,72px) clamp(20px,4vw,60px)' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#bbb' }}>
            <div style={{ width: 40, height: 40, border: '2px solid #e0dbd4', borderTopColor: '#c9a96e', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 0.9s linear infinite' }} />
            <p style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>Loading collection</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', background: '#fff', border: '1px solid #fecaca', maxWidth: 500, margin: '0 auto' }}>
            <p style={{ fontSize: 13, color: '#dc2626', marginBottom: 8, fontWeight: 600 }}>Could not load products</p>
            <p style={{ fontSize: 12, color: '#aaa' }}>{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'clamp(60px,8vw,100px) 24px', background: '#fff', border: '1px solid #e8e4df', maxWidth: 520, margin: '0 auto' }}>
            <div style={{ width: 64, height: 64, margin: '0 auto 24px', background: '#f5f2ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🛋️</div>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, fontWeight: 300, color: '#1a1a1a', marginBottom: 12 }}>Coming Soon</h2>
            <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.7, marginBottom: 32 }}>We're adding pieces to this collection. Check back soon — or explore our other categories.</p>
            <Link href="/" style={{ display: 'inline-block', padding: '12px 32px', background: '#1a1a1a', color: 'white', textDecoration: 'none', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-jost)', fontWeight: 600 }}>
              ← Back to Home
            </Link>
          </div>
        ) : (
          <>
            <style>{`
              .products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(20px,3vw,44px) clamp(14px,2.5vw,36px); }
              @media (min-width: 900px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
            `}</style>
            <div className="products-grid">
              {products.map((product, i) => <ProductCard key={product._id} product={product} index={i} />)}
            </div>
          </>
        )}
      </div>

      {/* Related Categories */}
      {!loading && !error && products.length > 0 && (
        <div style={{ borderTop: '1px solid #e8e4df', padding: 'clamp(36px,5vw,56px) clamp(24px,4vw,60px)', background: '#fff' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: '#c9a96e', textTransform: 'uppercase', marginBottom: 20, fontWeight: 500 }}>Explore More</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              {Object.entries(CATEGORY_LABELS).filter(([slug]) => slug !== category).slice(0, 6).map(([slug, name]) => (
                <Link key={slug} href={`/products/${slug}`}
                  style={{ padding: '8px 18px', border: '1px solid #ddd', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#555', textDecoration: 'none', fontFamily: 'var(--font-jost)', fontWeight: 500 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.color = '#1a1a1a' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555' }}
                >{name}</Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
