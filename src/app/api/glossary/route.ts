import { NextResponse } from "next/server";

import { BACKEND_URL } from "../_backend";

export async function GET() {
  const res = await fetch(`${BACKEND_URL}/api/glossary`, { cache: "no-store" });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}

export async function POST(req: Request) {
  const json = await req.text();
  const res = await fetch(`${BACKEND_URL}/api/glossary`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}


