"use client";

import { useEffect, useState } from "react";
import { hero } from "@/lib/content";

interface Elapsed {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CounterState extends Elapsed {
  future: boolean;
}

// Conta o tempo entre "agora" e a data do casamento — regressivo se a data é futura,
// progressivo se já passou. Sempre retorna valores positivos + a direção.
function counterFor(targetISO: string): CounterState {
  const target = new Date(targetISO);
  const now = new Date();
  const future = target.getTime() > now.getTime();

  const [earlier, later] = future ? [now, target] : [target, now];

  let months =
    (later.getFullYear() - earlier.getFullYear()) * 12 + (later.getMonth() - earlier.getMonth());
  const anchor = new Date(earlier);
  anchor.setMonth(earlier.getMonth() + months);
  if (anchor > later) {
    months -= 1;
    anchor.setMonth(anchor.getMonth() - 1);
  }
  let diff = Math.floor((later.getTime() - anchor.getTime()) / 1000);
  const days = Math.floor(diff / 86400);
  diff -= days * 86400;
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;

  return { months, days, hours, minutes, seconds, future };
}

const UNITS: { key: keyof Elapsed; label: string }[] = [
  { key: "months", label: "Meses" },
  { key: "days", label: "Dias" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function CountdownSection() {
  const [time, setTime] = useState<CounterState | null>(null);

  useEffect(() => {
    const tick = () => setTime(counterFor(hero.weddingDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const label = time && !time.future ? hero.countdownLabelPast : hero.countdownLabelFuture;

  return (
    <section className="relative flex min-h-[86vh] flex-col items-center justify-center overflow-hidden px-6 pb-56 pt-28 text-white">
      {/* Real torn-paper transition (same asset as the original) into the white below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[position:50%_100%] bg-contain bg-no-repeat"
        style={{ backgroundImage: "url(/countdown/ripped-bg-3.png)" }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="font-script text-[clamp(3.2rem,7vw,5.25rem)] leading-none">{label}</h2>

        <div className="mt-14 flex flex-wrap items-start justify-center gap-x-8 gap-y-10 sm:gap-x-16">
          {UNITS.map(({ key, label }) => (
            <div key={key} className="flex min-w-[92px] flex-col items-center">
              <span className="font-serif-display text-[clamp(4.5rem,10vw,8rem)] font-extralight leading-none tabular-nums">
                {time ? pad(time[key]) : "00"}
              </span>
              <span className="mt-4 font-serif-display text-[clamp(0.85rem,1.4vw,1.05rem)] uppercase tracking-[0.24em]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
