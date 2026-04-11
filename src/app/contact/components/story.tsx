// components/OurStory.tsx

import Image from "next/image";

export default function OurStory() {
  return (
    <section className="w-full min-h-screen">
      
      {/* TOP STORY BLOCK */}
      <div className="bg-pink-500 text-center text-white px-6 py-24">
        <div className="max-w-3xl mx-auto">
          
          {/* Founder Image */}
          <div className="flex justify-center mb-6">
            <div className="relative w-[10rem] h-[10rem] rounded-2xl overflow-hidden">
              <Image
                src="/hero.jpg" // replace
                alt="Founder"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            It All Started With a Vision
          </h2>

          {/* Story Text */}
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            PrettyYoungThang was born from a passion to empower women through
            confidence and beauty. What started as a simple idea has grown into
            a trusted brand delivering premium-quality hair extensions to women
            all over the world.
          </p>

          <p className="mt-4 text-lg text-gray-200 leading-relaxed">
            We believe beauty is more than appearance — it’s how you feel.
            That’s why every bundle is crafted to give you confidence,
            elegance, and a natural flawless look.
          </p>

        </div>
      </div>

      <div className="grid grid-cols-2 h-[50rem] w-full">
          <div className="bg-rose-500">

          </div>

          <div className="bg-black">

          </div>
      </div>

    </section>
  );
}