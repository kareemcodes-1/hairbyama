'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SplitLines } from '../../../components/animations/SplitLines'

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const heroDescriptionRef = useRef<HTMLDivElement | null>(null);
  const heroBtnRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* For small & medium screens: fallback image */}
        {!isLargeScreen && (
          <img
            src="/image (7).jpg"
            alt="Hero Image"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

        {/* Hero Content */}
        <div className="absolute bottom-[2rem] left-0 z-20 w-full px-[1rem] md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-0">

          <SplitLines
            text='Elevate Your Look With Luxurious Hair Extensions'
            tag="h1"
            className="text-[2rem] overflow-hidden sm:text-[2.5rem] md:text-[4.5rem] text-white leading-[1.2] w-full md:max-w-[50%]"
            duration={1}
            stagger={0.1}
            ease="power3.out"
            yPercent={150}
            threshold={0.1}
            rootMargin="0px"
          />

          <div className="flex flex-col gap-4 w-full md:w-[300px]">
            <SplitLines
              text='We sell high-quality virgin human hair wigs designed for natural beauty, long-lasting wear, and everyday confidence.'
              tag="p"
              className="uppercase text-[.75rem] sm:text-[.825rem] text-white leading-[1.6]"
              duration={1}
              stagger={0.1}
              ease="power3.out"
              yPercent={150}
              threshold={0.1}
              rootMargin="0px"
            />

            <div
              ref={heroBtnRef}
              className="overflow-hidden inline-block"
            >
              <Link
                href="/shop"
                className="btn-primary lg:!w-full"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero