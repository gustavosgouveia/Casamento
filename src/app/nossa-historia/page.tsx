import { PageShell } from "@/components/PageShell";
import { FlipArch } from "@/components/FlipArch";
import { story, timeline } from "@/lib/content";

export const metadata = { title: "Nossa História — Samira & Gustavo" };

export default function NossaHistoriaPage() {
  return (
    <PageShell title={story.title} subtitle="Kalmar, 1518-1519">
      <div className="mx-auto max-w-[680px] space-y-6 text-[16px] leading-[1.9] text-[#2a2a2a]">
        {story.full.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>

      <div className="mx-auto mt-20 grid max-w-[820px] grid-cols-3 gap-4 sm:gap-8">
        {timeline.map((item, i) => (
          <div key={item.index} className="flex flex-col items-center">
            <FlipArch images={item.images} number={item.index} delay={i * 1400} />
            <p className="mt-8 text-center font-serif-display text-[11px] font-medium uppercase tracking-[0.2em] text-[#333] sm:text-[12px]">
              {item.date}
            </p>
            <p className="mt-1.5 text-center font-serif-display text-[clamp(1rem,2vw,1.5rem)] uppercase tracking-[0.06em] text-[#1a1a1a]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
