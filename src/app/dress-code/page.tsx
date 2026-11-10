import { PageShell } from "@/components/PageShell";
import { dressCode } from "@/lib/content";

export const metadata = { title: "Código de Vestimenta — Samira & Gustavo" };

export default function DressCodePage() {
  return (
    <PageShell title="Código de Vestimenta" subtitle={dressCode.style.toLowerCase()}>
      <p className="mx-auto max-w-[680px] text-center text-[16px] leading-[1.8] text-[#2a2a2a]">{dressCode.description}</p>

      <section className="mt-16 text-center">
        <h2 className="text-[12px] font-medium uppercase tracking-[0.24em] text-[#666]">Paleta sugerida</h2>
        <ul className="mt-6 flex flex-wrap justify-center gap-5">
          {dressCode.palette.map((color) => (
            <li
              key={color}
              className="size-16 rounded-full border border-black/10 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              style={{ backgroundColor: color }}
              aria-label={color}
            />
          ))}
        </ul>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-[12px] font-medium uppercase tracking-[0.24em] text-[#666]">Evite</h2>
        <ul className="mt-4 space-y-2 font-serif-display text-[20px] text-[var(--ink)]">
          {dressCode.avoid.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
