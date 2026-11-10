import { PageShell } from "@/components/PageShell";
import { ceremony } from "@/lib/content";

export const metadata = { title: "A Cerimônia — Samira & Gustavo" };

export default function CerimoniaPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(`${ceremony.venue}, ${ceremony.address}`)}&output=embed`;

  return (
    <PageShell title="A Cerimônia" subtitle="o nosso grande dia">
      <div className="grid gap-12 lg:grid-cols-2">
        <dl className="space-y-8 font-serif-display text-[var(--ink)]">
          {[
            ["Data", ceremony.date],
            ["Horário", ceremony.time],
            ["Local", ceremony.venue],
            ["Endereço", ceremony.address],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[12px] font-medium uppercase tracking-[0.24em] text-[#666]">{label}</dt>
              <dd className="mt-1 text-[clamp(1.4rem,2.4vw,1.9rem)]">{value}</dd>
            </div>
          ))}

          <ul className="space-y-2 text-[15px] leading-relaxed text-[#2a2a2a]">
            {ceremony.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>

          <a
            href="/casamento.ics"
            className="inline-block rounded-full border border-[var(--gold)] px-8 py-3 font-script text-[20px] leading-none text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-white"
          >
            Adicionar ao calendário
          </a>
        </dl>

        <iframe
          title="Mapa do local"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-square w-full rounded-[18px] border border-[#dddddd] lg:aspect-auto lg:min-h-[420px]"
        />
      </div>
    </PageShell>
  );
}
