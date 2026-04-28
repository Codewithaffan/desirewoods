'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

// ─── Project Data ───────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'bluestar-202',
    name: 'Bluestar 202',
    tagline: 'Residential Interior — Premium Suite',
    year: '2024',
    location: 'Surat, Gujarat',
    area: '2,400 sq ft',
    description:
      'Bluestar 202 is an immersive residential project that redefines the art of bespoke living. Every space was conceived as a dialogue between handcrafted woodwork and architectural restraint — where rich walnut tones meet the clean geometry of modular cabinetry. The modular kitchen is the centrepiece: an unbroken expanse of matte-lacquered panels punctuated by brass hardware and hidden-hinge doors. Wardrobes across the bedrooms carry the same visual language — floor-to-ceiling, joint-free, with interiors tailored to each occupant\'s wardrobe ecosystem. This project stands as proof that luxury is not ornamentation but the absolute precision of form meeting function.',
    highlights: ['Modular Kitchen', 'Floor-to-Ceiling Wardrobes', 'Custom Bed Design', 'Glass Partitions', 'Home Office'],
    coverImage: '/project1/02-cover.jpg',
    images: [
      '/project1/01.jpg',
      '/project1/02.jpg',
      '/project1/03.jpg',
      '/project1/04.jpg',
      '/project1/05.jpg',
      '/project1/06.jpg',
      '/project1/07.jpg',
      '/project1/08.jpg',
      '/project1/09.jpg',
      '/project1/10.jpg',
      '/project1/11.jpg',
      '/project1/12.jpg',
    ],
  },
  {
    id: 'bluestar-401',
    name: 'Bluestar 401',
    tagline: 'Residential Interior — Penthouse Living',
    year: '2024',
    location: 'Surat, Gujarat',
    area: '3,100 sq ft',
    description:
      'Bluestar 401 occupies the penthouse level — and every design decision acknowledges that privilege. The brief demanded an interior that felt simultaneously opulent and liveable: a home that photographs like an editorial spread but breathes like a sanctuary. Desire Woods responded with a palette of deep oak, off-white stucco textures, and brushed-gold accents woven through furniture hardware and light fixtures. The open-plan living and dining area features a custom 14-seater dining ensemble and a floating TV unit with integrated storage spanning nearly seven metres. The master bedroom suite houses a walk-in wardrobe system with illuminated display niches, velvet-lined drawers, and a bespoke vanity island — a wardrobe designed not just to store, but to inspire.',
    highlights: ['Penthouse Living Room', 'Custom 14-Seater Dining', '7m Floating TV Unit', 'Walk-in Wardrobe', 'Master Suite'],
    coverImage: '/project2/cover.jpg',
    images: [
      '/project2/01.jpg',
      '/project2/02.jpg',
      '/project2/03.jpg',
      '/project2/04.jpg',
      '/project2/05.jpg',
      '/project2/06.jpg',
      '/project2/07.jpg',
      '/project2/08.jpg',
      '/project2/09.jpg',
      '/project2/10.jpg',
      '/project2/11.jpg',
      '/project2/12.jpg',
      '/project2/14.jpg',
    ],
  },
  {
    id: 'olivia',
    name: 'Olivia',
    tagline: 'Residential Interior — Contemporary Elegance',
    year: '2023',
    location: 'Surat, Gujarat',
    area: '1,850 sq ft',
    description:
      'Olivia began with a single question: what does a home look like when it is designed around the people who live in it, rather than design trends? The answer was a deeply personal interior that draws on the family\'s love of warm textures, curated objects, and functional beauty. Soft fluted wood panels run through the living room and master bedroom, creating a rhythm that feels organic rather than mechanical. The kitchen is compact but meticulously engineered — every centimetre considered, every material selected for longevity. Olivia is perhaps the most intimate project in the Desire Woods portfolio: it does not announce itself, it reveals itself slowly, room by room, detail by detail.',
    highlights: ['Fluted Wood Panelling', 'Compact Modular Kitchen', 'Bespoke Sofas', 'Children\'s Room', 'Dining Nook'],
    coverImage: '/project3/post2-cover.jpg',
    images: [
      '/project3/post1.jpg',
      '/project3/post2.jpg',
      '/project3/post3.jpg',
      '/project3/post4.jpg',
      '/project3/post5.jpg',
      '/project3/post6.jpg',
      '/project3/post7.jpg',
      '/project3/post8.jpg',
      '/project3/post9.jpg',
    ],
  },
]

