"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import gsap from "gsap";
import ScrollVelocity from "@/components/ScrollVelocity";
import { SplitText } from "../../../components/animations/SplitText";

gsap.registerPlugin(GSAPSplitText);
gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  return (
    <section className="w-full px-[1.5rem] md:px-[2rem] py-16  md:py-[10rem]">
      <div className='flex items-center flex-col gap-6 justify-center w-full'>

        <SplitText
          text="You got questions? We've got answers."
          tag="h1"
          className="hidden md:block text-[2rem] md:text-[3.5rem] lg:text-[5rem] text-center text-black overflow-hidden max-w-[700px]"
          duration={1}
          ease="power3.out"
          splitType="chars"
          threshold={0.1}
          rootMargin="-100px"
          stagger={0.025}
        />

        <div className="block md:hidden leading-[120%]">
          <SplitText
          text="Your questions,"
          tag="h1"
          className=" text-[2rem] md:text-[3.5rem] lg:text-[5rem] text-center  text-black overflow-hidden w-full"
          duration={1}
          ease="power3.out"
          splitType="chars"
          threshold={0.1}
          rootMargin="-100px"
          stagger={0.025}
        />

        <SplitText
          text="answered."
          tag="h1"
          className="text-[2rem] md:text-[3.5rem] lg:text-[5rem] text-center  text-black overflow-hidden w-full"
          duration={1}
          ease="power3.out"
          splitType="chars"
          threshold={0.1}
          rootMargin="-100px"
          stagger={0.025}
        />
        </div>
      </div>

      <div className="w-full mx-auto mt-10 sm:mt-14 md:mt-16 max-w-[800px] flex flex-col gap-6">
        <Accordion type="single" collapsible className="w-full">

          <AccordionItem value="item-1" className="border-black/20">
            <AccordionTrigger className="text-left text-[.95rem] sm:text-[1rem] md:text-[1.1rem] text-black hover:text-pink-500 transition fk uppercase font-[400]">
              Is the hair 100% virgin human hair?
            </AccordionTrigger>
            <AccordionContent className="text-black/70 text-[.85rem] sm:text-[.9rem] bri">
              Yes. All our wigs are made from 100% virgin human hair with no synthetic blends, ensuring a natural look and long-lasting quality.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-black/20">
            <AccordionTrigger className="text-left text-[.95rem] sm:text-[1rem] md:text-[1.1rem] text-black hover:text-pink-500 transition fk uppercase font-[400]">
              Do you ship worldwide?
            </AccordionTrigger>
            <AccordionContent className="text-black/70 text-[.85rem] sm:text-[.9rem] bri">
              Yes. We offer worldwide shipping and deliver to most countries. Shipping times and costs may vary depending on your location.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-black/20">
            <AccordionTrigger className="text-left text-[.95rem] sm:text-[1rem] md:text-[1.1rem] text-black hover:text-pink-500 transition fk uppercase font-[400]">
              How long do the wigs last?
            </AccordionTrigger>
            <AccordionContent className="text-black/70 text-[.85rem] sm:text-[.9rem] bri">
              With proper care, our wigs can last 12 months or longer. Longevity depends on maintenance, styling frequency, and care routine.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-black/20">
            <AccordionTrigger className="text-left text-[.95rem] sm:text-[1rem] md:text-[1.1rem] text-black hover:text-pink-500 transition fk uppercase font-[400]">
              Do you accept returns or exchanges?
            </AccordionTrigger>
            <AccordionContent className="text-black/70 text-[.85rem] sm:text-[.9rem] bri">
              Yes. We accept returns on unused wigs in their original condition within the specified return period. Please check our returns policy for full details.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;