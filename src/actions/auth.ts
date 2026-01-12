"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signInWithEmailPassword(input: { email: string; password: string }) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
  if (error) return { ok: false as const, message: error.message };
  return { ok: true as const };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}


