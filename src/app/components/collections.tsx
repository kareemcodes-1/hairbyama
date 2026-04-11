'use client';

import PixelRevealImage from '../helpers/pixelated-image';
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const Collections = () => {

    const collectionHeadingRef = useRef<HTMLHeadingElement | null>(null);
  
    useEffect(() => {
      if (!collectionHeadingRef.current) return;
  
        // Animate heading
        const splitHeading = new SplitText(collectionHeadingRef.current, {
          type: 'chars, words',
          linesClass: 'line',
        });
  
        gsap.from(splitHeading.chars, {
          yPercent: 120,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.025,
          scrollTrigger: {
            trigger: collectionHeadingRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none reverse none',
          },
        });
    }, []);

  return (
    <section className='px-6 sm:px-12 py-16 sm:py-20 mt-[5rem]'>
      <div className='flex flex-col gap-[6rem]'>
        {/* Heading */}
        <h1 className='text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] text-center leading-[1.2] font-[500] overflow-hidden' ref={collectionHeadingRef}>
          Shop our collections
        </h1>

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10'>
          
          {/* Collection Item */}
          {[
            { title: 'Wigs', img: 'https://i.pinimg.com/736x/0c/6b/c1/0c6bc12e0e4086dc73e7bbda0d6ffa59.jpg' },
            { title: 'Products', img: '/collection-2.jpg' },
            { title: 'Weaves', img: 'https://i.pinimg.com/1200x/df/c1/28/dfc128f83851561343033bddc0ae797b.jpg' },
          ].map((item, idx) => (
            <div key={idx} className='relative w-full rounded-[0.5rem] overflow-hidden h-64 sm:h-80 md:h-96'>
              
              <PixelRevealImage
                src={item.img}
                className='w-full h-full object-cover'
              />

              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Text + Button */}
              <div className='absolute bottom-4 sm:bottom-6 w-full px-4'>
                <div className='flex items-center justify-between w-full'>
                  <h2 className='text-[1.4rem] sm:text-[1.6rem] md:text-[2rem] text-white font-[500]'>{item.title}</h2>
                  <button className="border border-white text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full uppercase text-[0.8rem] sm:text-[1rem]">
                    Shop Now
                  </button>
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
