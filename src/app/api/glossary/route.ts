import { NextResponse } from "next/server";

import { BACKEND_URL } from "../_backend";
import { getForwardAuthHeader } from "../_auth";

export async function GET(req: Request) {
  const token = await getForwardAuthHeader(req);
  const headers = token ? new Headers({ authorization: token }) : undefined;
  const res = await fetch(`${BACKEND_URL}/api/glossary`, { cache: "no-store", headers });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}

export async function POST(req: Request) {
  const json = await req.text();
  const token = await getForwardAuthHeader(req);
  const res = await fetch(`${BACKEND_URL}/api/glossary`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: token } : {}),
    },
    body: json,
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}


