"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Download, ExternalLink, RefreshCw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHistory } from "@/hooks/use-history";
import { useJob } from "@/hooks/use-job";
import { getJobDownloadUrl } from "@/lib/api";
import { formatDateTime } from "@/lib/utils";
import { normalizeJobStatus } from "@/lib/job-status";
import { JobStatusBadge } from "./job-status-badge";
import { JobProgressBar } from "./job-progress";
import { useEffect } from "react";

function Row({ jobId }: { jobId: string }) {
  const tc = useTranslations("common");
  const { items, remove, updateStatus } = useHistory();
  const item = items.find((x) => x.jobId === jobId);
  const job = useJob(jobId, { enabled: Boolean(item) });

  useEffect(() => {
    const s = job.data?.status;
    if (s) updateStatus(jobId, normalizeJobStatus(s));
  }, [job.data?.status, jobId, updateStatus]);

  const status = job.data?.status ? normalizeJobStatus(job.data.status) : item?.status;

  if (!item) return null;

  return (
    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 md:grid-cols-[1fr_220px_200px_220px] md:items-center">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{item.filename}</div>
        <div className="mt-1 text-xs text-black/55 dark:text-white/60">
          {item.targetLanguage} • {formatDateTime(item.createdAt)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {status ? <JobStatusBadge status={status} /> : null}
        {job.isFetching ? <RefreshCw className="h-4 w-4 animate-spin text-black/45 dark:text-white/50" /> : null}
      </div>

      <div>{job.data?.progress ? <JobProgressBar progress={job.data.progress} /> : null}</div>

      <div className="flex flex-wrap items-center gap-2 md:justify-end">
        <Link href={`/jobs/${jobId}`}>
          <Button variant="secondary" size="sm">
            <ExternalLink className="h-4 w-4" />
            {tc("open")}
          </Button>
        </Link>
        {status === "completed" ? (
          <Link href={getJobDownloadUrl(jobId)}>
            <Button size="sm">
              <Download className="h-4 w-4" />
              {tc("download")}
            </Button>
          </Link>
        ) : null}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const s = job.data?.status;
            if (s) updateStatus(jobId, normalizeJobStatus(s));
            job.refetch();
          }}
          aria-label={tc("refresh")}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => remove(jobId)} aria-label={tc("delete")}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function JobsTable() {
  const t = useTranslations("jobs");
  const { items } = useHistory();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-sm text-black/55 dark:text-white/60">{t("empty")}</div>
        ) : (
          <div className="space-y-2">
            {items.map((it) => (
              <Row key={it.jobId} jobId={it.jobId} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


