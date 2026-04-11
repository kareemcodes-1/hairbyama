'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { FlipLink } from '../../lib/flip-links';

gsap.registerPlugin(SplitText);

const Navbar: React.FC = () => {
  const navRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const navLogo = useRef<(HTMLAnchorElement | null)>(null);
  const navCart = useRef<(HTMLDivElement | null)>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const links: string[] = ['About', 'Shop', 'Contact'];

  /* --------------------------------
   * SplitText reveal (desktop links)
   * -------------------------------- */
  useEffect(() => {
    navRefs.current.forEach((el, index) => {
      if (!el) return;

      const split = new SplitText(el, {
        type: 'chars',
        charsClass: 'char',
      });

      gsap.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        duration: 0.7,

        ease: 'power3.out',
        stagger: 0.04,
        delay: 1.5 + index * 0.12,
      });
    });

    if (navLogo.current) {

      const split = new SplitText(navLogo.current, {
        type: 'chars',
        charsClass: 'char',
      });

      gsap.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        duration: 0.7,

        ease: 'power3.out',
        stagger: 0.04,
        delay: 1.5,
      });
    }

    if (navCart.current) {

      const split = new SplitText(navCart.current, {
        type: 'chars',
        charsClass: 'char',
      });

      gsap.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        duration: 0.7,

        ease: 'power3.out',
        stagger: 0.04,
        delay: 1.5,
      });
    }
  }, []);

  /* --------------------------------
   * Mobile menu animation
   * -------------------------------- */
  useEffect(() => {
    if (!menuRef.current || !menuOpen) return;

    gsap.fromTo(
      menuRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, [menuOpen]);

  /* --------------------------------
   * Scroll background change
   * -------------------------------- */
  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] h-[5rem] transition-all duration-500 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
    >
      <nav className="flex items-center justify-between mx-auto px-[3rem] py-[1.5rem]">

        {/* Logo */}
        <Link href={'/'}
          className={`text-[1.5rem] gin !font-[400] transition ${scrolled ? 'text-black' : 'text-white'
            }`}
          ref={navLogo}
        >
          hairsbyama
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-[3rem] ml-auto">

          <div className="flex items-center gap-[2rem]">
            {links.map((link, index) => (
              <Link
                ref={(el) => {
                  navRefs.current[index] = el;
                }}
                href={`/${link.toLowerCase()}`}
                key={index}
                className={`text-[.975rem] fk uppercase transition ${scrolled
                    ? 'text-black hover:text-pink-400'
                    : 'text-white hover:text-pink-400'
                  }`}
              >
                <FlipLink>
                  {link}
                </FlipLink>
              </Link>
            ))}
          </div>

          {/* Cart */}
          <div
            ref={navCart}
            className={`text-[.975rem] uppercase transition ${scrolled
                ? 'text-black hover:text-pink-400'
                : 'text-white hover:text-pink-400'
              }`}
          >
            <FlipLink>Cart (0)</FlipLink>
          </div>
        </div>

        {/* Mobile Toggle (optional, currently disabled) */}
        {/* 
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col justify-between w-7 h-6"
        >
          <span className={`h-0.5 w-full ${scrolled ? 'bg-black' : 'bg-white'}`} />
          <span className={`h-0.5 w-full ${scrolled ? 'bg-black' : 'bg-white'}`} />
          <span className={`h-0.5 w-full ${scrolled ? 'bg-black' : 'bg-white'}`} />
        </button>
        */}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 w-full bg-white flex flex-col items-center gap-6 py-8 lg:hidden shadow-lg"
        >
          {links.map((text) => (
            <Link
              href="/"
              key={text}
              onClick={() => setMenuOpen(false)}
              className="text-black text-[1.25rem] uppercase hover:text-pink-400 transition"
            >
              {text}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
