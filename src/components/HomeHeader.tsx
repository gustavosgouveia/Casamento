"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { hero } from "@/lib/content";

function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % hero.banners.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#8a8a88]">
      {hero.banners.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className="object-cover transition-opacity duration-[1600ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      {/* darken the centre so the white type stays legible over bright skies */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}

export function HomeHeader() {
  return (
    <header className="relative flex h-screen min-h-[640px] w-full flex-col items-center justify-center overflow-hidden text-white">
      <HeroSlideshow />

      <div className="animate-fade-up flex flex-col items-center px-6 text-center [text-shadow:0_1px_18px_rgba(0,0,0,0.35)]">
        <h1 className="font-serif-display text-[clamp(3.2rem,8.5vw,6rem)] font-extralight uppercase leading-none tracking-[0.01em]">
          {(() => {
            const [first, second] = hero.name.split(/\s*&\s*/);
            return (
              <>
                {first} <span className="font-serif-display italic font-normal">&amp;</span> {second}
              </>
            );
          })()}
        </h1>

        <span className="my-7 block h-px w-28 bg-white/70" />

        <p className="font-script text-[clamp(1.85rem,3.8vw,2.7rem)] font-normal leading-tight">
          {hero.subtitle}
        </p>

        <p className="mt-6 font-serif-display text-[13px] font-medium uppercase tracking-[0.28em]">
          {hero.date}
        </p>
        <p className="mt-2 font-serif-display text-[13px] font-medium uppercase tracking-[0.28em]">
          {hero.location}
        </p>
      </div>
    </header>
  );
}
