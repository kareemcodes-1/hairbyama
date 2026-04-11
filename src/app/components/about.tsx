'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(GSAPSplitText, ScrollTrigger);

const About = () => {
  const aboutHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const aboutDescriptionRef = useRef<HTMLParagraphElement | null>(null);
  const aboutImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!aboutHeadingRef.current) return;

    document.fonts.ready.then(() => {
      // Animate heading
      const splitHeading = new GSAPSplitText(aboutHeadingRef.current, {
        type: 'words,lines',
        linesClass: 'line',
        autoSplit: true,
        mask: 'lines',
      });

      gsap.from(splitHeading.lines, {
        yPercent: 120,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.20,
        scrollTrigger: {
          trigger: aboutHeadingRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none reverse none',
        },
      });
    });
  }, []);

  return (
    <section className="bg-pink-500 w-full px-6 sm:px-12 py-24 md:py-32 flex items-center justify-center ">
      <div className="max-w-[1200px] w-full text-center">
        <h1
          ref={aboutHeadingRef}
          className="text-[1.8rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-[400] leading-[1.3] text-white"
        >
          We are a growing hair extension brand offering premium-quality products designed for natural looks, durability, and everyday confidence.
        </h1>
      </div>
    </section>
  );
};

export default About;
