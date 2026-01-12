"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, CheckCircle2, Clock3, Layers3 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useHistory } from "@/hooks/use-history";
import type { JobStatus } from "@/lib/types";

function countBy(items: { status?: JobStatus }[], status: JobStatus) {
  return items.filter((x) => x.status === status).length;
}

export function StatsCards() {
  const t = useTranslations("dashboard.stats");
  const { items } = useHistory();

  const total = items.length;
  const completed = countBy(items, "completed");
  const failed = countBy(items, "failed");
  const inProgress = countBy(items, "pending") + countBy(items, "processing");

  const stats = [
    { label: t("total"), value: total, icon: Layers3 },
    { label: t("completed"), value: completed, icon: CheckCircle2 },
    { label: t("inProgress"), value: inProgress, icon: Clock3 },
    { label: t("failed"), value: failed, icon: AlertTriangle },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="overflow-hidden">
          <CardContent className="flex items-center justify-between gap-3 py-4">
            <div>
              <div className="text-xs text-black/55 dark:text-white/60">{s.label}</div>
              <div className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5">
              <s.icon className="h-5 w-5 text-black/60 dark:text-white/70" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


