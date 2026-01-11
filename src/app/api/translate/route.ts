import { NextResponse } from "next/server";

import { BACKEND_URL } from "../_backend";

export async function POST(req: Request) {
  const form = await req.formData();
  const res = await fetch(`${BACKEND_URL}/api/translate`, {
    method: "POST",
    body: form,
  });

  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}


