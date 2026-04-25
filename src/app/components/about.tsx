'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { SplitLines } from '../../../components/animations/SplitLines';
import Link from 'next/link';

gsap.registerPlugin(GSAPSplitText, ScrollTrigger);

const About = () => {
  const aboutHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const aboutDescriptionRef = useRef<HTMLParagraphElement | null>(null);
  const aboutImageRef = useRef<HTMLImageElement | null>(null);

  return (
    <section className="bg-pink-500 w-full px-6 sm:px-12 py-[7rem] md:py-32 flex items-center justify-center lg:min-h-screen">
      <div className="max-w-[1200px] w-full text-start lg:text-center flex flex-col gap-8 sm:gap-10 md:gap-[3rem]">

        <SplitLines
          text='We are a growing hair extension brand offering premium-quality products designed for natural looks, durability, and everyday confidence.'
          tag="h1"
          className="text-[1.5rem] sm:text-[1.8rem] md:text-[2.5rem] lg:text-[4vw] text-white leading-[1.3]"
          duration={1}
          stagger={0.1}
          ease="power3.out"
          yPercent={150}
          threshold={0.1}
          rootMargin="-100px"
        />

        <Link href="/about" className='border-white border cursor-pointer text-white rounded-[10rem] py-[1rem] px-6 uppercase flex items-center justify-center !lg:w-[20rem]'>
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default About;