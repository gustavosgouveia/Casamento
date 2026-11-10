import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { tips } from "@/lib/content";

export const metadata = { title: "Dicas e Instruções — Samira & Gustavo" };

const related = [
  { label: "A Cerimônia", href: "/cerimonia" },
  { label: "Código de Vestimenta", href: "/dress-code" },
  { label: "Lista de Presentes", href: "/presentes" },
];

export default function DicasPage() {
  return (
    <PageShell title="Dicas e Instruções" subtitle="tudo o que você precisa saber">
      <div className="grid gap-10 md:grid-cols-3">
        {tips.sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif-display text-[24px] uppercase tracking-[0.06em] text-[var(--ink)]">{s.title}</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-[#2a2a2a]">{s.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="text-center font-serif-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-extralight uppercase">
          Perguntas frequentes
        </h2>
        <div className="mx-auto mt-8 max-w-[760px] divide-y divide-[#e6e6e6] border-y border-[#e6e6e6]">
          {tips.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif-display text-[19px] text-[var(--ink)]">
                {item.q}
                <span className="text-[var(--gold)] transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-[1.75] text-[#2a2a2a]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <nav className="mt-20 flex flex-wrap justify-center gap-4">
        {related.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="rounded-full border border-[#1a1a1a]/60 px-8 py-3 font-script text-[19px] leading-none text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
          >
            {r.label}
          </Link>
        ))}
      </nav>
    </PageShell>
  );
}
