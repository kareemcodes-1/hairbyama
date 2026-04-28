"use client";

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";


export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    // Validate all fields
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // Simulate async send (replace with your actual submit logic)
      await new Promise((res) => setTimeout(res, 2000));

      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full py-[6rem] lg:py-[8rem] px-[1.5rem] lg:px-[3rem] bg-white">

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 lg:pt-[4rem]">

        {/* Contact details */}
        <div className="flex flex-col gap-[.8rem]">
          <h1 className="text-[2rem] md:text-[4rem] lg:text-[5rem] text-black mb-[1rem] lg:mb-[2rem]">
            Reach out to us
          </h1>

          {[
            { value: "hairbyama@gmail.com", href: "mailto:hairbyama@gmail.com" },
            { value: "+1 (587) 896-1243", href: "tel:+15878961243" },
            { value: "Calgary, Alberta, Canada", href: null },
            { value: "Mon – Fri, 9am – 6pm MST", href: null },
          ].map((item, i) => (
            <div key={i}>
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

        {/* RIGHT COLUMN — Form */}
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
                value={form.name}
                onChange={handleChange}
                className="h-[3rem] rounded-full"
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
                value={form.email}
                onChange={handleChange}
                className="h-[3rem] rounded-full"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] uppercase text-black/80">
              Subject <span className="text-black">*</span>
            </label>
            <Input
              type="text"
              name="subject"
              id="subject"
              value={form.subject}
              onChange={handleChange}
              className="h-[3rem] rounded-full"
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
              value={form.message}
              onChange={handleChange}
              rows={6}
              className="w-full h-[10rem] resize-none rounded-[2rem]"
            />
          </div>

          {/* Send button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary dark-pink flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Spinner className="size-8" />
                Sending...
              </>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}