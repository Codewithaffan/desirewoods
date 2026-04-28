'use client'
import { useState } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  {
    id: 1,
    name: 'Modular Kitchen',
    tagline: 'Crafted for the heart of your home',
    img: '/kitchen1.jpg',
    imgHover: '/kitchen.jpg',
  },
  {
    id: 2,
    name: 'Wardrobes',
    tagline: 'Bespoke storage, refined design',
    img: '/wardrobe1.jpg',
    imgHover: '/wardrobe.jpg',
  },
  {
    id: 3,
    name: 'Beds',
    tagline: 'Sleep in unmatched luxury',
    img: '/bed1.jpg',
    imgHover: '/bed.jpg',
  },
  {
    id: 4,
    name: 'High Counter Chairs',
    tagline: 'Where form meets function',
    img: '/hcg.jpg',
    imgHover: '/hcg1.jpg',
  },
  {
    id: 5,
    name: 'Sofas',
    tagline: 'Sculpted comfort, timeless elegance',
    img: '/sofa.jpeg',
    imgHover: '/sofa1.jpeg',
  },
  {
    id: 6,
    name: 'Dining Table',
    tagline: 'Gather around elegance',
    img: '/dtable.jpg',
    imgHover: '/dtable1.jpg',
  },
  {
    id: 7,
    name: 'Glass Partition',
    tagline: 'Modern transparency, refined spaces',
    img: '/gpart1.png',
    imgHover: '/gpart.jpeg',
  },
  {
    id: 8,
    name: 'Office furniture',
    tagline: 'Ergonomics meets sophistication',
    img: '/ofurni.jpg',
    imgHover: '/ofurni1.jpg',
  },
  {
    id: 9,
    name: 'Swing',
    tagline: 'Leisure in perfect balance',
    img: '/swing1.png',
    imgHover: '/swing.jpeg',
  },
  {
    id: 10,
    name: 'Dining Chair',
    tagline: 'Sit in style',
    img: '/dchair.jpg',
    imgHover: '/dchair1.jpg',
  },
  {
    id: 11,
    name: 'Center Table',
    tagline: 'The heart of your living room',
    img: '/ctable1.png',
    imgHover: '/ctable.jpeg',
  },
  {
    id: 12,
    name: 'Arm Chair',
    tagline: 'Luxury at your reach',
    img: '/achair.jpg',
    imgHover: '/achair1.jpg',
  },
]

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const slug = product.name.toLowerCase().replace(/\s/g, '-')

  return (
    <div className="group cursor-pointer">
      <Link href={`/products/${slug}`} className="block">
        {/* Image Container - Reduced size */}
        <div
          className="relative overflow-hidden rounded-lg bg-gray-100 max-w-[280px] md:max-w-[320px] mx-auto"
          style={{ aspectRatio: '4/5' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src={product.img}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out"
              style={{
                opacity: hovered ? 0 : 1,
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
              }}
            />
            <img
              src={product.imgHover}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'scale(1)' : 'scale(1.1)',
              }}
            />
          </div>
        </div>
      </Link>

      {/* Text Content - Reduced spacing and font sizes */}
      <div className="mt-3 md:mt-4 max-w-[280px] md:max-w-[320px] mx-auto">
        <p className="text-amber-600 text-[9px] md:text-[10px] tracking-[0.15em] uppercase mb-1 md:mb-1.5 font-medium">
          {product.tagline}
        </p>
        <h3 
          className="text-sm md:text-base lg:text-lg font-light text-gray-900 mb-1.5"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {product.name}
        </h3>
        
        {/* Explore Link */}
        <div
          className="flex items-center gap-1.5 transition-all duration-300 overflow-hidden"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(-10px)',
          }}
        >
          <span className="text-[9px] md:text-[10px] tracking-wider uppercase text-gray-600">Explore</span>
          <div className="w-6 h-px bg-amber-500"></div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsSection() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header - Reduced spacing */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10">
          <p className="text-amber-600 text-xs tracking-[0.25em] uppercase mb-2 font-medium">
            Explore Our Products
          </p>
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-3"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            A Complete Catalogue of
            <br />
            International-Grade Designs
          </h2>
          <div className="w-12 h-px bg-amber-400 mx-auto mt-4"></div>
        </div>

        {/* Products Grid - Reduced gaps */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5 max-w-5xl mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}