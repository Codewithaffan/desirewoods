import PageNav from '@/components/PageNav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'About Us | Desire Woods',
  description: 'Learn about Desire Woods — our story, philosophy, craftsmanship, and the team behind India\'s finest bespoke furniture.',
}

const STATS = [
  { number: '8+', label: 'Years of Craft' },
  { number: '500+', label: 'Projects Delivered' },
  { number: '12', label: 'Product Categories' },
  { number: '7', label: 'Cities Served' },
]

const VALUES = [
  {
    title: 'Craftsmanship',
    body: 'Every joint, finish, and surface is the result of skilled hands and unhurried attention. We do not rush what takes time to do well.',
  },
  {
    title: 'Material Integrity',
    body: 'We source only what endures — seasoned hardwoods, premium laminates, and hardware engineered to last decades, not seasons.',
  },
  {
    title: 'Bespoke Thinking',
    body: 'No two homes are the same. We design around how you live, not around catalogue pages.',
  },
  {
    title: 'Honest Pricing',
    body: 'Luxury should not be opaque. We present clear, itemised proposals so you always know exactly what you are investing in.',
  },
]

const PROJECTS = [
  {
    number: '01',
    title: 'Residential 2BHK Turnkey Project',
    subtitle: 'Rajhans Realty',
    body: 'A complete turnkey interior transformation executed with precision and attention to detail. This 2BHK residence was designed to balance aesthetics with everyday functionality. From space planning to final installation, every element — modular furniture, storage solutions, and finishes — was customised to suit the client\'s lifestyle. The result is a cohesive living environment that reflects modern design with a refined, premium touch.',
  },
  {
    number: '02',
    title: 'Custom Bedroom Interior',
    subtitle: 'Residential',
    body: 'Featuring a dual-layered upholstered headboard, integrated lighting, smart bedside storage, and a well-organised wardrobe system, the design ensures both usability and elegance. Warm wood tones paired with subtle textures create a calm and inviting atmosphere.',
  },
  {
    number: '03',
    title: 'ISPL 2026 Event — Custom Sofa Setup',
    subtitle: 'Surat',
    body: 'Designed and installed a custom sofa setup tailored for a high-profile event environment. The seating was crafted to offer durability, comfort, and a premium visual presence suitable for celebrity engagement and media coverage — highlighting our ability to deliver functional furniture solutions for large-scale events.',
  },
  {
    number: '04',
    title: 'Custom Living Room Sofa',
    subtitle: 'Real Estate Installation',
    body: 'Installed in a newly constructed property, this made-to-measure sofa was designed to perfectly fit the layout and enhance usability. With a focus on ergonomic comfort, clean lines, and durable materials, the sofa complements the modern interior while maximising space efficiency.',
  },
  {
    number: '05',
    title: 'Modular Wardrobe & Dressing Unit',
    subtitle: 'Residential',
    body: 'A thoughtfully designed modular wardrobe system with integrated display and dressing functionality. The unit includes smart storage sections, a full-view mirror, built-in lighting, and a compact seating arrangement — ensuring convenience without compromising on style. The combination of wood textures and soft finishes adds a sophisticated touch to the space.',
  },
]

function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 11, letterSpacing: 5, color: '#c9a96e',
      textTransform: 'uppercase', marginBottom: 16,
      fontFamily: 'var(--font-jost)', fontWeight: 500,
    }}>
      {children}
    </p>
  )
}

function GoldLine() {
  return <div style={{ width: 48, height: 1, background: '#c9a96e', margin: '24px 0' }} />
}

