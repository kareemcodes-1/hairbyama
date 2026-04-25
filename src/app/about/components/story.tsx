import Image from "next/image";
import { Sparkles, Globe, Crown, RefreshCcw } from "lucide-react";

export default function OurStory() {
  return (
    <section className="w-full min-h-screen pb-[3rem] lg:pb-0 ">
      <div className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        h-full w-full
      ">

        {/* LEFT CONTENT */}
        <div className="
          order-2 md:order-1
          flex flex-col 
          gap-4 sm:gap-6 md:gap-[.5rem]
          py-12 sm:py-16 md:py-[5rem] 
          px-4 sm:px-6 md:px-[3rem]
        ">

          <div className="flex flex-col gap-6 sm:gap-8 md:gap-[2rem]">

            {/* Heading */}
            <h2 className="
              text-[2rem] 
              sm:text-[2.6rem] 
              md:text-[3.2rem] 
              lg:text-[4rem] 
              font-semibold 
              leading-tight
            ">
              It All Started With a Vision
            </h2>

            {/* Text */}
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-[1rem]">
              <p className="
  text-sm sm:text-base md:text-lg 
  text-black/70 leading-relaxed
">
                Hairbyama was created with a clear vision to help women feel confident, elegant, and effortlessly beautiful. What started as a passion has grown into a trusted brand known for delivering high-quality hair extensions to women who value both style and authenticity.
              </p>

              <p className="
  text-sm sm:text-base md:text-lg 
  text-black/70 leading-relaxed
">
                To us, beauty goes beyond appearance it’s about how you carry yourself. That’s why every bundle is carefully selected to give you a soft, natural look that blends perfectly and elevates your everyday confidence.
              </p>
            </div>

            {/* FEATURES */}
            <div className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              gap-4 sm:gap-6 md:gap-8
            ">
              {[
                {
                  title: "100% Virgin Human Hair",
                  desc: "We source only pure, unprocessed virgin hair that retains its natural shine, softness, and strength.",
                  icon: Sparkles,
                },
                {
                  title: "Worldwide Delivery",
                  desc: "Whether you're in Lagos, London, or Los Angeles, our logistics partners ensure your hair reaches you quickly and safely.",
                  icon: Globe,
                },
                {
                  title: "Affordable Luxury",
                  desc: "Our mission is to make every queen feel like royalty without overspending.",
                  icon: Crown,
                },
                {
                  title: "Easy Returns",
                  desc: "We stand by our quality. If something doesn't meet your expectations, our return and exchange process is simple and stress-free.",
                  icon: RefreshCcw,
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="
                    flex flex-col 
                    gap-3 sm:gap-4 
                    border border-black/10 
                    rounded-2xl 
                    p-4 sm:p-6 md:p-8
                  "
                >
                  <div className="
                    w-8 h-8 sm:w-10 sm:h-10 
                    rounded-full bg-pink-50 
                    flex items-center justify-center
                  ">
                    <feature.icon className="w-4 h-4 text-pink-500" />
                  </div>

                  <h3 className="text-base sm:text-lg md:text-[1.2rem] text-black">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-black/60 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="
          order-1 md:order-2
          relative w-full 
          h-[500px] md:h-auto
        ">
          <Image
            src="/owner.jpg"
            alt="Founder"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}