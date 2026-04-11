'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable, SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, Draggable, SplitText);

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

   const testimonialHeadingRef = useRef<HTMLHeadingElement | null>(null);


  useEffect(() => {
    if (testimonialHeadingRef.current) {
      let split = new SplitText(testimonialHeadingRef.current, { type: "chars, words", linesClass: 'line' });

      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.025,
        ease: "power3.out",
        scrollTrigger: {
          trigger: testimonialHeadingRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none reverse none',
        },
      });
    }

   
  }, []);

  useEffect(() => {
    if (!galleryRef.current || !cardsRef.current) return;

    const cards = gsap.utils.toArray<HTMLLIElement>('.testimonial-card');

    gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

    const spacing = 0.1;
    const snapTime = gsap.utils.snap(spacing);

    let iteration = 0;

    const animateFunc = (element: HTMLElement) => {
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

    const buildSeamlessLoop = (items: HTMLElement[], spacing: number, animateFunc: (el: HTMLElement) => gsap.core.Timeline) => {
      const overlap = Math.ceil(1 / spacing);
      const startTime = items.length * spacing + 0.5;
      const loopTime = (items.length + overlap) * spacing + 1;
      const rawSequence = gsap.timeline({ paused: true });
      const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
          (this as any)._time === (this as any)._dur && ((this as any)._tTime += (this as any)._dur - 0.01);
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
        .fromTo(rawSequence, { time: overlap * spacing + 1 }, { time: startTime, duration: startTime - (overlap * spacing + 1), immediateRender: false, ease: 'none' });

      return seamlessLoop;
    };

    const seamlessLoop = buildSeamlessLoop(cards as HTMLElement[], spacing, animateFunc);

    const playhead = { offset: 0 };
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate: () => seamlessLoop.time(wrapTime(playhead.offset)),
      duration: 0.5,
      ease: 'power3',
      paused: true,
    });

    // let trigger = ScrollTrigger.create({
    //   trigger: galleryRef.current,
    //   start: 'top 80%',
    //   end: 'bottom 20%',
    //   onUpdate: (self) => {
    //     scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
    //     scrub.invalidate().restart();
    //   },
    //   scrub: true,
    // });

    const scrollToOffset = (offset: number) => {
      const snappedTime = snapTime(offset);
      const progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
      // No wrapping needed since we don't pin or control page scroll
      scrub.vars.offset = snappedTime;
      scrub.invalidate().restart();
    };

    // Prev / Next buttons
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    nextBtn?.addEventListener('click', () => scrollToOffset(scrub.vars.offset + spacing));
    prevBtn?.addEventListener('click', () => scrollToOffset(scrub.vars.offset - spacing));

    // Drag support - this was the culprit!
    Draggable.create(dragProxyRef.current, {
      type: 'x',
      trigger: cardsRef.current,
      // Critical fix: prevent vertical touch scrolling on mobile while dragging horizontally
      allowNativeTouchScrolling: false,
      // Also helps on desktop if needed
      allowEventDefault: false,
      onPress(this: any) {
        this.startOffset = scrub.vars.offset;
      },
      onDrag(this: any) {
        scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
        scrub.invalidate().restart();
      },
      onDragEnd(this: any) {
        scrollToOffset(scrub.vars.offset);
      },
    });

    return () => {
      // trigger.kill();
      scrub.kill();
      seamlessLoop.kill();
    };
  }, []);

  return (
    <section ref={galleryRef} className="relative w-full lg:h-[120vh] h-screen lg:py-[7rem] py-[5rem] pb-[5rem] bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-16 text-center overflow-hidden">
        <h2 className="text-5xl md:text-7xl font-medium text-white mb-6" ref={testimonialHeadingRef}>What Our Clients Say</h2>
      </div>

      <ul ref={cardsRef} className="absolute w-80 aspect-[9/16] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[8rem]">
        {[...testimonials, ...testimonials].map((t, i) => (
          <li
            key={i}
            className="testimonial-card absolute lg:w-[30rem] w-full h-[27rem] rounded-xl overflow-hidden shadow-2xl"
            style={{ backgroundImage: `url(${t.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <p className="text-lg mb-2 italic">&ldquo;{t.quote}&rdquo;</p>

              <div className="flex gap-[4px] mb-[.5rem]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#ec4899" // Tailwind pink-500
                    className="w-5 h-5"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              <h3 className="text-xl font-bold">{t.name}</h3>

            </div>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-8 z-10">
        <button className="prev uppercase px-8 py-4 border border-white rounded-full text-white font-medium hover:border-pink-500 hover:text-pink-500 cursor-pointer transition">
          Prev
        </button>
        <button className="next uppercase px-8 py-4 border border-white outline-none rounded-full text-white font-medium hover:border-pink-500 hover:text-pink-500 cursor-pointer transition">
          Next
        </button>
      </div>

      <div ref={dragProxyRef} className="absolute invisible" />
    </section>
  );
}