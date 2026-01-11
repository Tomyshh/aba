import { BACKEND_URL } from "../../../_backend";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const res = await fetch(`${BACKEND_URL}/api/jobs/${encodeURIComponent(id)}/download`, {
    cache: "no-store",
  });

  const headers = new Headers(res.headers);
  if (!headers.get("content-disposition")) {
    headers.set("content-disposition", `attachment; filename="${id}.docx"`);
  }

  return new Response(res.body, { status: res.status, headers });
}


