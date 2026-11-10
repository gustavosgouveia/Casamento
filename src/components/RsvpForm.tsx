"use client";

import { startTransition, useActionState, useState } from "react";
import { cn } from "@/lib/utils";
import { confirmPresence } from "@/app/actions";
import type { FormState } from "@/types";

const initial: FormState = { ok: false, message: "" };

const fieldClass =
  "w-full rounded-[10px] border border-black/20 bg-white px-4 py-3 text-[15px] text-black outline-none focus:border-[var(--gold)]";
const labelClass = "mb-1.5 block text-[12px] font-medium uppercase tracking-[0.2em] text-[#666]";

export function RsvpForm() {
  const [state, formAction, pending] = useActionState(confirmPresence, initial);
  const [attending, setAttending] = useState<"sim" | "nao" | "">("");

  if (state.ok) {
    return (
      <p className="mx-auto max-w-[560px] text-center font-script text-[30px] leading-snug text-[var(--gold)]" aria-live="polite">
        {state.message}
      </p>
    );
  }

  return (
    <form
      // onSubmit + startTransition (em vez de action=) evita o reset automático do form: em erro, nada é perdido.
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => formAction(data));
      }}
      className="mx-auto max-w-[560px] space-y-6"
    >
      <div>
        <label htmlFor="rsvp-name" className={labelClass}>
          Nome completo
        </label>
        <input id="rsvp-name" name="name" required maxLength={80} className={fieldClass} />
      </div>

      <fieldset>
        <legend className={labelClass}>Você poderá ir?</legend>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["sim", "Sim, estarei lá!"],
            ["nao", "Infelizmente não"],
          ].map(([value, label]) => (
            <label
              key={value}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-3 text-center font-script text-[20px] leading-none transition-colors",
                attending === value
                  ? "border-[var(--gold)] bg-[var(--gold)] text-white"
                  : "border-black/25 text-black/80 hover:border-[var(--gold)]",
              )}
            >
              <input
                type="radio"
                name="attending"
                value={value}
                required
                className="sr-only"
                onChange={() => setAttending(value as "sim" | "nao")}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {attending === "sim" && (
        <>
          <div className="grid gap-6 sm:grid-cols-[140px_1fr]">
            <div>
              <label htmlFor="rsvp-companions" className={labelClass}>
                Acompanhantes
              </label>
              <input id="rsvp-companions" name="companions" type="number" min={0} max={10} defaultValue={0} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="rsvp-companion-names" className={labelClass}>
                Nomes dos acompanhantes
              </label>
              <input id="rsvp-companion-names" name="companion_names" maxLength={400} className={fieldClass} />
            </div>
          </div>
          <div>
            <label htmlFor="rsvp-dietary" className={labelClass}>
              Restrição alimentar
            </label>
            <input
              id="rsvp-dietary"
              name="dietary"
              maxLength={300}
              placeholder="Ex.: vegetariano, sem glúten, alergia a camarão"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="rsvp-song" className={labelClass}>
              Uma música que não pode faltar
            </label>
            <input id="rsvp-song" name="song" maxLength={200} placeholder="Artista – música" className={fieldClass} />
          </div>
        </>
      )}

      <div>
        <label htmlFor="rsvp-message" className={labelClass}>
          Recado para os noivos (opcional)
        </label>
        <textarea id="rsvp-message" name="message" maxLength={1000} rows={3} className={fieldClass} />
      </div>

      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      {state.message && (
        <p className="text-[14px] text-red-700" aria-live="polite">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mx-auto block rounded-full border border-[var(--gold)] px-10 py-3 font-script text-[22px] leading-none text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-white disabled:opacity-50"
      >
        {pending ? "Enviando..." : "Confirmar"}
      </button>
    </form>
  );
}
