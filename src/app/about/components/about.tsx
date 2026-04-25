import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">

      {/* Background */}
      <Image
        src="/hero.jpg"
        alt="About — luxury hair extensions"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Heading */}
      <h1
        className="
          relative z-20 
          w-full text-center 
          px-4 sm:px-6 md:px-8 
          text-white

          text-[2.2rem] 
          sm:text-[3rem] 
          md:text-[4.5rem] 
          lg:text-[6rem]

          leading-tight 
          sm:leading-tight 
          md:leading-[5rem] 
          lg:leading-[8rem]
        "
      >
        Welcome to the <br /> Home of Hair
      </h1>

    </section>
  );
}