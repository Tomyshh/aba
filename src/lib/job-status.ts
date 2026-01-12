import type { JobStatus } from "./types";

// Backend / legacy values may differ; normalize them here.
export function normalizeJobStatus(status: string): JobStatus {
  switch (status) {
    case "pending":
    case "processing":
    case "completed":
    case "failed":
      return status;
    // Some jobs may use "running" instead of "processing"
    case "running":
      return "processing";
    default:
      // Best-effort fallback: treat unknown as processing to keep UI stable
      return "processing";
  }
}


