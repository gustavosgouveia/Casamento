import Link from "next/link";
import { rsvpHref, timeline } from "@/lib/content";
import { Logo } from "@/components/Logo";
import { FlipArch } from "@/components/FlipArch";

export function SaveTheDate() {
  return (
    <section className="relative bg-white px-6 pb-24 pt-10 md:px-12 lg:pb-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        {/* Left: title + RSVP */}
        <div className="flex flex-col">
          <h2 className="font-serif-display text-[clamp(4.5rem,12.5vw,10.5rem)] font-extralight uppercase leading-[0.92] tracking-tight">
            <span className="block bg-gradient-to-br from-[#1c1c1c] via-[#6f6f6f] to-[#e2e2e2] bg-clip-text text-transparent">
              Save
            </span>
            <span className="block bg-gradient-to-br from-[#2a2a2a] via-[#8a8a8a] to-[#ededed] bg-clip-text text-transparent">
              The
            </span>
            <span className="block bg-gradient-to-br from-[#3a3a3a] via-[#a0a0a0] to-[#f2f2f2] bg-clip-text text-transparent">
              Date!
            </span>
          </h2>

          <div className="mt-10 flex items-center gap-4">
            <Logo className="h-14 w-auto shrink-0" />
            {rsvpHref && (
              <Link
                href={rsvpHref}
                className="rounded-full border border-[var(--gold)] px-8 py-3 font-script text-[22px] leading-none text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-white"
              >
                Confirme sua presença
              </Link>
            )}
          </div>
        </div>

        {/* Right: three arch photos / timeline */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {timeline.map((item, i) => (
            <div key={item.index} className="flex flex-col items-center">
              <FlipArch images={item.images} number={item.index} delay={i * 1400} />

              <span className="mt-8 h-16 w-px bg-[var(--gold)]" />

              <p className="mt-6 text-center font-serif-display text-[11px] font-medium uppercase tracking-[0.2em] text-[#333] sm:text-[12px]">
                {item.date}
              </p>
              <p className="mt-1.5 text-center font-serif-display text-[clamp(1.05rem,2.1vw,1.7rem)] uppercase tracking-[0.06em] text-[#1a1a1a]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
