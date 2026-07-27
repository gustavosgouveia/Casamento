import Link from "next/link";
import { story } from "@/lib/content";

export function OurStorySection() {
  return (
    <section id="nossa-historia" className="relative bg-white px-6 py-24 md:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Left: giant title + CTA */}
        <div className="flex flex-col">
          <h2 className="font-serif-display font-extralight uppercase leading-[0.92]">
            <span className="block text-[clamp(3rem,8vw,6.75rem)] text-[rgba(15,15,15,0.32)]">
              Nossa
            </span>
            <span className="block text-[clamp(3rem,8vw,6.75rem)] text-[var(--ink)]">
              História
            </span>
          </h2>

          <Link
            href="#"
            className="mt-auto w-fit rounded-full border border-[#1a1a1a]/70 px-8 py-3 font-script text-[20px] leading-none text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
          >
            {story.cta}
          </Link>
        </div>

        {/* Right: body copy, right-aligned */}
        <div className="flex items-end">
          <p className="ml-auto max-w-md text-right text-[15px] leading-[1.75] text-[#2a2a2a]">
            {story.body}
          </p>
        </div>
      </div>
    </section>
  );
}
