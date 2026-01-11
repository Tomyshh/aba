"use client";

import { useQuery } from "@tanstack/react-query";

import { getJob } from "@/lib/api";
import type { JobResponse } from "@/lib/types";

export function useJob(jobId: string, opts?: { enabled?: boolean }) {
  const enabled = opts?.enabled ?? Boolean(jobId);

  return useQuery<JobResponse>({
    queryKey: ["job", jobId],
    enabled,
    queryFn: () => getJob(jobId),
    refetchInterval: (query) => {
      const s = query.state.data?.status;
      if (!s) return 2_000;
      return s === "pending" || s === "processing" ? 2_000 : false;
    },
  });
}


