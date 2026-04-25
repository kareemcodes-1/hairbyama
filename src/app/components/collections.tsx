'use client';

import PixelRevealImage from '../helpers/pixelated-image';
import React, { useEffect, useRef } from 'react'
import { Collection } from '@/types';
import Link from 'next/link';
import { SplitText } from '../../../components/animations/SplitText';

const Collections = ({ collections }: { collections: Collection[] }) => {

  return (
    <section className='w-full py-16 sm:py-20 md:py-[8rem] px-4 sm:px-8 md:px-[3rem] bg-white'>
      <div className='flex flex-col gap-10 sm:gap-14 md:gap-[6rem]'>

        <SplitText
          text="Shop our collections"
          tag="h1"
          className="text-[2rem] md:text-[4rem] lg:text-[5rem] text-center overflow-hidden"
          duration={1}
          ease="power3.out"
          splitType="chars"
          threshold={0.1}
          rootMargin="-100px"
          stagger={0.025}
        />

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10'>

          {/* Collection Item */}
          {collections.map((item, idx) => (
            <div key={idx} className='relative w-full rounded-[0.5rem] overflow-hidden h-[20rem] md:h-[30rem]'>

              <PixelRevealImage
                src={item.image}
                className='w-full h-full object-cover'
              />

              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Text + Button */}
              <div className='absolute bottom-4 sm:bottom-6 w-full px-4 z-[100]'>
                <div className='flex items-center justify-between w-full gap-3'>
                  <h2 className='text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] text-white leading-tight'>{item.name}</h2>
                  <Link
                    href={`/shop`}
                    className="border cursor-pointer border-white text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full uppercase text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] whitespace-nowrap flex-shrink-0"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default Collections