import { NextResponse } from "next/server";

import { BACKEND_URL } from "../_backend";
import { getForwardAuthHeader } from "../_auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const token = await getForwardAuthHeader(req);
  const headers = token ? new Headers({ authorization: token }) : undefined;

  const res = await fetch(`${BACKEND_URL}/api/translate`, {
    method: "POST",
    headers,
    body: form,
  });

  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}


