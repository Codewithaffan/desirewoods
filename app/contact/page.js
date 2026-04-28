'use client'

import { useState } from 'react'
import PageNav from '@/components/PageNav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const CATEGORIES_LIST = [
  'Modular Kitchen', 'Wardrobes', 'Beds', 'Sofas',
  'Dining Table', 'Glass Partition', 'Office Furniture',
  'Swing', 'Dining Chair', 'Center Table', 'Arm Chair',
  'High Counter Chairs', 'Full Home Interior', 'Other',
]

const STORES = [
  { city: 'Surat', address: 'Ring Road, Vesu, Surat — 395007', phone: '+91 98765 43210' },
  { city: 'Mumbai', address: 'Linking Road, Bandra West, Mumbai — 400050', phone: '+91 98765 43211' },
  { city: 'Pune', address: 'FC Road, Shivajinagar, Pune — 411005', phone: '+91 98765 43212' },
  { city: 'Hyderabad', address: 'Jubilee Hills, Hyderabad — 500033', phone: '+91 98765 43213' },
]

function Label({ children, required }) {
  return (
    <label style={{
      display: 'block', fontSize: 10, fontWeight: 600,
      letterSpacing: 2, color: '#888', textTransform: 'uppercase',
      marginBottom: 8, fontFamily: 'var(--font-jost)',
    }}>
      {children}{required && <span style={{ color: '#c9a96e', marginLeft: 3 }}>*</span>}
    </label>
  )
}

