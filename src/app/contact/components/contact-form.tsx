"use client";

import { useState } from "react";

export default function ContactForm() {
  const [newsletter, setNewsletter] = useState(false);

  return (
    <main
      className="min-h-screen w-full px-8 md:px-16 py-16 bg-white"
    >

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pt-[4rem]">

          {/* Contact details */}
          <div className="flex flex-col gap-[1rem]">
            <h1
              className="text-[5rem] text-black"
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
                    className="text-[2rem] text-black hover:opacity-60 transition-opacity"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[2rem] text-black">{item.value}</p>
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
              <input
                type="text"
                placeholder="Input"
                className="w-full bg-transparent border border-black/40 rounded-full px-5 py-3 text-sm text-black placeholder-black/40 outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[0.7rem] uppercase text-black/80">
                Email Address <span className="text-black">*</span>
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full bg-transparent border border-black/40 rounded-full px-5 py-3 text-sm text-black placeholder-black/40 outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] uppercase text-black/80">
              Subject <span className="text-black">*</span>
            </label>
            <input
              type="text"
              placeholder="Input"
              className="w-full bg-transparent border border-black/40 rounded-full px-5 py-3 text-sm text-black placeholder-black/40 outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Message textarea */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] uppercase text-black/80">
              Message <span className="text-black">*</span>
            </label>
            <textarea
              placeholder="Input"
              rows={6}
              className="w-full bg-transparent border border-black/40 rounded-3xl px-5 py-4 text-sm text-black placeholder-black/40 outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          {/* Send button */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-full py-4 text-sm cursor-pointer uppercase hover:bg-black/80 transition-colors mt-2"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}