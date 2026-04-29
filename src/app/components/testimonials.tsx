'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/src/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '../../../components/animations/SplitText';

gsap.registerPlugin(ScrollTrigger, Draggable);

const testimonials = [
  {
    name: "Sophia Rivera",
    quote: "These extensions transformed my thin hair into luxurious volume. I feel confident every day without spending hours styling.",
    img: "https://i.pinimg.com/1200x/c7/3f/c8/c73fc802481266229c198755f427c9c1.jpg",
  },
  {
    name: "Amara Queens",
    quote: "Perfect for my wedding day! The length and thickness were exactly what I dreamed of. Natural look and so comfortable.",
    img: "https://i.pinimg.com/1200x/39/95/b4/3995b4b3bd04c4fbe2cc508672a950cb.jpg",
  },
  {
    name: "Isabella Moreno",
    quote: "As someone always on camera, these extensions give me that flawless hair look effortlessly. Best investment!",
    img: "https://i.pinimg.com/1200x/de/f8/75/def8755049a5aa0fff4c519cb4583ea5.jpg",
  },
  {
    name: "Ava Thompson",
    quote: "They stay secure even during workouts. The quality is amazing — no tangles, just beautiful, flowing hair.",
    img: "https://i.pinimg.com/1200x/29/b2/a1/29b2a1d9991131573d444a0262b776cb.jpg",
  },
  {
    name: "Emma Patel",
    quote: "Finally, long gorgeous hair without the wait. Easy to maintain and blends perfectly with my natural hair.",
    img: "https://i.pinimg.com/1200x/8e/22/3b/8e223b56c8ff0a9f981ef9b102b15bb4.jpg",
  },
  {
    name: "Olivia Kim",
    quote: "These extensions give me endless styling options. The color match is spot-on and they feel like my own hair.",
    img: "https://i.pinimg.com/1200x/28/c9/32/28c932343c297a0f3f0907ae49304f32.jpg",
  },
];

export default function TestimonialSection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const dragProxyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current || !cardsRef.current) return;

    const cards = gsap.utils.toArray<HTMLLIElement>('.testimonial-card');

    gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

    const spacing = 0.1;
    const snapTime = gsap.utils.snap(spacing);

    const animateFunc = (element: HTMLElement): gsap.core.Timeline => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: 'power1.in' }
      ).fromTo(
        element,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: 'none' },
        0
      );
      return tl;
    };

    const buildSeamlessLoop = (
      items: HTMLElement[],
      spacing: number,
      animateFunc: (el: HTMLElement) => gsap.core.Timeline
    ) => {
      const overlap = Math.ceil(1 / spacing);
      const startTime = items.length * spacing + 0.5;
      const loopTime = (items.length + overlap) * spacing + 1;
      const rawSequence = gsap.timeline({ paused: true });
      const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat(this: gsap.core.Timeline): void {
          if (this._time === (this as any)._dur) {
            (this as any)._tTime += (this as any)._dur - 0.01;
          }
        },
      });

      const l = items.length + overlap * 2;
      for (let i = 0; i < l; i++) {
        const index = i % items.length;
        const time = i * spacing;
        rawSequence.add(animateFunc(items[index]), time);
      }

      rawSequence.time(startTime);
      seamlessLoop
        .to(rawSequence, { time: loopTime, duration: loopTime - startTime, ease: 'none' })
        .fromTo(
          rawSequence,
          { time: overlap * spacing + 1 },
          { time: startTime, duration: startTime - (overlap * spacing + 1), immediateRender: false, ease: 'none' }
        );

      return seamlessLoop;
    };

    const seamlessLoop = buildSeamlessLoop(cards as HTMLElement[], spacing, animateFunc);

    const playhead = { offset: 0 };
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate(): void {
        seamlessLoop.time(wrapTime(playhead.offset));
      },
      duration: 0.5,
      ease: 'power3',
      paused: true,
    });

    const scrollToOffset = (offset: number): void => {
      const snappedTime = snapTime(offset);
      scrub.vars.offset = snappedTime;
      scrub.invalidate().restart();
    };

    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    nextBtn?.addEventListener('click', () => scrollToOffset(scrub.vars.offset + spacing));
    prevBtn?.addEventListener('click', () => scrollToOffset(scrub.vars.offset - spacing));

    Draggable.create(dragProxyRef.current, {
      type: 'x',
      trigger: cardsRef.current,
      allowNativeTouchScrolling: false,
      allowEventDefault: false,
      onPress(this: any): void {
        this.startOffset = scrub.vars.offset;
      },
      onDrag(this: any): void {
        scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
        scrub.invalidate().restart();
      },
      onDragEnd(this: any): void {
        scrollToOffset(scrub.vars.offset);
      },
    });

    // AUTOPLAY
    // AUTOPLAY (step-based, smooth, no glitch)
const autoPlay = gsap.delayedCall(4, function repeat() {
  scrollToOffset(scrub.vars.offset + spacing);
  autoPlay.restart(true);
});

    return () => {
      scrub.kill();
      seamlessLoop.kill();
      autoPlay.kill();
    };
  }, []);

  return (
    <section
      ref={galleryRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* Heading */}
      <div className="w-full lg:max-w-7xl mx-auto px-[1rem] lg:px-[3rem] pt-[7rem] pb-8 text-center overflow-hidden">
        <SplitText
          text="What Our Clients Say"
          tag="h1"
          className="text-[2rem] md:text-[4rem] lg:text-[5rem] text-white"
          duration={1}
          ease="power3.out"
          splitType="chars"
          threshold={0.1}
          rootMargin="-100px"
          stagger={0.025}
        />
      </div>

      {/*
        Card stage:
        - explicit height so the `absolute` cards have a real containing block
        - overflow-hidden clips the fly-in/fly-out animation cleanly
        - cards are centered inside via absolute + inset-0 + flex centering on the ul
      */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(26rem, 65vw, 32rem)' }}
      >
        <ul
          ref={cardsRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <li
              key={i}
              className="testimonial-card absolute rounded-xl overflow-hidden shadow-2xl"
              style={{
                width: 'clamp(15rem, 76vw, 30rem)',
                height: 'clamp(21rem, 58vw, 27rem)',
                backgroundImage: `url(${t.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 lg:p-8 text-white">
                <p className="text-sm lg:text-lg mb-2 italic leading-snug">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex gap-[4px] mb-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg
                      key={j}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#ec4899"
                      className="w-4 h-4 lg:w-5 lg:h-5"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                <h3 className="text-base lg:text-xl font-bold">{t.name}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Prev / Next — now in normal flow, not absolute */}
      <div className="flex justify-center gap-6 pt-8 pb-16">
        <button className="prev uppercase px-6 py-3 lg:px-8 lg:py-4 border border-white rounded-full text-white text-sm font-medium hover:border-pink-500 hover:text-pink-500 cursor-pointer transition">
          Prev
        </button>
        <button className="next uppercase px-6 py-3 lg:px-8 lg:py-4 border border-white rounded-full text-white text-sm font-medium hover:border-pink-500 hover:text-pink-500 cursor-pointer transition">
          Next
        </button>
      </div>

      <div ref={dragProxyRef} className="absolute invisible" />
    </section>
  );
}