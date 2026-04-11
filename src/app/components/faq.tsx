
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

gsap.registerPlugin(GSAPSplitText);

gsap.registerPlugin(ScrollTrigger);


const FAQ = () => {

    const faqHeadingRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {

  if(faqHeadingRef.current){
    let split = new GSAPSplitText(faqHeadingRef.current, { type: "chars, words", linesClass: 'line' });

    gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        duration: .8,
        stagger: 0.025,
        ease: "power3.out",
        scrollTrigger: {
          trigger: faqHeadingRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
        //   markers: true,
          toggleActions: 'play none reverse none',
        },
      });
  }
    }, [])
  return (
    <section className=" w-full px-[2rem] py-[6rem] h-full">
         <div className='flex items-center flex-col gap-6 justify-center w-full'>
          <h1
            ref={faqHeadingRef}
            className="text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[5rem] text-center font-[500] text-black leading-[1.3] overflow-hidden max-w-[90%] sm:max-w-[700px] md:max-w-[800px]"
          >
            You got questions? We’ve got answers.
          </h1>
        </div>

        <div className="w-full mx-auto mt-16 max-w-[800px] flex flex-col gap-6">
  <Accordion type="single" collapsible className="w-full">

    <AccordionItem value="item-1" className="border-black/20">
      <AccordionTrigger className="text-left text-[1.1rem] text-black hover:text-pink-500 transition fk uppercase font-[400]">
        Is the hair 100% virgin human hair?
      </AccordionTrigger>
      <AccordionContent className="text-black/70 text-[.9rem] bri">
        Yes. All our wigs are made from 100% virgin human hair with no synthetic blends, ensuring a natural look and long-lasting quality.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2" className="border-black/20">
      <AccordionTrigger className="text-left text-[1.1rem] text-black hover:text-pink-500 transition fk uppercase font-[400]">
         Do you ship worldwide?
      </AccordionTrigger>
      <AccordionContent className="text-black/70 text-[.9rem] bri">
    Yes. We offer worldwide shipping and deliver to most countries. Shipping times and costs may vary depending on your location.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3" className="border-black/20">
      <AccordionTrigger className="text-left text-[1.1rem] text-black hover:text-pink-500 transition fk uppercase font-[400]">
        How long do the wigs last?
      </AccordionTrigger>
      <AccordionContent className="text-black/70 text-[.9rem] bri">
        With proper care, our wigs can last 12 months or longer. Longevity depends on maintenance, styling frequency, and care routine.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-4" className="border-black/20">
      <AccordionTrigger className="text-left text-[1.1rem] text-black hover:text-pink-500 transition fk uppercase font-[400]">
        Do you accept returns or exchanges?
      </AccordionTrigger>
      <AccordionContent className="text-black/70 text-[.9rem] bri">
        Yes. We accept returns on unused wigs in their original condition within the specified return period. Please check our returns policy for full details.
      </AccordionContent>
    </AccordionItem>

  </Accordion>
</div>

    </section>
  );
};

export default FAQ;
