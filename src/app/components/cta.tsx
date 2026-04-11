'use client';

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText)

const CTA = () => {

  const ctaHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const ctaDescriptionRef = useRef<HTMLHeadingElement | null>(null);
  const ctaImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {

    if (ctaImageRef.current) {
      gsap.fromTo(
        ctaImageRef.current,
        { scale: 1.2 },
        { scale: 1, duration: 1, ease: 'power1.out', 
          scrollTrigger: {
          trigger: ctaImageRef.current,
          start: '200px 80%',
          end: 'bottom 60%',
          toggleActions: 'play none reverse none',
          // markers: true,
        },}
      );
    }

    if (ctaHeadingRef.current) {
      let split = new SplitText(ctaHeadingRef.current, { type: "chars, words", linesClass: 'line' });

      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.025,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaHeadingRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none reverse none',
        },
      });
    }

    if (ctaDescriptionRef.current) {
      const splitSub = SplitText.create(ctaDescriptionRef.current, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'line',
        autoSplit: true,
      });

      gsap.from(splitSub.lines, {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.25,

        scrollTrigger: {
          trigger: ctaDescriptionRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none reverse none',
        },
      });
    }
    
  }, []);

  return (
    <section className="relative w-full flex flex-col md:flex-row h-[100vh] md:h-[95vh] bg-gray-50 overflow-hidden">

      {/* Left Image */}
      <div className="w-full md:w-1/2 h-[23rem] md:h-full overflow-hidden">
        <img
          src="https://i.pinimg.com/1200x/a7/59/cc/a759cc0b1d85c60498cfd7fbf93b956f.jpg"
          alt="CTA Image"
          className="w-full h-full object-cover"
          ref={ctaImageRef}
        />
      </div>

      {/* Right: Purple Card */}
      <div className="bg-pink-500 p-8 sm:p-10 md:p-14 md:pt-[7rem] text-white shadow-2xl w-full md:w-1/2 h-full flex flex-col justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-[5rem] font-[500] leading-tight mb-6 sm:mb-8 overflow-hidden" ref={ctaHeadingRef}>
          Ready for<br />a new look?
        </h2>

        <p ref={ctaDescriptionRef} className="text-sm sm:text-base md:text-[.9rem] overflow-hidden leading-[1.5] opacity-90 uppercase mb-8 sm:mb-12 max-w-full sm:max-w-md">
          Find premium hair extensions trusted for quality, comfort, and natural beauty.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button className="px-8 sm:px-10 py-3 sm:py-[1.1rem] bg-black uppercase text-white text-sm sm:text-[.9rem] rounded-full cursor-pointer shadow-lg transition">
            See Products
          </button>
          <button className="faq-btn px-8 sm:px-10 py-3 sm:py-[1.1rem] uppercase bg-transparent border border-white text-white text-sm sm:text-[.9rem] font-medium rounded-full cursor-pointer transition">
            Call us
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
