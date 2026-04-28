'use client';

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from 'gsap/SplitText';
import { SplitLines } from "../../../components/animations/SplitLines";
import Link from "next/link";

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
        {
          scale: 1,
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: ctaImageRef.current,
            start: '200px 80%',
            end: 'bottom 60%',
            toggleActions: 'play none reverse none',
          },
        }
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
    <section className="relative w-full flex flex-col md:flex-row 
  lg:h-screen overflow-hidden">

      {/* Image */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full overflow-hidden">
        <img
          src="https://i.pinimg.com/1200x/a7/59/cc/a759cc0b1d85c60498cfd7fbf93b956f.jpg"
          alt="CTA Image"
          className="w-full h-full object-cover"
          ref={ctaImageRef}
        />
      </div>

      {/* Content */}
      <div className="bg-pink-500 
        px-[1.5rem] py-[4rem]
        md:p-14 md:pt-[7rem] 
        text-white shadow-2xl 
        w-full md:w-1/2 
        flex flex-col justify-center h-full">

        {/* Heading */}
        <SplitLines
          text='Ready for a new look?'
          tag="h1"
          className="
            text-[2rem] xs:text-[2.4rem] sm:text-[3rem] md:text-[5rem]
            leading-tight
            mb-5 sm:mb-6 md:mb-8
            overflow-hidden
            w-full md:w-[500px]
          "
          duration={1}
          stagger={0.1}
          ease="power3.out"
          yPercent={150}
          threshold={0.1}
          rootMargin="-100px"
        />

        {/* Description */}
        <SplitLines
          text='Find premium hair extensions trusted for quality, comfort, and natural beauty.'
          tag="p"
          className="
            text-[0.75rem] xs:text-[0.8rem] sm:text-[0.9rem]
            text-white/70 uppercase
            mb-6 sm:mb-8 md:mb-12
            max-w-full sm:max-w-md
            leading-relaxed
            overflow-hidden
          "
          duration={1}
          stagger={0.1}
          ease="power3.out"
          yPercent={150}
          threshold={0.1}
          rootMargin="-100px"
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-[1rem]">
          <Link href="/shop" className="
            px-6 py-3 
            md:px-[3rem] md:py-[1rem]
            bg-black uppercase text-white
            text-xs  md:text-[0.9rem]
            rounded-full shadow-lg transition
            text-center
          ">
            See Products
          </Link>

          <Link href="/contact" className="
            px-6 py-3 
            md:px-[3rem] md:py-[1rem]
            uppercase border border-white text-white
            text-xs md:text-[0.9rem]
            rounded-full transition
            text-center
            hover:bg-white hover:text-pink-500
          ">
            Call us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;