'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const products = [
  { id:1, slug:"product1", name:"Product One", img:"/product1.jpg", hover:"/product1.1.jpg"},
  { id:2, slug:"product2", name:"Product Two", img:"/product2.jpg", hover:"/product2.1.jpg"},
  { id:3, slug:"product3", name:"Product Three", img:"/product3.jpg", hover:"/product3.1.jpg"},
  { id:4, slug:"product4", name:"Product Four", img:"/product4.jpg", hover:"/product4.1.jpg"},
  { id:5, slug:"product5", name:"Product Five", img:"/product5.jpg", hover:"/product5.1.jpg"},
  { id:6, slug:"product6", name:"Product Six", img:"/product6.png", hover:"/product6.1.png"},
]

function ProductCard({ product }) {

  const [hover,setHover] = useState(false)

  return (

    <Link href={`/products/${product.slug}`}>

      <div
        className="relative group overflow-hidden bg-[#f5f5f5] cursor-pointer"
        style={{aspectRatio:"4/3"}}
        onMouseEnter={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
      >

        {/* Default Image */}

        <Image
          src={product.img}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-500
          ${hover ? "opacity-0 scale-110":"opacity-100 scale-100"}`}
        />

        {/* Hover Image */}

        <Image
          src={product.hover}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-500
          ${hover ? "opacity-100 scale-100":"opacity-0 scale-110"}`}
        />

      </div>

      {/* Product Name */}

      <div className="flex items-center justify-between px-3 py-3 border-t bg-white">

        <div>
          <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
          <p className="text-xs text-gray-500">Collection</p>
        </div>

        <div className="text-gray-600">
          👁
        </div>

      </div>

    </Link>

  )
}

export default function ExploreProducts(){

  return(

    <section className="max-w-7xl mx-auto px-4 py-20 bg-white">

      {/* Heading */}

      <div className="text-center mb-14">

        <h2 className="text-3xl md:text-4xl font-semibold tracking-wide text-gray-900">
          EXPLORE OUR PRODUCTS
        </h2>

        <p className="text-gray-500 mt-3">
          A complete catalogue of international-grade designs
        </p>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product)=>(
          <ProductCard key={product.id} product={product}/>
        ))}

      </div>

      {/* SEE MORE BUTTON */}

      <div className="flex justify-center mt-14">

      

      </div>

    </section>

  )
}