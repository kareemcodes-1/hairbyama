'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  src: string
  alt?: string
  className?: string
}

const PixelRevealImage = ({ src, alt = '', className }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const blocks = containerRef.current.querySelectorAll('.pixel-block')

    // Create shuffled indices for fast random reveal
    const blockArray = Array.from(blocks)
    const indices = blockArray.map((_, i) => i)
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Super fast stagger: total duration ~0.4s
    blockArray.forEach((block, i) => {
      tl.to(
        block,
        {
          opacity: 0,
          scale: 0,
          ease: 'power2.out',
        },
        indices[i] * 0.005 // 0.005 × 240 blocks = ~1.2s max, but feels instant
      )
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-5xl mx-auto overflow-hidden rounded-[.5rem] ${className || ''}`}
    >
      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        quality={100}
        priority // Optional: faster load if above the fold
      />

      {/* Faster pixel overlay: reduced to 15 columns × 10 rows = 150 blocks */}
      <div className="absolute inset-0 z-10 flex">
        {[...Array(15)].map((_, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col">
            {[...Array(10)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="pixel-block flex-1 bg-pink-500"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PixelRevealImage