// ─── Lightbox ───────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 24,
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
          cursor: 'pointer', fontSize: 28, lineHeight: 1, zIndex: 10,
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
      >
        ✕
      </button>
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.4)', fontSize: 12, letterSpacing: 3,
        fontFamily: 'var(--font-jost)',
      }}>
        {index + 1} / {images.length}
      </div>
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        style={{
          position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.7)', cursor: 'pointer', borderRadius: '50%',
          width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
      >
        ‹
      </button>
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        style={{
          position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.7)', cursor: 'pointer', borderRadius: '50%',
          width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
      >
        ›
      </button>
      <img
        onClick={e => e.stopPropagation()}
        src={images[index]}
        alt=""
        style={{
          maxWidth: '90vw', maxHeight: '85vh',
          objectFit: 'contain',
          borderRadius: 4,
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}
      />
    </div>
  )
}

// ─── Gallery Grid ────────────────────────────────────────────────────────────
function ProjectGallery({ images, onImageClick }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {images.map((img, i) => {
        const isWide = i === 0 || i === 6
        return (
          <GalleryItem key={img + i} src={img} isWide={isWide} onClick={() => onImageClick(i)} />
        )
      })}
    </div>
  )
}

function GalleryItem({ src, isWide, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        gridColumn: isWide ? 'span 2' : 'span 1',
        aspectRatio: isWide ? '16/9' : '4/3',
        overflow: 'hidden', cursor: 'zoom-in',
        position: 'relative', borderRadius: 4, background: '#1a1a1a',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <img
        src={src} alt=""
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          display: 'block',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.3)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 44, height: 44,
          border: '1px solid rgba(255,255,255,0.6)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 20, lineHeight: 1,
          transform: hovered ? 'scale(1)' : 'scale(0.7)',
          transition: 'transform 0.3s ease',
        }}>
          +
        </div>
      </div>
    </div>
  )
}

