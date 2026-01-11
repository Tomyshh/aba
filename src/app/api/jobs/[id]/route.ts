import { NextResponse } from "next/server";

import { BACKEND_URL } from "../../_backend";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const res = await fetch(`${BACKEND_URL}/api/jobs/${encodeURIComponent(id)}`, { cache: "no-store" });
  const body = await res.text();

  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}


