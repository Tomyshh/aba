"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Download, ExternalLink, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHistory } from "@/hooks/use-history";
import { formatDateTime } from "@/lib/utils";
import { JobStatusBadge } from "@/components/jobs/job-status-badge";
import { getJobDownloadUrl } from "@/lib/api";

export function RecentJobs() {
  const t = useTranslations("dashboard");
  const tjobs = useTranslations("jobs");
  const tc = useTranslations("common");
  const { items, remove } = useHistory();

  const recent = items.slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("recentJobs")}</CardTitle>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <div className="text-sm text-black/55 dark:text-white/60">{tjobs("empty")}</div>
        ) : (
          <div className="space-y-2">
            {recent.map((j) => (
              <div
                key={j.jobId}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="truncate text-sm font-medium">{j.filename}</div>
                    {j.status ? <JobStatusBadge status={j.status} /> : null}
                  </div>
                  <div className="mt-1 text-xs text-black/55 dark:text-white/60">
                    {j.targetLanguage} • {formatDateTime(j.createdAt)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/jobs/${j.jobId}`}>
                    <Button variant="secondary" size="sm">
                      <ExternalLink className="h-4 w-4" />
                      {tc("open")}
                    </Button>
                  </Link>
                  {j.status === "completed" ? (
                    <Link href={getJobDownloadUrl(j.jobId)}>
                      <Button size="sm">
                        <Download className="h-4 w-4" />
                        {tc("download")}
                      </Button>
                    </Link>
                  ) : null}
                  <Button variant="ghost" size="sm" onClick={() => remove(j.jobId)} aria-label={tc("delete")}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


