import type { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell/app-shell";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AppLayout({ children }: PropsWithChildren) {
  const supabase = await createSupabaseServerClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!data.user) redirect("/login");

  return <AppShell>{children}</AppShell>;
}


