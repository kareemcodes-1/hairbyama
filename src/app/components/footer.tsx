'use client';

import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitLines } from '../../../components/animations/SplitLines';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  legal: [
    { label: 'PRIVACY POLICY', href: '' },
    { label: 'TERMS OF USE', href: '' },
    { label: 'FAQ', href: '' },
  ],
  support: [
    { label: 'PAYMENT METHODS', href: '' },
    { label: 'RETURNS AND COMPLAINTS', href: '' },
    { label: 'SHIPPING INFO', href: '' },
  ],
  nav: [
    { label: 'HOME', href: '' },
    { label: 'ABOUT', href: '' },
    { label: 'SHOP', href: '' },
    { label: 'CONTACT', href: '' },
  ],
  contact: [
    { label: 'EMAIL', href: '' },
    { label: 'WHATSAPP', href: '' },
    { label: 'INSTAGRAM', href: '' },
  ],
};

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
  }, []);

  return (
    <>
      <div className="section scroll-trigger"></div>

      <div className="overflow-hidden relative bg-black w-full">
        <footer className="
          footer
          px-5 py-10
          sm:px-8 sm:py-12
          md:px-[3rem] md:py-[4rem]
          mt-10 sm:mt-12 md:mt-[5rem]
        ">

          {/* Links */}
          <div className="
            grid 
            grid-cols-1 
            xs:grid-cols-2 
            sm:grid-cols-2 
            md:grid-cols-4 
            gap-6 sm:gap-8
            text-white/70 
            text-[0.75rem] xs:text-[0.8rem] sm:text-[0.9rem]
          ">
            {Object.values(footerLinks).map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-col gap-2 sm:gap-3">
                {group.map((link) => (
                  <Link key={link.label} href={link.href}>
                    <SplitLines
                      text={link.label}
                      tag="span"
                      className="block"
                      duration={1}
                      stagger={0.1}
                      ease="power3.out"
                      yPercent={120}
                      threshold={0.1}
                      rootMargin="-50px"
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Logo */}
          <div className="
            mt-10 sm:mt-12 md:mt-12
            flex justify-center items-center
          ">
            <div className="overflow-hidden text-center">
              <h1 className="
                gin text-pink-500
                text-[4rem] md:text-[6rem]
                lg:text-[20vw]
                leading-[5rem]
              ">
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