'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const COLS = 20;

function shuffle(arr: number[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRows() {
  if (typeof window === 'undefined') return 10;
  const blockSize = window.innerWidth / COLS; // exact block width in px
  return Math.ceil(window.innerHeight / blockSize);
}

export default function PageLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [rows, setRows] = useState<number | null>(null);

  useEffect(() => {
    setRows(getRows());
  }, []);

  useEffect(() => {
    if (!rootRef.current || rows === null) return;

    const blocks = Array.from(
      rootRef.current.querySelectorAll<HTMLElement>('.pixel-block')
    );
    if (blocks.length === 0) return;

    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => setVisible(false),
    });

    // Text out
    tl.to(textRef.current, {
      opacity: 0,
      yPercent: -15,
      duration: 0.35,
      ease: 'power2.in',
    });

    // Per-column shuffled disappear
    for (let col = 0; col < COLS; col++) {
      const colBlocks = blocks.slice(col * rows, col * rows + rows);
      const shuffledIndices = shuffle([...Array(colBlocks.length)].map((_, i) => i));

      colBlocks.forEach((block, i) => {
        tl.to(
          block,
          { opacity: 0, duration: 0 },
          0.35 + shuffledIndices[i] * 0.03
        );
      });
    }

    tl.to(rootRef.current, { autoAlpha: 0, duration: 0.2 });

    return () => { tl.kill(); };
  }, [rows]);

  if (!visible) return null;

  // Block size = 100vw / 20 cols = 5vw — square blocks
  const blockSize = `${100 / COLS}vw`;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999] overflow-hidden">

      {/* Brand text */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      >
          <h3
                    className={`text-[2rem] lg:text-[4rem] gin !font-[300] transition text-white`}
                  >
                    hairsbyama
                  </h3>
      </div>

      {/* Grid — blocks are explicitly square via width/height = 5vw */}
      {rows !== null && (
        <div className="absolute inset-0 z-10 flex">
          {[...Array(COLS)].map((_, colIndex) => (
            <div key={colIndex} style={{ width: blockSize }} className="flex flex-col">
              {[...Array(rows)].map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="pixel-block bg-pink-500 shrink-0"
                  style={{ width: blockSize, height: blockSize }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

       <h3
                    className={`text-[2rem] lg:text-[4rem] gin !font-[300] transition text-white`}
                  >
                    hairsbyama
                  </h3>