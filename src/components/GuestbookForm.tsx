"use client";

import { useActionState } from "react";
import { signGuestbook } from "@/app/actions";
import type { FormState } from "@/types";

const initial: FormState = { ok: false, message: "" };

const fieldClass =
  "w-full rounded-[10px] border border-black/20 bg-white px-4 py-3 text-[15px] text-black outline-none focus:border-[var(--gold)]";

export function GuestbookForm() {
  const [state, formAction, pending] = useActionState(signGuestbook, initial);

  if (state.ok) {
    return (
      <p className="mx-auto max-w-[560px] text-center font-script text-[28px] leading-snug text-[var(--gold)]" aria-live="polite">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="mx-auto max-w-[560px] space-y-4">
      <input name="name" required maxLength={80} placeholder="Seu nome" aria-label="Seu nome" className={fieldClass} />
      <textarea name="message" required maxLength={1000} rows={5} placeholder="Seu recado" aria-label="Seu recado" className={fieldClass} />
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
        {pending ? "Enviando..." : "Enviar recado"}
      </button>
    </form>
  );
}