// ─── InView hook ─────────────────────────────────────────────────────────────
function useInView(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

// ─── Project Section ─────────────────────────────────────────────────────────
function ProjectSection({ project, index }) {
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const sectionRef = useRef(null)
  const visible = useInView(sectionRef)
  const isEven = index % 2 === 0

  return (
    <>
      {lightboxIdx !== null && (
        <Lightbox
          images={project.images}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((i) => (i - 1 + project.images.length) % project.images.length)}
          onNext={() => setLightboxIdx((i) => (i + 1) % project.images.length)}
        />
      )}

      <section
        ref={sectionRef}
        style={{
          padding: 'clamp(60px, 8vw, 120px) 0',
          borderBottom: index < PROJECTS.length - 1 ? '1px solid #e8e5e0' : 'none',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>

          {/* Project header */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
            justifyContent: 'space-between', gap: 24, marginBottom: 64,
          }}>
            <div>
              <p style={{
                fontSize: 11, letterSpacing: 4, color: '#c9a96e',
                textTransform: 'uppercase', marginBottom: 12,
                fontFamily: 'var(--font-jost)', fontWeight: 500,
              }}>
                {String(index + 1).padStart(2, '0')} / Project
              </p>
              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(42px, 6vw, 76px)',
                fontWeight: 300, color: '#1a1a1a',
                lineHeight: 0.95, margin: 0, letterSpacing: '-0.02em',
              }}>
                {project.name}
              </h2>
              <p style={{
                fontFamily: 'var(--font-jost)',
                fontSize: 13, color: '#888',
                letterSpacing: 2, marginTop: 12,
                textTransform: 'uppercase', fontWeight: 400,
              }}>
                {project.tagline}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { label: 'Location', value: project.location },
                { label: 'Area', value: project.area },
                { label: 'Year', value: project.year },
              ].map(m => (
                <div key={m.label} style={{ border: '1px solid #e0dbd4', padding: '10px 20px', borderRadius: 2 }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: '#aaa', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'var(--font-jost)' }}>{m.label}</div>
                  <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 600, fontFamily: 'var(--font-jost)' }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'start',
          }}>
            <div style={{ order: isEven ? 0 : 1 }}>
              <div style={{
                width: '100%', aspectRatio: '4/3',
                overflow: 'hidden', borderRadius: 4,
                marginBottom: 40, position: 'relative',
              }}>
                <img
                  src={project.coverImage} alt={project.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
                }} />
              </div>

              <p style={{ fontFamily: 'var(--font-jost)', fontSize: 14, lineHeight: 1.9, color: '#555', fontWeight: 300, marginBottom: 36 }}>
                {project.description}
              </p>

              <div>
                <p style={{ fontSize: 10, letterSpacing: 3, color: '#aaa', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-jost)', fontWeight: 600 }}>
                  Project Highlights
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.highlights.map(h => (
                    <span key={h} style={{
                      padding: '6px 14px', background: '#f5f2ee', borderRadius: 2,
                      fontSize: 12, color: '#444', fontFamily: 'var(--font-jost)',
                      fontWeight: 400, letterSpacing: 0.5,
                    }}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ order: isEven ? 1 : 0 }}>
              <ProjectGallery images={project.images} onImageClick={setLightboxIdx} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  return (
    <div style={{ background: '#faf9f6', minHeight: '100vh', fontFamily: 'var(--font-jost)' }}>

      {/* ── Compact Hero ── */}
      <div style={{
        background: '#1a1a1a', color: 'white',
        padding: 'clamp(36px,5vw,56px) clamp(24px,5vw,80px)',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid rgba(201,169,110,0.15)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: 5, color: '#c9a96e', textTransform: 'uppercase', marginBottom: 10, fontWeight: 500, fontFamily: 'var(--font-jost)' }}>
              Desire Woods
            </p>
            <h1 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(28px,4vw,44px)',
              fontWeight: 300, lineHeight: 1.1,
              margin: 0, letterSpacing: '-0.02em',
            }}>
              Projects
            </h1>
          </div>
          <Link href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1px solid rgba(201,169,110,0.4)',
              padding: '10px 24px',
              fontFamily: 'var(--font-jost)',
              fontSize: 11, fontWeight: 500, letterSpacing: 2.5,
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
            }}>
            ← Home
          </Link>
        </div>
      </div>

      {/* ── Projects ── */}
      <div style={{ background: '#faf9f6' }}>
        {PROJECTS.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* ── CTA ── */}
      <div style={{
        background: '#1a1a1a', color: 'white',
        textAlign: 'center',
        padding: 'clamp(60px, 10vw, 120px) 24px',
      }}>
        <p style={{ fontSize: 11, letterSpacing: 4, color: '#c9a96e', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-jost)' }}>
          Start Your Journey
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 300, margin: '0 auto 16px',
          letterSpacing: '-0.02em', maxWidth: 600,
        }}>
          Let&apos;s design your dream interior together
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.45)', fontSize: 14,
          fontFamily: 'var(--font-jost)', fontWeight: 300,
          marginBottom: 44, maxWidth: 400, margin: '0 auto 44px',
        }}>
          From concept to completion — our team is ready to bring your vision to life.
        </p>
        <Link
          href="/#contact"
          style={{
            display: 'inline-block',
            border: '1px solid rgba(201,169,110,0.7)',
            padding: '14px 44px',
            fontFamily: 'var(--font-jost)',
            fontSize: 11, fontWeight: 500,
            letterSpacing: 3, textTransform: 'uppercase',
            color: '#c9a96e', textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.borderColor = '#c9a96e' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a96e'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.7)' }}
        >
          Get in touch
        </Link>
      </div>
    </div>
  )
}