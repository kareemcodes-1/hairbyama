"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactForm() {

  return (
    <main
      className="w-full py-[6rem] lg:py-[8rem] px-[1.5rem] lg:px-[3rem] bg-white"
    >

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 lg:pt-[4rem]">

          {/* Contact details */}
          <div className="flex flex-col gap-[.8rem]">
            <h1
              className="text-[2rem] md:text-[4rem] lg:text-[5rem] text-black mb-[2rem]"
            >
              Reach out to us
            </h1>

            {[
              {
                value: "prettyyoungthangltd@gmail.com",
                href: "mailto:prettyyoungthangltd@gmail.com",
              },
              {
                value: "+1 (587) 896-1243",
                href: "tel:+15878961243",
              },
              {
                value: "Calgary, Alberta, Canada",
                href: null,
              },
              {
                value: "Mon – Fri, 9am – 6pm MST",
                href: null,
              },
            ].map((item, i) => (
              <div key={i} className="">
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[1rem] lg:text-[1.7rem] text-black/90 hover:opacity-60 transition-opacity"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[1rem] lg:text-[1.7rem] text-black/90">{item.value}</p>
                )}
              </div>
            ))}
          </div>

        {/* ── RIGHT COLUMN — Form ── */}
        <div className="flex flex-col gap-6">

          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[0.7rem] uppercase text-black/80">
                Name <span className="text-black">*</span>
              </label>
               <Input
                type="text"
                name="name"
                id="name"
                className="h-[3rem] rounded-full "
                // placeholder="Name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[0.7rem] uppercase text-black/80">
                Email Address <span className="text-black">*</span>
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                className="h-[3rem] rounded-full "
                // placeholder="Email Address"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] uppercase text-black/80">
              Subject <span className="text-black">*</span>
            </label>
              <Input
                type="email"
                name="email"
                id="email"
                className="h-[3rem] rounded-full "
                // placeholder="Email Address"
              />
          </div>

          {/* Message textarea */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] uppercase text-black/80">
              Message <span className="text-black">*</span>
            </label>
            <Textarea              
              name="message"
              id="message"
              // placeholder="Input"
              rows={6}
              className="w-full h-[10rem] resize-none rounded-[2rem]"
            />
          </div>

          {/* Send button */}
          <button
            type="submit"
            className="btn-primary dark-pink"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}