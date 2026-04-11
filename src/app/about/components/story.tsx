

import Image from "next/image";

export default function OurStory() {
  return (
    <section className="w-full h-screen">
      <div className="grid grid-cols-2 h-full w-full">
        <div className="flex flex-col gap-[1rem] py-[5rem] px-[3rem]">
           <h2 className="text-[4rem] font-semibold leading-tight">
            It All Started With a Vision
          </h2>

          {/* Story Text */}
          <div>
            <p className="mt-6 text-lg text-black/70 leading-relaxed">
            PrettyYoungThang was born from a passion to empower women through
            confidence and beauty. What started as a simple idea has grown into
            a trusted brand delivering premium-quality hair extensions to women
            all over the world.
          </p>

          <p className="mt-4 text-lg text-black/70 leading-relaxed">
            We believe beauty is more than appearance — it’s how you feel.
            That’s why every bundle is crafted to give you confidence,
            elegance, and a natural flawless look.
          </p>
          </div>
        </div>

        <div className="relative h-full w-full">
          <Image
            src="/hero.jpg"
            alt="Founder"
            fill
            className="object-cover"
          />
        </div>
      </div>


    </section>
  );
}