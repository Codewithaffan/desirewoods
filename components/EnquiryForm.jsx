'use client'

import { useState, useEffect } from 'react'

// ── WhatsApp number (update this to the real business number) ─────────────────
const WHATSAPP_NUMBER = '918200386503' // Format: country code + number, no + or spaces

export default function EnquiryForm({ close, productName = '' }) {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    product: productName,
  })
  const [errorMsg, setErrorMsg] = useState('')

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [close])

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function validate() {
    if (!form.name.trim()) return 'Please enter your name.'
    if (!form.contact.trim() || !/^\+?[\d\s\-()\\.]{7,15}$/.test(form.contact)) return 'Please enter a valid contact number.'
    if (!form.address.trim()) return 'Please enter your address.'
    if (!form.product.trim()) return 'Product name is required.'
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')
    const validationError = validate()
    if (validationError) { setErrorMsg(validationError); return }

    const message =
      `*Desire Woods — Product Enquiry*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Contact:* ${form.contact}\n` +
      `*Address:* ${form.address}\n` +
      `*Product:* ${form.product}`

    const encoded = encodeURIComponent(message)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
    window.open(url, '_blank', 'noopener,noreferrer')
    close()
  }

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white',
          width: '100%', maxWidth: 480,
          maxHeight: '95vh', overflowY: 'auto',
          position: 'relative',
          animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(24px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        {/* Header */}
        <div style={{ background: '#1a1a1a', padding: '28px 32px 24px', position: 'relative' }}>
          <button
            onClick={close}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.5)', fontSize: 20,
              padding: '4px 8px', lineHeight: 1,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            aria-label="Close"
          >✕</button>

          <p style={{ fontSize: 10, letterSpacing: 4, color: '#c9a96e', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
            Product Enquiry
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: 28, fontWeight: 400,
            color: 'white', margin: 0, lineHeight: 1.2,
          }}>
            Enquire via WhatsApp
          </h2>
        </div>

        {/* Body */}
        <div style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit} noValidate>

            {errorMsg && (
              <div style={{
                background: '#fff5f5', border: '1px solid #fecaca',
                padding: '12px 16px', marginBottom: 20,
                color: '#dc2626', fontSize: 13, lineHeight: 1.5,
              }}>
                ⚠ {errorMsg}
              </div>
            )}

            <FormField label="Your Name *">
              <input
                name="name" type="text"
                placeholder="e.g. Rahul Sharma"
                value={form.name}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#c9a96e'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
            </FormField>

            <FormField label="Contact Number *">
              <input
                name="contact" type="tel"
                placeholder="e.g. +91 98765 43210"
                value={form.contact}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#c9a96e'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
            </FormField>

            <FormField label="Address *">
              <textarea
                name="address"
                placeholder="e.g. 12, MG Road, Surat — 395007"
                value={form.address}
                onChange={handleChange}
                required
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                onFocus={e => e.target.style.borderColor = '#c9a96e'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
            </FormField>

            <FormField label="Product Name">
              <input
                name="product" type="text"
                placeholder="Product name"
                value={form.product}
                onChange={handleChange}
                style={{ ...inputStyle, background: productName ? '#faf9f6' : 'white' }}
                onFocus={e => e.target.style.borderColor = '#c9a96e'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
            </FormField>

            {/* WhatsApp Submit */}
            <button
              type="submit"
              style={{
                width: '100%', padding: '15px',
                background: '#25D366',
                color: 'white', border: 'none',
                cursor: 'pointer',
                fontSize: 11, letterSpacing: 2.5,
                textTransform: 'uppercase', fontWeight: 700,
                marginTop: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#1ebe5d'}
              onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
            >
              {/* WhatsApp icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.552 4.116 1.52 5.847L.057 23.882l6.18-1.62A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.365l-.36-.213-3.668.962.98-3.581-.234-.373A9.82 9.82 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182S21.818 6.573 21.818 12 17.427 21.818 12 21.818z"/>
              </svg>
              Send Enquiry on WhatsApp
            </button>

            <p style={{ textAlign: 'center', fontSize: 11, color: '#bbb', marginTop: 16, lineHeight: 1.6 }}>
              Clicking above will open WhatsApp with your message pre-filled
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#888', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1.5px solid #e0e0e0',
  background: 'white',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  color: '#1a1a1a',
  transition: 'border-color 0.2s',
  borderRadius: 0,
}
