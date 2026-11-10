import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { connection } from "next/server";
import type { GuestbookEntry } from "@/types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Sem env configurada o site continua funcionando: presentes aparecem disponíveis e o mural vazio.
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

export async function getPurchasedGiftIds(): Promise<Set<number>> {
  await connection(); // sempre buscar no request, nunca no build
  if (!supabase) return new Set();
  const { data, error } = await supabase.from("gift_purchases").select("gift_id");
  if (error) {
    console.error("gift_purchases:", error.message);
    return new Set();
  }
  return new Set(data.map((r) => r.gift_id as number));
}

export async function getGuestbook(): Promise<GuestbookEntry[]> {
  await connection();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("guestbook")
    .select("id, name, message, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error("guestbook:", error.message);
    return [];
  }
  return data;
}
