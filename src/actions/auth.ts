"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signInWithEmailPassword(input: { email: string; password: string }) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false as const, message: "Supabase n'est pas configuré. Vérifiez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY." };
  }
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
  if (error) return { ok: false as const, message: error.message };
  return { ok: true as const };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}


