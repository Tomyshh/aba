"use client";

import { useTranslations } from "next-intl";

import type { JobStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const colors: Record<JobStatus, string> = {
  pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/20",
  processing: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/20",
  completed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  failed: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/20",
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const t = useTranslations("jobStatus");
  return <Badge className={cn("border", colors[status])}>{t(status)}</Badge>;
}


