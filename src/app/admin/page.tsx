import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { ConfirmSubmit } from "@/components/ConfirmSubmit";
import { createAuthClient } from "@/lib/supabase-auth";
import { formatBRL, gifts } from "@/lib/gifts";
import { deleteRow, setApproved, signOut } from "./actions";

export const metadata: Metadata = { title: "Painel — Samira & Gustavo", robots: { index: false } };

const dateFmt = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" });
const fmt = (iso: string) => dateFmt.format(new Date(iso));

const h2 = "font-serif-display text-[clamp(1.6rem,3vw,2.2rem)] font-extralight uppercase";
const th = "border-b border-black/15 px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-[#666]";
const td = "border-b border-black/5 px-3 py-3 align-top text-[14px] text-[#2a2a2a]";
const smallBtn = "rounded-full border border-black/30 px-3 py-1 text-[12px] hover:bg-black hover:text-white";

export default async function AdminPage() {
  const supabase = await createAuthClient();
  if (!supabase) return <PageShell title="Painel">Supabase não configurado.</PageShell>;

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return (
      <PageShell title="Painel dos noivos" subtitle="acesso restrito">
        <AdminLoginForm />
      </PageShell>
    );
  }

  const [rsvp, purchases, guestbook] = await Promise.all([
    supabase.from("rsvp").select("*").order("created_at", { ascending: false }),
    supabase.from("gift_purchases").select("*").order("created_at", { ascending: false }),
    supabase.from("guestbook").select("*").order("approved").order("created_at", { ascending: false }),
  ]);
  const rsvps = rsvp.data ?? [];
  const gifted = purchases.data ?? [];
  const messages = guestbook.data ?? [];

  const going = rsvps.filter((r) => r.attending);
  const people = going.reduce((sum, r) => sum + 1 + r.companions, 0);
  const giftById = new Map(gifts.map((g) => [g.id, g]));
  const giftedTotal = gifted.reduce((sum, p) => sum + (giftById.get(p.gift_id)?.price ?? 0), 0);

  return (
    <PageShell title="Painel dos noivos" subtitle={auth.user.email ?? ""}>
      <form action={signOut} className="-mt-8 mb-12 text-center">
        <button type="submit" className={smallBtn}>
          Sair
        </button>
      </form>

      <dl className="mb-16 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
        {[
          ["Confirmados", going.length],
          ["Pessoas (com acomp.)", people],
          ["Não vão", rsvps.length - going.length],
          ["Presentes (declarado)", formatBRL(giftedTotal)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[18px] border border-[#dddddd] bg-[#faf9f6] p-5">
            <dd className="font-serif-display text-[clamp(1.6rem,3vw,2.4rem)]">{value}</dd>
            <dt className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#666]">{label}</dt>
          </div>
        ))}
      </dl>

      <section className="mb-20">
        <h2 className={h2}>Confirmações ({rsvps.length})</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr>
                {["Nome", "Vai?", "Acomp.", "Nomes", "Restrição", "Música", "Recado", "Data", ""].map((c) => (
                  <th key={c} className={th}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rsvps.map((r) => (
                <tr key={r.id}>
                  <td className={td}>{r.name}</td>
                  <td className={td}>{r.attending ? "Sim" : "Não"}</td>
                  <td className={td}>{r.companions}</td>
                  <td className={td}>{r.companion_names}</td>
                  <td className={td}>{r.dietary}</td>
                  <td className={td}>{r.song}</td>
                  <td className={`${td} whitespace-pre-line`}>{r.message}</td>
                  <td className={`${td} whitespace-nowrap`}>{fmt(r.created_at)}</td>
                  <td className={td}>
                    <form action={deleteRow.bind(null, "rsvp", r.id)}>
                      <ConfirmSubmit message={`Apagar a confirmação de ${r.name}?`} className={smallBtn}>
                        Apagar
                      </ConfirmSubmit>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-20">
        <h2 className={h2}>Presentes ({gifted.length})</h2>
        <p className="mt-2 text-[13px] text-[#666]">Autodeclarados: confira no extrato. Apagar libera o presente na lista.</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr>
                {["Presente", "Valor", "Quem", "Recado", "Data", ""].map((c) => (
                  <th key={c} className={th}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gifted.map((p) => {
                const gift = giftById.get(p.gift_id);
                return (
                  <tr key={p.id}>
                    <td className={td}>{gift?.title ?? `#${p.gift_id}`}</td>
                    <td className={`${td} whitespace-nowrap`}>{gift ? formatBRL(gift.price) : "—"}</td>
                    <td className={td}>{p.guest_name}</td>
                    <td className={`${td} whitespace-pre-line`}>{p.message}</td>
                    <td className={`${td} whitespace-nowrap`}>{fmt(p.created_at)}</td>
                    <td className={td}>
                      <form action={deleteRow.bind(null, "gift_purchases", p.id)}>
                        <ConfirmSubmit message={`Apagar o registro de ${p.guest_name}? O presente volta a ficar disponível.`} className={smallBtn}>
                          Apagar
                        </ConfirmSubmit>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className={h2}>Recados ({messages.filter((m) => !m.approved).length} pendentes)</h2>
        <ul className="mt-5 space-y-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-[18px] border p-5 ${m.approved ? "border-[#dddddd] bg-white" : "border-[var(--gold)] bg-[#faf6ee]"}`}
            >
              <p className="whitespace-pre-line text-[15px] leading-[1.7] text-[#2a2a2a]">{m.message}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-[#666]">
                <span className="font-medium text-black">{m.name}</span>
                <span>{fmt(m.created_at)}</span>
                <span className="uppercase tracking-[0.12em]">{m.approved ? "Publicado" : "Pendente"}</span>
                <form action={setApproved.bind(null, m.id, !m.approved)}>
                  <button type="submit" className={smallBtn}>
                    {m.approved ? "Ocultar" : "Aprovar"}
                  </button>
                </form>
                <form action={deleteRow.bind(null, "guestbook", m.id)}>
                  <ConfirmSubmit message={`Apagar o recado de ${m.name}?`} className={smallBtn}>
                    Apagar
                  </ConfirmSubmit>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {rsvps.length + gifted.length + messages.length === 0 && (
        <p className="mt-10 text-center text-[13px] text-[#888]">
          Nada por aqui. Se deveria haver dados, confira se este e-mail está na tabela public.admins.
        </p>
      )}
    </PageShell>
  );
}
