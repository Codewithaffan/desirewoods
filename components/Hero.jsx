'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

const SLIDES = [
  { id: 1, src: '/hero1.png', alt: 'Desire Woods Collection 1' },
  { id: 2, src: '/hero2.jpg', alt: 'Desire Woods Collection 2' },
  { id: 3, src: '/hero3.jpg', alt: 'Desire Woods Collection 3' },
  { id: 4, src: '/hero4.png', alt: 'Desire Woods Collection 4' },
]

const DURATION = 3500 // 3.5 seconds per slide

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const goTo = useCallback((idx) => {
    setFading(true)
    setTimeout(() => {
      setCurrent(idx)
      setFading(false)
    }, 500)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length)
  }, [current, goTo])

  /* Auto-advance */
  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, DURATION)
  }, [next])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  const handleDot = (idx) => {
    clearInterval(timerRef.current)
    goTo(idx)
    resetTimer()
  }

  // Touch event handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeThreshold = 50 // minimum distance for swipe
    const swipeDistance = touchStartX.current - touchEndX.current

    if (Math.abs(swipeDistance) > swipeThreshold) {
      clearInterval(timerRef.current)
      if (swipeDistance > 0) {
        // Swiped left - go to next
        goTo((current + 1) % SLIDES.length)
      } else {
        // Swiped right - go to previous
        goTo((current - 1 + SLIDES.length) % SLIDES.length)
      }
      resetTimer()
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Responsive height - optimized for mobile testing */}
      <div 
        className="h-[40vh] sm:h-[60vh] md:h-[80vh] lg:h-screen"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* ── Slide Images ── */}
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? (fading ? 0 : 1) : 0 }}
            aria-hidden={i !== current}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              draggable={false}
              style={{
                objectPosition: 'center', // Center the image
              }}
            />
          </div>
        ))}

        {/* ── Bottom Dots ── */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-8 left-0 right-0 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-[10px] z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`Slide ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === current ? '6px' : '5px',
                height: i === current ? '6px' : '5px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.8)',
                backgroundColor: i === current ? 'rgba(255,255,255,0.9)' : 'transparent',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* ── Left Arrow ── */}
        <button
          onClick={() => { clearInterval(timerRef.current); goTo((current - 1 + SLIDES.length) % SLIDES.length); resetTimer() }}
          aria-label="Previous"
          className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white/80 transition-colors duration-200 p-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5 md:w-6 md:h-6">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* ── Right Arrow ── */}
        <button
          onClick={() => { clearInterval(timerRef.current); goTo((current + 1) % SLIDES.length); resetTimer() }}
          aria-label="Next"
          className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white/80 transition-colors duration-200 p-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5 md:w-6 md:h-6">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}