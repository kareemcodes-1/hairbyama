'use client';

import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Footer = () => {
  const footerHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    gsap.set(".footer", { yPercent: -50 });

    const uncover = gsap.timeline({ paused: true });
    uncover.to(".footer", { yPercent: 0, ease: "none" });

    ScrollTrigger.create({
      trigger: ".scroll-trigger",
      start: "bottom bottom",
      end: "+=50%",
      animation: uncover,
      scrub: true
    });

    const splitFooterLinks = new SplitText('.footer-link', {
      type: 'lines',
      mask: 'lines',
      linesClass: 'line',
      autoSplit: true,
    });

    gsap.from(splitFooterLinks.lines, {
      yPercent: 120,
      opacity: 0,
      delay: 0.2,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.footer-link',
        start: 'top 80%',
        end: 'bottom 60%',
        toggleActions: 'play none reverse none',
      },
    });

    if (footerHeadingRef.current) {
      let split = new SplitText(footerHeadingRef.current, { type: "chars, words", linesClass: 'line' });

      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.040,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerHeadingRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none reverse none',
        },
      });
    }
  }, []);

  return (
    <>
      <div className="section scroll-trigger"></div>
      <div className="overflow-hidden relative bg-black w-full">
        <footer className="px-[3rem] mt-[5rem] footer">
          
          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-[1.5rem] text-white/80 text-[.9rem]">
            <div className="flex flex-col gap-2">
              <Link href={''} className="footer-link">PRIVACY POLICY</Link>
              <Link href={''} className="footer-link">TERMS OF USE</Link>
              <Link href={''} className="footer-link">FAQ</Link>
            </div>

            <div className="flex flex-col gap-2">
              <Link href={''} className="footer-link">PAYMENT METHODS</Link>
              <Link href={''} className="footer-link">RETURNS AND COMPLAINTS</Link>
              <Link href={''} className="footer-link">SHIPPING INFO</Link>
            </div>

            <div className="flex flex-col gap-2">
              <Link href={''} className="footer-link">HOME</Link>
              <Link href={''} className="footer-link">ABOUT</Link>
              <Link href={''} className="footer-link">SHOP</Link>
               <Link href={''} className="footer-link">CONTACT</Link>
            </div>

            <div className="flex flex-col gap-2">
              <Link href={''} className="footer-link">EMAIL</Link>
              <Link href={''} className="footer-link">WHATSAPP</Link>
              <Link href={''} className="footer-link">INSTAGRAM</Link>
            </div>
          </div>

          {/* Footer Logo */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full">
            <div className="overflow-hidden">
              <h1
                ref={footerHeadingRef}
                className="lg:text-[18rem] gin text-[4.5rem] !tracking-[0] lg:leading-[15rem] text-pink-500 overflow-hidden"
              >
                hairsbyama
              </h1>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Footer;
