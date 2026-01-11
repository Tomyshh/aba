import type { HistoryItem, JobStatus } from "./types";

const STORAGE_KEY = "aba:history:v1";

function safeParse(json: string | null): HistoryItem[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean) as HistoryItem[];
  } catch {
    return [];
  }
}

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

export function saveHistory(items: HistoryItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addHistoryItem(item: HistoryItem) {
  const items = loadHistory();
  const next = [item, ...items.filter((x) => x.jobId !== item.jobId)].slice(0, 200);
  saveHistory(next);
  return next;
}

export function removeHistoryItem(jobId: string) {
  const items = loadHistory();
  const next = items.filter((x) => x.jobId !== jobId);
  saveHistory(next);
  return next;
}

export function updateHistoryStatus(jobId: string, status: JobStatus) {
  const items = loadHistory();
  const next = items.map((x) => (x.jobId === jobId ? { ...x, status } : x));
  saveHistory(next);
  return next;
}


