import { ceremony, hero } from "@/lib/content";

// Arquivo .ics gerado a partir do content.ts, para "Adicionar ao calendário".
const toICS = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function GET() {
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//samira-gustavo//casamento//PT",
    "BEGIN:VEVENT",
    "UID:casamento-samira-gustavo-20270801",
    `DTSTAMP:${toICS(ceremony.startISO)}`,
    `DTSTART:${toICS(ceremony.startISO)}`,
    `DTEND:${toICS(ceremony.endISO)}`,
    `SUMMARY:Casamento ${hero.name}`,
    `LOCATION:${ceremony.venue}\\, ${ceremony.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="casamento-samira-gustavo.ics"',
    },
  });
}
