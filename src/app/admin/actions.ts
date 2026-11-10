"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase-auth";
import type { FormState } from "@/types";

export async function signIn(_prev: FormState, form: FormData): Promise<FormState> {
  const supabase = await createAuthClient();
  if (!supabase) return { ok: false, message: "Supabase não configurado." };

  const { error } = await supabase.auth.signInWithPassword({
    email: String(form.get("email") ?? "").trim().toLowerCase(),
    password: String(form.get("password") ?? ""),
  });
  if (error) return { ok: false, message: "E-mail ou senha inválidos." };
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createAuthClient();
  await supabase?.auth.signOut();
  redirect("/admin");
}

// As permissões reais ficam nas policies RLS (só e-mails em public.admins); aqui só limitamos as tabelas.
const deletable = ["rsvp", "gift_purchases", "guestbook"] as const;

export async function deleteRow(table: (typeof deletable)[number], id: number) {
  if (!deletable.includes(table) || !Number.isInteger(id)) return;
  const supabase = await createAuthClient();
  const { error } = (await supabase?.from(table).delete().eq("id", id)) ?? {};
  if (error) console.error("deleteRow:", error.message);
  revalidatePath("/admin");
}

export async function setApproved(id: number, approved: boolean) {
  if (!Number.isInteger(id)) return;
  const supabase = await createAuthClient();
  const { error } = (await supabase?.from("guestbook").update({ approved }).eq("id", id)) ?? {};
  if (error) console.error("setApproved:", error.message);
  revalidatePath("/admin");
}
