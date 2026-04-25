'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { usePathname, useSearchParams } from 'next/navigation';

const COLS = 20;

const shuffle = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const PixelTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getBlockCount = () => {
    if (typeof window === 'undefined') return 20;
    const blockSize = window.innerWidth * 0.05;
    return Math.ceil(window.innerHeight / blockSize);
  };

  const animateIn = useCallback(() => {
    const container = containerRef.current;
    if (!container || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const blocks = Array.from(container.querySelectorAll<HTMLElement>('.pixel-block'));
    const shuffledIndexes = shuffle(blocks.map((_, i) => i));

    tlRef.current?.kill();
    gsap.set(blocks, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    blocks.forEach((block, i) => {
      tl.to(
        block,
        { opacity: 1, duration: 0.3, ease: 'power2.in' },
        shuffledIndexes[i] * 0.02
      );
    });

    tlRef.current = tl;
  }, []);

  const animateOut = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const blocks = Array.from(container.querySelectorAll<HTMLElement>('.pixel-block'));
    const shuffledIndexes = shuffle(blocks.map((_, i) => i));

    tlRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(blocks, { opacity: 0 });
        isAnimatingRef.current = false;
      },
    });

    blocks.forEach((block, i) => {
      tl.to(
        block,
        { opacity: 0, duration: 0.25, ease: 'power2.out' },
        shuffledIndexes[i] * 0.015
      );
    });

    tlRef.current = tl;
  }, []);

  // Animate IN when route starts changing
  useEffect(() => {
    animateIn();
  }, [pathname, searchParams]);

  // Animate OUT after page content mounts (data ready)
  useEffect(() => {
    const timeout = setTimeout(() => {
      animateOut();
    }, 100); // small buffer to let page paint first

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  const rowCount = getBlockCount();

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: COLS }).map((_, colIndex) => (
        <div
          key={colIndex}
          className="flex flex-col flex-shrink-0"
          style={{ width: '5vw' }}
        >
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="pixel-block flex-shrink-0 bg-pink-500"
              style={{ width: '5vw', height: '5vw', opacity: 0 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PixelTransition;