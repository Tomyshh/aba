import { BACKEND_URL } from "../../../_backend";
import { getForwardAuthHeader } from "../../../_auth";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const token = await getForwardAuthHeader(req);
  const forwardHeaders = token ? new Headers({ authorization: token }) : undefined;
  const res = await fetch(`${BACKEND_URL}/api/jobs/${encodeURIComponent(id)}/download`, {
    cache: "no-store",
    headers: forwardHeaders,
  });

  const responseHeaders = new Headers(res.headers);
  if (!responseHeaders.get("content-disposition")) {
    responseHeaders.set("content-disposition", `attachment; filename="${id}.docx"`);
  }

  return new Response(res.body, { status: res.status, headers: responseHeaders });
}


