import { PageShell } from "@/components/PageShell";
import { GuestbookForm } from "@/components/GuestbookForm";
import { getGuestbook } from "@/lib/supabase";

export const metadata = { title: "Recados — Samira & Gustavo" };

const dateFmt = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

export default async function RecadosPage() {
  const entries = await getGuestbook();

  return (
    <PageShell title="Mural de Recados" subtitle="deixe um carinho para os noivos">
      <GuestbookForm />

      <ul className="mt-20 columns-1 gap-6 md:columns-2 lg:columns-3 [&>li]:mb-6">
        {entries.map((e) => (
          <li
            key={e.id}
            className="break-inside-avoid rounded-[18px] border border-[#dddddd] bg-[#faf9f6] p-7 shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
          >
            <p className="whitespace-pre-line text-[15px] leading-[1.75] text-[#2a2a2a]">{e.message}</p>
            <p className="mt-5 font-script text-[24px] leading-none text-[var(--gold)]">{e.name}</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#888]">{dateFmt.format(new Date(e.created_at))}</p>
          </li>
        ))}
      </ul>
      {entries.length === 0 && (
        <p className="text-center text-[15px] text-[#666]">Ainda não há recados. Seja o primeiro!</p>
      )}
    </PageShell>
  );
}
