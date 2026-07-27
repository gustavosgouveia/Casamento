"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { scrollPanels } from "@/lib/content";
import type { ScrollPanel } from "@/types";

function Panel({ panel }: { panel: ScrollPanel }) {
  const dark = panel.theme === "dark";
  return (
    <div
      className={cn(
        "relative flex h-full w-screen shrink-0 flex-col items-center justify-center overflow-hidden px-8 text-center",
        dark ? "bg-[#141414] text-white" : "bg-[#f1f0ec] text-[#1a1a1a]",
      )}
    >
      <Image
        src={panel.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* subtle legibility veil behind the centered text */}
      <div
        className={cn(
          "absolute inset-0",
          dark
            ? "bg-gradient-to-b from-black/25 via-black/10 to-black/30"
            : "bg-gradient-to-b from-white/25 via-white/5 to-white/25",
        )}
      />

      <div className="relative z-10 flex flex-col items-center">
        {panel.address && (
          <div className="mb-8 space-y-1 font-serif-display text-[15px] tracking-wide">
            {panel.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}
        <h3 className="font-serif-display text-[clamp(1.9rem,4vw,3.25rem)] font-normal uppercase tracking-[0.06em]">
          {panel.title}
        </h3>
        <Link
          href={panel.href}
          className={cn(
            "mt-7 rounded-full border px-8 py-3 font-script text-[19px] leading-none transition-colors",
            dark
              ? "border-white/70 text-white hover:bg-white hover:text-[#141414]"
              : "border-[#1a1a1a]/60 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white",
          )}
        >
          {panel.cta}
        </Link>
      </div>
    </div>
  );
}

export function HorizontalScrollSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      if (trackRef.current) trackRef.current.style.transform = "";
      return;
    }
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = outer.getBoundingClientRect();
        const scrollable = outer.offsetHeight - window.innerHeight;
        const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
        const distance = (scrollPanels.length - 1) * window.innerWidth;
        track.style.transform = `translate3d(${-progress * distance}px,0,0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return (
      <div>
        {scrollPanels.map((panel) => (
          <div key={panel.title} className="h-screen">
            <Panel panel={panel} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section
      ref={outerRef}
      style={{ height: `${scrollPanels.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${scrollPanels.length * 100}vw` }}
        >
          {scrollPanels.map((panel) => (
            <Panel key={panel.title} panel={panel} />
          ))}
        </div>
      </div>
    </section>
  );
}
