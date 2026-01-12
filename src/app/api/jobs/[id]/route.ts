import { NextResponse } from "next/server";

import { BACKEND_URL } from "../../_backend";
import { getForwardAuthHeader } from "../../_auth";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const token = await getForwardAuthHeader(_req);
  const headers = token ? new Headers({ authorization: token }) : undefined;
  const res = await fetch(`${BACKEND_URL}/api/jobs/${encodeURIComponent(id)}`, {
    cache: "no-store",
    headers,
  });
  const body = await res.text();

  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}


