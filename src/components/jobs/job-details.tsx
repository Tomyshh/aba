"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Download, Loader2, RotateCcw } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useJob } from "@/hooks/use-job";
import { useHistory } from "@/hooks/use-history";
import { getJobDownloadUrl } from "@/lib/api";
import { formatDateTime } from "@/lib/utils";
import { normalizeJobStatus } from "@/lib/job-status";
import { JobProgressBar } from "./job-progress";
import { JobStatusBadge } from "./job-status-badge";

export function JobDetails({ jobId }: { jobId: string }) {
  const t = useTranslations("jobs");
  const tc = useTranslations("common");
  const { items, updateStatus } = useHistory();
  const item = items.find((x) => x.jobId === jobId);
  const job = useJob(jobId, { enabled: true });

  useEffect(() => {
    const s = job.data?.status;
    if (s) updateStatus(jobId, normalizeJobStatus(s));
  }, [job.data?.status, jobId, updateStatus]);

  const status = job.data?.status ? normalizeJobStatus(job.data.status) : item?.status;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("job")} <span className="font-mono text-sm text-black/60 dark:text-white/60">{jobId}</span>
        </CardTitle>
        <CardDescription>
          {item ? (
            <>
              {item.filename} • {item.targetLanguage} • {formatDateTime(item.createdAt)}
            </>
          ) : (
            <>—</>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {status ? <JobStatusBadge status={status} /> : null}
            {job.isLoading || job.isFetching ? (
              <span className="inline-flex items-center gap-2 text-xs text-black/55 dark:text-white/60">
                <Loader2 className="h-4 w-4 animate-spin" /> Sync…
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => job.refetch()}>
              <RotateCcw className="h-4 w-4" />
              {tc("refresh")}
            </Button>
            {job.data?.status === "completed" ? (
              <Link href={getJobDownloadUrl(jobId)}>
                <Button size="sm">
                  <Download className="h-4 w-4" />
                  {t("downloadDocx")}
                </Button>
              </Link>
            ) : null}
          </div>
        </div>

        {job.data?.progress ? <JobProgressBar progress={job.data.progress} /> : null}

        {job.data?.status === "failed" ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-200">
            <div className="font-semibold">Error</div>
            <div className="mt-1">{job.data.error || "Unknown error"}</div>
          </div>
        ) : null}

        <div className="grid gap-2 text-xs text-black/55 dark:text-white/60 md:grid-cols-2">
          <div>
            <span className="font-medium">{tc("createdAt")}:</span> {job.data?.createdAt ? formatDateTime(job.data.createdAt) : "—"}
          </div>
          <div>
            <span className="font-medium">{tc("updatedAt")}:</span> {job.data?.updatedAt ? formatDateTime(job.data.updatedAt) : "—"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


