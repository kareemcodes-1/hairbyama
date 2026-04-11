
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full h-screen min-h-[500px] overflow-hidden flex items-center justify-center">

      {/* Full-bleed background image — replace src with your actual image path */}
      <Image
        src="/hero.jpg"
        alt="About — luxury hair extensions"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient overlay — subtle top, heavier at bottom, matching moodboard */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55 z-10" />

      {/* Giant centered headline — all-caps serif spanning full width */}
      <h1
        className="relative z-20 w-full text-center px-4 leading-[8rem] text-[6rem] text-white"
      >
        Welcome to the <br /> Home of Hair
      </h1>

    </section>
  );
}