import { PageShell } from "@/components/PageShell";
import { RsvpForm } from "@/components/RsvpForm";
import { rsvpDeadline } from "@/lib/content";

export const metadata = { title: "Confirme sua presença — Samira & Gustavo" };

export default function ConfirmarPage() {
  return (
    <PageShell title="Confirme sua presença" subtitle={`responda até ${rsvpDeadline}`}>
      <RsvpForm />
    </PageShell>
  );
}
