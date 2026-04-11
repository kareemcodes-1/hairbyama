'use client';

import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import ProductCard from './product-card';
import { products } from '@/app/data';


const Products = () => {
  const productHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (productHeadingRef.current) {
      let split = new GSAPSplitText(productHeadingRef.current, { type: "chars, words", linesClass: 'line' });

      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.025,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productHeadingRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none reverse none',
        },
      });
    }
  }, []);

  return (
    <section className="products px-6 sm:px-12 py-16 sm:py-20 bg-white">
      <div className="flex flex-col gap-8">

        {/* Header */}
        <div className='flex items-center flex-col gap-6 justify-center w-full'>
          <h1
            ref={productHeadingRef}
            className="text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[5rem] text-center font-[500] text-black leading-[1.3] overflow-hidden max-w-[90%] sm:max-w-[700px] md:max-w-[800px]"
          >
            Best selling hair trusted by thousands
          </h1>

          <button className='border border-black text-black py-2 px-5 sm:py-3 sm:px-7 rounded-full uppercase text-[0.9rem] sm:text-[1rem]'>
            View all
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1rem] sm:gap-10 md:gap-16">
          {products.map((item, i) => (
           <ProductCard key={i}  item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products;
