"use server";

import { supabase } from "@/lib/supabase";
import { gifts } from "@/lib/gifts";
import type { FormState } from "@/types";

const text = (form: FormData, name: string) => String(form.get(name) ?? "").trim();

// Campo invisível "website": humanos deixam vazio, bots costumam preencher.
const isBot = (form: FormData) => text(form, "website") !== "";

export async function registerGift(giftId: number, _prev: FormState, form: FormData): Promise<FormState> {
  if (isBot(form)) return { ok: true, message: "Obrigado!" };
  if (!gifts.some((g) => g.id === giftId)) return { ok: false, message: "Presente inválido." };

  const guestName = text(form, "name");
  const message = text(form, "message");
  if (!guestName || guestName.length > 80) return { ok: false, message: "Informe seu nome (até 80 caracteres)." };
  if (message.length > 500) return { ok: false, message: "O recado pode ter até 500 caracteres." };
  if (!supabase) return { ok: false, message: "Registro indisponível no momento. O Pix continua valendo!" };

  const { error } = await supabase.from("gift_purchases").insert({ gift_id: giftId, guest_name: guestName, message });
  if (error) {
    console.error("registerGift:", error.message);
    return { ok: false, message: "Não conseguimos registrar agora. Tente novamente em instantes." };
  }
  return { ok: true, message: "Muito obrigado pelo carinho! 💛" };
}

export async function signGuestbook(_prev: FormState, form: FormData): Promise<FormState> {
  if (isBot(form)) return { ok: true, message: "Recado enviado!" };

  const name = text(form, "name");
  const message = text(form, "message");
  if (!name || name.length > 80) return { ok: false, message: "Informe seu nome (até 80 caracteres)." };
  if (!message || message.length > 1000) return { ok: false, message: "Escreva um recado (até 1000 caracteres)." };
  if (!supabase) return { ok: false, message: "Mural indisponível no momento." };

  const { error } = await supabase.from("guestbook").insert({ name, message });
  if (error) {
    console.error("signGuestbook:", error.message);
    return { ok: false, message: "Não conseguimos enviar agora. Tente novamente em instantes." };
  }
  return { ok: true, message: "Recado enviado! Ele aparecerá aqui depois que os noivos aprovarem." };
}
