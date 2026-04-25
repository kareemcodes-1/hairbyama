import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GsapSplitText from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(GsapSplitText);
}

export interface SplitTextProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  text?: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  /** GSAP stagger value — overrides `delay` when provided. Accepts a number (seconds) or a GSAP StaggerVars object e.g. { amount: 0.5, from: "center" } */
  stagger?: number | gsap.StaggerVars;
}

export const SplitText: React.FC<SplitTextProps> = ({
  tag: Tag = "p",
  text = "",
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  stagger,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const animated = useRef(false);

  useGSAP(
    () => {
      if (!containerRef.current || animated.current) return;

      const split = new GsapSplitText(containerRef.current, { type: splitType });

      const targets = splitType.includes("chars")
        ? split.chars
        : splitType.includes("words")
        ? split.words
        : split.lines;

      gsap.set(targets, from);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animated.current = true;

            gsap.to(targets, {
              ...to,
              duration,
              // stagger prop takes priority; falls back to delay-based stagger
              stagger: stagger !== undefined ? stagger : delay / 1000,
              ease,
            });

            observer.disconnect();
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(containerRef.current);

      return () => observer.disconnect();
    },
    { scope: containerRef }
  );

  return (
    <Tag ref={containerRef as any} className={className}>
      {text}
    </Tag>
  );
};