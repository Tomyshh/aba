"use client";

import { Progress } from "@/components/ui/progress";
import type { JobProgress } from "@/lib/types";

export function JobProgressBar({ progress }: { progress?: JobProgress }) {
  if (!progress?.total) return null;
  const pct = Math.round((progress.current / progress.total) * 100);
  return (
    <div className="space-y-1">
      <Progress value={pct} />
      <div className="text-xs text-black/55 dark:text-white/60">
        {progress.current} / {progress.total} ({pct}%)
      </div>
    </div>
  );
}


