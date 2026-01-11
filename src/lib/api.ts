import type { GlossaryEntry, GlossaryResponse, JobResponse, TranslateResponse } from "./types";

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(text || `HTTP ${res.status}`);
  }
}

export async function healthCheck() {
  const res = await fetch("/api/health", { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parseJson<{ ok: boolean }>(res);
}

export async function startTranslation(input: {
  pdf: File;
  targetLanguage: string;
  ocrModel?: string;
  translateModel?: string;
  maxPages?: number;
  chunkMaxChars?: number;
}) {
  const form = new FormData();
  form.append("pdf", input.pdf);
  form.append("targetLanguage", input.targetLanguage);
  if (input.ocrModel) form.append("ocrModel", input.ocrModel);
  if (input.translateModel) form.append("translateModel", input.translateModel);
  if (typeof input.maxPages === "number") form.append("maxPages", String(input.maxPages));
  if (typeof input.chunkMaxChars === "number") form.append("chunkMaxChars", String(input.chunkMaxChars));

  const res = await fetch("/api/translate", { method: "POST", body: form });
  if (!res.ok) throw new Error(await res.text());
  return parseJson<TranslateResponse>(res);
}

export async function getJob(id: string) {
  const res = await fetch(`/api/jobs/${encodeURIComponent(id)}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return parseJson<JobResponse>(res);
}

export function getJobDownloadUrl(id: string) {
  return `/api/jobs/${encodeURIComponent(id)}/download`;
}

export async function getGlossary() {
  const res = await fetch("/api/glossary", { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return parseJson<GlossaryResponse>(res);
}

export async function saveGlossary(entries: GlossaryEntry[]) {
  const res = await fetch("/api/glossary", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ entries }),
  });
  if (!res.ok) throw new Error(await res.text());
  return parseJson<{ ok: boolean; count: number }>(res);
}


