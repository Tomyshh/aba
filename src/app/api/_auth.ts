import { getSupabaseAccessToken } from "@/lib/supabase/server";

export async function getForwardAuthHeader(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) return authHeader;

  const token = await getSupabaseAccessToken();
  if (!token) return null;
  return `Bearer ${token}`;
}