const inputBase = {
  width: '100%', padding: '12px 16px',
  border: '1px solid #ddd', background: '#fff',
  fontSize: 14, fontFamily: 'var(--font-jost)',
  color: '#1a1a1a', outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', category: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ background: '#faf9f6', minHeight: '100vh', fontFamily: 'var(--font-jost)' }}>
      <PageNav activePage="CONTACT US" />

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
            <p style={{ fontSize: 11, letterSpacing: 5, color: '#c9a96e', textTransform: 'uppercase', marginBottom: 10, fontWeight: 500, fontFamily: 'var(--font-jost)' }}>
              Desir eWoods
            </p>
            <h1 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(28px,4vw,44px)',
              fontWeight: 300, lineHeight: 1.1,
              margin: 0, letterSpacing: '-0.02em',
            }}>
              Contact Us
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

      {/* ── Main content ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,80px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px,6vw,80px)',
          alignItems: 'start',
        }}>

          {/* ── Form ── */}
          <div style={{ background: '#fff', padding: 'clamp(28px,4vw,48px)', border: '1px solid #e8e4df' }}>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 28, fontWeight: 400, color: '#1a1a1a',
              marginBottom: 6, letterSpacing: '-0.01em',
            }}>
              Send an Enquiry
            </h2>
            <p style={{ fontSize: 13, color: '#999', marginBottom: 32, lineHeight: 1.6 }}>
              All fields marked <span style={{ color: '#c9a96e' }}>*</span> are required.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 24px' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  border: '1px solid #c9a96e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', fontSize: 22, color: '#c9a96e',
                }}>
                  ✓
                </div>
                <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, fontWeight: 400, color: '#1a1a1a', marginBottom: 10 }}>
                  Enquiry Received
                </h3>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 28 }}>
                  Thank you, {form.name || 'there'}. Our team will reach out to you at {form.email || 'your email'} within one business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', city: '', category: '', message: '' }) }}
                  style={{
                    padding: '11px 28px', background: 'none',
                    border: '1px solid #1a1a1a', cursor: 'pointer',
                    fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
                    fontFamily: 'var(--font-jost)', color: '#1a1a1a',
                  }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                  <div style={{ marginBottom: 20 }}>
                    <Label required>Full Name</Label>
                    <input
                      name="name" value={form.name} onChange={handleChange} required
                      placeholder="Your name"
                      style={{ ...inputBase, borderColor: focused === 'name' ? '#1a1a1a' : '#ddd' }}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <Label required>Phone Number</Label>
                    <input
                      name="phone" value={form.phone} onChange={handleChange} required
                      placeholder="+91 00000 00000"
                      style={{ ...inputBase, borderColor: focused === 'phone' ? '#1a1a1a' : '#ddd' }}
                      onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <Label required>Email Address</Label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange} required
                    placeholder="you@example.com"
                    style={{ ...inputBase, borderColor: focused === 'email' ? '#1a1a1a' : '#ddd' }}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                  <div style={{ marginBottom: 20 }}>
                    <Label>City</Label>
                    <input
                      name="city" value={form.city} onChange={handleChange}
                      placeholder="Surat, Mumbai..."
                      style={{ ...inputBase, borderColor: focused === 'city' ? '#1a1a1a' : '#ddd' }}
                      onFocus={() => setFocused('city')} onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <Label>Category of Interest</Label>
                    <select
                      name="category" value={form.category} onChange={handleChange}
                      style={{ ...inputBase, borderColor: focused === 'category' ? '#1a1a1a' : '#ddd', appearance: 'none', cursor: 'pointer' }}
                      onFocus={() => setFocused('category')} onBlur={() => setFocused(null)}
                    >
                      <option value="">Select category</option>
                      {CATEGORIES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <Label>Message</Label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    rows={4} placeholder="Tell us about your project, timeline, and any specific requirements..."
                    style={{ ...inputBase, resize: 'vertical', borderColor: focused === 'message' ? '#1a1a1a' : '#ddd' }}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  />
                </div>

                <button type="submit" style={{
                  width: '100%', padding: '15px',
                  background: '#1a1a1a', color: 'white',
                  border: 'none', cursor: 'pointer',
                  fontSize: 11, fontWeight: 600, letterSpacing: 3,
                  textTransform: 'uppercase', fontFamily: 'var(--font-jost)',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#333'}
                  onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

          {/* ── Info panel ── */}
          <div>
            {/* Direct contact */}
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: 11, letterSpacing: 4, color: '#c9a96e', textTransform: 'uppercase', marginBottom: 20, fontWeight: 500 }}>
                Direct Contact
              </p>

              {[
                { icon: '✉', label: 'Email', value: 'info@desirewoods.in', href: 'mailto:info@desirewoods.in' },
                { icon: '📞', label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
                { icon: '📍', label: 'Head Office', value: 'Ring Road, Vesu, Surat, Gujarat — 395007', href: null },
                { icon: '🕐', label: 'Working Hours', value: 'Mon – Sat, 10:00 am – 7:00 pm', href: null },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', gap: 16, marginBottom: 20,
                  paddingBottom: 20, borderBottom: '1px solid #ece9e4',
                }}>
                  <div style={{
                    width: 40, height: 40, flexShrink: 0,
                    background: '#f5f2ee',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: 2, color: '#aaa', textTransform: 'uppercase', marginBottom: 4, fontWeight: 600 }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 400, textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#c9a96e'}
                        onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: 14, color: '#555', fontWeight: 300, lineHeight: 1.5 }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Store locations */}
            <div>
              <p style={{ fontSize: 11, letterSpacing: 4, color: '#c9a96e', textTransform: 'uppercase', marginBottom: 20, fontWeight: 500 }}>
                Our Stores
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {STORES.map(store => (
                  <div key={store.city} style={{
                    background: '#fff',
                    border: '1px solid #e8e4df',
                    padding: '20px',
                  }}>
                    <h4 style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 18, fontWeight: 500, color: '#1a1a1a',
                      marginBottom: 8,
                    }}>
                      {store.city}
                    </h4>
                    <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6, marginBottom: 8 }}>{store.address}</p>
                    <a href={`tel:${store.phone.replace(/\s/g, '')}`} style={{ fontSize: 12, color: '#c9a96e', textDecoration: 'none', fontWeight: 500 }}>
                      {store.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}