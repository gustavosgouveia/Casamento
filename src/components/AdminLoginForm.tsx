"use client";

import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";
import type { FormState } from "@/types";

const initial: FormState = { ok: false, message: "" };
const fieldClass =
  "w-full rounded-[10px] border border-black/20 bg-white px-4 py-3 text-[15px] text-black outline-none focus:border-[var(--gold)]";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initial);

  return (
    <form action={formAction} className="mx-auto max-w-[380px] space-y-4">
      <input name="email" type="email" required autoComplete="email" placeholder="E-mail" aria-label="E-mail" className={fieldClass} />
      <input
        name="password"
        type="password"
        required
        autoComplete="current-password"
        placeholder="Senha"
        aria-label="Senha"
        className={fieldClass}
      />
      {state.message && (
        <p className="text-[14px] text-red-700" aria-live="polite">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-black px-6 py-3 font-serif-display text-[18px] italic text-white transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