export default function AboutPage() {
  return (
    <div style={{ background: '#faf9f6', minHeight: '100vh', fontFamily: 'var(--font-jost)' }}>
      <PageNav activePage="ABOUT US" />

      {/* ── Compact Hero ── */}
      <div style={{
        background: '#1a1a1a', color: 'white',
        padding: 'clamp(36px,5vw,56px) clamp(24px,5vw,80px)',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid rgba(201,169,110,0.15)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <SectionLabel>Desire Woods</SectionLabel>
            <h1 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(28px,4vw,44px)',
              fontWeight: 300, lineHeight: 1.1,
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              About Us
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
              transition: 'border-color 0.2s, color 0.2s',
            }}>
            ← Home
          </Link>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #ece9e4' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          padding: '0 clamp(24px,5vw,80px)',
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              padding: 'clamp(24px,3vw,36px) 24px',
              textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid #ece9e4' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(32px,3.5vw,48px)',
                fontWeight: 300, color: '#1a1a1a',
                lineHeight: 1, marginBottom: 8,
              }}>
                {s.number}
              </div>
              <div style={{ fontSize: 11, letterSpacing: 2.5, color: '#aaa', textTransform: 'uppercase', fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Story section ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px,6vw,80px)',
          alignItems: 'center',
        }}>
          <div>
            <SectionLabel>Who We Are</SectionLabel>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(32px,4vw,48px)',
              fontWeight: 300, color: '#1a1a1a',
              lineHeight: 1.15, margin: '0 0 24px',
              letterSpacing: '-0.02em',
            }}>
              Where furniture becomes architecture
            </h2>
            <GoldLine />
            <p style={{ fontSize: 14, lineHeight: 1.9, color: '#555', fontWeight: 300, marginBottom: 20 }}>
              Desire Woods is a luxury furniture brand based in Surat, Gujarat — designing and manufacturing bespoke interiors for residential and commercial spaces across India.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: '#555', fontWeight: 300, marginBottom: 20 }}>
              From a single modular kitchen to a complete apartment interior, every project is approached with the same rigour: understanding how space is used before deciding how it should look.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: '#555', fontWeight: 300 }}>
              Our workshop in Surat combines traditional joinery techniques with contemporary CNC precision — giving each piece the warmth of craft and the consistency of engineering.
            </p>
          </div>

          {/* Visual block */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: '#1a1a1a',
              aspectRatio: '3/4',
              borderRadius: 4,
              display: 'flex', alignItems: 'flex-end',
              padding: 32,
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, #2a2420 0%, #1a1a1a 60%, #111 100%)',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: 32, height: 1, background: '#c9a96e', marginBottom: 16 }} />
                <p style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(22px,3vw,32px)',
                  color: 'white', fontWeight: 300,
                  lineHeight: 1.3, fontStyle: 'italic',
                }}>
                  "We don't sell furniture.<br />We build the backdrop<br />to your life."
                </p>
              </div>
            </div>
            <div style={{
              position: 'absolute', bottom: -20, right: -20,
              width: 100, height: 100,
              border: '1px solid #c9a96e',
              zIndex: -1,
            }} />
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,64px)' }}>
            <SectionLabel>What We Stand For</SectionLabel>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(30px,4vw,46px)',
              fontWeight: 300, color: '#1a1a1a',
              margin: 0, letterSpacing: '-0.02em',
            }}>
              Our Principles
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 1, background: '#e8e4df',
          }}>
            {VALUES.map((v, i) => (
              <div key={v.title} style={{
                background: '#fff',
                padding: 'clamp(28px,4vw,44px)',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid #c9a96e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 15, color: '#c9a96e', fontWeight: 600,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 22, fontWeight: 500, color: '#1a1a1a',
                  marginBottom: 12, letterSpacing: '-0.01em',
                }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: '#666', fontWeight: 300 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Projects ── */}
      <div style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(40px,5vw,60px)' }}>
            <SectionLabel>Our Work</SectionLabel>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(30px,4vw,46px)',
              fontWeight: 300, color: '#1a1a1a',
              margin: 0, letterSpacing: '-0.02em',
            }}>
              Featured Projects
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {PROJECTS.map((project, i) => (
              <div key={project.number} style={{
                borderTop: '1px solid #e0dbd4',
                paddingTop: 32,
                paddingBottom: 32,
                display: 'grid',
                gridTemplateColumns: 'clamp(48px,6vw,80px) 1fr clamp(200px,30%,360px)',
                gap: 'clamp(20px,3vw,48px)',
                alignItems: 'start',
              }}>
                {/* Number */}
                <div style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(28px,3vw,40px)',
                  fontWeight: 300, color: '#ddd',
                  lineHeight: 1,
                }}>
                  {project.number}
                </div>

                {/* Title + subtitle */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(20px,2.5vw,28px)',
                    fontWeight: 500, color: '#1a1a1a',
                    marginBottom: 4, letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: 11, letterSpacing: 2.5, color: '#c9a96e', textTransform: 'uppercase', fontWeight: 500 }}>
                    {project.subtitle}
                  </p>
                </div>

                {/* Body */}
                <div>
                  <p style={{ fontSize: 13, lineHeight: 1.85, color: '#666', fontWeight: 300, margin: 0 }}>
                    {project.body}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #e0dbd4' }} />
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{
        background: '#1a1a1a', color: 'white',
        textAlign: 'center',
        padding: 'clamp(60px,8vw,100px) 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)' }} />
        <SectionLabel>Ready to Begin?</SectionLabel>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(28px,4vw,48px)',
          fontWeight: 300, margin: '0 auto 16px',
          letterSpacing: '-0.02em', maxWidth: 520,
        }}>
          Let's create your ideal interior
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, fontWeight: 300, marginBottom: 40, maxWidth: 380, margin: '0 auto 40px' }}>
          Walk us through your space and we'll walk you through the possibilities.
        </p>
        <Link href="/contact"
          style={{
            display: 'inline-block',
            border: '1px solid rgba(201,169,110,0.6)',
            padding: '13px 40px',
            fontFamily: 'var(--font-jost)',
            fontSize: 11, fontWeight: 500, letterSpacing: 3,
            textTransform: 'uppercase', color: '#c9a96e',
            textDecoration: 'none',
          }}>
          Get in Touch
        </Link>
      </div>

      <Footer />
    </div>
  )
}